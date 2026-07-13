import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jiminImg from '../../assets/teachers/jimin.webp';
import hanaImg from '../../assets/teachers/hana.webp';
import dylanImg from '../../assets/teachers/dylan.webp';
import rachelImg from '../../assets/teachers/rachel.webp';
import aureliaImg from '../../assets/teachers/aurelia.webp';
import lucasImg from '../../assets/teachers/lucas.webp';

interface TeacherPreview {
  name: string;
  instruments: string;
  image: string | null;
}

const teachers: TeacherPreview[] = [
  { name: 'Dylan Lee', instruments: 'Violin & Viola', image: dylanImg },
  { name: 'Jimin Park', instruments: 'Violin', image: jiminImg },
  { name: 'Hana Lee', instruments: 'Violin', image: hanaImg },
  { name: 'Rachel Jeong', instruments: 'Cello & Piano', image: rachelImg },
  { name: 'Aurelia', instruments: 'Violin & Drums', image: aureliaImg },
  { name: 'Elijah Lee', instruments: 'Cello & Piano', image: null },
  { name: 'Lucas Choi', instruments: 'Cello', image: lucasImg },
];

const TeacherCard = ({ name, instruments, image }: TeacherPreview) => (
  <Link
    to="/teachers"
    className="group relative block w-full aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm
               hover:shadow-xl transition-all duration-300"
  >
    {image ? (
      <img
        src={image}
        alt={`${name} — Eden Music Academy`}
        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    ) : (
      <div className="w-full h-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
        <span className="text-5xl font-display font-bold text-primary/40">
          {name.charAt(0)}
        </span>
      </div>
    )}

    {/* Top name/instrument overlay */}
    <div className="absolute top-0 inset-x-0 px-4 py-3 bg-gradient-to-b from-black/55 to-transparent">
      <p className="font-display font-bold text-white text-sm leading-tight">{name}</p>
      <p className="text-white/80 text-xs font-semibold uppercase tracking-wider mt-0.5">{instruments}</p>
      <p className="text-white/60 text-xs mt-0.5">Sydney Conservatorium</p>
    </div>

    {/* Bottom CTA — always visible on mobile, slides up on hover for desktop */}
    <div className="absolute bottom-0 inset-x-0 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent
                    translate-y-1 opacity-90 sm:opacity-0 sm:translate-y-2
                    group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-300">
      <span className="inline-flex items-center gap-1.5 text-white text-xs font-semibold tracking-wide">
        View profile
        <ArrowRightIcon className="w-3.5 h-3.5" />
      </span>
    </div>
  </Link>
);

export function TeachersPreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const atEnd = currentIndex >= teachers.length - 1;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = el.scrollWidth / teachers.length;
      setCurrentIndex(Math.round(el.scrollLeft / cardWidth));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  function scrollTo(index: number) {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / teachers.length;
    el.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
  }

  return (
    <section className="py-14 px-6 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12 space-y-3">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
            Our Teachers
          </span>
          <h2 className="text-4xl font-display font-bold text-charcoal leading-tight">
            Learn from the best
          </h2>
          <p className="text-charcoal/60 font-light">
            Our teachers build real technique through lessons children actually look forward to.
          </p>
        </div>

        {/* Mobile: horizontal scroll + buttons */}
        <div className="sm:hidden">
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none">
            {teachers.map(({ name, instruments, image }) => (
              <div key={name} className="shrink-0 w-[70vw] snap-start">
                <TeacherCard name={name} instruments={instruments} image={image} />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end gap-3 mt-5">
            <button
              onClick={() => scrollTo(currentIndex - 1)}
              disabled={currentIndex === 0}
              aria-label="Previous teacher"
              className="w-11 h-11 rounded-full bg-white shadow border border-primary/15
                         flex items-center justify-center text-primary
                         disabled:opacity-30 disabled:cursor-not-allowed
                         active:scale-95 transition-all duration-150"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollTo(currentIndex + 1)}
              disabled={atEnd}
              aria-label="Next teacher"
              className={`w-11 h-11 rounded-full bg-white shadow border border-primary/15
                         flex items-center justify-center text-primary
                         disabled:opacity-30 disabled:cursor-not-allowed
                         active:scale-95 transition-all duration-150
                         ${!atEnd ? 'animate-bounce-x' : ''}`}
            >
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-6">
          {teachers.map(({ name, instruments, image }) => (
            <TeacherCard key={name} name={name} instruments={instruments} image={image} />
          ))}
        </div>

      </div>
    </section>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
    </svg>
  );
}
