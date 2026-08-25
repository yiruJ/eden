# Bulk-create remaining family accounts

Creates a Supabase Auth account for every family in
`remaining-families.json` (26 families / 28 students), silently — no email
sent — with a shared default password of `123`.

## Quick start

```bash
cd automation/create-student-accounts
node create-accounts.js
```

That's a dry run and needs no credentials. To actually create accounts:

```bash
export SUPABASE_URL="https://<your-project-ref>.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="<service role key from Supabase dashboard>"
node create-accounts.js --apply
```

Find the service role key under **Project Settings → API → Project API keys
→ `service_role`**. It's a secret with full admin access — never commit it;
just export it in your shell for the run. Setting the vars for a dry run too
makes the preview accurate, since it can then check which accounts exist.

## How "already has an account" is decided

Against **Supabase itself** (`admin.listUsers`), not Notion. Notion's
Student profiles → `Student UUID` column is NOT the auth uid — for Lewis Min
that column holds `be0867f9…` while his actual auth uid is `ec2b20b1…` and
his Account Profiles `Student ID` is `2a296b60…`, three different values. So
that column can't be used to tell who already has a login.

The 26 families here are what's left after excluding everyone with a row in
the Notion **Account Profiles** database (15 rows), which is the real
account registry.

## Scope

Logins only. This does not create student profiles, enrolments, conversations,
or assign instrument/teacher.

## Before running

- `Amelia Fay` is flagged `status: Ended` — confirm you still want an account.
- Angellyse Tran is deliberately excluded (not a student). Alessandro Ricci is
  included under `giulio@pca.net.au`.

## After running

`--apply` writes `results.json` (one row per student with their new auth uid),
updated incrementally so an interrupted run still leaves every uid created so
far. Tell Claude when it's done and it will update Notion's Account Profiles.

`results.json` holds real names and emails, so it's gitignored — don't commit it.

Re-running is safe: existing accounts are skipped, not duplicated.
