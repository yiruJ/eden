export function PrivacyPage() {
  return (
    <main className="bg-background min-h-screen px-6 py-20">
      <div className="max-w-3xl mx-auto">

        <div className="mb-14">
          <h1 className="text-4xl lg:text-5xl font-display font-black text-charcoal leading-tight mb-4">
            Policies &amp; Terms
          </h1>
          <p className="text-charcoal/50 text-sm">
            Last updated June 2026
          </p>
          <div className="mt-6 h-px bg-primary/15" />
        </div>

        <div className="space-y-14 text-charcoal/75 leading-relaxed">

          {/* Privacy Policy */}
          <section>
            <h2 className="text-xl font-display font-bold text-charcoal mb-6">
              Privacy Policy
            </h2>
            <p className="text-sm mb-5">
              This Privacy Policy applies to Eden Music Academy's website (edenmusicacademy.com) and mobile application (Eden Music Academy). By using either, you agree to the collection and use of information as described below.
            </p>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="text-charcoal font-semibold">Information we collect:</strong>{' '}
                  Names, email addresses, student enrollment details, messages and images sent through the app, and device push notification tokens.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="text-charcoal font-semibold">How we use your information:</strong>{' '}
                  To deliver our services, facilitate communication between families and teachers, send push notifications about lessons, and maintain the safety and security of our platform.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="text-charcoal font-semibold">Monitoring of in-app communications:</strong>{' '}
                  All messages sent through the Eden Music Academy app between parents and teachers are visible to Eden Music Academy administrators. This monitoring exists to maintain a safe, professional communication environment. By using the messaging feature, all parties acknowledge and consent to the possibility that their communications may be reviewed by an administrator. Eden Music Academy will not share the contents of these communications with any third party except where required by law.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="text-charcoal font-semibold">Children's information:</strong>{' '}
                  Student information is collected solely for the purpose of managing music lessons and is managed through a parent or guardian's account. Parents and guardians may request access to, correction of, or deletion of their child's information at any time by contacting info@edenmusicacademy.com.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="text-charcoal font-semibold">Data storage:</strong>{' '}
                  Your data is stored securely using Supabase, hosted on Amazon Web Services (AWS) servers. We implement appropriate technical and organisational security measures to protect your personal information.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="text-charcoal font-semibold">Google API:</strong>{' '}
                  We use Google Calendar API to display lesson schedules. Our use of information received from Google APIs adheres to the Google API Services User Data Policy.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="text-charcoal font-semibold">Your rights:</strong>{' '}
                  Under Australia's Privacy Act 1988, you have the right to access, correct, or request deletion of your personal information. Contact us at info@edenmusicacademy.com.
                </span>
              </li>
            </ul>
          </section>

          <div className="h-px bg-primary/10" />

          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-display font-bold text-charcoal mb-6">
              1. Getting Started and Payments
            </h2>
            <p className="text-sm mb-5">
              Payment can be made through bank transfer or cash.
            </p>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="text-charcoal font-semibold">Trial lesson:</strong>{' '}
                  Before committing to lessons, new students complete a trial lesson. This allows your teacher to understand your musical background, learning preferences, and goals, and gives you a chance to experience our teaching style. Payment is due upon arrival.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="text-charcoal font-semibold">Ongoing lesson fees:</strong>{' '}
                  Lessons are paid in a package of 10 weeks or 5 weeks and the payment must be made upfront. This secures your regular time slot and helps your teacher plan a customised program for your development.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="text-charcoal font-semibold">Renewing enrolment:</strong>{' '}
                  To book lessons for the next package session, full payment must be made before the end of the current payment package. Early payment guarantees preferred lesson times and gives the teacher planning time.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  Packages are non-refundable once purchased, except in exceptional circumstances at Eden Music Academy's discretion.
                </span>
              </li>
            </ul>
          </section>

          <div className="h-px bg-primary/10" />

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-display font-bold text-charcoal mb-6">
              2. Cancellations and Rescheduling
            </h2>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="text-charcoal font-semibold">How to cancel or request a make-up lesson:</strong>{' '}
                  Contact us by phone or SMS at least 24 hours before your scheduled lesson.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="text-charcoal font-semibold">Cancellation within 24 hours:</strong>{' '}
                  No refund.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="text-charcoal font-semibold">If Eden Music Academy cancels:</strong>{' '}
                  Students can either receive a makeup lesson or a full refund for that single lesson.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="text-charcoal font-semibold">Medical exceptions:</strong>{' '}
                  If illness or a medical issue prevents attendance, provide a medical certificate within one week. Without documentation, the standard cancellation policy applies.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="text-charcoal font-semibold">Makeup lessons:</strong>{' '}
                  Rescheduling makeup lessons can only be made within the same term. They cannot extend into the following term.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  If a student arrives late, the lesson ends at the originally scheduled time. Remaining lesson time is not refunded or compensated. If no student follows, the teacher may use their discretion to extend the lesson.
                </span>
              </li>
            </ul>
          </section>

          <div className="h-px bg-primary/10" />

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-display font-bold text-charcoal mb-6">
              3. Safety and Facilities
            </h2>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="text-charcoal font-semibold">Before/after lesson supervision:</strong>{' '}
                  Eden Music Academy doesn't provide supervision before or after lessons. Parents/guardians are responsible for picking up children promptly when lessons end.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="text-charcoal font-semibold">Damage responsibility:</strong>{' '}
                  Parents and students are liable for any damage to the studio, including instruments, furniture, and building contents.
                </span>
              </li>
            </ul>
          </section>

          <div className="h-px bg-primary/10" />

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-display font-bold text-charcoal mb-6">
              4. Photos and Videos
            </h2>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="text-charcoal font-semibold">Recording and sharing:</strong>{' '}
                  With the parent's permission, we may photograph, video, or audio record lessons, performances, or recording sessions and share them on our website and social media. Parents can request in writing not to participate.
                </span>
              </li>
            </ul>
          </section>


          <div className="h-px bg-primary/10" />

          {/* Agreement */}
          <section>
            <h2 className="text-xl font-display font-bold text-charcoal mb-6">
              Agreement and Updates
            </h2>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="text-charcoal font-semibold">Your agreement:</strong>{' '}
                  By enrolling, you accept these terms and conditions. Ask us before starting if anything needs clarification.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="text-charcoal font-semibold">Policy updates:</strong>{' '}
                  These terms may be updated; the current version is always on our website.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="text-charcoal font-semibold">Consistent application:</strong>{' '}
                  All students and families follow the same policies.
                </span>
              </li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
