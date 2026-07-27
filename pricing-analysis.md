# Eden Music Academy: Financial Report & Pricing Change Analysis

**Prepared:** 25 July 2026
**Data period:** 3 Feb 2026 to 24 Jul 2026 (24.4 weeks)
**Source:** Private Lesson Packages (61 records), Student profiles (42 records)
**Scope:** Private lessons only. Ensemble and Music Theory are not included.

---

## 1. Where the business stands today

| Metric | Value |
|---|---:|
| Gross revenue booked | **$27,052.50** |
| Teacher cost | $16,638.70 |
| **Gross profit** | **$10,413.80** |
| Gross margin | **38.5%** |
| Sessions sold | 599 |
| Avg revenue per session | $45.16 |
| Avg teacher cost per session | $27.78 |
| **Avg profit per session** | **$17.39** |

Over 24.4 weeks that is roughly **$1,109/week revenue** and **$427/week gross profit** from packages sold in the window.

### Current active roster (weekly run-rate)

38 active private-lesson students: 26 at 30 min, 9 at 45 min, 3 at 60 min.

| | Weekly |
|---|---:|
| Revenue | $1,780.68 |
| Teacher cost | $1,116.89 |
| **Gross profit** | **$663.79** |
| Margin | 37.3% |

Note this is gross profit only. Rent, insurance, software, and your own time are not in these numbers.

### Per-student economics

| Metric | Value |
|---|---:|
| Paying students (lifetime) | 40 |
| Avg lifetime revenue per student | $676.31 |
| Avg lifetime gross profit per student | $260.34 |
| Avg packages per student | 1.52 |
| **Renewal rate** | **87%** (20 of 23) |

### On the renewal rate

A raw count of "students with more than one package" gives 50%, but that number is wrong, because **17 of the 40 students have not finished their first package yet.** They cannot have renewed. Including them in the denominator counts new customers as if they had churned.

Measured against the 23 students who have actually finished a package and faced a renewal decision:

| Outcome | Count | Share |
|---|---:|---:|
| Bought another package | 20 | **87%** |
| Did not | 3 | 13% |

The three non-renewals are Amelia Fay (status: Ended), Eunwoo Kim (status: Ended), and Julia Yun (status: Active, so may still return).

**An 87% renewal rate is excellent** and materially changes the risk assessment for the price increase. Families who experience the teaching overwhelmingly stay. That is exactly the profile of a business that can raise prices.

---

## 2. Five things you should know as the owner

### 2.1 Discounts are not recorded anywhere in your system

I checked the Private Lesson Packages database, the Student profiles database (live schema, not just the export), and the Notes fields. **There is no discount field.** Only 2 of 61 packages have any note at all, and neither mentions a discount.

Discounts are being applied mentally at payment time and leave no trace. The only way to detect one is to reverse-engineer it from the amount paid, which is what I had to do below.

**Consequence:** you cannot audit discounts, cannot see who is on what rate, and cannot tell whether the 20% stacking cap on your pricing page is actually being respected. When you migrate to new pricing this becomes a real problem, because you will not know which families were promised what.

**Recommended fix:** add `Discount type` (multi-select) and `Discount %` or `Discount $` to the Private Lesson Packages database before the price change goes live.

### 2.2 You are leaking 11.3% against list price

| | Amount |
|---|---:|
| Revenue at full list price | $30,515.00 |
| Revenue actually collected | $27,052.50 |
| **Leakage** | **$3,462.50 (11.3%)** |

Some of that is the intended 10-week package discount. But **$652.50** is discounting *below* even the 10-week package rate, across 21 of 61 packages (34%).

Inferred discount patterns:

| Pattern | Packages | Reading |
|---|---:|---|
| 10% off (sibling families: Yun, Policarpio, Argun, Kim) | 11 | Matches your published sibling discount |
| 11.2% off (Argun family) | 3 | Slightly over the 10% sibling rate |
| 5% off (Elina Cho, Jane Park) | 2 | Matches piano pairing or referral |
| Non-standard | 5 | See 2.5 |

The sibling discount is working as designed. The concern is that it is invisible and unverifiable.

### 2.3 Your 60-minute lessons barely make money

