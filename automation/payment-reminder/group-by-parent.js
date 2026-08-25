/* Eden-Package-Renewal-Invoicing — Node 21 "Group By Parent"
   Mode: Run Once for All Items.

   Siblings share a parent email (Julia and Olivia Yun both resolve to
   elissa.jihye.oh@gmail.com), so emailing per invoice would send one family two
   payment requests on the same morning. This collapses them onto a single email
   carrying one PDF per child.

   Input : one item per invoice, each with a binary PDF on property `data`.
   Output: one item per parent, with attachments renamed data0, data1, ...
*/

const CONFIG = {
  PHONE: '0410 385 227',
  SIGN_OFF: 'Eden Music Academy',
};

function money(n) {
  const v = Number(n) || 0;
  return '$' + v.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function joinNames(names) {
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

/* --- Group ---------------------------------------------------------------- */

const families = new Map();

for (const item of $input.all()) {
  const inv = $('Build Renewals').itemMatching(item.pairedItem?.item ?? 0).json;
  const email = (inv.parentEmail || '').trim().toLowerCase();

  // No parent email means nothing can be sent. Surfaced by the Telegram node
  // rather than silently dropped.
  if (!email) continue;

  if (!families.has(email)) families.set(email, []);
  families.get(email).push({ inv, binary: item.binary });
}

/* --- Compose --------------------------------------------------------------- */

const out = [];

for (const [email, invoices] of families) {
  const names = invoices.map((r) => r.inv.studentName);
  const total = invoices.reduce((s, r) => s + Number(r.inv.amount || 0), 0);
  const due = invoices[0].inv.dueLabel;
  const single = invoices.length === 1;

  // Attachments have to sit on distinct binary properties for Gmail to pick up
  // more than one, so each child's PDF is renamed by position.
  const binary = {};
  const fields = [];
  invoices.forEach((r, i) => {
    const key = `data${i}`;
    const src = r.binary?.data;
    if (!src) return;
    binary[key] = { ...src, fileName: `${r.inv.fileName}.pdf` };
    fields.push(key);
  });

  const subject = single
    ? `Eden Music Academy — invoice for ${names[0]}'s next lesson block`
    : `Eden Music Academy — invoices for ${joinNames(names)}`;

  const lines = ['Dear Parent,', ''];

  if (single) {
    const r = invoices[0].inv;
    lines.push(
      `${r.studentName}'s current lesson package finishes shortly, so the next block ` +
      `of ${r.sessions} lessons is ready. The invoice is attached.`,
      '',
      `Amount: ${money(r.amount)}`,
      `Due: ${due}`,
    );
  } else {
    lines.push(
      `${joinNames(names)}'s current lesson packages finish shortly, so their next ` +
      `blocks are ready. Both invoices are attached.`,
      '',
    );
    for (const r of invoices) {
      lines.push(`${r.inv.studentName}, ${r.inv.sessions} lessons: ${money(r.inv.amount)}`);
    }
    lines.push('', `Total: ${money(total)}`, `Due: ${due}`);
  }

  lines.push(
    '',
    'Payment details are on the invoice. Once it is paid we will keep the regular ' +
    'lesson time held for the new block.',
    '',
    `Any questions, just reply to this email or call us on ${CONFIG.PHONE}.`,
    '',
    CONFIG.SIGN_OFF,
  );

  out.push({
    json: {
      to: email,
      subject,
      body: lines.join('\n'),
      attachmentFields: fields.join(','),
      studentNames: names,
      invoiceCount: invoices.length,
      total,
      due,
    },
    binary,
  });
}

return out;
