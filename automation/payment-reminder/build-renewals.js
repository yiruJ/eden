/* Eden-Package-Renewal-Invoicing — Node 13 "Build Renewals"
   Mode: Run Once for All Items. Replaces the old "Code in JavaScript1".

   Reads today's lessons, finds students whose package has run down, prices the
   renewal from what that family last actually paid, and emits one item per
   invoice to be created.

   Upstream nodes it reads:
     Parse & Classify Events   today's calendar lessons
     getStudentProfiles        Notion Student profiles
     getLessonPkgs             Notion Private Lesson Packages (Active)
     getExistingInvoices       Notion Invoices  <-- new node, add before this one
*/

const CONFIG = {
  REVIEW_MODE: true,          // false = email sends automatically
  TRIGGER_AT_REMAINING: 1,    // set to 2 for a week of lead time
  DUE_DAYS: 5,                // due = issued + this
  DEFAULT_SESSIONS: 10,       // when the last package had a non-standard count
  STANDARD_SESSIONS: [5, 10],
  INVOICE_PREFIX: 'INV-',
  TZ: 'Australia/Sydney',
};

// Current list rate per lesson, used as the invoice Unit Price. The gap between
// this and what the family actually pays becomes the discount line, which is how
// legacy and sibling rates get represented without a discount field existing.
const RATE_CARD = {
  '30': 55.00,
  '45': 82.50,
  '60': 110.00,
};

/* --- Notion property readers --------------------------------------------- */

// The n8n Notion node flattens properties to property_<snake_case>, but the exact
// spelling varies with punctuation in the Notion property name. Match on a
// normalised key so a rename or a stray full stop cannot silently blank a field.
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
  return String(v).trim();
}

function num(row, ...aliases) {
  const v = prop(row, ...aliases);
  const n = typeof v === 'number' ? v : parseFloat(String(v ?? '').replace(/[^0-9.\-]/g, ''));
  return Number.isFinite(n) ? n : null;
}

// Notion page ids come back with and without dashes depending on the endpoint.
function normId(id) {
  return String(id || '').replace(/-/g, '').toLowerCase();
}

// Names are matched normalised rather than with startsWith, which would
// false-match a student whose name is a prefix of another.
function nameKey(name) {
  return String(name || '').toLowerCase().replace(/[^a-z]/g, '');
}

function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
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

// "14 Aug 2026" — written to the sheet as a string so there is no date-serial
// or timezone handling anywhere downstream.
function label(iso) {
  const d = new Date(`${iso}T00:00:00Z`);
  const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
               'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getUTCMonth()];
  return `${d.getUTCDate()} ${mon} ${d.getUTCFullYear()}`;
}

/* --- Collect upstream ----------------------------------------------------- */

function safeAll(nodeName) {
  try {
    return $(nodeName).all();
  } catch (err) {
    return [];
  }
}

const lessons = safeAll('Parse & Classify Events').map((i) => i.json);
const students = safeAll('getStudentProfiles');
const packages = safeAll('getLessonPkgs');
const invoices = safeAll('getExistingInvoices');

/* --- Dedup and numbering -------------------------------------------------- */

// One invoice per package that ran down. Keyed on the source package id so a
// lesson that fails to log into Notion cannot invoice the same family twice.
const invoicedPackages = new Set();
for (const inv of invoices) {
  const rel = prop(inv, 'Source Package');
  const ids = Array.isArray(rel) ? rel : (rel ? [rel] : []);
  for (const id of ids) {
    invoicedPackages.add(normId(typeof id === 'string' ? id : id?.id));
  }
}

let nextNumber = invoices.reduce(
  (max, inv) => Math.max(max, num(inv, 'Invoice No.', 'Invoice Number') || 0), 0) + 1;

/* --- Duration mapping ------------------------------------------------------ */

// Student profiles stores "30 minutes" / "45 minutes" / "1 hour".
function durationCode(raw) {
  const s = String(raw || '').toLowerCase();
  if (s.includes('hour') || s.includes('60')) return '60';
  if (s.includes('45')) return '45';
  if (s.includes('30')) return '30';
  return '';
}

function durationLabel(code) {
  return code === '60' ? '1 hour' : `${code} minutes`;
}

/* --- Build ----------------------------------------------------------------- */

const issued = sydneyToday();
const due = addDays(issued, CONFIG.DUE_DAYS);
const out = [];
const seenPackages = new Set();