| Duration | Students | Realised rate | Teacher cost | Profit/lesson | Margin |
|---|---:|---:|---:|---:|---:|
| 30 min | 26 | $38.66 | $24.35 | $14.30 | 37.0% |
| 45 min | 9 | $60.66 | $34.57 | $26.08 | 43.0% |
| **60 min** | **3** | **$76.56** | **$57.50** | **$19.06** | **24.9%** |

A 60-minute lesson earns you *less profit* than a 45-minute lesson while occupying a third more studio time. Two of Ivy Kim's packages run at a **20% margin**: $75 collected, $60 to the teacher, $15 to the business.

Your new pricing fixes this. It is the strongest argument for the change.

### 2.4 Margin varies enormously by teacher

| Teacher | Students | Sessions | Revenue | Teacher cost | Profit | Margin |
|---|---:|---:|---:|---:|---:|---:|
| Dylan Lee | 13 | 212 | $9,800 | $4,319 | $5,481 | **55.9%** |
| Aurelia Bergin | 4 | 37 | $2,250 | $1,492 | $758 | 33.7% |
| Elijah Lee | 16 | 255 | $10,958 | $7,752 | $3,206 | 29.3% |
| Rachel Jeong | 7 | 95 | $4,045 | $3,075 | $970 | **24.0%** |

Dylan generates **$5,481 profit from 212 sessions**. Elijah generates **$3,206 from 255 sessions**, more work for less profit.

**The reason is what you pay them, not what they charge.** Revenue per session is nearly identical ($46.23 Dylan, $42.97 Elijah). The gap is entirely on the cost side:

| Duration | Dylan | Elijah | Rachel | Aurelia |
|---|---:|---:|---:|---:|
| 30 min | **$16.39** | $27.51 | $30.00 | $27.50 |
| 45 min | **$29.61** | $38.40 | $45.00 | $42.00 |
| 60 min | n/a | $60.00 | n/a | $55.00 |

Dylan costs **$16.39 per 30-minute lesson. Elijah costs $27.51 for the same lesson**, 68% more. Rachel costs $30.00, 83% more.

Profit per session tells the whole story: **Dylan $25.85, Elijah $12.57.** Dylan earns you more than double per lesson taught.

A secondary factor is lesson mix. 34% of Dylan's sessions are 45-minute (higher margin), versus 10% for Elijah, who also carries all the low-margin 60-minute students.

Rachel's 30-minute rate is $30.00 against a $38.66 realised price, leaving **$8.66 per lesson** before any studio costs.

This is not a comment on teaching quality. It is a pay-structure issue. The new pricing raises every one of these margins, but the underlying spread between teacher rates stays, and is worth addressing separately.

### 2.5 Four records need checking

| Package | Recorded | Issue |
|---|---|---|
| Helena Han pkg 1 | 30 min x 5 = $300 ($60/session) | $60 for a 30-min lesson is above even the new price. Duration or amount likely wrong. |
| Fiona Zhang pkg 1 | 60 min x 2 = $200 ($100/session) | 25% *above* list. Possibly an ad-hoc casual rate already being charged. |
| Elyn Xie pkg 1 | 45 min x 12 = $730 | 12 sessions fits no package size. |
| Hayley Chow pkg 1, pkg 2 | 30 min x 20 | 20 sessions, likely two packages merged into one record. |

Fiona Zhang is worth noting: someone already paid **$100/session** for a 2-lesson block without complaint. That is real evidence your casual rate will be accepted.

---

## 3. The new pricing

### Proposed structure

| Duration | Casual (1 to 4 wks) | 5-week | 10-week | 10-wk discount |
|---|---:|---:|---:|---:|
| 30 min | $70.00 | $55.00 | $50.00 | $50 off |
| 45 min | $97.50 | $82.50 | $72.50 | $100 off |
| 60 min | $125.00 | $110.00 | $95.00 | $150 off |

Base rates scale cleanly at $55 per 30-minute unit (1x / 1.5x / 2x), which the old $45/$65/$80 grid did not.

### Impact on the current 38-student roster

