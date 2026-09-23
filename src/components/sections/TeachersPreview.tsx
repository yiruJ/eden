import { Link } from 'react-router-dom';
import { Carousel } from '../ui/Carousel';
import jiminImg from '../../assets/teachers/jimin.webp';
import hanaImg from '../../assets/teachers/hana.webp';
import dylanImg from '../../assets/teachers/dylan.webp';
import rachelImg from '../../assets/teachers/rachel.webp';
import aureliaImg from '../../assets/teachers/aurelia.webp';
import lucasImg from '../../assets/teachers/lucas.webp';
import erikImg from '../../assets/teachers/erik.webp';

interface TeacherPreview {
  name: string;
  instruments: string;
  image: string | null;
}

const teachers: TeacherPreview[] = [
  { name: 'Dylan Lee', instruments: 'Violin & Viola', image: dylanImg },
  { name: 'Jimin Park', instruments: 'Violin', image: jiminImg },
  { name: 'Hana Lee', instruments: 'Violin', image: hanaImg },
  { name: 'Rachel Jeong', instruments: 'Cello', image: rachelImg },
  { name: 'Aurelia', instruments: 'Violin', image: aureliaImg },
  { name: 'Elijah Lee', instruments: 'Cello & Piano', image: null },
  { name: 'Lucas Choi', instruments: 'Cello', image: lucasImg },
  { name: 'Erik Wild', instruments: 'Cello', image: erikImg },
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
  return (
    <section className="py-10 px-6 bg-background md:hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12 space-y-3">
          <h2 className="text-4xl font-display font-bold text-charcoal leading-tight">
            Learn from the best
          </h2>
          <p className="text-charcoal/60 font-light">
            Our teachers build real technique through lessons children actually look forward to.
          </p>
        </div>

        {/* Mobile: swipe carousel (same as the studio photos) */}
        <Carousel
          className="sm:hidden"
          ariaLabel="Eden Music Academy teachers"
          hint="Swipe to meet more of our teachers"
          slides={teachers.map((teacher) => ({
            key: teacher.name,
            label: teacher.name,
            content: <TeacherCard {...teacher} />,
          }))}
        />

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
