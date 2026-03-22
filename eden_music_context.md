---
name: google-ads-eden-music
description: >
  Use this skill whenever the user wants help with Google Ads for Eden Music Academy.
  Triggers include: writing ad copy, keyword research, campaign structure, audience targeting,
  setting up a Google Ads campaign, improving ad performance, or any mention of "Google Ads",
  "search ads", "PPC", "ad campaign", or "paid search" in the context of the music academy.
  Always read .agents/product-marketing-context.md first — it contains full business context,
  audience profiles, objections, and conversion goals. This file extends that context with
  Google Ads-specific guidance only.
---

# Google Ads Skill — Eden Music Academy

> **Always read `.agents/product-marketing-context.md` first.** This file contains audience
> profiles, voice-of-customer language, objections, conversion goals, and psychological
> principles to apply. The sections below are Google Ads-specific extensions only.

---

## Campaign Structure

```
Campaign 1: Music Lessons — Local Search
  Ad Group 1: Piano Lessons
  Ad Group 2: Violin / Strings Lessons
  Ad Group 3: Kids Music Lessons (age 4+)
  Ad Group 4: Music Lessons Near Me / Location
```

**Naming convention:** `GOOG_Search_[Audience]_[Offer]_[Date]`
Example: `GOOG_Search_LocalParents_TrialLesson_Mar2026`

---

## Keyword Match Types

- **Exact match** `[piano lessons strathfield]` — high-intent local terms
- **Phrase match** `"music lessons for kids"` — broader reach with intent signal
- **Avoid broad match** until you have 50+ conversions of data

**Negative keywords (add from day 1):**
```
free, youtube, online only, DIY, sheet music, music theory only,
music software, music download, karaoke
```

---

## Ad Copy Framework

Apply **Problem-Agitate-Solve (PAS)** and **Before-After-Bridge (BAB)** frameworks from `paid-ads` skill.

**Key rules for Eden ads:**
- Lead with the trial lesson offer — it's the primary CTA and removes the biggest objection (commitment risk)
- Reference local suburb in at least one headline
- Mention ages 4+ when targeting parent audiences
- Use loss aversion framing: "Don't wait — spots fill up each term"

### Responsive Search Ad — Headlines (pick 8–10)

```
Book a Trial Lesson Today
Piano & Violin Lessons Ages 4+
Music School in North Strathfield
Beginner-Friendly Music Lessons
Classical Music for Young Learners
Local Music Academy — Strathfield
Expert Teachers, Personal Attention
Try Your First Lesson, No Commitment
Piano, Violin, Cello & Viola
Book Your Trial Lesson Online
Welcoming Studio for All Families
Start Your Child's Music Journey
```

### Responsive Search Ad — Descriptions (4 max)

```
Nurturing classical music education for children aged 4 and up. Piano, violin, viola and cello available. Book a trial lesson at our North Strathfield studio with no commitment required.

Small, boutique academy with experienced teachers who specialise in young beginners. Welcoming students from Strathfield, Burwood, Homebush and surrounds. Book a trial today.

Eden Music Academy offers personalised lessons tailored to each child's pace. Bilingual English and Korean environment. Serving North Strathfield and surrounding suburbs.

Give your child the gift of music from age 4. Our patient teachers make first lessons joyful, not stressful. Book a no-obligation trial lesson online today.
```

**Character limits:** Headlines ≤ 30 chars · Descriptions ≤ 90 chars. Always verify before submitting.


## Audience Targeting

**Location:** 5–8km radius from 136a Wellbank St, North Strathfield
**Include:** North Strathfield, Strathfield, Burwood, Homebush, Rhodes, Concord, Meadowbank, Ryde
**Exclude:** Suburbs >15km away

**Audience signals (for Smart Bidding / PMax):**
- Parents with children aged 4–12
- Interests: classical music, children's education, extracurricular activities
- In-market: music lessons, tutoring, after-school activities

**Ad scheduling:**
- Peak: Weekday evenings 5–9pm + weekends (parents making decisions)
- Reduce: Weekday school hours (9am–3pm Mon–Fri)

---

## Bidding Strategy

1. **Start:** Maximise Clicks (gather data, ~2 weeks)
2. **Move to:** Target CPA once you have 15–20 trial bookings tracked
3. **Target CPA guide:** If a trial converts to a student at ~$X monthly revenue, your max CPA for a trial booking is roughly 1 month's revenue / conversion rate

---

## Conversion Tracking (must set up before launch)

| Conversion | How to Track |
|------------|-------------|
| Trial lesson form submitted | Google Tag on thank-you page |
| Phone number click (mobile) | Google Ads call extension + click tracking |
| Email link click | GA4 event → imported to Google Ads |

**Pre-launch checklist:**
- [ ] Conversion tracking tested with a real submission
- [ ] Landing page loads in <3 sec on mobile
- [ ] Click-to-call working on mobile
- [ ] UTM parameters on all ad URLs
- [ ] Negative keyword list applied

---

## Landing Page Requirements

Send ad traffic to a page with:
- Trial lesson CTA above the fold
- Address visible (local trust signal)
- Phone number (click-to-call on mobile)
- Simple form: name, child age, instrument interest, contact — nothing more
- At least one parent testimonial with specific detail
- Teacher credentials / years experience

**Message match:** Ad headline should match (or closely mirror) the landing page headline. Mismatch increases bounce rate.

---

## Optimization Levers

**If CPA is too high:**
1. Check landing page conversion rate first (is the problem post-click?)
2. Tighten location targeting
3. Test new ad angles — try loss aversion ("Don't miss the early start window") vs. aspiration ("Start your child's musical journey")
4. Pause low-CTR ad groups

**If CTR is low:**
- Test new headlines — especially different first-position pinned headlines
- Add more specific local references
- Try trial lesson price in headline ("Trial Lesson from $45")

**Weekly review:** Spend vs budget pacing · CPA vs target · Top/bottom ads · Search term report (add negatives) · Ad scheduling performance

---

## Related Skills

Use these from the `marketingskills` folder for adjacent tasks:

- **`copywriting`** — rewrite landing page copy to match ad messaging
- **`page-cro`** — optimise the trial lesson landing page conversion rate
- **`ad-creative`** — generate and iterate ad headlines at scale
- **`analytics-tracking`** — set up GA4 + Google Ads conversion tracking
- **`marketing-psychology`** — apply psychological principles to ad copy angles
