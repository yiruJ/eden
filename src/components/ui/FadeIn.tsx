import { useEffect, useRef, useState, type ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;       // ms stagger delay
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;    // ms
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  duration = 600,
  className = '',
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, prefersReducedMotion]);

  const translate: Record<string, string> = {
    up: 'translateY(32px)',
    down: 'translateY(-32px)',
    left: 'translateX(32px)',
    right: 'translateX(-32px)',
    none: 'none',
  };

  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translate(0,0)' : translate[direction],
    transition: prefersReducedMotion
      ? 'none'
      : `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1), transform ${duration}ms cubic-bezier(0.16,1,0.3,1)`,
    willChange: 'opacity, transform',
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
