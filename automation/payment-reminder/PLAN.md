# Eden Package Renewal Invoicing — Build Plan

Upgrade of the `Eden-Package_Payment-Reminder` n8n workflow.
Planned 14 Aug 2026. Decisions below are settled; open items are listed at the end.

**Goal:** when a student's package runs down, automatically produce a PDF invoice in Google
Drive, email the parent, log it in a Notion checklist, remind them the day before it is due,
and flag it to you if it goes overdue.

---

## 1. Findings that shaped the design

These came out of the data, not from assumption, and each one changed a decision.

### 1.1 There is no legacy rate card, and there cannot be one

Per-session rates actually paid, derived from `Amount paid ÷ Sessions included`:

| Duration band | Rates in the data |
|---|---|
| 30 min | $35.50, $36.00, $38.00, **$40.00** (29 pkgs), $45.00 |
| 45 min | $57.00, **$60.00** (9 pkgs), $65.00 |
| 60 min | $75.00, $95.00, $100.00 |

A 27% spread inside the 30-minute band, caused by sibling and ad-hoc discounts that were never
recorded anywhere (no discount field exists). **The only way to price a renewal correctly is to
read the family's own most recent package.** No formula reproduces these numbers.

### 1.2 Lessons are logged the morning after, which creates an off-by-one

`Private Lessons` records are created at 00:00 UTC, which is **10:00am Sydney, the day after the
lesson**. Verified: `Siya Horn - 13 Aug`, lesson 5:00pm Thursday, record created 10:00am Friday.

The reminder runs at 11:30am and only evaluates students who have a lesson **that day**. So:

| Reminder runs | Lessons counted | `Sessions Remaining` | Today's lesson is |
|---|---:|---:|---|
| Wed, week 9 | 8 | **2** | lesson 9, second to last |
| Wed, week 10 | 9 | **1** | **lesson 10, the final one** |

At `Remaining == 1` the final lesson is that evening, so there is no lead time. The trigger is a
constant so this can be changed in one line once observed in a real run.

### 1.3 Siblings share a parent email

`Julia Yun` and `Olivia Yun` both resolve to `elissa.jihye.oh@gmail.com`. Any design that emails
per student sends two payment requests to one parent on the same morning.

### 1.4 `Email` on Student profiles is the parent's, and there is no parent name

Confirmed by the sibling overlap and by addresses not matching student names. There is
`Parent/Guardian Phone no.` but no parent name field, hence the fixed greeting.

### 1.5 Bugs in the current workflow to fix while rebuilding

- **`CheckErrors` is dead.** It looks for `r.status >= 400 || r.error`, but nothing upstream makes
  an HTTP call, so `hasErrors` is always false and the error branch never fires.
- **`Code in JavaScript1` emits a lesson record** (`Status: 'Completed'`, `Duration`), which has
  nothing to do with payment. It is a leftover from a forked lesson-logging workflow, and nothing
  writes it to Notion.
- **`pkg.property_student.startsWith(lesson.studentName)`** will false-match a student whose name
  is a prefix of another. Replace with normalised equality.
- **The three Notion lookup nodes filter per-item, then get re-read wholesale** with `.all()` in
  the next Code node, so the per-item filtering is wasted work.
- The Notion node labels DB `32067b0c…` as "Payment Packages"; its real name is
  **Private Lesson Packages** ("Payment Packages" is the parent page).

---

## 2. Settled decisions

| # | Decision | Choice |
|---|---|---|
| 1 | Send model | **Draft first**, you approve. `REVIEW_MODE` flag flips to auto-send after ~1 month |
| 2 | Renewal price | **Always repeat their last per-session rate.** No automatic 1 Mar 2027 cutover |
| 3 | Odd session counts (2 / 12 / 20) | **Draft anyway** using the derived rate, flag in the Telegram summary |
| 4 | Duplicate protection | Key on the **source package ID**. One invoice per package that ran down |
| 5 | Trigger | `Sessions Remaining == 1` (constant, see 1.2) |
| 6 | Due date | **Issue date + 5 days** |
| 7 | Siblings | **One email** to the parent covering both children, **separate PDF and invoice number per child** |
| 8 | Marking paid | **Manual tick in Notion.** Safety net: check for a new package before any chase |
| 9 | Invoice file | Copy a **template sheet** into the student's Drive folder, fill it, **export PDF** |
| 10 | Drive layout | `Student Invoices / <Full name> / INV-0042 - Julia Yun - 14 Aug 2026` |
| 11 | Pre-due reminder | **Due − 1 day**, email the parent if not ticked Paid |
| 12 | Overdue | **Telegram to you only.** Never emails the parent after the due date |
| 13 | Ensemble | **Out of scope.** Keep the existing ensemble skip |
| 14 | Greeting | **"Dear Parent"** |

