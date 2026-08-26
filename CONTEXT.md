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

## Relationships

- The **Entrance** is on Clarence Street; the **Shopfront** is on Cooper Street. They are the same building, different sides.
- A driver enters the **Passcode** on the **Keypad**, which rings the studio. Eden answers and releases the gate.
- Past the gate, the **One-Way Path** leads immediately to three **Dedicated Spots** on the right.
- From the **Dedicated Spots**, the **Lift** goes up to G, where the **Shopfront** door is immediately on the left.
- The **Passcode** reaches a family only through the **Confirmation Email** or a bulk email to current families. It is never published on the website.

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
- "parking" was used to mean both the **Entrance** route and the **Dedicated Spots**. These are distinct: one is how you get in, the other is where you stop.
