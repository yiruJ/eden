import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Programs', to: '/programs' },
  { label: 'Instruments', to: '/instruments' },
  { label: 'Teachers', to: '/teachers' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-primary/10"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="Eden Music Academy home"
        >
          <LeafIcon className="text-primary w-8 h-8 group-hover:scale-110 transition-transform duration-200" />
          <span className="text-2xl font-display font-black tracking-tight text-charcoal">
            Eden
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm font-medium transition-colors duration-200 ${
                pathname === to
                  ? 'text-primary'
                  : 'text-charcoal/70 hover:text-primary'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Button variant="accent" size="sm" onClick={() => window.location.href='/enrol'}>
            Enrol Now
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-charcoal hover:bg-primary/10 transition-colors cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span className="block w-5 h-0.5 bg-charcoal mb-1.5 transition-all" />
          <span className="block w-5 h-0.5 bg-charcoal mb-1.5 transition-all" />
          <span className="block w-5 h-0.5 bg-charcoal transition-all" />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-primary/10 px-6 py-6 space-y-4">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="block text-base font-medium text-charcoal/80 hover:text-primary transition-colors py-2"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="pt-2">
            <Button variant="accent" className="w-full justify-center">
              Enrol Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20c9 0 14-8 14-8a25.53 25.53 0 00-5-4z" />
    </svg>
  );
}
