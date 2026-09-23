import { Link } from 'react-router-dom';

interface FeatureCardProps {
  to: string;
  image: string;
  title: string;
  caption?: string;
  ariaLabel: string;
  className?: string;
}

export function FeatureCard({ to, image, title, caption, ariaLabel, className = '' }: FeatureCardProps) {
  return (
    <Link
      to={to}
      aria-label={ariaLabel}
      className={`group relative block cursor-pointer overflow-hidden rounded-2xl shadow-md bg-charcoal/5
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                  focus-visible:ring-offset-2 ${className}`}
    >
      <img
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500
                   group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />

      {/* Gradient keeps the title above 4.5:1 contrast over any photo */}
      <div
        className="absolute inset-x-0 bottom-0 pt-24 pb-6 px-6 flex items-end justify-between gap-4
                   bg-gradient-to-t from-charcoal/85 via-charcoal/45 to-transparent"
      >
        <div>
          <h2 className="font-display font-bold text-white text-2xl leading-tight">{title}</h2>
          {caption && <p className="text-white/75 text-sm mt-1">{caption}</p>}
        </div>
        <span
          className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white
                     text-primary text-sm font-semibold shadow-lg transition-all duration-200
                     group-hover:gap-3"
        >
          More info
          <ArrowRightIcon className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