| Scenario | Weekly revenue | Weekly profit | Margin | Change vs today |
|---|---:|---:|---:|---:|
| Today (realised) | $1,780.68 | $663.79 | 37.3% | baseline |
| **New 10-week** | $2,237.50 | **$1,120.61** | **50.1%** | **+$456.82/wk (+25.7%)** |
| **New 5-week** | $2,502.50 | **$1,385.61** | **55.4%** | **+$721.82/wk (+40.5%)** |
| New casual | $3,072.50 | $1,955.61 | 63.6% | +$1,291.82/wk (+72.5%) |

**Teacher cost does not change.** Every dollar of the increase flows straight to gross profit.

### Annualised (48 teaching weeks)

| Scenario | Extra revenue | Extra gross profit |
|---|---:|---:|
| All on 10-week | **+$21,927/yr** | **+$21,927/yr** |
| All on 5-week | **+$34,647/yr** | **+$34,647/yr** |

Realistically you land between these, so budget **$22k to $30k/yr** of additional gross profit.

### Margin per lesson, before and after

| Duration | Teacher cost | Now | New 10-wk | New 5-wk |
|---|---:|---:|---:|---:|
| 30 min | $24.35 | $14.30 (37.0%) | $25.65 (**51.3%**) | $30.65 (55.7%) |
| 45 min | $34.57 | $26.08 (43.0%) | $37.93 (**52.3%**) | $47.93 (58.1%) |
| 60 min | $57.50 | $19.06 (24.9%) | $37.50 (**39.5%**) | $52.50 (47.7%) |

The 60-minute margin nearly doubles. That is the biggest structural win in this change.

---

## 4. The risk: this is a large increase for existing families

| Duration | Pays now | New 10-wk | Increase | New 5-wk | Increase |
|---|---:|---:|---:|---:|---:|
| 30 min | $38.66 | $50.00 | **+29.3%** | $55.00 | +42.3% |
| 45 min | $60.66 | $72.50 | **+19.5%** | $82.50 | +36.0% |
| 60 min | $76.56 | $95.00 | **+24.1%** | $110.00 | +43.7% |

A 30-minute family currently on the sibling rate goes from **$360 to $500** for a 10-week package. That is a $140 jump, and they will feel it.

### How much churn can you absorb?

**Yes. You could lose 15 of your 38 students and still make the same weekly profit you make today.**

Today: 38 students, $663.79/week gross profit.

On the new 10-week rates:

| Students lost | Students left | Weekly revenue | Weekly profit | vs today |
|---:|---:|---:|---:|---:|
| 0 | 38 | $2,237.50 | $1,120.61 | +$456.82 |
| 3 | 35 | $2,060.86 | $1,032.14 | +$368.35 |
| 6 | 32 | $1,884.21 | $943.67 | +$279.88 |
| 10 | 28 | $1,648.68 | $825.71 | +$161.92 |
| **15** | **23** | **$1,354.28** | **$678.26** | **+$14.47 (break-even)** |
| 16 | 22 | $1,295.39 | $648.77 | **-$15.02 (worse)** |

The break-even point is **15 students lost, 41% of your roster**. At 16 you are worse off than today.

Worth noting: at break-even you would be earning the same profit from **23 students instead of 38**, which is 15 fewer lessons to teach and 15 fewer slots to schedule. Same money, materially less work.

### How much churn should you actually expect?

**There is no reliable industry statistic for this.** I looked for one. What exists is vendor marketing, and it contradicts itself.

| Source | Claim | Assessment |
|---|---|---|
| Opus1 | Schools lose 8 to 10% of students **per month** | Unsourced. Page claims "what the data actually shows" but cites no study, sample, or method. |
| WellnessLiving | ~75% annual retention benchmark | Vendor blog, unsourced |
| DANSR | Raise rates on existing students every 18 to 24 months | Practitioner guidance, no churn data |
| Outside the Bachs | One teacher raised rates 40%, lost zero students | Single anecdote in vendor marketing |
| Ayrshire Post (2018) | ~25% of pupils quit when fees were introduced | Real reporting, but **free to paid**, not a price rise |

Two reasons to discount the industry figures:

1. **They are mutually incompatible.** 8% monthly churn compounds to roughly 63% annually. "75% retention" implies 25% annually. These differ by 2.5x. Both are widely cited. Neither is measurement.
2. **Opus1's own stated causes of churn do not include price.** They list "life gets in the way" and "students stop enjoying it." If price were a leading driver of music-lesson churn, the retention vendors would say so.