### Decisions I made rather than asked

- **Invoice numbering:** global sequential, `max(Invoice No.) + 1` read from the Notion Invoices
  DB at run time. Not per student, so a number identifies an invoice uniquely.
- **Failure handling:** if the Drive copy, cell fill, or PDF export fails, the Notion row stays
  `Draft`, no email is sent or drafted, and you get a Telegram naming the student. A payment
  request must never go out without its invoice attached.
- **Where the checkers live:** one separate workflow handles both the pre-due reminder and the
  overdue flag, since they read the same Notion rows on the same daily schedule.

---

## 3. Notion database: `Invoices`

New database. **One row per invoice, so siblings produce two rows** (separate numbers and PDFs),
grouped at send time by parent email.

| Property | Type | Notes |
|---|---|---|
| `Invoice` | title | `INV-0042 — Julia Yun` |
| `Invoice No.` | number | Global sequential |
| `Student` | relation → Student profiles | Single |
| `Source Package` | relation → Private Lesson Packages | **The dedup key.** The package that ran down |
| `Parent email` | email | Copied from Student profiles, used to group the email |
| `Sessions` | number | Size of the new package being sold |
| `Duration` | select | `30` / `45` / `60` |
| `Rate per lesson` | number (AUD) | Derived from the last package |
| `Amount` | number (AUD) | `Sessions × Rate` |
| `Rate source` | select | `Legacy` / `Card`. Lets you find who is still on held pricing |
| `Issued` | date | |
| `Due` | date | `Issued + 5` |
| `Status` | status | `Draft` → `Sent` → `Reminded` → `Paid` / `Overdue` / `Cancelled` |
| `Email sent` | date | |
| `Reminder sent` | date | |
| `Invoice PDF` | url | Drive link |
| `Invoice Sheet` | url | Drive link to the editable copy |
| `Flags` | text | e.g. `non-standard session count (20)` |

**Views to create:** `To review` (Status = Draft), `Awaiting payment` (Sent or Reminded),
`Overdue`, `Paid this month`. The first is your daily checklist while `REVIEW_MODE` is on.

---

## 4. Config block

Lives at the top of the Build Renewals node.

```javascript
const CONFIG = {
  REVIEW_MODE: true,            // false = email sends automatically
  TRIGGER_AT_REMAINING: 1,      // set to 2 for a week of lead time (see 1.2)
  DUE_DAYS: 5,                  // due = issued + this
  DEFAULT_SESSIONS: 10,         // new package size when the last one was non-standard
  STANDARD_SESSIONS: [5, 10],   // anything else gets flagged
  DRIVE_ROOT_FOLDER_ID: '',     // the "Student Invoices" folder
  TEMPLATE_SHEET_ID: '',        // the Eden invoice template
  INVOICE_PREFIX: 'INV-',
  TZ: 'Australia/Sydney',
};
```

---

## 5. Workflow 1 — `Eden-Package-Renewal-Invoicing`

Daily 11:30. Front half is unchanged from today's workflow.

**Keep as-is:** `Schedule Trigger` → `HTTP Request` (calendarList) → `Split Out` → `If` (drop
Holidays/Admin/Facebook calendars) → `Get many events` → `Parse & Classify Events` →
`isCancelled?` → `getTeacherProfiles` → `isTrial?` → `getStudentProfiles` → `getLessonPkgs`

**New from here:**

