import { useEffect, useId, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { Stepper, Step } from '../components/ui/Stepper';
import { MapEmbed } from '../components/ui/MapEmbed';
import { FadeIn } from '../components/ui/FadeIn';
import { SEO } from '../components/SEO';
import { trackConversion } from '../lib/adsTracking';

const EMAILJS_SERVICE  = 'service_4hf3y5e';
const EMAILJS_TEMPLATE = 'template_f5dt26c';
const EMAILJS_PUBLIC   = 'oD-S9wI7AeqB6epnS';

const instruments = ['Piano', 'Violin', 'Viola', 'Cello'];
const levels = ['Beginner', 'Grade 1–4', 'Grade 5+', 'Not sure'];

const TOTAL_STEPS = 3;
const stepNames: Record<number, string> = { 1: 'student', 2: 'lessons', 3: 'contact' };

type RequiredField = 'studentName' | 'instrument' | 'level' | 'parentPhone' | 'parentEmail';

// Required fields per step, in on-screen order (the first invalid one gets focus)
const stepFields: Record<number, RequiredField[]> = {
  1: ['studentName'],
  2: ['instrument', 'level'],
  3: ['parentPhone', 'parentEmail'],
};

function validate(form: FormState): Partial<Record<RequiredField, string>> {
  const errors: Partial<Record<RequiredField, string>> = {};
  const phoneDigits = form.parentPhone.replace(/\D/g, '');
  if (!form.studentName.trim()) errors.studentName = "Please enter the student's name.";
  if (!form.instrument) errors.instrument = 'Please choose an instrument.';
  if (!form.level) errors.level = 'Please choose an experience level.';
  if (!phoneDigits) errors.parentPhone = 'Please enter a phone number.';
  else if (phoneDigits.length < 8) errors.parentPhone = 'Please check the phone number.';
  if (!form.parentEmail.trim()) errors.parentEmail = 'Please enter an email address.';
  else if (!/^\S+@\S+\.\S+$/.test(form.parentEmail.trim())) errors.parentEmail = 'Please check the email address.';
  return errors;
}

interface FormState {
  studentName: string;
  studentAge: string;
  instrument: string;
  level: string;
  parentPhone: string;
  parentEmail: string;
  notes: string;
}

const initialForm: FormState = {
  studentName: '',
  studentAge: '',
  instrument: '',
  level: '',
  parentPhone: '',
  parentEmail: '',
  notes: '',
};

export function EnrolPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialForm);
  const [step, setStep] = useState(1);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState<Partial<Record<RequiredField, boolean>>>({});
  const formStarted = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    trackConversion('enrolPageView');
  }, []);

  function set(field: keyof FormState, value: string) {
    if (!formStarted.current) {
      formStarted.current = true;
      trackConversion('enrolFormStart');
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const errors = validate(form);
  const stepValid = (n: number) => stepFields[n].every((f) => !errors[f]);
  const canSubmit = [1, 2, 3].every(stepValid);
  const errorFor = (field: RequiredField) => (touched[field] ? errors[field] : undefined);
  const touch = (field: RequiredField) => setTouched((prev) => ({ ...prev, [field]: true }));

  // The Stepper briefly keeps a hidden copy of the previous step, so skip aria-hidden matches
  function focusField(field: string) {
    const matches = formRef.current?.querySelectorAll<HTMLElement>(`[data-field="${field}"]`) ?? [];
    const target = Array.from(matches).find((el) => !el.closest('[aria-hidden="true"]'));
    const focusable = target?.matches('input, textarea') ? target : target?.querySelector<HTMLElement>('button');
    focusable?.focus();
  }

  // Moving to Contact: put the cursor in the phone field so the keyboard is ready
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (step === 3) focusField('parentPhone');
  }, [step]);

  function handleStepChange(next: number) {
    if (next > step) {
      trackConversion('enrolStepCompleted', { step: String(step), step_name: stepNames[step] });
    }
    setStep(next);
  }

  // Continue / Request: show what's missing instead of silently refusing
  function advance() {
    if (sending) return;
    const invalid = stepFields[step].filter((f) => errors[f]);
    if (invalid.length > 0) {
      setTouched((prev) => ({ ...prev, ...Object.fromEntries(invalid.map((f) => [f, true])) }));
      focusField(invalid[0]);
      return;
    }
    if (step < TOTAL_STEPS) handleStepChange(step + 1);
    else void submit();
  }

  // Enter in a text field: jump to the next empty field, or advance when the step is complete
  function handleKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key !== 'Enter' || !(e.target instanceof HTMLInputElement)) return;
    e.preventDefault();
    const current = e.target.dataset.field;
    const nextEmpty = stepFields[step].find((f) => errors[f] && f !== current);
    if (current && errors[current as RequiredField]) touch(current as RequiredField);
    if (nextEmpty && !(current && errors[current as RequiredField])) focusField(nextEmpty);
    else advance();
  }

  async function submit() {
    if (!canSubmit || sending) return;
    setSending(true);
    setError('');
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          form_title: 'New Trial Lesson Request',
          form_intro: 'A new family has requested a trial lesson through the website.',
          from_name: form.studentName,
          reply_email: form.parentEmail,
          phone: form.parentPhone,
          details:
            `Student: ${form.studentName}${form.studentAge ? `, age ${form.studentAge}` : ''}\n` +
            `Instrument: ${form.instrument}\n` +
            `Level: ${form.level}\n\n` +
            `Notes:\n${form.notes || '—'}`,
        },
        EMAILJS_PUBLIC
      );
      trackConversion('trialRequest', { instrument: form.instrument, level: form.level });
      navigate('/thank-you');
    } catch {
      setError('Something went wrong. Please try again or call us on +61 434 144 955.');
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <SEO
        title="Trial Music Lesson in Strathfield, Sydney | Eden Music Academy"
        description="Piano, violin, viola and cello lessons for all ages in Strathfield, Sydney. Book a free trial lesson today. Sydney Conservatorium-trained teachers."
        canonical="/enrol"
      />

      {/* Header */}
      <FadeIn direction="up" duration={700}>
        <section className="pt-28 pb-12 px-6 bg-background text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
              Trial Lesson
            </span>
            <h1 className="text-5xl font-display font-bold text-charcoal">Book Your Trial</h1>
            <p className="text-lg text-charcoal/65 font-light">
              Just come in, meet your teacher, and see if it feels right.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* Form */}
      <FadeIn direction="up" delay={100}>
        <section className="pt-10 pb-16 px-4 sm:px-6 bg-white">
          <div className="max-w-2xl mx-auto">
            <form ref={formRef} onSubmit={(e) => e.preventDefault()} onKeyDown={handleKeyDown} noValidate>
              <Stepper
                step={step}
                onStepChange={handleStepChange}
                linear
                theme="eden"
                width="100%"
                radius={24}
                nextButtonText="Continue"
                completeButtonText={sending ? 'Sending…' : 'Request My Free Trial Lesson'}
                backButtonProps={{ disabled: sending }}
                nextButtonProps={{
                  disabled: sending,
                  'aria-busy': sending,
                  onClick: (e) => {
                    // Validation and submit are handled here; the Stepper only moves on via onStepChange
                    e.preventDefault();
                    advance();
                  },
                }}
              >
                <Step title="Student">
                  <div className="space-y-5">
                    <Field label="Student's name" htmlFor="studentName" error={errorFor('studentName')} required>
                      <input
                        id="studentName"
                        data-field="studentName"
                        type="text"
                        required
                        autoComplete="off"
                        autoCapitalize="words"
                        enterKeyHint="next"
                        aria-invalid={Boolean(errorFor('studentName'))}
                        aria-describedby={errorFor('studentName') ? 'studentName-error' : undefined}
                        value={form.studentName}
                        onChange={(e) => set('studentName', e.target.value)}
                        className={inputClassFor(errorFor('studentName'))}
                      />
                    </Field>
                    <Field label="Student's age (optional)" htmlFor="studentAge">
                      <input
                        id="studentAge"
                        data-field="studentAge"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={2}
                        enterKeyHint="next"
                        value={form.studentAge}
                        onChange={(e) => set('studentAge', e.target.value.replace(/\D/g, ''))}
                        className={inputClassFor()}
                      />
                    </Field>
                  </div>
                </Step>

                <Step title="Lessons">
                  <div className="space-y-6">
                    <Field label="Instrument" field="instrument" error={errorFor('instrument')} required>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {instruments.map((inst) => (
                          <ChoiceButton
                            key={inst}
                            selected={form.instrument === inst}
                            onClick={() => set('instrument', inst)}
                            className="min-h-14 text-[15px]"
                          >
                            {inst}
                          </ChoiceButton>
                        ))}
                      </div>
                    </Field>
                    <Field label="Experience level" field="level" error={errorFor('level')} required>
                      <div className="grid grid-cols-2 gap-2.5">
                        {levels.map((lvl) => (
                          <ChoiceButton
                            key={lvl}
                            selected={form.level === lvl}
                            onClick={() => set('level', lvl)}
                            className="min-h-14 py-2.5 text-sm leading-snug"
                          >
                            {lvl}
                          </ChoiceButton>
                        ))}
                      </div>
                    </Field>
                  </div>
                </Step>

                <Step title="Contact">
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Phone number" htmlFor="parentPhone" error={errorFor('parentPhone')} required>
                        <input
                          id="parentPhone"
                          data-field="parentPhone"
                          type="tel"
                          required
                          autoComplete="tel"
                          enterKeyHint="next"
                          aria-invalid={Boolean(errorFor('parentPhone'))}
                          aria-describedby={errorFor('parentPhone') ? 'parentPhone-error' : undefined}
                          value={form.parentPhone}
                          onChange={(e) => set('parentPhone', e.target.value)}
                          onBlur={() => form.parentPhone.trim() && touch('parentPhone')}
                          className={inputClassFor(errorFor('parentPhone'))}
                        />
                      </Field>
                      <Field label="Email address" htmlFor="parentEmail" error={errorFor('parentEmail')} required>
                        <input
                          id="parentEmail"
                          data-field="parentEmail"
                          type="email"
                          required
                          autoComplete="email"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck={false}
                          enterKeyHint="send"
                          aria-invalid={Boolean(errorFor('parentEmail'))}
                          aria-describedby={errorFor('parentEmail') ? 'parentEmail-error' : undefined}
                          value={form.parentEmail}
                          onChange={(e) => set('parentEmail', e.target.value)}
                          onBlur={() => form.parentEmail.trim() && touch('parentEmail')}
                          className={inputClassFor(errorFor('parentEmail'))}
                        />
                      </Field>
                    </div>
                    <Field label="Notes (optional)" htmlFor="notes">
                      <textarea
                        id="notes"
                        data-field="notes"
                        rows={3}
                        value={form.notes}
                        onChange={(e) => set('notes', e.target.value)}
                        className={`${inputClassFor()} resize-none`}
                      />
                    </Field>
                  </div>
                </Step>
              </Stepper>
            </form>

            {error && (
              <p role="alert" className="text-sm text-red-600 text-center mt-5">{error}</p>
            )}
            <p className="text-xs text-charcoal/55 text-center mt-10">
              We'll call or email you within 24 hours.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* Map */}
      <FadeIn direction="up">
        <section className="px-6 pt-16 pb-24 bg-background">
          <div className="max-w-2xl mx-auto">
            <MapEmbed className="h-64" />
            <p className="text-xs text-charcoal/45 text-center mt-3">Shop 24/48 Cooper Street, Strathfield NSW 2135</p>
          </div>
        </section>
      </FadeIn>
    </>
  );
}