The only directly relevant real-world case is Ayrshire at ~25%, and that was families going from **free to paid**, which crosses a psychological threshold that a $45 to $55 increase does not. Even so, 25% sits below your 41% break-even.

### What to rely on instead

**Your own 87% renewal rate.** It is measured, current, and specific to your families. No published benchmark is more predictive of Eden's outcome than Eden's own behaviour.

The honest framing is not "we expect to lose N students." It is:

> We do not know the churn rate, and nobody credibly does. What we know is that we can lose 15 of 38 students before this decision costs us money, that our measured renewal rate is 87%, and that the worst documented comparable case (a free-to-paid conversion, far more severe than ours) produced 25% attrition.

The decision does not require predicting churn. It requires noting that the break-even is far enough out that plausible outcomes do not reach it.

**Track it rather than forecast it.** Record every non-renewal for two package cycles after launch, with the stated reason. After roughly 20 renewal decisions you will have a real Eden-specific number, which is worth more than any benchmark.

---

## 5. Recommendations

### Do before launch

1. **Add discount tracking to Notion.** `Discount type` and `Discount %` fields on Private Lesson Packages. Without this you cannot manage the transition.
2. **Resolve the four anomalous records** in section 2.5.
3. **Decide the grandfathering policy.** Existing families at 3 months' notice, or straight to new rates at next renewal? This is the single biggest lever on churn.
4. **Review Rachel and Elijah's pay rates.** At 24% and 29% margin they are structurally unprofitable relative to Dylan at 56%.

### Consider

5. **Migrate 60-minute students first.** Only 3 students, worst margin, biggest gain.
6. **Lead with the renewal rate in your messaging.** 87% of families who complete a package buy another. That is a genuine proof point, and it is the reason this increase is low-risk.

The 5-week tier deliberately carries no discount. It reads as the discount off the casual rate ($15/lesson cheaper), which gives a clean three-step ladder: casual, 5-week, 10-week.

### Watch

8. **Acquisition mix:** Google Ads 13, Korean Marketplace 11, word of mouth 8, blank 5. Korean Marketplace delivering nearly as much as paid search is worth knowing. Five blanks means the intake form is not always being completed.

---

## Assumptions and limitations

- Lesson duration comes from the student profile, not per-lesson records. A student who changed duration mid-package is attributed to their current duration.
- Teacher cost is `Expected Total Teacher(s) Pay`, taken at face value.
- Gross profit only. No rent, insurance, software, admin, or owner's time.
- 48 teaching weeks per year assumed for annualisation.
- Weekly run-rate assumes every active student takes a lesson every week.
- Ensemble and Music Theory excluded.
- Discount attribution in section 2.2 is inferred from amounts paid, since no discount field exists.
- Renewal rate is measured only against students who have exhausted at least one package. Students still working through their first package are excluded, since they have not yet had a renewal decision to make.
- Churn modelling assumes students are lost evenly across durations. Losing 30-minute students specifically would move break-even slightly higher, losing 60-minute students slightly lower.
- **No churn forecast is offered.** An earlier draft of this document cited "5 to 15% realistic churn." That figure had no source and has been removed. See section 4 for what the available evidence does and does not support.

## Sources

- [Opus1: Music School Student Retention](https://opus1.io/resources/music-school-student-retention-how-to-stop-losing-8-10-of-your-students-every-month/)
- [WellnessLiving: 6 Customer Retention Strategies for your Music School](https://www.wellnessliving.com/blog/6-customer-retention-strategies-for-your-music-school/)
- [DANSR: How to Confidently Structure Tuition for Private Music Lessons](https://www.dansr.com/resources/how-to-confidently-structure-tuition-for-private-music-lessons)
- [Outside the Bachs: Flat Rate Tuition Case Studies](https://www.outsidethebachs.com/blog-case-studies/the-many-advantages-of-utilizing-a-flat-rate-tuition-policy-for-private-music-studios)
- [Ayrshire Post: Hundreds of kids quit music lessons](https://www.pressreader.com/uk/ayrshire-post/20180627/282089162505775)
- [Recurly: Churn Rate Benchmarks by Industry](https://recurly.com/research/churn-rate-benchmarks/)
