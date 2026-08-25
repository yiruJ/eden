/* Eden renewal invoicing — "Build Invoices"
   Mode: Run Once for All Items.

   Gathers everything a single invoice needs from three upstream Notion nodes and
   emits one tidy item per invoice, including the exact block of values the
   Google Sheet expects.

   ====================================================================
   SET THE THREE NODE NAMES BELOW TO MATCH YOUR CANVAS BEFORE RUNNING
   ==================================================================== */

const NODES = {
  // Student profiles for the students who need renewing.
  // Fields seen: property_full_name, property_email, property_instrument,
  // property_grade, property_lesson_duration, property_program_s,
  // property_legacy_rate
  students: 'Filter Students Who Need Renewal',

  // Private Lesson Packages rows, the packages that are running down.
  // Fields needed: property_student (title, e.g. "Fiona Zhang - pkg 1"),
  // property_amount_paid, property_sessions_included, and the row id.
  packages: 'PUT YOUR PACKAGES NODE NAME HERE',

  // Notion Invoices DB. Get Many, Return All, Simplify ON, Execute Once ON.
  // Supplies the next invoice number and stops the same package invoicing twice.
  invoices: 'PUT YOUR INVOICES NODE NAME HERE',
};

const CONFIG = {
  DUE_DAYS: 5,               // due = issue date + this
  DEFAULT_SESSIONS: 10,      // used when the last package had an odd count
  STANDARD_SESSIONS: [5, 10],
  INVOICE_PREFIX: 'INV-',
  PAD: 0,                    // 0 keeps your INV-102 format; 4 would give INV-0102
  START_AT: 1,               // floor, in case the Invoices DB is still empty
  TZ: 'Australia/Sydney',
};

// Current list rate per lesson. The gap between this and what the family
// actually pays becomes the discount line on the invoice.
const RATE_CARD = { '30': 55.00, '45': 82.50, '60': 110.00 };

/* --- Notion readers ------------------------------------------------------- */

// n8n flattens Notion properties to property_<snake_case>, and the spelling
// shifts with punctuation in the property name. Matching on a normalised key
// means a rename in Notion cannot silently blank a field.
function prop(row, ...aliases) {
  const want = aliases.map((a) => a.toLowerCase().replace(/[^a-z0-9]/g, ''));
  const json = row?.json ?? row ?? {};
  for (const [key, value] of Object.entries(json)) {
    const k = key.replace(/^property_/, '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (want.includes(k)) return value;
  }
  return undefined;
}

function text(row, ...aliases) {
  const v = prop(row, ...aliases);
  if (v === undefined || v === null) return '';
  if (Array.isArray(v)) return v.filter(Boolean).map(String).join(', ').trim();
  if (typeof v === 'object') return String(v.start ?? '').trim();
  return String(v).trim();
}

// Sessions included arrives as a string ("10"), so nothing numeric is trusted.
function num(row, ...aliases) {
  const v = prop(row, ...aliases);
  const n = typeof v === 'number' ? v : parseFloat(String(v ?? '').replace(/[^0-9.\-]/g, ''));
  return Number.isFinite(n) ? n : null;
}

const idOf = (row) => String(row?.json?.id ?? row?.id ?? '');
const normId = (id) => String(id || '').replace(/-/g, '').toLowerCase();
const nameKey = (n) => String(n || '').toLowerCase().replace(/[^a-z]/g, '');
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

// Package titles read "Fiona Zhang - pkg 1", so the suffix comes off before the
// name can be matched against a student profile.
function studentFromPackageTitle(title) {
  return String(title || '')
    .replace(/\s*[-–]\s*(pkg|package|trial)\.?\s*\d*\s*$/i, '')
    .trim();
}

/* --- Dates ---------------------------------------------------------------- */

function sydneyToday() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: CONFIG.TZ, year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date());
}

function addDays(iso, days) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

// "14 Aug 2026". Written to the sheet as a string, so there is no date-serial
// or timezone handling anywhere downstream.
function label(iso) {
  const d = new Date(`${iso}T00:00:00Z`);
  const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
               'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getUTCMonth()];
  return `${d.getUTCDate()} ${mon} ${d.getUTCFullYear()}`;
}

/* --- Inputs --------------------------------------------------------------- */

function safeAll(nodeName, role) {
  if (/^PUT YOUR/.test(nodeName)) {
    throw new Error(`Set the ${role} node name in the NODES block at the top of this code node.`);
  }
  try {
    return $(nodeName).all();
  } catch (err) {
    throw new Error(
      `Cannot read node "${nodeName}" (${role}). Check it matches the canvas exactly.`);
  }
}

const students = safeAll(NODES.students, 'students');
const packages = safeAll(NODES.packages, 'packages');
const invoices = safeAll(NODES.invoices, 'invoices');

/* --- Dedup and numbering -------------------------------------------------- */

// One invoice per package. If a lesson fails to log, Sessions Remaining stays
// stuck at the trigger value and the same package would otherwise re-fire.
const alreadyInvoiced = new Set();
for (const inv of invoices) {
  const rel = prop(inv, 'Source Package');
  for (const r of (Array.isArray(rel) ? rel : (rel ? [rel] : []))) {
    alreadyInvoiced.add(normId(typeof r === 'string' ? r : r?.id));
  }
}

let nextNumber = Math.max(
  CONFIG.START_AT,
  invoices.reduce((max, inv) => Math.max(max, num(inv, 'Invoice No.', 'Invoice Number') || 0), 0) + 1
);

