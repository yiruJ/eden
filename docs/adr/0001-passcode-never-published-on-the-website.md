---
status: accepted
---

# The Passcode is never published on the website

The Passcode entered at the car park Keypad rings the studio, and a staff member
then releases the gate. Nobody enters unattended. We decided it travels only by
email (a bulk email to current families, and the
manual confirmation email for new enrolments) and never appears on any public
page, in any photo on that page, or in the sitemap. The parking page tells a
driver to use the passcode from their email, with the studio phone number as the
fallback.

## Considered options

- **Print the passcode on a `noindex` page.** Zero friction for the driver, and the exposure is limited since the passcode only makes a phone ring. Rejected on the owner's call: a published number is permanently cached, outlives any change the building makes, and invites nuisance buzzing during lessons.
- **Gate the page behind student login.** Maximum control, but useless to a Trial Visitor, who is exactly the person who has never driven in before.
- **Have drivers use the panel's name directory instead.** The Urmet panel does list tenants by name, so this may be viable and would remove the secret entirely. Not adopted: it rings the studio and needs someone free to answer, and staff are teaching. Worth revisiting if passcode distribution proves unreliable.

## Consequences

- The parking page is useless to anyone who did not receive the email, by design. The phone number is the only recovery path, so it must stay prominent.
- The photograph of the Keypad must not show the passcode on the keypad or display. A single careless photo undoes this decision.
- Arrivals depend on an operational step outside this repo. If the confirmation email stops carrying the passcode, the page silently stops working and nothing in the codebase will reveal it.
- If the building ever changes the passcode, every family needs a fresh email. There is no way to update it centrally, because the website never holds it.
- Every arrival costs a staff interruption, since the gate never opens without someone answering. Three spots is also three interruptions per lesson changeover.
