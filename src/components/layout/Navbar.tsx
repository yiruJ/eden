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

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
    </svg>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-[#EAF2E8]/95 backdrop-blur-md border-b border-[#7D9B76]/20 shadow-sm"
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
          <span className="ml-3 font-display font-bold text-charcoal text-base tracking-tight leading-tight hidden sm:flex flex-col">
            <span>Eden</span>
            <span>Music Academy</span>
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
                  ? 'text-[#3D6635] font-semibold'
                  : 'text-[#2C2C2A]/70 hover:text-[#7D9B76]'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Phone + CTA */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="tel:+61410385227"
            className="flex items-center gap-2 text-sm text-charcoal/60 hover:text-primary transition-colors duration-200"
          >
            <PhoneIcon className="w-4 h-4 text-primary" />
            0410 385 227
          </a>
          <Button variant="enrol" size="sm" onClick={() => window.location.href='/enrol'}>
            Book a Free Trial
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-charcoal/70 hover:bg-[#7D9B76]/15 transition-colors cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span className="block w-5 h-0.5 bg-charcoal/70 mb-1.5 transition-all" />
          <span className="block w-5 h-0.5 bg-charcoal/70 mb-1.5 transition-all" />
          <span className="block w-5 h-0.5 bg-charcoal/70 transition-all" />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#EAF2E8] border-t border-[#7D9B76]/20 px-6 py-6 space-y-4">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`block text-base font-medium transition-colors py-2 ${
                pathname === to ? 'text-[#3D6635] font-semibold' : 'text-charcoal/70 hover:text-[#7D9B76]'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a
            href="tel:+61410385227"
            className="flex items-center gap-2 text-base font-medium text-charcoal/70 hover:text-primary transition-colors py-2"
          >
            <PhoneIcon className="w-4 h-4 text-primary" />
            0410 385 227
          </a>
          <div className="pt-2">
            <Button variant="enrol" className="w-full justify-center" onClick={() => { setMobileOpen(false); window.location.href = '/enrol'; }}>
              Book a Free Trial
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
