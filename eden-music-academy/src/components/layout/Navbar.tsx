import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import logo from '../../assets/logo.png';

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
          className="flex items-center group"
          aria-label="Eden Music Academy home"
        >
          <img
            src={logo}
            alt="Eden Music Academy"
            className="h-12 w-auto group-hover:scale-105 transition-transform duration-200"
          />
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
          <Button variant="enrol" size="sm" onClick={() => window.location.href='/enrol'}>
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
            <Button variant="enrol" className="w-full justify-center" onClick={() => { setMobileOpen(false); window.location.href = '/enrol'; }}>
              Enrol Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
