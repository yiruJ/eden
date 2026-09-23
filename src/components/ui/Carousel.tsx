import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

export interface CarouselSlide {
  key: string;
  /** Short name used in the dot's accessible label. */
  label: string;
  content: ReactNode;
}

interface CarouselProps {
  slides: CarouselSlide[];
  /** Accessible name for the carousel region. */
  ariaLabel: string;
  /** Small helper text under the dots, e.g. "Swipe to see more". */
  hint?: string;
  /** Wrapper classes, typically the breakpoint that hides it (e.g. "md:hidden"). */
  className?: string;
  /** Size classes for each slide, e.g. "w-[82%] h-[300px]". */
  slideClassName?: string;
}

/** Mobile swipe carousel: peeking snap-scroll slides with tappable dots. */
export function Carousel({
  slides,
  ariaLabel,
  hint,
  className = '',
  slideClassName = 'w-[82%]',
}: CarouselProps) {
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

  // 44px-wide dot targets overflow a 320px phone past 6 slides; narrow them to 36px.
  const dotWidth = slides.length > 6 ? 'w-9' : 'w-11';

  return (
    <div className={className}>
      {/* Full-bleed so slides can peek past the section's px-6 gutter */}
      <div
        ref={scrollerRef}
        className="-mx-6 px-6 flex gap-4 overflow-x-auto scrollbar-none
                   snap-x snap-mandatory overscroll-x-contain scroll-px-6"
        role="group"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.key}
            className={`snap-start shrink-0 ${slideClassName}`}
            aria-label={`${i + 1} of ${slides.length}`}
          >
            {slide.content}
          </div>
        ))}
      </div>

      {/* Dots: large tap targets with a smaller visible dot inside */}
      <div className="mt-3 flex items-center justify-center gap-1">
        {slides.map((slide, i) => (
          <button
            key={slide.key}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${i + 1} of ${slides.length}: ${slide.label}`}
            aria-current={i === active}
            className={`${dotWidth} h-11 flex items-center justify-center cursor-pointer rounded-full
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
          >
            <span
              className={`block h-2 rounded-full transition-all duration-200
                          ${i === active ? 'w-6 bg-primary' : 'w-2 bg-charcoal/20'}`}
            />
          </button>
        ))}
      </div>
      {hint && <p className="text-center text-xs text-muted -mt-1">{hint}</p>}
    </div>
  );
}
