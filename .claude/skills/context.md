# Eden Music Academy — Project Context & Lessons Learned

---

## Google Ads

### Conversion Tracking
- Google Ads tag: `AW-18033582805` — live in `index.html`
- Conversion event fires on `/thank-you` page via `ThankYouPage.tsx`
- Conversion ID: `AW-18033582805/efejCK3R7I0cENXFipdD`

---

### ⚠️ GOOGLE ADS CAMPAIGN CHECKLIST
**Go through every single item below when creating or reviewing any Google Ads campaign for Eden.**

---

#### 1. ❌ NEVER use Performance Max
**What Google does:** Defaults to PMax and labels it "Recommended" on campaign creation.
**Why it's bad:** PMax needs 30–50 conversions/month for its AI to optimise. Eden is a small local business — PMax had nothing to learn from and burned significant budget with 0 conversions.
**Always use instead:** Search campaign → Goal: Leads → Bidding: Maximise Conversions → Landing page: `edenmusicacademy.com/enrol`

---

#### 2. ❌ Uncheck Search Partners & Display Network
**What Google does:** Pre-ticks "Include Google search partners" and "Display Network" on all Search campaigns.
**Why it's bad:** Your search ad shows on random third-party sites with much lower intent and conversion rates.
**Fix:** Uncheck both — run on Google Search only.

---

#### 3. ❌ Never use Broad Match keywords
**What Google does:** Defaults all new keywords to broad match.
**Why it's bad:** "piano lessons sydney" broad match can trigger for "free music videos" or "piano for sale" — completely irrelevant clicks.
**Fix:** Always use phrase match `"like this"` or exact match `[like this]` only.

---

#### 4. ❌ Turn off Auto-Applied Recommendations
**What Google does:** Automatically applies changes to your campaign — adding keywords, changing bids, expanding targeting — without asking.
**Why it's bad:** Google optimises for spend, not your conversions.
**Fix:** Go to Recommendations → Auto-apply settings → Turn ALL off.

---

#### 5. ⚠️ Watch bidding strategy doesn't switch
**What Google does:** If a target CPA can't be hit, Google quietly switches to Maximise Clicks instead.
**Why it's bad:** Maximise Clicks just burns through budget as fast as possible with no focus on conversions.
**Fix:** Check your bidding strategy hasn't changed week to week.

---

#### 6. ❌ Change ad rotation to "Do not optimise"
**What Google does:** Defaults to "Optimised" ad rotation — shows whichever ad it prefers.
**Why it's bad:** Prevents you from properly testing which ad copy actually converts.
**Fix:** Set ad rotation to "Do not optimise" so all ads get equal exposure.

---

#### 7. ❌ Change location targeting to "Presence only"
**What Google does:** Defaults location targeting to "Presence or interest" — shows ads to people interested in your location, not just people in it.
**Why it's bad:** Your North Strathfield ad could show to someone in Melbourne just researching Sydney suburbs.
**Fix:** Set to "Presence: People in or regularly in your targeted locations." Use 15–20km radius around North Strathfield.

---

#### 8. ❌ Add negative keywords before launch
**What Google does:** Nothing — you have to add these manually.
**Why it's bad:** Without negatives, ads show for "free piano lessons," "piano for sale," "music teacher jobs," "piano repair," etc. You pay for useless clicks.
**Always add these negatives:**
- free, cheap, discount
- jobs, hiring, career, volunteer
- buy, used, second hand, for sale
- repair, tuning, maintenance
- DIY, how to, tutorial, YouTube
- sheets, notes, tabs (people looking for sheet music, not lessons)

---

#### 9. ❌ Don't add Lead Form extensions
**What Google does:** Suggests adding a Lead Form asset directly on the ad.
**Why it's bad:** Captures enquiries on Google — bypasses your website and conversion tracking on `/thank-you` entirely.
**Fix:** Never add lead form extensions. All clicks must go to `edenmusicacademy.com/enrol`.

---

#### 10. ❌ Decline Dynamic Search Ads (DSA)
**What Google does:** Suggests auto-generating ads from your website content.
**Why it's bad:** You lose all control over messaging — Google writes whatever it wants.
**Fix:** Decline DSA suggestions. Always write your own ads.

---

#### 11. ❌ Avoid Enhanced CPC (eCPC)
**What Google does:** Offers eCPC as a bidding option that auto-raises bids "when a conversion seems likely."
**Why it's bad:** Increases spend with no proven benefit for low-volume local accounts like Eden.
**Fix:** Stick to Maximise Conversions with a hard daily budget cap.

---

#### 12. ⚠️ Set ad scheduling — don't run 24/7
**What Google does:** Runs ads 24 hours a day, 7 days a week by default.
**Why it's bad:** Enquiries at 2–3am are useless for a music academy. Wasted spend.
**Fix:** Limit ads to 7am–9pm daily.

---

#### 13. ⚠️ Daily budget can be spent at 2x
**What Google does:** Google can legally spend up to 2x your daily budget on a single day (averages out monthly).
**Why it matters:** Can be shocking if you're checking day-by-day.
**Fix:** Set daily budget lower than you think. If target is ~$300/month, set $8/day not $10/day.

---

### Recommended Search Campaign Settings for Eden
- **Campaign type:** Search
- **Goal:** Leads
- **Bidding:** Maximise Conversions
- **Daily budget:** ~$8–10/day to start
- **Location:** 15–20km radius around North Strathfield, Sydney — Presence only
- **Language:** English
- **Ad schedule:** 7am–9pm daily
- **Networks:** Google Search only (uncheck partners + display)
- **Keywords (phrase match):**
  - "piano lessons sydney"
  - "violin lessons sydney"
  - "music lessons for kids sydney"
  - "piano lessons north strathfield"
  - "music school inner west"
  - "cello lessons sydney"
  - "viola lessons sydney"
  - "music lessons near me"
- **Landing page:** `https://edenmusicacademy.com/enrol`