const ref = (n) => CONFIG.PAD
  ? `${CONFIG.INVOICE_PREFIX}${String(n).padStart(CONFIG.PAD, '0')}`
  : `${CONFIG.INVOICE_PREFIX}${n}`;

/* --- Duration -------------------------------------------------------------- */

function durationCode(raw) {
  const s = String(raw || '').toLowerCase();
  if (s.includes('hour') || s.includes('60')) return '60';
  if (s.includes('45')) return '45';
  if (s.includes('30')) return '30';
  return '';
}

const durationLabel = (code) => (code === '60' ? '1 hour' : `${code} minutes`);

/* --- Index packages by student -------------------------------------------- */

const packageByStudent = new Map();
for (const p of packages) {
  const key = nameKey(studentFromPackageTitle(text(p, 'Student')));
  if (!key) continue;
  // If a family paid early there can be two Active packages. Keep the one with
  // the fewest sessions left, which is the one actually running down.
  const existing = packageByStudent.get(key);
  const remaining = num(p, 'Sessions Remaining') ?? 99;
  if (!existing || remaining < (num(existing, 'Sessions Remaining') ?? 99)) {
    packageByStudent.set(key, p);
  }
}

/* --- Build ----------------------------------------------------------------- */

const issued = sydneyToday();
const due = addDays(issued, CONFIG.DUE_DAYS);
const out = [];
const seen = new Set();

for (const student of students) {
  const flags = [];
  const studentName = text(student, 'Full name');
  const key = nameKey(studentName);
  if (!key) continue;

  const pkg = packageByStudent.get(key);
  if (!pkg) {
    flags.push('no matching package found, cannot price');
  }

  const packageId = pkg ? normId(idOf(pkg)) : '';
  if (packageId && (alreadyInvoiced.has(packageId) || seen.has(packageId))) continue;
  if (packageId) seen.add(packageId);

  // Price from what this family last actually paid. No rate card reproduces the
  // real numbers: sibling and ad-hoc discounts were never recorded anywhere.
  const lastPaid = pkg ? num(pkg, 'Amount paid') : null;
  const lastSessions = pkg ? num(pkg, 'Sessions included') : null;
  const derivedRate = lastPaid && lastSessions ? round2(lastPaid / lastSessions) : null;
  if (pkg && derivedRate === null) flags.push('package has no amount or session count');

  let sessions = lastSessions;
  if (!CONFIG.STANDARD_SESSIONS.includes(sessions)) {
    if (sessions) flags.push(`last package was ${sessions} sessions, new one set to ${CONFIG.DEFAULT_SESSIONS}`);
    sessions = CONFIG.DEFAULT_SESSIONS;
  }

  const code = durationCode(text(student, 'Lesson duration'));
  if (!code) flags.push('no lesson duration on the student profile');

  const unitPrice = RATE_CARD[code] ?? 0;
  const rate = derivedRate ?? unitPrice;
  const amount = round2(sessions * rate);

  // The derived rate comes from the old package but Unit Price comes from the
  // current profile, so a duration change makes them disagree. Flag, do not guess.
  if (derivedRate !== null && unitPrice > 0) {
    const ratio = derivedRate / unitPrice;
    if (ratio > 1.05) {
      flags.push(`paying above list ($${derivedRate} vs $${unitPrice}), check duration`);
    } else if (ratio < 0.6) {
      flags.push(`rate is ${Math.round((1 - ratio) * 100)}% below list, duration may have changed`);
    }
  }

  // The invoice shows list price then a discount line. The discount absorbs
  // whatever this family's held rate happens to be.
  const discountAmount = round2(amount - sessions * unitPrice);
  const discountLabel = discountAmount === 0
    ? ''
    : (sessions === 10 ? '10 Week Package Discount' : 'Package Discount');

  const parentEmail = text(student, 'Email');
  if (!parentEmail) flags.push('no parent email, cannot send');

  const legacy = prop(student, 'Legacy Rate', 'Is Legacy');
  const isLegacy = legacy === true || String(legacy).toLowerCase() === 'true';

  const instrument = text(student, 'Instrument');
  const lessonType = text(student, 'Program/s') || 'Private Lesson';
  const level = text(student, 'Grade');

  const invoiceNo = nextNumber++;
  const invoiceRef = ref(invoiceNo);

  out.push({
    json: {
      // identity
      invoiceNo,
      invoiceRef,
      title: `${invoiceRef} — ${studentName}`,
      studentId: normId(idOf(student)),
      studentName,
      parentEmail,
      packageId,

      // invoice content
      instrument,
      lessonType,
      level,
      durationCode: code,
      durationLabel: durationLabel(code),
      sessions,
      unitPrice,
      ratePerLesson: rate,
      amount,
      discountLabel,
      discountAmount,
      rateSource: isLegacy ? 'Legacy' : 'Card',

      // dates
      issued,
      due,
      issuedLabel: label(issued),
      dueLabel: label(due),

      // drive
      folderName: studentName,
      fileName: `${invoiceRef} - ${studentName}`,

      flags: flags.join('; '),

      // Written straight into Data!B2:B13. Order matches the sheet exactly.
      dataBlock: [
        [invoiceRef],           // B2  Invoice number
        [label(issued)],        // B3  Invoice date
        [label(due)],           // B4  Due date
        [studentName],          // B5  Student name
        [instrument],           // B6  Instrument
        [lessonType],           // B7  Lesson Type
        [level],                // B8  Level
        [durationLabel(code)],  // B9  Lesson duration
        [sessions],             // B10 Quantity
        [unitPrice],            // B11 Unit price
        [discountLabel],        // B12 Discount label
        [discountAmount],       // B13 Discount amount
      ],
    },
  });
}

return out;
