# Workflow 1 — node-by-node config

`Eden-Package-Renewal-Invoicing`. Everything from node 12 onward. Nodes 1 to 11 are unchanged
from the existing workflow.

## IDs

| Constant | Value | Status |
|---|---|---|
| `DRIVE_ROOT_FOLDER_ID` | `1qVkvLuyTp_2JL7nQ-R7TOArXRs6aJ9js` | confirmed |
| `TEMPLATE_SHEET_ID` | `1ycPCSI-PQ11hmFnIERtbWMWAHCgycGn0` | **changes if you convert from .xlsx** |
| `INVOICE_TAB_GID` | `487105779` | confirmed |
| Notion Invoices DB | `55839ebfe6c54182ad435760a0d29aef` | confirmed |

The folder URL was `/u/6/`, so it lives in the **seventh signed-in Google account**. Every Google
credential in this workflow (Drive, Sheets, Gmail) must be authorised against that same account or
the copy step returns 404.

**Sheet gids survive a file copy.** Every copy of the template keeps `487105779` for its Invoice
tab, so the export URL can hardcode it.

---

## Node 12 — `getExistingInvoices`

Notion → Database Page → Get Many.

| Setting | Value |
|---|---|
| Database | Invoices |
| Return All | on |
| Simplify | on |
| Filter | none |
| **Settings → Execute Once** | **ON** |

Execute Once matters. Without it this runs once per lesson item and hammers the API for the same
rows. `Build Renewals` reads it with `.all()` and only needs one copy.

Used for two things: the dedup set of already-invoiced packages, and `max(Invoice No.) + 1`.

---

## Node 13 — `Build Renewals`

Code, **Run Once for All Items**. Source in [build-renewals.js](build-renewals.js).

Replaces the old `Code in JavaScript1`. Emits one item per invoice, each carrying `folderName`,
`fileName` and `dataBlock`.

---

## Node 14 — `Find Student Folder`

Google Drive → File/Folder → Search.

| Setting | Value |
|---|---|
| Search Method | Advanced (query string) |
| Query String | see below |
| Return All | on |

```
mimeType = 'application/vnd.google-apps.folder' and name = '{{ $json.folderName }}' and '1qVkvLuyTp_2JL7nQ-R7TOArXRs6aJ9js' in parents and trashed = false
```

**Settings → Always Output Data: ON.** Without it, a student with no folder yet produces zero
items and the branch dies silently instead of reaching the create step.

---

## Node 15 — `Folder Exists?`

If node.

| Condition | Value |
|---|---|
| `{{ $json.id }}` | is not empty |

- **true** → node 17 `Copy Template`
- **false** → node 16 `Create Folder`

---

## Node 16 — `Create Folder`

Google Drive → Folder → Create. Wire its output into node 17.

| Setting | Value |
|---|---|
| Folder Name | `{{ $('Build Renewals').item.json.folderName }}` |
| Parent Folder | `1qVkvLuyTp_2JL7nQ-R7TOArXRs6aJ9js` |

---

## Node 17 — `Copy Template`

Google Drive → File → Copy. Both branches from node 15 feed in here.

| Setting | Value |
|---|---|
| File | By ID → `1ycPCSI-PQ11hmFnIERtbWMWAHCgycGn0` |
| New Name | `{{ $('Build Renewals').item.json.fileName }}` |
| Parent Folder | `{{ $json.id }}` |

`$json.id` is the folder id, arriving from whichever of node 15's branches ran.

Produces `INV-0042 - Taylor Tan - 14 Aug 2026` inside `Student Invoices/Taylor Tan/`.

---

## Node 18 — `Fill Invoice`

HTTP Request. The Sheets node writes rows matched on a key column, which does not fit a
form-shaped sheet, so this calls the API directly and writes the whole block in one go.

| Setting | Value |
|---|---|
| Method | `PUT` |
| URL | `https://sheets.googleapis.com/v4/spreadsheets/{{ $json.id }}/values/Data!B2:B14` |
| Authentication | Predefined → Google Sheets OAuth2 |
| Send Query Parameters | on: `valueInputOption` = `RAW` |
| Send Body | on, JSON |

Body:

```json
{
  "range": "Data!B2:B14",
  "majorDimension": "ROWS",
  "values": {{ JSON.stringify($('Build Renewals').item.json.dataBlock) }}
}
```

`dataBlock` is already shaped as 13 single-value rows in the exact order of the template's
`Data` tab. Nothing else needs to know the layout.

---

## Node 19 — `Export PDF`

HTTP Request. Google's export endpoint, not the Drive download endpoint, because only this one
takes print parameters.

| Setting | Value |
|---|---|
| Method | `GET` |
| URL | see below |
| Authentication | Predefined → Google Drive OAuth2 |
| **Response → Format** | **File** |
| Response → Binary Property | `data` |

