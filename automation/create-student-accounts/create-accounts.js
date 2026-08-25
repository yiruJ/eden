/* Eden — Bulk create remaining family Supabase accounts.
   Mode: run once, locally, from your terminal.

   Reads remaining-families.json (one row per parent email, deduped so
   siblings sharing a parent inbox get a single account) and creates a
   Supabase Auth user for each one that doesn't already exist. Accounts are
   created SILENTLY — no invite email is sent (email_confirm: true means the
   account is usable immediately with the password below).

   Who's already covered is checked against SUPABASE ITSELF (admin.listUsers),
   not against Notion — Notion's "Student UUID" column turned out not to be
   the auth uid, so it can't be trusted as the "has an account" signal.

   ==========================================================================
   BEFORE RUNNING
   ==========================================================================
   1. Set these two env vars (do NOT commit them, do NOT hardcode them here):

        export SUPABASE_URL="https://<your-project-ref>.supabase.co"
        export SUPABASE_SERVICE_ROLE_KEY="<service role key, from
          Supabase dashboard > Project Settings > API — NOT the anon key>"

      A dry run works without them (it just can't tell you who already
      exists). --apply requires them.

   2. Angellyse Tran is deliberately not in remaining-families.json — not a
      student. Alessandro Ricci is in there under giulio@pca.net.au.

   3. Run it:
        cd automation/create-student-accounts
        node create-accounts.js            # dry run — lists what it would do
        node create-accounts.js --apply    # actually creates the accounts

   Default password for every account is set in CONFIG below. This matches
   the "Demo Password" already recorded on the newer Account Profiles rows
   in Notion.

   AFTER RUNNING WITH --apply, this writes results.json in this same folder
   (one row per student, with the new auth uid). It is written incrementally,
   so a crash or network drop mid-run still leaves you with every uid created
   up to that point. Claude reads that file to update Notion.
   ========================================================================== */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const CONFIG = {
  DEFAULT_PASSWORD: '123',
  ROLE: 'family',
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const RESULTS_PATH = join(__dirname, 'results.json');
const APPLY = process.argv.includes('--apply');

function loadFamilies() {
  const raw = readFileSync(join(__dirname, 'remaining-families.json'), 'utf-8');
  return JSON.parse(raw);
}

function getAdminClient({ required }) {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    if (required) {
      console.error(
        'Missing SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY env vars.\n' +
        'Set both before running with --apply — see the comment at the top of this file.'
      );
      process.exit(1);
    }
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// Supabase pages this endpoint, so walk it to the end rather than trusting
// the first page to hold every user.
async function fetchExistingEmails(supabase) {
  const emails = new Set();
  const perPage = 200;

  for (let page = 1; ; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw new Error(`Could not list existing users: ${error.message}`);
    for (const user of data.users) {
      if (user.email) emails.add(user.email.trim().toLowerCase());
    }
    if (data.users.length < perPage) break;
  }

  return emails;
}

async function main() {
  const families = loadFamilies();
  const supabase = getAdminClient({ required: APPLY });

  let existing = null;
  if (supabase) {
    existing = await fetchExistingEmails(supabase);
    console.log(`Supabase currently has ${existing.size} accounts.`);
  } else {
    console.log('No credentials set — dry run cannot check which accounts already exist.');
  }

  console.log(`${APPLY ? 'APPLYING' : 'DRY RUN'} — ${families.length} families in the list.\n`);

  const results = { created: [], skippedExisting: [], failed: [] };
  // One row per student (not per family email), so each student's name can be
  // matched straight to their Notion page afterwards.
  const studentRecords = [];

  function recordStudents(family, userId, status, error) {
    for (const student of family.students) {
      studentRecords.push({ student, email: family.email, userId, status, ...(error && { error }) });
    }
    // Written every time so an interrupted run still leaves usable output.
    if (APPLY) writeFileSync(RESULTS_PATH, JSON.stringify(studentRecords, null, 2));
  }

  for (const family of families) {
    const email = family.email.trim().toLowerCase();
    const fullName = family.students.join(' & ');
    const alreadyExists = existing?.has(email) ?? false;

    if (!APPLY) {
      const verdict = existing === null
        ? 'would create (unverified)'
        : alreadyExists ? 'SKIP — already exists' : 'would create';
      console.log(`[dry run] ${verdict}: ${email}  (${fullName})${family.note ? '  — NOTE: ' + family.note : ''}`);
      continue;
    }

    if (alreadyExists) {
      results.skippedExisting.push(email);
      console.log(`skip (already exists): ${email}`);
      recordStudents(family, null, 'skipped_existing');
      continue;
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password: CONFIG.DEFAULT_PASSWORD,
      email_confirm: true, // no confirmation/invite email sent; account usable immediately
      user_metadata: {
        full_name: fullName,
        role: CONFIG.ROLE,
        students: family.students,
      },
    });

    if (error) {
      // Belt and braces: listUsers should have caught these, but a race or a
      // stale page would otherwise surface as a hard failure.
      if (/already been registered|already exists/i.test(error.message)) {
        results.skippedExisting.push(email);
        console.log(`skip (already exists): ${email}`);
        recordStudents(family, null, 'skipped_existing');
      } else {
        results.failed.push({ email, error: error.message });
        console.error(`FAILED: ${email} — ${error.message}`);
        recordStudents(family, null, 'failed', error.message);
      }
      continue;
    }

    results.created.push(email);
    console.log(`created: ${email}  (uid: ${data.user.id})`);
    recordStudents(family, data.user.id, 'created');
  }

  if (APPLY) {
    console.log('\n--- Summary ---');
    console.log(`Created:  ${results.created.length}`);
    console.log(`Skipped:  ${results.skippedExisting.length} (already existed)`);
    console.log(`Failed:   ${results.failed.length}`);
    if (results.failed.length) {
      console.log('\nFailures:');
      for (const f of results.failed) console.log(`  ${f.email}: ${f.error}`);
    }
    console.log(`\nWrote ${RESULTS_PATH} — Claude reads this to update Notion.`);
  } else {
    console.log(`\nDry run complete. Re-run with --apply to create the accounts.`);
  }
}

main().catch(err => {
  console.error(`\nRun aborted: ${err.message}`);
  process.exit(1);
});
