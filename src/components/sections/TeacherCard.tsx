import { useEffect, useId, useState } from 'react';
import { CapIcon } from '../ui/icons/CapIcon';
import { ShieldCheckIcon } from '../ui/icons/ShieldCheckIcon';

export interface Teacher {
  name: string;
  instruments: string[];
  image: string | null;
  bio: string;
  highlights: string[];
  /** Defaults to Sydney Conservatorium of Music */
  school?: string;
}

const DESKTOP_QUERY = '(min-width: 768px)';

export function TeacherCard({
  name,
  instruments,
  image,
  bio,
  highlights,
  school = 'Sydney Conservatorium of Music',
}: Teacher) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(DESKTOP_QUERY).matches : false
  );
  const detailsId = useId();

  // Track md breakpoint: details are always visible on desktop, collapsible on mobile
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const showDetails = isDesktop || isOpen;

  const photo = (
    <>
      {image ? (
        <img
          src={image}
          alt={`${name}, Eden Music Academy teacher`}
          className="w-full h-full object-cover object-top
                     group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-primary/8 flex items-center justify-center">
          <span className="text-6xl font-display font-bold text-primary/30">
            {name.charAt(0)}
          </span>
        </div>
      )}
      {/* Instrument tags overlaid bottom-left */}
      <div className="absolute bottom-4 left-4 flex gap-2">
        {instruments.map((inst) => (
          <span
            key={inst}
            className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm
                       text-charcoal text-xs font-semibold shadow-sm"
          >
            {inst}
          </span>
        ))}
      </div>
    </>
  );

  return (
    <article
      className="group bg-white rounded-3xl overflow-hidden border border-primary/8
                 shadow-md hover:shadow-2xl hover:-translate-y-1.5
                 transition-all duration-300 flex flex-col"
    >
      {/* Photo: tap target on mobile, static on desktop */}
      {isDesktop ? (
        <div className="relative overflow-hidden" style={{ height: '420px' }}>
          {photo}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls={detailsId}
          aria-label={`${isOpen ? 'Hide' : 'Show'} ${name}'s full profile`}
          className="relative block w-full overflow-hidden h-[380px] text-left cursor-pointer
                     focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset
                     focus-visible:ring-primary/60"
        >
          {photo}
          {/* Tap hint bottom-right */}
          <span
            className="absolute bottom-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full
                       bg-charcoal/75 backdrop-blur-sm text-white text-xs font-semibold shadow-sm"
            aria-hidden="true"
          >
            {isOpen ? 'Less' : 'More'}
            <ChevronDownIcon
              className={`w-3.5 h-3.5 transition-transform duration-300 motion-reduce:transition-none ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </span>
        </button>
      )}

      {/* Info: compact below photo */}
      <div className="flex flex-col flex-1 px-6 pt-5 pb-6 md:px-7 md:pt-6 md:pb-7">
        <h2 className="text-2xl font-display font-bold text-charcoal tracking-tight">
          {name}
        </h2>

        {/* Background: always visible on mobile */}
        {!isDesktop && (
          <div className="flex items-center gap-2.5 mt-3">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <CapIcon className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-xs font-semibold text-charcoal/75">
              {school}
            </span>
          </div>
        )}

        {/* Details: slide open beneath on mobile, always shown on desktop */}
        <div
          id={detailsId}
          className={`grid flex-1 transition-[grid-template-rows,opacity,visibility] duration-300 ease-out
                      motion-reduce:transition-none ${
                        showDetails ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 invisible'
                      }`}
        >
          <div className="overflow-hidden min-h-0 flex flex-col">
            <div className="flex flex-col flex-1 space-y-4 pt-4">
              {/* Bio */}
              <p className="text-sm text-charcoal/60 leading-relaxed flex-1">
                {bio}
              </p>

              {/* Teacher-specific highlights */}
              {highlights.length > 0 && (
                <ul className="space-y-1.5">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span className="text-xs text-charcoal/65 leading-snug">{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Credentials */}
              <div className="pt-2 border-t border-primary/8 space-y-2.5">
                {/* School: shown in the summary on mobile */}
                {isDesktop && (
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <CapIcon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-charcoal/75">
                      {school}
                    </span>
                  </div>
                )}
                {/* WWCC */}
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <ShieldCheckIcon className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <span className="text-xs font-semibold text-charcoal/75">
                    Working With Children Check
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
