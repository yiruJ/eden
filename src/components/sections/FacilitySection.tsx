import { Link } from 'react-router-dom';
import { Carousel } from '../ui/Carousel';
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
    <section className="pt-12 md:pt-16 pb-10 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 md:mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal leading-tight">
            A space built for music
          </h2>
          <p className="text-charcoal/60 font-light max-w-xl">
            Our dedicated studio in Strathfield gives every student a calm, focused
            environment to learn, practise, and grow.
          </p>
        </div>

        {/* Mobile: swipeable carousel. Desktop: bento grid. */}
        <Carousel
          className="md:hidden"
          ariaLabel="Photos of the Eden Music Academy studio"
          hint="Swipe to see more of the studio"
          slideClassName="w-[82%] h-[300px]"
          slides={shots.map((shot) => ({
            key: shot.src,
            label: shot.label,
            content: <ShotTile shot={shot} className="w-full h-full" />,
          }))}
        />
        <div
          className="hidden md:grid gap-4 md:grid-cols-2 md:auto-rows-[220px]
                     lg:grid-cols-3 lg:auto-rows-[200px]"
        >
          {shots.map((shot) => (
            <ShotTile key={shot.src} shot={shot} className={shot.grid} />
          ))}
        </div>

        {/* Address + directions, centred. From sm up the big pin spans both rows (88px =
            heading 32 + gap 12 + button 44) so it matches the block's height without adding any.
            On mobile a smaller pin sits inline with the heading so the row can centre. */}
        <div className="mt-8 flex justify-center">
          <div className="w-full sm:w-auto grid items-center gap-y-4 sm:grid-cols-[auto_auto] sm:gap-x-5 sm:gap-y-3">
            <LocationIcon className="hidden sm:block sm:row-span-2 w-[5.5rem] h-[5.5rem] text-primary" />
            <p className="flex items-center justify-center sm:justify-start gap-2
                          text-2xl leading-8 font-display font-bold text-charcoal">
              <LocationIcon className="sm:hidden w-8 h-8 shrink-0 text-primary" />
              <span>
                Strathfield,
                <span className="ml-2 text-base font-sans font-normal text-muted">NSW 2135</span>
              </span>
            </p>
            <div className="grid grid-cols-2 sm:flex gap-3">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Shop+24%2F48+Cooper+Street%2C+Strathfield+NSW"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-3 rounded-lg
                           whitespace-nowrap text-[13px] sm:text-sm font-semibold
                           transition-colors focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-primary focus-visible:ring-offset-2
                           bg-primary text-white hover:bg-primary/90"
              >
                Get Directions
                <ArrowRightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <Link
                to="/parking"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-3 rounded-lg
                           whitespace-nowrap text-[13px] sm:text-sm font-semibold
                           transition-colors focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-primary focus-visible:ring-offset-2
                           bg-white text-primary border border-primary hover:bg-primary/5"
              >
                See How to Park
                <ArrowRightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </div>
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
