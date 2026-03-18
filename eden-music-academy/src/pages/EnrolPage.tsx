import { useState } from 'react';
import { Button } from '../components/ui/Button';

const instruments = [
  'Piano & Keyboard',
  'Guitar',
  'Ukulele',
  'Vocals',
  'Songwriting',
  'Drums & Percussion',
  'Violin',
  'Flute',
  'Clarinet',
  'Saxophone',
];

const lessonDurations = ['30 minutes', '60 minutes'];
const preferredDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const preferredTimes = ['Morning (9am–12pm)', 'Afternoon (12pm–4pm)', 'Evening (4pm–7pm)'];
const experienceLevels = ['Complete beginner', 'Some experience', 'Intermediate', 'Advanced'];

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
  duration: string;
  experience: string;
  preferredDay: string;
  preferredTime: string;
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
  duration: '',
  experience: '',
  preferredDay: '',
  preferredTime: '',
  goals: '',
  agreedToTerms: false,
};

export function EnrolPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function set(field: keyof FormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Wire to your form backend (Formspree, Resend, etc.)
    setSubmitted(true);
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

                <Field label="Lesson duration" required>
                  <div className="grid grid-cols-2 gap-3">
                    {lessonDurations.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => set('duration', d)}
                        className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer text-left
                          ${form.duration === d ? 'border-primary bg-primary/8 text-primary' : 'border-primary/15 text-charcoal/60 hover:border-primary/30'}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Experience level">
                  <div className="grid grid-cols-2 gap-3">
                    {experienceLevels.map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => set('experience', lvl)}
                        className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer text-left
                          ${form.experience === lvl ? 'border-primary bg-primary/8 text-primary' : 'border-primary/15 text-charcoal/60 hover:border-primary/30'}`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </Field>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Preferred day">
                    <select value={form.preferredDay} onChange={(e) => set('preferredDay', e.target.value)} className={inputClass}>
                      <option value="">Any day</option>
                      {preferredDays.map((d) => <option key={d}>{d}</option>)}
                    </select>
                  </Field>
                  <Field label="Preferred time">
                    <select value={form.preferredTime} onChange={(e) => set('preferredTime', e.target.value)} className={inputClass}>
                      <option value="">Any time</option>
                      {preferredTimes.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </Field>
                </div>

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
                    disabled={!form.instrument || !form.duration}
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
                    ['Lesson length', form.duration],
                    ['Experience', form.experience || '—'],
                    ['Day preference', form.preferredDay || 'Flexible'],
                    ['Time preference', form.preferredTime || 'Flexible'],
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
                    <a href="/terms" className="text-primary underline hover:text-primary/75">Terms & Conditions</a>
                    {' '}and understand that lessons are billed per term with 24-hour cancellation notice required.
                  </span>
                </label>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setStep(2)} className="flex-1 py-4 rounded-lg border-2 border-primary/20 hover:border-primary/40 text-charcoal font-semibold text-sm transition-all cursor-pointer">
                    Back
                  </button>
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="flex-[2] justify-center"
                    disabled={!form.agreedToTerms}
                  >
                    Submit Enrolment
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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