| # | Node | Type | Does |
|---|---|---|---|
| 12 | `getExistingInvoices` | Notion getAll | Reads the Invoices DB for dedup and the next number |
| 13 | `Build Renewals` | Code | Filters to the trigger, derives rate, builds one item per invoice. Replaces `Code in JavaScript1` |
| 14 | `Find Student Folder` | Drive search | Folder named `<Full name>` under `DRIVE_ROOT_FOLDER_ID` |
| 15 | `Create Folder If Missing` | Drive create | Only on the not-found branch |
| 16 | `Copy Template` | Drive copy | Template → student folder, named `INV-0042 - Julia Yun - 14 Aug 2026` |
| 17 | `Fill Invoice` | Sheets update | Writes values into the template's fixed cells |
| 18 | `Export PDF` | Drive download | `application/pdf`, guarded for empty output |
| 19 | `Create Invoice Row` | Notion create | Status `Draft`, with both Drive links |
| 20 | `Group By Parent` | Code | Collapses siblings into one email, attaches each child's PDF |
| 21 | `Draft or Send` | Gmail | Draft when `REVIEW_MODE`, otherwise send |
| 22 | `Mark Sent` | Notion update | Status → `Sent`, sets `Email sent` |
| 23 | `Telegram Summary` | Telegram | `3 invoices ready to review` plus any flags |

**Delete:** `CheckErrors`, `hasErrors`, `FormatErrorMessage`. Real failure handling replaces them
(section 2). `FormatTextMessage` becomes node 23.

### What `Build Renewals` does

1. For each of today's lessons, find the student's `Active` package (normalised name match).
2. Keep it only if `Sessions Remaining == TRIGGER_AT_REMAINING`.
3. Skip if an Invoice row already exists with that `Source Package`.
4. `rate = round(Amount paid ÷ Sessions included, 2)` from that package.
5. `sessions` = the same count, or `DEFAULT_SESSIONS` if non-standard, and set `Flags`.
6. `amount = sessions × rate`; `due = today + DUE_DAYS`.
7. Assign the next invoice number; emit one item per invoice.

---

## 6. Workflow 2 — `Eden-Invoice-Checker`

New workflow, daily 09:00.

| # | Node | Does |
|---|---|---|
| 1 | `Schedule Trigger` | 09:00 daily |
| 2 | `getOpenInvoices` | Notion, Status in `Sent` / `Reminded` |
| 3 | `getRecentPackages` | Notion, Private Lesson Packages created recently |
| 4 | `Classify` | Code. Sorts each open invoice into one of four buckets |
| 5 | `Send Reminder` | Gmail, due-tomorrow branch |
| 6 | `Mark Reminded` | Notion, Status → `Reminded` |
| 7 | `Mark Overdue` | Notion, Status → `Overdue` |
| 8 | `Telegram Alert` | Overdue list plus "looks paid, not ticked" list |

**The four buckets in `Classify`:**

| Condition | Action |
|---|---|
| A newer package exists for that student | **Telegram you "looks paid, not ticked".** No email |
| `Due` is tomorrow, not paid, not yet reminded | Reminder email to the parent |
| `Due` has passed, not paid | Status → `Overdue`, add to the Telegram list |
| Otherwise | Nothing |

The paid-check runs **first**, so a family who paid without being ticked is never emailed.

---

## 7. Email copy

Greeting is `Dear Parent`. Amount, sessions and due date come from the invoice. Bank details live
in the **template**, not in the code, so you can change them without touching the workflow.

Single child:

> **Subject:** Eden Music Academy — invoice for Julia's next lesson block
>
> Dear Parent,
>
> Julia's current lesson package finishes shortly, so her next block of 10 lessons is ready.
> The invoice is attached.
>
> **Amount: $400.00. Due: 19 August 2026.**
>
> Payment details are on the invoice. Once it is paid we will keep Julia's regular lesson time
> held for the new block.
>
> Any questions, just reply to this email or call us on 0410 385 227.
>
> Eden Music Academy

Siblings, one email, two attachments:

> Julia's and Olivia's current lesson packages finish shortly, so their next blocks are ready.
> Both invoices are attached.
>
> Julia, 10 lessons: $400.00
> Olivia, 10 lessons: $400.00
> **Total: $800.00. Due: 19 August 2026.**

The reminder at due − 1 is a short follow-up on the same thread.

---

## 8. Build order

1. Create the Notion `Invoices` database and its four views.
2. Create `Student Invoices` in Drive and the invoice template sheet, with your bank details and
   branding. Note the two IDs for `CONFIG`.
3. Build Workflow 1 up to node 19 and run it with `REVIEW_MODE` on and Gmail disconnected.
   Confirm the PDFs land in the right folders at the right prices.
4. Connect Gmail as **draft only**. Run for a month.
5. Build Workflow 2.
6. Flip `REVIEW_MODE` to false.

---

## 8a. Invoice template contract

Template file: `Eden-Invoice-Template.xlsx` in this folder. Upload to Drive, open as a Google
Sheet. Two tabs.