const inputBase =
  'w-full min-h-12 px-4 py-3 rounded-xl border-2 bg-background text-charcoal text-base sm:text-sm focus:outline-none focus:ring-4 transition-colors';

function inputClassFor(error?: string) {
  return `${inputBase} ${
    error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15'
      : 'border-primary/15 focus:border-primary focus:ring-primary/15'
  }`;
}

const labelClass = 'block text-xs font-semibold text-charcoal/70 uppercase tracking-wider mb-2';

function Field({
  label,
  htmlFor,
  field,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor?: string;
  field?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  const groupId = useId();
  const errorId = `${htmlFor ?? field ?? groupId}-error`;
  const labelContent = (
    <>
      {label}
      {required && <span className="text-accent ml-1" aria-hidden="true">*</span>}
    </>
  );
  const errorMessage = error && (
    <p id={errorId} className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
      <AlertIcon className="w-4 h-4 shrink-0" />
      {error}
    </p>
  );

  // Text inputs get a real <label>; button groups get a labelled group
  if (htmlFor) {
    return (
      <div>
        <label htmlFor={htmlFor} className={labelClass}>{labelContent}</label>
        {children}
        {errorMessage}
      </div>
    );
  }
  return (
    <div
      role="group"
      aria-labelledby={groupId}
      aria-describedby={error ? errorId : undefined}
      data-field={field}
    >
      <p id={groupId} className={labelClass}>{labelContent}</p>
      {children}
      {errorMessage}
    </div>
  );
}

function ChoiceButton({
  selected,
  onClick,
  className = '',
  children,
}: {
  selected: boolean;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`relative flex items-center justify-center gap-1.5 px-3 rounded-xl border-2 font-semibold text-center
        cursor-pointer [touch-action:manipulation] transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 ${className}
        ${selected
          ? 'border-primary bg-primary text-white'
          : 'border-primary/15 bg-white text-charcoal/75 [@media(hover:hover)]:hover:border-primary/50 [@media(hover:hover)]:hover:bg-primary/5'}`}
    >
      {children}
    </button>
  );
}


function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
  );
}
