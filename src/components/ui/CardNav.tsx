import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { gsap } from 'gsap';
import './CardNav.css';

interface NavLink {
  label: string;
  to: string;
  ariaLabel?: string;
  variant?: 'link' | 'button';
}

interface NavItem {
  label: string;
  bgColor: string;
  textColor: string;
  links: NavLink[];
}

interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items: NavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  ctaLabel?: string;
  ctaTo?: string;
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

export function CardNav({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#EAF2E8',
  ctaLabel = 'Book a Trial',
  ctaTo = '/enrol',
}: CardNavProps) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : false
  );
  const navRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Track desktop breakpoint
  useLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;
    const contentEl = navEl.querySelector<HTMLElement>('.card-nav-content');
    if (contentEl) {
      const wasVisibility = contentEl.style.visibility;
      const wasPointerEvents = contentEl.style.pointerEvents;
      const wasPosition = contentEl.style.position;
      const wasHeight = contentEl.style.height;

      contentEl.style.visibility = 'visible';
      contentEl.style.pointerEvents = 'auto';
      contentEl.style.position = 'static';
      contentEl.style.height = 'auto';

      void contentEl.offsetHeight;

      const topBar = 60;
      const padding = 16;
      const contentHeight = contentEl.scrollHeight;

      contentEl.style.visibility = wasVisibility;
      contentEl.style.pointerEvents = wasPointerEvents;
      contentEl.style.position = wasPosition;
      contentEl.style.height = wasHeight;

      return topBar + contentHeight + padding;
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current.filter(Boolean), { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
    tl.to(cardsRef.current.filter(Boolean), { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');
    return tl;
  };

  useLayoutEffect(() => {
    if (isDesktop) return;
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items, isDesktop]);

  useLayoutEffect(() => {
    if (isDesktop) return;
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) { newTl.progress(1); tlRef.current = newTl; }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) tlRef.current = newTl;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded, isDesktop]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const closeMenu = () => {
    if (!isExpanded) return;
    setIsHamburgerOpen(false);
    tlRef.current?.eventCallback('onReverseComplete', () => setIsExpanded(false));
    tlRef.current?.reverse();
  };

  // ── Desktop layout ─────────────────────────────────────────────────────────
  if (isDesktop) {
    const allLinks = items.flatMap((item) => item.links);
    const regularLinks = allLinks.filter((lnk) => lnk.variant !== 'button');
    const ctaLink = allLinks.find((lnk) => lnk.variant === 'button');

    return (
      <div className={`card-nav-container ${className}`}>
        <nav
          className="card-nav"
          style={{ height: '60px', overflow: 'visible' }}
        >
          <div className="card-nav-top" style={{ position: 'relative', height: '60px', padding: '0 1.25rem' }}>
            {/* Logo — left */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <Link to="/" aria-label="Eden Music Academy home" className="logo-container">
                <img src={logo} alt={logoAlt} className="card-nav-logo" />
              </Link>
            </div>

            {/* Nav links — centre */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
              {regularLinks.map((lnk, i) => (
                <Link key={`${lnk.label}-${i}`} to={lnk.to} className="desktop-flat-link">
                  {lnk.label}
                </Link>
              ))}
            </div>

            {/* CTA — right */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              {ctaLink && (
                <Link to={ctaLink.to} className="desktop-flat-btn">
                  {ctaLink.label}
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    );
  }

  // ── Mobile layout (unchanged) ───────────────────────────────────────────────
  return (
    <div className={`card-nav-container ${className}`}>
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: baseColor }}>
        <div className="card-nav-top">
          <Link to="/" aria-label="Eden Music Academy home" className="logo-container">
            <img src={logo} alt={logoAlt} className="card-nav-logo" />
          </Link>
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            aria-expanded={isExpanded}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
            style={{ color: '#2C2C2A' }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {items.slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={(el) => { cardsRef.current[idx] = el; }}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links.map((lnk, i) => (
                  lnk.variant === 'button' ? (
                    <Link
                      key={`${lnk.label}-${i}`}
                      to={lnk.to}
                      aria-label={lnk.ariaLabel}
                      onClick={closeMenu}
                      className="mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-lg
                                 bg-accent text-white text-sm font-bold hover:bg-accent/90
                                 transition-colors self-end"
                    >
                      {lnk.label}
                    </Link>
                  ) : (
                    <Link
                      key={`${lnk.label}-${i}`}
                      className="nav-card-link"
                      to={lnk.to}
                      aria-label={lnk.ariaLabel}
                      onClick={closeMenu}
                    >
                      <ArrowUpRightIcon className="nav-card-link-icon" />
                      {lnk.label}
                    </Link>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