**`Invoice`** is presentation only. Every value is a formula reading the `Data` tab, so the
layout can be restyled freely without touching the workflow.

**`Data`** is the fill block. The workflow writes **`Data!B2:B14`** in a single range update,
which is why the row order is fixed:

| Cell | Field | Type | Source |
|---|---|---|---|
| `B2` | Invoice number | text | Notion Invoices, `max + 1` |
| `B3` | Invoice date | text | Pre-formatted, e.g. `14 Aug 2026` |
| `B4` | Due date | text | Issue + 5 days |
| `B5` | Student name | text | Student profiles `Full name` |
| `B6` | Parent email | text | Student profiles `Email`. Not shown on the invoice, used for the send |
| `B7` | Description | text | Student profiles `Instrument` |
| `B8` | Level | text | Student profiles `Grade` |
| `B9` | Lesson duration | text | Student profiles `Lesson duration` |
| `B10` | Quantity | **number** | Sessions in the new package |
| `B11` | Unit price | **number** | Current list rate for that duration |
| `B12` | Discount label | text | Blank when no discount |
| `B13` | Discount amount | **number, negative** | `0` for none |
| `B14` | Lesson Type | text | Student profiles `Program/s`. Appended, so rows above are unshifted |

Dates are written as pre-formatted strings so there is no date-serial or timezone handling.
`B10`, `B11` and `B13` must be real numbers or the total will not compute.

Invoice-tab cells that read these: `G9`, `G10`, `G11` (meta), `A10` (student), `A15`, `B15`,
`C15`, `D15`, `E15`, `F15` (line item), `E16`/`G16` (discount), `G18` (total).

### Spare discount rows

The Invoice tab reserves **rows 17 to 21** as empty discount slots for manual use. Row 16 is the
automated one driven by `B13`/`B14`. The total is `=SUM(G15:G21)`, so anything typed into a spare
row is picked up without touching a formula. They carry no borders, since empty ruled rows read as
a mistake on a printed invoice.

The payment block is pinned at row 33 so it sits at the foot of page one. Content totals 734pt
against 756pt of A4 printable height, and `fitToHeight` is on, so adding rows shrinks the page
slightly rather than spilling onto a second sheet.

### Pricing decomposition

The existing invoice format shows list price then a discount line, rather than a single derived
rate. The workflow reproduces this:

```
Unit price (B11)      = current list rate for that duration (30/45/60 → $55 / $82.50 / $110)
Discount amount (B13) = (list × quantity) − (derived rate × quantity)
Total                 = quantity × derived rate     [derived rate = last package Amount ÷ Sessions]
```

Verified against `INVOICE - Taylor Tan - Pkg 1.pdf`: `82.50 × 10 = 825.00`, discount `−100.00`,
total `725.00`.

**Caveat worth watching.** For legacy families the discount line will be large. A 30-minute
legacy family at $40/session shows `$55 × 10 = $550`, discount `−$150`, total `$400`. That
exposes how far below list they are, which reads as generous now but makes the 1 March 2027
migration look like a $150 increase. If that is not wanted, set `B11` to the derived rate and
`B13` to `0`, and the discount row disappears on its own.

### PDF export

Export must pin the `Invoice` tab's `gid`, otherwise the `Data` tab prints too:

```
https://docs.google.com/spreadsheets/d/<FILE_ID>/export?format=pdf&gid=<INVOICE_GID>&portrait=true&fitw=true&gridlines=false&printtitle=false&sheetnames=false&pagenumbers=false
```

The `gid` is in the URL when the Invoice tab is selected. It is the same for every copy made
from the template.

---

## 9. Open items

- **Drive folder ID and template sheet ID** are needed before anything runs.
- **Gmail credentials do not exist in n8n yet.** Only Google Calendar, Notion and Telegram are
  configured. A Gmail OAuth credential has to be added.
- **The template's cell layout** determines the `Fill Invoice` node's ranges. Build the template
  first, then the ranges get written to match it.
- **The 1 March 2027 legacy migration is now manual.** Filter Invoices by `Rate source = Legacy`
  to find who still needs moving. Worth a calendar reminder for January 2027.
- **`Sessions Remaining` is a formula and is not queryable over the API's SQL interface.** The
  n8n Notion node does return it as `property_sessions_remaining`, which is what today's workflow
  already relies on, so this is fine, but it cannot be verified outside n8n.
