import { useEffect, useRef, type CSSProperties } from 'react';
import violinDuet from '../../assets/moments/Img1.webp';
import celloAndViolin from '../../assets/moments/Img2.webp';
import groupClass from '../../assets/moments/Img5.webp';
import teacherDirecting from '../../assets/moments/Img4.webp';
import oneToOne from '../../assets/moments/Img3.webp';

const DRIFT_DESKTOP_PX = 140;
const MARQUEE_DURATION = '40s';

type Shot = { src: string; alt: string };

const shots: Shot[] = [
  { src: violinDuet, alt: 'Two young violin students playing side by side at Eden Music Academy' },
  { src: celloAndViolin, alt: 'A young cellist and violinist performing beside the Eden Music Academy banner' },
  { src: groupClass, alt: 'An Eden Music Academy teacher leading four young string students in a group class' },
  { src: teacherDirecting, alt: 'An Eden Music Academy teacher directing two young violinists during a performance' },
  { src: oneToOne, alt: 'An Eden Music Academy teacher playing violin alongside a young student in a lesson' },
];

export function MomentsStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const row = rowRef.current;
    if (!section || !row) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wideScreen = window.matchMedia('(min-width: 768px)');
    let frame = 0;
    let rowWidth = row.scrollWidth;

    const update = () => {
      frame = 0;
      // Below 768px the CSS marquee owns the transform, so leave it alone.
      if (reduceMotion.matches || !wideScreen.matches) {
        row.style.transform = '';
        return;
      }
      const drift = Math.min(DRIFT_DESKTOP_PX, Math.max(0, rowWidth - window.innerWidth - 24));
      const rect = section.getBoundingClientRect();
      const travel = window.innerHeight + rect.height;
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / travel, 0), 1);
      row.style.transform = `translate3d(${-progress * drift}px, 0, 0)`;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const remeasure = () => {
      rowWidth = row.scrollWidth;
      schedule();
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', remeasure);
    reduceMotion.addEventListener('change', schedule);
    wideScreen.addEventListener('change', remeasure);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', remeasure);
      reduceMotion.removeEventListener('change', schedule);
      wideScreen.removeEventListener('change', remeasure);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Photos from Eden Music Academy"
      className="relative bg-white"
    >
      <div className="overflow-hidden md:pb-6">
        {/* The mobile marquee loops by translating -50%, which only lands seamlessly
            while the two halves are gapless. Keep any gap breakpoint-scoped to md and up. */}
        <div
          ref={rowRef}
          style={{ '--moments-duration': MARQUEE_DURATION } as CSSProperties}
          className="moments-marquee flex w-max h-[240px] md:h-[300px] md:gap-3 md:items-start will-change-transform"
        >
          {shots.map((shot, i) => (
            <Tile key={shot.src} shot={shot} index={i} />
          ))}
          {shots.map((shot, i) => (
            <Tile key={`repeat-${shot.src}`} shot={shot} index={i} repeated />
          ))}
        </div>
      </div>
    </section>
  );
}

function Tile({ shot, index = 0, repeated = false }: { shot: Shot; index?: number; repeated?: boolean }) {
  const staggered = index % 2 === 1;
  return (
    <figure
      aria-hidden={repeated || undefined}
      className={`relative shrink-0 h-full overflow-hidden bg-charcoal/5 md:rounded-2xl
                  w-[68vw] sm:w-[46vw] md:w-[clamp(220px,20vw,320px)]
                  ${staggered ? 'md:translate-y-4' : ''}`}
    >
      <img
        src={shot.src}
        alt={repeated ? '' : shot.alt}
        loading="eager"
        fetchPriority="low"
        decoding="async"
        className="w-full h-full object-cover"
      />
    </figure>
  );
}
