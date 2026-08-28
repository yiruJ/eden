import type { ReactNode } from 'react';
import { SEO } from '../components/SEO';
import { Button } from '../components/ui/Button';
import entranceMap from '../assets/parking/parkingEntrance.webp';
import keypadImg from '../assets/parking/intercom.webp';
import carParkImg from '../assets/parking/carPark.webp';
import liftImg from '../assets/parking/elevator.webp';

const STUDIO_PHONE = '+61434144955';
const STUDIO_PHONE_DISPLAY = '+61 434 144 955';

interface Step {
  number: number;
  title: string;
  body: string;
  detail?: ReactNode;
  photo: string;
  photoAlt: string;
  photoCaption: string;
  /** Zoom into a region of the photo, as `scale` and CSS transform-origin. */
  photoZoom?: { scale: number; origin: string };
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Turn into Clarence Street',
    body: 'Our address is on Cooper Street, but the car park entrance is around on Clarence Street. It is the first underground entrance as you turn in.',
    photo: entranceMap,
    photoAlt: 'Map showing the car park entrance circled in red on Clarence Street, around the corner from Eden Music Academy on Cooper Street',
    photoCaption: 'The entrance, circled in red',
    photoZoom: { scale: 1.85, origin: '48% 68%' },
  },
  {
    number: 2,
    title: 'Enter the passcode',
    body: 'Enter the passcode from your confirmation email. It rings the studio, we answer, and the gate opens.',
    detail: (
      <>
        Give us a moment to pick up. No response?{' '}
        <a href={`tel:${STUDIO_PHONE}`} className="text-primary font-semibold hover:underline">
          Call {STUDIO_PHONE_DISPLAY}
        </a>
        .
      </>
    ),
    photo: keypadImg,
    photoAlt: 'The keypad at the Clarence Street car park entrance',
    photoCaption: 'The keypad at the entrance',
  },
  {
    number: 3,
    title: 'Follow the path to the right',
    body: 'The path is one way. Our three spots are on your right, under the Eden logo on the wall.',
    detail: 'The yellow floor locks are left unlocked, so you can drive straight in.',
    photo: carParkImg,
    photoAlt: 'Three underground parking bays with the green Eden Music Academy logo on the wall above each one',
    photoCaption: 'Three bays, one Eden logo above each',
  },
  {
    number: 4,
    title: 'Take the marked lift',
    body: 'There are two lifts down here. Take the one circled in the photo and press G.',
    detail: 'Our door is immediately on your left as you step out.',
    photo: liftImg,
    photoAlt: 'Underground car park with the correct lift lobby circled in red',
    photoCaption: 'Take the lift circled in red',
    photoZoom: { scale: 1.25, origin: '100% 48%' },
  },
];

export function ParkingPage() {
  return (
    <>
      <SEO
        title="Parking at Eden Music Academy: Strathfield Student Parking"
        description="How to park at Eden Music Academy in Strathfield. Enter the underground car park from Clarence Street and use one of our three dedicated parking spots for Eden families."
        canonical="/parking"
      />

      {/* Header */}
      <section className="pt-28 pb-10 px-6 bg-background text-center">
        <div className="max-w-2xl mx-auto space-y-5">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
            Getting Here
          </span>
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-charcoal leading-tight">
            Parking
          </h1>
          <p className="text-lg text-charcoal/65 font-light leading-relaxed">
            Street parking is usually quickest. When it is busy, Eden families have three spots in the underground car park.
          </p>
        </div>
      </section>

      {/* Step by step */}
      <section className="py-16 sm:py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal text-center mb-4">
            Step by step
          </h2>
          <p className="text-center text-charcoal/60 font-light max-w-xl mx-auto mb-14">
            Driving in for the first time? Here is what you will see.
          </p>

          <ol className="space-y-16 sm:space-y-24">
            {steps.map((step, i) => (
              <li key={step.number}>
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                  <div className={`space-y-4 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-4">
                      <span
                        aria-hidden="true"
                        className="w-11 h-11 rounded-2xl bg-primary text-white font-display font-bold text-lg flex items-center justify-center shrink-0"
                      >
                        {step.number}
                      </span>
                      <span className="text-xs font-semibold text-charcoal/40 uppercase tracking-wider">
                        Step {step.number} of {steps.length}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-charcoal leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-charcoal/70 leading-relaxed">{step.body}</p>

                    {step.detail && (
                      <p className="text-sm text-charcoal/55 leading-relaxed border-l-2 border-primary/30 pl-4">
                        {step.detail}
                      </p>
                    )}
                  </div>

                  <StepPhoto
                    src={step.photo}
                    alt={step.photoAlt}
                    caption={step.photoCaption}
                    zoom={step.photoZoom}
                    className={i % 2 === 1 ? 'lg:order-1' : ''}
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Good to know */}
      <section className="py-16 px-6 bg-surface">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-charcoal text-center mb-12">
            Good to know
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: CarIcon,
                title: 'Three spots, shared',
                body: 'All three bays under the Eden logo are free for any Eden family. The neighbouring bays belong to other businesses.',
              },
              {
                icon: ClockIcon,
                title: 'Arrive a few minutes early',
                body: 'The gate needs one of us to answer, and we may be finishing with another student.',
              },
              {
                icon: ExitIcon,
                title: 'Leaving is automatic',
                body: 'Nothing needed on the way out. Drive up to the gate and it opens.',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white rounded-3xl p-7 border border-primary/10">
                <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg text-charcoal mb-2">{title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 px-6 bg-background text-center">
        <div className="max-w-xl mx-auto space-y-5">
          <h2 className="text-3xl font-display font-bold text-charcoal">Still not sure?</h2>
          <p className="text-charcoal/65 font-light leading-relaxed">
            Give us a call and we will talk you in.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a href={`tel:${STUDIO_PHONE}`}>
              <Button variant="primary">Call the studio</Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function StepPhoto({
  src,
  alt,
  caption,
  zoom,
  className = '',
}: {
  src: string;
  alt: string;
  caption: string;
  zoom?: { scale: number; origin: string };
  className?: string;
}) {
  return (
    <figure className={`space-y-3 ${className}`}>
      <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-surface border border-primary/10">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          style={
            zoom
              ? { transform: `scale(${zoom.scale})`, transformOrigin: zoom.origin }
              : undefined
          }
        />
      </div>
      <figcaption className="text-xs text-charcoal/45 uppercase tracking-wider text-center">
        {caption}
      </figcaption>
    </figure>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h.375c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 0h17.25m-17.25 0l1.72-5.16a2.25 2.25 0 012.134-1.59h9.542a2.25 2.25 0 012.134 1.59l1.72 5.16" />
    </svg>
  );
}

function ExitIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H2.25" />
    </svg>
  );
}
