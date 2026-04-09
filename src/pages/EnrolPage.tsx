import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { Button } from '../components/ui/Button';
import { FadeIn } from '../components/ui/FadeIn';
import { SEO } from '../components/SEO';

const EMAILJS_SERVICE  = 'service_4hf3y5e';
const EMAILJS_TEMPLATE = 'template_f5dt26c';
const EMAILJS_PUBLIC   = 'oD-S9wI7AeqB6epnS';

const instruments = ['Piano', 'Violin', 'Viola', 'Cello'];
const levels = ['Beginner', 'Some experience (Grade 1–4)', 'Intermediate (Grade 5+)', 'Not sure'];

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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const canSubmit =
    form.studentName.trim() &&
    form.instrument &&
    form.level &&
    form.parentPhone.trim() &&
    form.parentEmail.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
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
      navigate('/thank-you');
    } catch {
      setError('Something went wrong. Please try again or call us on +61 410 385 227.');
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <SEO
        title="Book a Free Trial Lesson — Eden Music Academy, North Strathfield"
        description="Book a free, no-obligation trial lesson at Eden Music Academy in North Strathfield. Piano, violin, viola and cello — all ages welcome from 4 years old."
        canonical="/enrol"
      />

      {/* Header */}
      <FadeIn direction="up" duration={700}>
        <section className="pt-20 pb-12 px-6 bg-background text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
              Free Trial Lesson
            </span>
            <h1 className="text-5xl font-display font-bold text-charcoal">Book Your Trial</h1>
            <p className="text-lg text-charcoal/65 font-light">
              No payment, no obligation. Just come in, meet your teacher, and see if it feels right.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* Map */}
      <FadeIn direction="up" delay={100}>
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
      </FadeIn>

      {/* Form */}
      <FadeIn direction="up" delay={150}>
        <section className="py-10 px-6 pb-24 bg-white">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Student's name" required>
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
                    placeholder="e.g. 8"
                  />
                </Field>
              </div>

              <Field label="Instrument" required>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {instruments.map((inst) => (
                    <button
                      key={inst}
                      type="button"
                      onClick={() => set('instrument', inst)}
                      className={`py-4 px-2 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer text-center
                        ${form.instrument === inst
                          ? 'border-primary bg-primary text-white'
                          : 'border-primary/15 text-charcoal/60 hover:bg-primary hover:border-primary hover:text-white'}`}
                    >
                      {inst}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Experience level" required>
                <div className="grid grid-cols-2 gap-2">
                  {levels.map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => set('level', lvl)}
                      className={`py-3.5 px-3 rounded-xl border-2 text-xs font-semibold transition-all cursor-pointer text-center leading-snug
                        ${form.level === lvl
                          ? 'border-primary bg-primary text-white'
                          : 'border-primary/15 text-charcoal/60 hover:bg-primary hover:border-primary hover:text-white'}`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </Field>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Your phone number" required>
                  <input
                    type="tel"
                    required
                    value={form.parentPhone}
                    onChange={(e) => set('parentPhone', e.target.value)}
                    className={inputClass}
                    placeholder="(04) 0000 0000"
                  />
                </Field>
                <Field label="Your email address" required>
                  <input
                    type="email"
                    required
                    value={form.parentEmail}
                    onChange={(e) => set('parentEmail', e.target.value)}
                    className={inputClass}
                    placeholder="your@email.com"
                  />
                </Field>
              </div>

              <Field label="Anything we should know (optional)">
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => set('notes', e.target.value)}
                  className={`${inputClass} resize-none`}
                  placeholder="e.g. My daughter loves Taylor Swift and wants to learn her songs..."
                />
              </Field>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  disabled={!canSubmit || sending}
                >
                  {sending ? 'Sending…' : 'Request My Free Trial Lesson'}
                </Button>
                <p className="text-xs text-charcoal/40 text-center mt-3">
                  We'll call or email you within 24 hours to confirm a time that suits your family.
                </p>
              </div>

            </form>
          </div>
        </section>
      </FadeIn>
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
