import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import entranceImg from '../../assets/facilityShots/entrance.webp';
import bigRoomImg from '../../assets/facilityShots/bigRoom.webp';
import livingRoomImg from '../../assets/facilityShots/livingRoom.webp';
import middleRoomImg from '../../assets/facilityShots/middleRoom.webp';
import smallRoomImg from '../../assets/facilityShots/smallRoom.webp';

type Shot = {
  src: string;
  label: string;
  caption: string;
  alt: string;
  /** Tailwind classes controlling the tile's footprint in the desktop grid. */
  grid: string;
};

const shots: Shot[] = [
  {
    src: bigRoomImg,
    label: 'Main Studio',
    caption: 'Our largest room, set up for lessons, duets, and ensemble rehearsals.',
    alt: 'The main studio at Eden Music Academy in Strathfield, with an upright piano, rug, and acoustic curtain',
    grid: 'md:col-span-2 lg:col-span-2 lg:row-span-2',
  },
  {
    src: entranceImg,
    label: 'Entrance',
    caption: 'Ground-floor entry on Cooper Street, straight off the car park lift.',
    alt: 'The entrance to Eden Music Academy, with the Eden Music Academy banner beside the front door',
    grid: 'lg:col-span-1 lg:row-span-2',
  },
  {
    src: livingRoomImg,
    label: 'Student Lounge',
    caption: 'Where students wait, warm up, and parents can sit in comfort.',
    alt: 'The student lounge at Eden Music Academy, with a lounge, kitchenette, and music stands',
    grid: '',
  },
  {
    src: middleRoomImg,
    label: 'Practice Room',
    caption: 'A quiet room for strings, with stands and space to move.',
    alt: 'A practice room at Eden Music Academy set up for strings, with a cello case and music stands',
    grid: '',
  },
  {
    src: smallRoomImg,
    label: 'Piano Studio',
    caption: 'A focused one-on-one room with natural light.',
    alt: 'A private piano studio at Eden Music Academy with an upright piano and a desk by the window',
    grid: '',
  },
];

export function FacilitySection() {
  return (
    <section className="pb-10 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 md:mb-12 space-y-3">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
            Our Studio
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal leading-tight">
            A space built for music
          </h2>
          <p className="text-charcoal/60 font-light max-w-xl">
            Our dedicated studio in Strathfield gives every student a calm, focused
            environment to learn, practise, and grow.
          </p>
          <p className="text-charcoal/60 font-light max-w-xl">
            Eden families also have three dedicated parking spots in the building's
            underground car park.{' '}
            <Link to="/parking" className="text-primary font-semibold hover:underline">
              See how to park
            </Link>
            .
          </p>
        </div>

        {/* Mobile: swipeable carousel. Desktop: bento grid. */}
        <ShotCarousel shots={shots} />
        <div
          className="hidden md:grid gap-4 md:grid-cols-2 md:auto-rows-[220px]
                     lg:grid-cols-3 lg:auto-rows-[200px]"
        >
          {shots.map((shot) => (
            <ShotTile key={shot.src} shot={shot} className={shot.grid} />
          ))}
        </div>

        {/* Address + directions */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4
                        bg-white rounded-2xl px-7 py-5 shadow-sm border border-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <LocationIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal">Eden Music Academy</p>
              <p className="text-xs text-muted mt-0.5">Strathfield, NSW 2135</p>
            </div>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Shop+24%2F48+Cooper+Street%2C+Strathfield+NSW"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white
                       rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shrink-0
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                       focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Get Directions
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}

function ShotTile({ shot, className = '' }: { shot: Shot; className?: string }) {
  return (
    <figure className={`group relative overflow-hidden rounded-3xl shadow-md bg-charcoal/5 ${className}`}>
      <img
        src={shot.src}
        alt={shot.alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 ease-out
                   group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      {/* Gradient keeps the caption above 4.5:1 contrast over any photo */}
      <div className="absolute inset-x-0 bottom-0 pt-14 pb-4 px-5
                      bg-gradient-to-t from-charcoal/85 via-charcoal/45 to-transparent">
        <figcaption>
          <p className="text-white font-display font-bold text-lg leading-tight">{shot.label}</p>
          <p className="text-white/80 text-xs mt-1 leading-relaxed">{shot.caption}</p>
        </figcaption>
      </div>
    </figure>
  );
}

function ShotCarousel({ shots }: { shots: Shot[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /**
   * Scroll positions that put each slide at the scroller's snap edge. Slides can
   * differ in width, so measure them instead of assuming a fixed pitch, and drop
   * the container's left padding so slide 0 lands at scrollLeft 0.
   */
  const slideOffsets = (el: HTMLDivElement) => {
    const padLeft = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    return [...el.children].map(
      (child) => (child as HTMLElement).offsetLeft - el.offsetLeft - padLeft
    );
  };

  const handleScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const offsets = slideOffsets(el);
    let nearest = 0;
    offsets.forEach((offset, i) => {
      if (Math.abs(offset - el.scrollLeft) < Math.abs(offsets[nearest] - el.scrollLeft)) {
        nearest = i;
      }
    });
    setActive(nearest);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const goTo = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const left = slideOffsets(el)[index];
    if (left === undefined) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    setActive(index);
  };

  return (
    <div className="md:hidden">
      {/* Full-bleed so tiles can peek past the section's px-6 gutter */}
      <div
        ref={scrollerRef}
        className="-mx-6 px-6 flex gap-4 overflow-x-auto scrollbar-none
                   snap-x snap-mandatory overscroll-x-contain scroll-px-6"
        role="group"
        aria-roledescription="carousel"
        aria-label="Photos of the Eden Music Academy studio"
      >
        {shots.map((shot, i) => (
          <div
            key={shot.src}
            className="snap-start shrink-0 w-[82%] h-[300px]"
            aria-label={`${i + 1} of ${shots.length}`}
          >
            <ShotTile shot={shot} className="w-full h-full" />
          </div>
        ))}
      </div>

      {/* Dots — 44px tap targets with a smaller visible dot inside */}
      <div className="mt-3 flex items-center justify-center gap-1">
        {shots.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show photo ${i + 1}: ${shot.label}`}
            aria-current={i === active}
            className="w-11 h-11 flex items-center justify-center cursor-pointer rounded-full
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-200
                          ${i === active ? 'w-6 bg-primary' : 'w-2 bg-charcoal/20'}`}
            />
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-muted -mt-1">
        Swipe to see more of the studio
      </p>
    </div>
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

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
