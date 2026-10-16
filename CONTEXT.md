# Eden Music Academy

The public website for a music school in Strathfield, Sydney. This glossary
covers the language the site uses for its own operations, so that wording stays
consistent across pages, emails, and admin tooling.

## Language

### Arriving at the studio

**Passcode**:
The number a driver enters on the **Keypad** to ring the studio from the car park entrance.
_Avoid_: Intercom code, PIN, access code, door code

**Keypad**:
The unit at the underground car park entrance on Clarence Street where a driver
enters the **Passcode**.
_Avoid_: Intercom panel, buzzer, callbox

**One-Way Path**:
The single route through the car park past the gate. There are no turns to get
wrong, so the **Dedicated Spots** are the first thing a driver sees.
_Avoid_: Aisle, driveway, lane

**Dedicated Spot**:
One of the three underground bays reserved for Eden families, marked by the Eden
logo on the wall above it. The yellow floor locks in these bays stay unlocked and
need no action from a driver.
_Avoid_: Eden bay, reserved space, student park

**Entrance**:
The Clarence Street car park ramp, as distinct from the **Shopfront**.
_Avoid_: Driveway, garage door

**Lift**:
The lift a family takes from the car park up to the **Shopfront**. There are two
on that level and only one is correct, so it is always identified by the photo
rather than by name.
_Avoid_: Elevator

**Shopfront**:
The Cooper Street studio address, Shop 24/48 Cooper Street, where lessons happen.
_Avoid_: Store, office

### Reaching a family

**Confirmation Email**:
The manual reply Eden sends once a trial lesson time is agreed. Carries the
**Passcode**.
_Avoid_: Booking email, welcome email

**Trial Visitor**:
A family attending a first lesson, who has never driven in before.
_Avoid_: Lead, prospect, new student

### Fortnightly finance

**Finance Fortnight**:
The 14 days from a Sunday to the second Saturday after it, identical to the teacher pay fortnight.
_Avoid_: Week, pay period, cycle

**Package**:
A prepaid block of lessons for one student, with an amount paid and a number of sessions included.
_Avoid_: Bundle, term pass

**Lesson Fee**:
The share of a **Package**'s amount paid that one lesson represents: amount paid divided by sessions included.
_Avoid_: Price, rate, lesson cost

**Ensemble Session**:
One meeting of an ensemble group, attended by some or all of its members, each on their own **Package**.
_Avoid_: Ensemble lesson, rehearsal, class

**Daily Minimum**:
The floor on a teacher's pay for one day of teaching: 1.5 times their hourly private rate.
_Avoid_: Gap pay, top-up rate, minimum shift

**Revenue Earned**:
The total **Lesson Fees** of lessons taught in a **Finance Fortnight**, regardless of when the family paid.
_Avoid_: Income, payments received, takings

## Relationships

- The **Entrance** is on Clarence Street; the **Shopfront** is on Cooper Street. They are the same building, different sides.
- A driver enters the **Passcode** on the **Keypad**, which rings the studio. Eden answers and releases the gate.
- Past the gate, the **One-Way Path** leads immediately to three **Dedicated Spots** on the right.
- From the **Dedicated Spots**, the **Lift** goes up to G, where the **Shopfront** door is immediately on the left.
- The **Passcode** reaches a family only through the **Confirmation Email** or a bulk email to current families. It is never published on the website.
- A **Package** covers many lessons; each lesson taken from it carries one **Lesson Fee**.
- Every lesson is covered by a paid **Package** before it is taught. There are no unpaid lessons, so every lesson has a **Lesson Fee**.
- An **Ensemble Session** earns one **Lesson Fee** for each member present. Absent members earn nothing for that session, even though their **Package** is not refunded.
- A teacher is paid for an **Ensemble Session** at their private rate for that duration plus $10.
- Everything a teacher earns in a day, including **Ensemble Session** pay with its $10, counts toward the **Daily Minimum**. A day of only **Ensemble Sessions** is topped up like any other.
- Teacher pay for a **Finance Fortnight** is the payslip total from payroll, which covers private lessons, trials and **Ensemble Sessions**.
- **Revenue Earned** for a **Finance Fortnight** is the sum of **Lesson Fees** for lessons taught in it. Paying for a **Package** earns nothing until its lessons are taught.

## Example dialogue

> **Dev:** "Should the parking page print the **Passcode** next to the photo of the **Keypad**?"
> **Domain expert:** "No. It only travels in the **Confirmation Email**. The page shows the route and tells them to use the passcode they were sent."
> **Dev:** "And a **Trial Visitor** who never got the email?"
> **Domain expert:** "They phone the studio from the entrance. That is the fallback, not the default."

## Flagged ambiguities

- "elevator" was used for the **Lift**. Resolved: **Lift**, matching Australian usage and the rest of the site.
- "intercom panel" and "keypad" were both used for the same unit. Resolved: **Keypad**.
- "passcode", "intercom code", and "dial 124" were all used for the same thing. Resolved: **Passcode**, following the wording used in the emails families receive.
- Whether the **Passcode** opens the gate itself or rings the studio was ambiguous through two rounds. Resolved: it rings the studio, and a staff member releases the gate. Nobody gets in unattended, which means arrivals depend on someone being free to answer.
- Whether **Ensemble Sessions** count toward the **Daily Minimum** changed twice. Resolved: they count in full, $10 included, and the minimum itself is always based on the private hourly rate.
- Weekly and fortnightly finance were each chosen and reversed during planning. Resolved: **Finance Fortnight** for profit, because teacher pay and the profit split are fortnightly. Weekly is reserved for lesson counts, if those are ever tracked. Months contain two or three **Finance Fortnights**, so monthly views compare the average per fortnight, not totals.
- Ensemble credits were raised as a possible gap in **Revenue Earned**. Resolved: a credit only changes how much the next invoice asks for. **Revenue Earned** depends only on whether a member was present at an **Ensemble Session**.
- "parking" was used to mean both the **Entrance** route and the **Dedicated Spots**. These are distinct: one is how you get in, the other is where you stop.
