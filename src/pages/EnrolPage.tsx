import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '../components/ui/Button';

const EMAILJS_SERVICE  = 'service_4hf3y5e';
const EMAILJS_TEMPLATE = 'template_f5dt26c';
const EMAILJS_PUBLIC   = 'oD-S9wI7AeqB6epnS';

const instruments = ['Piano', 'Cello', 'Viola', 'Violin'];
const programs = ['Private Studio (one-on-one)', 'Ensemble', 'Music Theory'];

const lessonDurations = ['30 minutes', '45 minutes', '60 minutes'];
const experienceLevels = ['Beginner to Grade 4', 'Grade 5 to Grade 7', 'Grade 8 and above', "I'm not sure"];

interface FormState {
  // Student
  studentName: string;
  studentAge: string;
  // Parent/Contact
  contactName: string;
  email: string;
  phone: string;
  // Lesson details
  instrument: string;
  program: string;
  duration: string;
  experience: string;

  goals: string;
  // Terms
  agreedToTerms: boolean;
}

const initialForm: FormState = {
  studentName: '',
  studentAge: '',
  contactName: '',
  email: '',
  phone: '',
  instrument: '',
  program: '',
  duration: '',
  experience: '',

  goals: '',
  agreedToTerms: false,
};

export function EnrolPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [showTerms, setShowTerms] = useState(false);

  function set(field: keyof FormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          form_title: 'New Enrolment Request',
          form_intro: 'A new student has submitted an enrolment request through the website.',
          from_name: form.contactName,
          reply_email: form.email,
          phone: form.phone || '—',
          details:
            `Student: ${form.studentName}${form.studentAge ? `, age ${form.studentAge}` : ''}\n` +
            `Experience: ${form.experience}\n\n` +
            `Instrument: ${form.instrument}\n` +
            `Program: ${form.program}\n` +
            `Lesson duration: ${form.duration}\n\n` +
            `Goals / Notes:\n${form.goals || '—'}`,
        },
        EMAILJS_PUBLIC
      );
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center space-y-5 max-w-md">
          <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto">
            <CheckIcon className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-display font-bold text-charcoal">Enrolment received!</h2>
          <p className="text-charcoal/60 leading-relaxed">
            Thank you for enrolling with Eden Music Academy. We'll be in touch within one business day to confirm your lesson time and next steps.
          </p>
          <p className="text-sm text-charcoal/40">
            A confirmation has been sent to <strong>{form.email}</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
      {/* Header */}
      <section className="pt-20 pb-12 px-6 bg-background text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
            Join Eden
          </span>
          <h1 className="text-5xl font-display font-bold text-charcoal">Enrol Now</h1>
          <p className="text-lg text-charcoal/65 font-light">
            Complete the form below and we'll be in touch to confirm your lesson time.
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="px-6 pb-10 bg-background">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-3xl overflow-hidden border border-primary/10 shadow-sm h-64">
            <iframe
              title="Eden Music Academy location"
              src="https://maps.google.com/maps?q=136a+Wellbank+St,+North+Strathfield+NSW+2137&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="text-xs text-charcoal/45 text-center mt-3">136a Wellbank St, North Strathfield</p>
        </div>
      </section>

      {/* Form */}
      <section className="py-10 px-6 pb-24 bg-white">
        <div className="max-w-2xl mx-auto">

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-3 flex-1 last:flex-none">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                  ${step >= s ? 'bg-primary text-white' : 'bg-primary/10 text-charcoal/40'}`}>
                  {s}
                </div>
                <span className={`text-xs font-semibold hidden sm:block transition-colors
                  ${step >= s ? 'text-primary' : 'text-charcoal/35'}`}>
                  {s === 1 ? 'Student Details' : s === 2 ? 'Lesson Preferences' : 'Confirm'}
                </span>
                {s < 3 && <div className={`h-px flex-1 transition-colors ${step > s ? 'bg-primary/40' : 'bg-primary/10'}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Step 1: Student Details */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-xl font-display font-bold text-charcoal mb-6">Student & Contact Details</h2>

                <Field label="Student's full name" required>
                  <input
                    type="text"
                    required
                    value={form.studentName}
                    onChange={(e) => set('studentName', e.target.value)}
                    className={inputClass}
                    placeholder="e.g. Alex Johnson"
                  />
                </Field>

                <Field label="Student's age">
                  <input
                    type="number"
                    min={3}
                    max={99}
                    value={form.studentAge}
                    onChange={(e) => set('studentAge', e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 10"
                  />
                </Field>

                <Field label="Parent / contact name" required>
                  <input
                    type="text"
                    required
                    value={form.contactName}
                    onChange={(e) => set('contactName', e.target.value)}
                    className={inputClass}
                    placeholder="Your full name"
                  />
                </Field>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Email address" required>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      className={inputClass}
                      placeholder="your@email.com"
                    />
                  </Field>
                  <Field label="Phone number">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      className={inputClass}
                      placeholder="(04) 0000 0000"
                    />
                  </Field>
                </div>

                <div className="pt-4">
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                    onClick={() => setStep(2)}
                    disabled={!form.studentName || !form.contactName || !form.email}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Lesson preferences */}
            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-xl font-display font-bold text-charcoal mb-6">Lesson Preferences</h2>

                <Field label="Instrument" required>
                  <select
                    required
                    value={form.instrument}
                    onChange={(e) => set('instrument', e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select an instrument</option>
                    {instruments.map((i) => <option key={i}>{i}</option>)}
                  </select>
                </Field>

                <Field label="Program" required>
                  <select
                    required
                    value={form.program}
                    onChange={(e) => set('program', e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select a program</option>
                    {programs.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </Field>

                <Field label="Lesson duration" required>
                  <div className="grid grid-cols-3 gap-2">
                    {lessonDurations.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => set('duration', d)}
                        className={`py-4 px-2 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer text-center
                          ${form.duration === d ? 'border-primary bg-primary text-white' : 'border-primary/15 text-charcoal/60 hover:bg-primary hover:border-primary hover:text-white'}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Experience level" required>
                  <div className="grid grid-cols-4 gap-2">
                    {experienceLevels.map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => set('experience', lvl)}
                        className={`py-4 px-2 rounded-xl border-2 text-xs font-semibold transition-all cursor-pointer text-center leading-tight
                          ${form.experience === lvl ? 'border-primary bg-primary text-white' : 'border-primary/15 text-charcoal/60 hover:bg-primary hover:border-primary hover:text-white'}`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </Field>


                <Field label="Goals or anything else we should know">
                  <textarea
                    rows={3}
                    value={form.goals}
                    onChange={(e) => set('goals', e.target.value)}
                    className={`${inputClass} resize-none`}
                    placeholder="e.g. My daughter loves Taylor Swift and wants to learn her songs..."
                  />
                </Field>

                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 rounded-lg border-2 border-primary/20 hover:border-primary/40 text-charcoal font-semibold text-sm transition-all cursor-pointer">
                    Back
                  </button>
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    className="flex-[2] justify-center"
                    onClick={() => setStep(3)}
                    disabled={!form.instrument || !form.program || !form.duration || !form.experience}
                  >
                    Review & Submit
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-display font-bold text-charcoal mb-6">Review Your Enrolment</h2>

                <div className="bg-background rounded-2xl border border-primary/10 divide-y divide-primary/8">
                  {[
                    ['Student', form.studentName + (form.studentAge ? `, age ${form.studentAge}` : '')],
                    ['Contact', form.contactName],
                    ['Email', form.email],
                    ['Phone', form.phone || '—'],
                    ['Instrument', form.instrument],
                    ['Program', form.program],
                    ['Lesson length', form.duration],
                    ['Experience', form.experience || '—'],

                    ['Goals', form.goals || '—'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex gap-4 px-5 py-3.5">
                      <span className="text-xs font-semibold text-charcoal/40 w-32 shrink-0 uppercase tracking-wider pt-0.5">{label}</span>
                      <span className="text-sm text-charcoal">{value}</span>
                    </div>
                  ))}
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={form.agreedToTerms}
                    onChange={(e) => set('agreedToTerms', e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-primary/30 text-primary focus:ring-primary cursor-pointer"
                  />
                  <span className="text-sm text-charcoal/65 leading-relaxed">
                    I agree to Eden Music Academy's{' '}
                    <button type="button" onClick={() => setShowTerms(true)} className="text-primary underline hover:text-primary/75 cursor-pointer">Terms & Conditions</button>
                    {' '}and understand that 24-hour cancellation notice is required for rescheduling lessons.
                  </span>
                </label>

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setStep(2)} className="flex-1 py-4 rounded-lg border-2 border-primary/20 hover:border-primary/40 text-charcoal font-semibold text-sm transition-all cursor-pointer">
                    Back
                  </button>
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="flex-[2] justify-center"
                    disabled={!form.agreedToTerms || sending}
                  >
                    {sending ? 'Submitting…' : 'Submit Enrolment'}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-primary/15 bg-background text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-charcoal/55 uppercase tracking-wider mb-2">
        {label}{required && <span className="text-accent ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function TermsModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-primary/10 shrink-0">
          <h2 id="terms-title" className="text-xl font-display font-bold text-charcoal">Terms & Conditions</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-charcoal/60 hover:bg-primary/20 hover:text-charcoal transition-all cursor-pointer"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-8 py-6 space-y-7 text-sm text-charcoal/75 leading-relaxed">

          <section className="space-y-3">
            <h3 className="font-display font-bold text-charcoal text-base">1. Getting Started and Payments</h3>
            <p>Payment can be made through bank transfer or cash.</p>
            <ul className="space-y-2 list-disc list-outside pl-4">
              <li><strong>Trial lesson:</strong> Before committing to lessons, new students complete a trial lesson, obligation-free. This allows your teacher to understand your musical background, learning preferences, and goals, and gives you a chance to experience our teaching style. Payment is due upon arrival.</li>
              <li><strong>Ongoing lesson fees:</strong> Lessons are paid in a package of 10 weeks or 5 weeks and the payment must be made upfront. This secures your regular time slot and helps your teacher plan a customised program for your development.</li>
              <li><strong>Renewing enrolment:</strong> To book lessons for the next package session, full payment must be made before the end of the current payment package. Early payment guarantees preferred lesson times and gives the teacher planning time.</li>
              <li>Packages are non-refundable once purchased, except in exceptional circumstances at Eden Music Academy's discretion.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-display font-bold text-charcoal text-base">2. Cancellations and Rescheduling</h3>
            <ul className="space-y-2 list-disc list-outside pl-4">
              <li><strong>How to cancel or request a make-up lesson:</strong> Contact us by phone or SMS at least 24 hours before your scheduled lesson.</li>
              <li><strong>Cancellation within 24 hours:</strong> No refund.</li>
              <li><strong>If Eden Music Academy cancels:</strong> Students can either receive a make-up lesson or a full refund for that single lesson.</li>
              <li><strong>Medical exceptions:</strong> If illness or a medical issue prevents attendance, provide a medical certificate within one week. Without documentation, the standard cancellation policy applies.</li>
              <li><strong>Make-up lessons:</strong> Rescheduling can only be made within the same term and cannot extend into the following term.</li>
              <li>If a student arrives late, the lesson ends at the originally scheduled time. Remaining lesson time is not refunded or compensated. If no student follows, the teacher may use their discretion to extend the lesson.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-display font-bold text-charcoal text-base">3. Safety and Facilities</h3>
            <ul className="space-y-2 list-disc list-outside pl-4">
              <li><strong>Before/after lesson supervision:</strong> Eden Music Academy doesn't provide supervision before or after lessons. Parents/guardians are responsible for picking up children promptly when lessons end.</li>
              <li><strong>Damage responsibility:</strong> Parents and students are liable for any damage to the studio, including instruments, furniture, and building contents.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-display font-bold text-charcoal text-base">4. Photos and Videos</h3>
            <p>With the parent's permission, we may photograph, video, or audio record lessons, performances, or recording sessions and share them on our website and social media. Parents can request in writing not to participate.</p>
          </section>

          <section className="space-y-3">
            <h3 className="font-display font-bold text-charcoal text-base">5. Discounts and Promotions</h3>
            <p>There is a maximum discount of 25% per student.</p>
            <ul className="space-y-2 list-disc list-outside pl-4">
              <li><strong>Sibling discount:</strong> Each sibling that applies for a lesson can stack a 10% discount to their final price.</li>
              <li><strong>Referral discount:</strong> The referrer will be offered a stackable 10% off discount to their final price. This discount applies only to their next billing period.</li>
              <li><strong>Piano pairing discount:</strong> Any string instrument (violin, viola, cello), if paired with piano lessons, will receive a stackable 10% discount to their final price.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-display font-bold text-charcoal text-base">Agreement and Updates</h3>
            <ul className="space-y-2 list-disc list-outside pl-4">
              <li><strong>Your agreement:</strong> By enrolling, you accept these terms and conditions. Ask us before starting if anything needs clarification.</li>
              <li><strong>Policy updates:</strong> These terms may be updated; the current version is always on our website.</li>
              <li><strong>Consistent application:</strong> All students and families follow the same policies.</li>
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-primary/10 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