```
https://docs.google.com/spreadsheets/d/{{ $('Copy Template').item.json.id }}/export?format=pdf&gid=487105779&portrait=true&fitw=true&size=A4&gridlines=false&printtitle=false&sheetnames=false&pagenum=UNDEFINED&fzr=false&top_margin=0.60&bottom_margin=0.60&left_margin=0.50&right_margin=0.50
```

`gid=487105779` pins it to the Invoice tab, so the `Data` fill map never appears in the PDF.
`fitw=true` is what stops a slightly-too-wide sheet becoming two pages.

**Guard.** Add an If after this: if the binary is missing or under ~5KB, route to the Telegram
alert instead of continuing. A payment request must never go out without its invoice attached.

---

## Node 20 — `Create Invoice Row`

Notion → Database Page → Create.

| Property | Value |
|---|---|
| Invoice (title) | `{{ $('Build Renewals').item.json.title }}` |
| Invoice No. | `{{ $('Build Renewals').item.json.invoiceNo }}` |
| Student | `{{ $('Build Renewals').item.json.studentId }}` |
| Source Package | `{{ $('Build Renewals').item.json.sourcePackageId }}` |
| Parent email | `{{ $('Build Renewals').item.json.parentEmail }}` |
| Sessions | `{{ $('Build Renewals').item.json.sessions }}` |
| Duration | `{{ $('Build Renewals').item.json.durationCode }}` |
| Rate per lesson | `{{ $('Build Renewals').item.json.ratePerLesson }}` |
| Amount | `{{ $('Build Renewals').item.json.amount }}` |
| Rate source | `{{ $('Build Renewals').item.json.rateSource }}` |
| Issued | `{{ $('Build Renewals').item.json.issued }}` |
| Due | `{{ $('Build Renewals').item.json.due }}` |
| Status | `Draft` |
| Invoice Sheet | `https://docs.google.com/spreadsheets/d/{{ $('Copy Template').item.json.id }}/edit` |
| Flags | `{{ $('Build Renewals').item.json.flags }}` |

`Invoice PDF` is left blank. The PDF lives inside the copied sheet rather than as a separate
Drive file, so the sheet link is the durable reference.

---

## Node 21 — `Group By Parent`

Code, **Run Once for All Items**. Source in [group-by-parent.js](group-by-parent.js).

Collapses siblings onto one email, carrying one PDF attachment per child.

---

## Node 22 — `Draft or Send`

Gmail.

| Setting | Value |
|---|---|
| Resource | `Draft` while reviewing, `Message` once live |
| Operation | `Create` / `Send` |
| To | `{{ $json.to }}` |
| Subject | `{{ $json.subject }}` |
| Email Type | Text |
| Message | `{{ $json.body }}` |
| Attachments | on, Attachment Field Names: `{{ $json.attachmentFields }}` |

Switching from draft to auto-send is this node's Resource plus `REVIEW_MODE` in
[build-renewals.js](build-renewals.js). Change both together.

---

## Node 23 — `Mark Sent`

Notion → Database Page → Update. One per invoice, so it runs off node 20's output, not node 22's.

| Property | Value |
|---|---|
| Page ID | `{{ $json.id }}` |
| Status | `Sent` |
| Email sent | `{{ $now.setZone('Australia/Sydney').toISO() }}` |

While `REVIEW_MODE` is on this is arguably premature, since a draft is not a sent email. Either
leave it out until you go live, or accept that `Sent` means "draft created".

---

## Node 24 — `Telegram Summary`

Code + Telegram. Reports how many drafts are waiting and lists anything in `Flags`.

---

## Wiring

```
… getLessonPkgs
      │
      ▼
 getExistingInvoices ──► Build Renewals ──► Find Student Folder ──► Folder Exists?
                                                                      │       │
                                                          (true)      │       │  (false)
                                                                      │       ▼
                                                                      │  Create Folder
                                                                      │       │
                                                                      ▼       ▼
                                                                    Copy Template
                                                                          │
                                                                          ▼
                                                                    Fill Invoice
                                                                          │
                                                                          ▼
                                                                     Export PDF ──► (guard)
                                                                          │
                                                                          ▼
                                                                  Create Invoice Row
                                                                          │
                                                            ┌─────────────┴─────────────┐
                                                            ▼                           ▼
                                                     Group By Parent              Mark Sent
                                                            │
                                                            ▼
                                                     Draft or Send
                                                            │
                                                            ▼
                                                    Telegram Summary
```

---

## Build order

1. Nodes 12 and 13 only. Run it. Confirm `Build Renewals` emits the students you expect at the
   right prices, and nothing else.
2. Add 14 to 17. Run it. Confirm folders and named copies appear in Drive.
3. Add 18. Run it. Open a copy and check the Invoice tab rendered.
4. Add 19. Run it. Open the PDF, confirm one page and no `Data` tab.
5. Add 20. Check the Notion rows.
6. Add 21 and 22 with Resource `Draft`. Check the drafts before sending any.
7. Add 23 and 24.

Do not connect Gmail until step 6, and leave it on `Draft` for the first month.