for (const lesson of lessons) {
  const key = nameKey(lesson.studentName);
  if (!key) continue;

  const student = students.find((s) => nameKey(text(s, 'Full name')) === key);
  const pkg = packages.find((p) =>
    nameKey(text(p, 'Student')) === key && text(p, 'status') === 'Active');

  if (!student || !pkg) continue;

  const remaining = num(pkg, 'Sessions Remaining');
  if (remaining === null || remaining !== CONFIG.TRIGGER_AT_REMAINING) continue;

  const packageId = normId(pkg.json?.id ?? pkg.id);
  if (invoicedPackages.has(packageId) || seenPackages.has(packageId)) continue;
  seenPackages.add(packageId);

  const flags = [];

  // Price the renewal from what this family last actually paid. No rate card
  // reproduces the real numbers: sibling and ad-hoc discounts were never recorded.
  const lastPaid = num(pkg, 'Amount paid');
  const lastSessions = num(pkg, 'Sessions included');
  if (!lastPaid || !lastSessions) {
    flags.push('last package has no amount or session count, priced at card rate');
  }
  const derivedRate = lastPaid && lastSessions ? round2(lastPaid / lastSessions) : null;

  let sessions = lastSessions;
  if (!CONFIG.STANDARD_SESSIONS.includes(sessions)) {
    flags.push(`last package was ${sessions} sessions, new one defaulted to ${CONFIG.DEFAULT_SESSIONS}`);
    sessions = CONFIG.DEFAULT_SESSIONS;
  }

  const code = durationCode(text(student, 'Lesson duration'));
  if (!code) flags.push('no lesson duration on the student profile');

  const unitPrice = RATE_CARD[code] ?? 0;
  const rate = derivedRate ?? unitPrice;
  const amount = round2(sessions * rate);

  // The invoice shows list price then a discount line, matching the existing
  // format. The discount absorbs whatever the family's held rate happens to be.
  const discountAmount = round2(amount - sessions * unitPrice);
  const discountLabel = discountAmount === 0
    ? ''
    : (sessions === 10 ? '10 Week Package Discount' : 'Package Discount');

  const isLegacy = text(student, 'Is Legacy') === 'true'
    || prop(student, 'Is Legacy') === true;

  const invoiceNo = nextNumber++;
  const invoiceRef = `${CONFIG.INVOICE_PREFIX}${String(invoiceNo).padStart(4, '0')}`;
  const studentName = text(student, 'Full name');

  out.push({
    json: {
      invoiceNo,
      invoiceRef,
      title: `${invoiceRef} — ${studentName}`,

      studentId: normId(student.json?.id ?? student.id),
      studentName,
      parentEmail: text(student, 'Email'),
      sourcePackageId: packageId,

      description: text(student, 'Instrument'),
      lessonType: text(student, 'Program/s') || 'Private Lesson',
      level: text(student, 'Grade'),
      durationCode: code,
      durationLabel: durationLabel(code),

      sessions,
      unitPrice,
      ratePerLesson: rate,
      amount,
      discountLabel,
      discountAmount,
      rateSource: isLegacy ? 'Legacy' : 'Card',

      issued,
      due,
      issuedLabel: label(issued),
      dueLabel: label(due),

      folderName: studentName,
      fileName: `${invoiceRef} - ${studentName} - ${label(issued)}`,

      flags: flags.join('; '),
      reviewMode: CONFIG.REVIEW_MODE,

      // Written straight into Data!B2:B14 by the Fill Invoice node.
      // Order matches the template exactly. Lesson Type sits last because it was
      // appended at B14, which avoids shifting the twelve rows above it.
      dataBlock: [
        [invoiceRef],                                    // B2  Invoice number
        [label(issued)],                                 // B3  Invoice date
        [label(due)],                                    // B4  Due date
        [studentName],                                   // B5  Student name
        [text(student, 'Email')],                        // B6  Parent email
        [text(student, 'Instrument')],                   // B7  Description
        [text(student, 'Grade')],                        // B8  Level
        [durationLabel(code)],                           // B9  Lesson duration
        [sessions],                                      // B10 Quantity
        [unitPrice],                                     // B11 Unit price
        [discountLabel],                                 // B12 Discount label
        [discountAmount],                                // B13 Discount amount
        [text(student, 'Program/s') || 'Private Lesson'],// B14 Lesson Type
      ],
    },
  });
}

return out;
