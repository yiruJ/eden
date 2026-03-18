import { useState } from 'react';
import { Button } from '../components/ui/Button';

const faqs = [
  {
    q: 'What age can my child start lessons?',
    a: 'We welcome students from age 4. For very young children we recommend piano or ukulele as starting instruments. Our teachers are experienced in age-appropriate teaching methods.',
  },
  {
    q: 'How long are lessons?',
    a: 'Lessons are available in 30-minute or 60-minute sessions. For beginners and younger students, 30 minutes is usually ideal. As students progress, 60-minute lessons allow for deeper work.',
  },
  {
    q: 'Do I need my own instrument?',
    a: 'We recommend having your own instrument at home for practice. We can advise on suitable options for your budget. Our studio has instruments available during lessons.',
  },
  {
    q: 'How are lessons scheduled?',
    a: 'Lessons are scheduled weekly at a fixed time. We offer morning, afternoon, and evening slots across weekdays and Saturdays to suit different family schedules.',
  },
  {
    q: 'What happens if we need to cancel?',
    a: 'We require 24 hours notice to reschedule a lesson. Late cancellations and no-shows are charged at the full lesson rate. Please see our full terms for details.',
  },
  {
    q: 'Do you offer group lessons?',
    a: 'Currently we offer private one-on-one lessons only. We do run occasional group workshops and ensemble sessions — sign up to our newsletter to be notified.',
  },
];

export function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production, wire this to a form service (e.g. Formspree, Resend)
    setSubmitted(true);
  }

  return (
    <>
      {/* Header */}
      <section className="pt-20 pb-12 px-6 bg-background text-center">
        <div className="max-w-2xl mx-auto space-y-5">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
            Get in Touch
          </span>
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-charcoal leading-tight">
            Contact Us
          </h1>
          <p className="text-lg text-charcoal/65 font-light leading-relaxed">
            Questions about enrolment, programs, or anything else — we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact info + form */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16">

          {/* Contact details */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-display font-bold text-charcoal">Studio Details</h2>

            <div className="space-y-5">
              {[
                { icon: MailIcon, label: 'Email', value: 'hello@edenmusic.edu.au', href: 'mailto:hello@edenmusic.edu.au' },
                { icon: PhoneIcon, label: 'Phone', value: '(03) 5900 1234', href: 'tel:0359001234' },
                { icon: LocationIcon, label: 'Location', value: 'Mornington Peninsula, VIC\n(Exact address on enrolment)', href: null },
                { icon: ClockIcon, label: 'Hours', value: 'Mon–Fri: 9am – 7pm\nSat: 9am – 2pm', href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal/40 uppercase tracking-wider mb-1">{label}</p>
                    {href ? (
                      <a href={href} className="text-charcoal hover:text-primary transition-colors text-sm font-medium whitespace-pre-line">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-charcoal/70 whitespace-pre-line">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-primary/8 rounded-2xl p-6 space-y-2">
              <p className="font-display font-semibold text-charcoal text-sm">Follow along</p>
              <p className="text-xs text-charcoal/55 leading-relaxed">
                Stay up to date with performances, events, and student milestones on our socials.
              </p>
              <div className="flex gap-3 pt-1">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-primary hover:text-primary/75 transition-colors"
                >
                  Instagram →
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-primary hover:text-primary/75 transition-colors"
                >
                  Facebook →
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4 py-16">
                  <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto">
                    <CheckIcon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-charcoal">Message sent!</h3>
                  <p className="text-charcoal/60">We'll get back to you within one business day.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-primary/15 bg-background text-charcoal text-sm
                                 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-primary/15 bg-background text-charcoal text-sm
                                 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-primary/15 bg-background text-charcoal text-sm
                                 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                      placeholder="(04) 0000 0000"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-primary/15 bg-background text-charcoal text-sm
                                 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all cursor-pointer"
                    >
                      <option value="">Select a topic</option>
                      <option>Enrolment enquiry</option>
                      <option>Program information</option>
                      <option>Pricing & fees</option>
                      <option>Teaching opportunities</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-primary/15 bg-background text-charcoal text-sm
                               focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all resize-none"
                    placeholder="Tell us a bit about yourself and how we can help..."
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full justify-center">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-20 px-6 bg-background scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
              FAQs
            </span>
            <h2 className="text-4xl font-display font-bold text-charcoal">Common Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="bg-white rounded-2xl border border-primary/8 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-charcoal text-sm">{q}</span>
                  <span className={`shrink-0 text-primary transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}>
                    <ChevronIcon />
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-charcoal/65 leading-relaxed border-t border-primary/5 pt-4">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
