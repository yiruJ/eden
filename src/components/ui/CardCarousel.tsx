/**
 * Adapted from React Bits "Carousel" (https://reactbits.dev/components/carousel).
 * Changes: sizes to its container instead of a fixed pixel width, renders any
 * content via `renderItem`, Eden styling, 44px dot targets, and honours
 * prefers-reduced-motion (no autoplay, no 3D rotation).
 */
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type PanInfo,
  type Transition,
} from 'motion/react';

interface CardCarouselProps<T> {
  items: T[];
  getKey: (item: T) => string;
  /** Accessible name for each dot, e.g. the person quoted. */
  getLabel: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  ariaLabel: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  className?: string;
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS: Transition = { type: 'spring', stiffness: 300, damping: 30 };

interface SlideProps {
  children: ReactNode;
  index: number;
  itemWidth: number;
  trackItemOffset: number;
  x: MotionValue<number>;
  transition: Transition;
  rotate: boolean;
}

function Slide({ children, index, itemWidth, trackItemOffset, x, transition, rotate }: SlideProps) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const rotateY = useTransform(x, range, rotate ? [90, 0, -90] : [0, 0, 0], { clamp: false });

  return (
    <motion.div
      className="relative shrink-0 flex cursor-grab active:cursor-grabbing"
      style={{ width: itemWidth, rotateY }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

export function CardCarousel<T>({
  items,
  getKey,
  getLabel,
  renderItem,
  ariaLabel,
  autoplay = false,
  autoplayDelay = 5000,
  pauseOnHover = true,
  loop = true,
  className = '',
}: CardCarouselProps<T>) {
  const reduceMotion = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const trackItemOffset = itemWidth + GAP;

  // Track the container's inner width so slides always fill it.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setItemWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const itemsForRender = useMemo(() => {
    if (!loop || items.length === 0) return items;
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!autoplay || reduceMotion || itemsForRender.length <= 1) return;
    if (pauseOnHover && isHovered) return;
    const timer = setInterval(() => {
      setPosition((prev) => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);
    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, reduceMotion, itemsForRender.length]);

  // Re-anchor when the slide width changes (resize) so the track isn't left mid-slide.
  useEffect(() => {
    x.set(-position * trackItemOffset);
    // Only on width changes; position changes are animated by the track.
  }, [trackItemOffset, x]);

  const effectiveTransition: Transition = isJumping || reduceMotion ? { duration: 0 } : SPRING_OPTIONS;

  // With loop on, the clones at each end silently jump back to their real slide.
  const handleAnimationComplete = () => {
    const lastCloneIndex = itemsForRender.length - 1;
    const target = !loop || itemsForRender.length <= 1
      ? null
      : position === lastCloneIndex
        ? 1
        : position === 0
          ? items.length
          : null;

    if (target === null) {
      setIsAnimating(false);
      return;
    }
    setIsJumping(true);
    setPosition(target);
    x.set(-target * trackItemOffset);
    requestAnimationFrame(() => {
      setIsJumping(false);
      setIsAnimating(false);
    });
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;
    if (direction === 0) return;
    setPosition((prev) => Math.max(0, Math.min(prev + direction, itemsForRender.length - 1)));
  };

  const dragProps = loop
    ? {}
    : { dragConstraints: { left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0), right: 0 } };

  const activeIndex =
    items.length === 0
      ? 0
      : loop
        ? (position - 1 + items.length) % items.length
        : Math.min(position, items.length - 1);

  return (
    <div
      className={className}
      role="group"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={containerRef} className="overflow-hidden">
        {itemWidth > 0 && (
          <motion.div
            className="flex"
            drag={isAnimating ? false : 'x'}
            {...dragProps}
            style={{
              gap: `${GAP}px`,
              perspective: 1000,
              perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
              x,
            }}
            onDragEnd={handleDragEnd}
            animate={{ x: -(position * trackItemOffset) }}
            transition={effectiveTransition}
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={handleAnimationComplete}
          >
            {itemsForRender.map((item, index) => (
              <Slide
                key={`${getKey(item)}-${index}`}
                index={index}
                itemWidth={itemWidth}
                trackItemOffset={trackItemOffset}
                x={x}
                transition={effectiveTransition}
                rotate={!reduceMotion}
              >
                {renderItem(item)}
              </Slide>
            ))}
          </motion.div>
        )}
      </div>

      {/* Dots: 44px tap targets with a smaller visible dot inside */}
      <div className="mt-4 flex items-center justify-center gap-1">
        {items.map((item, index) => (
          <button
            key={getKey(item)}
            type="button"
            onClick={() => setPosition(loop ? index + 1 : index)}
            aria-label={`Show ${index + 1} of ${items.length}: ${getLabel(item)}`}
            aria-current={activeIndex === index}
            className="w-11 h-11 flex items-center justify-center cursor-pointer rounded-full
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-200
                          ${activeIndex === index ? 'w-6 bg-primary' : 'w-2 bg-charcoal/20'}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
