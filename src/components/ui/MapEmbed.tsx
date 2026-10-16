import { useId, useState } from 'react';

const ACADEMY_MAP_SRC =
  'https://maps.google.com/maps?q=Shop+24%2F48+Cooper+Street%2C+Strathfield+NSW+2135&output=embed';

interface MapEmbedProps {
  /** Height and any extra styling for the map frame, e.g. "h-64" */
  className?: string;
}

export function MapEmbed({ className = 'h-64' }: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const gridId = `map-grid-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <div
      className={`relative rounded-3xl overflow-hidden border border-primary/10 shadow-sm bg-surface ${className}`}
      aria-busy={!loaded}
    >
      <iframe
        title="Eden Music Academy location"
        src={ACADEMY_MAP_SRC}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)}
        className={`block transition-opacity duration-500 motion-reduce:transition-none ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Loading screen: stays until the map has rendered, then fades out */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface
                    transition-opacity duration-500 motion-reduce:transition-none ${
                      loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
        aria-hidden={loaded}
      >
        {/* Faint street grid so the placeholder reads as a map */}
        <svg className="absolute inset-0 w-full h-full text-primary/10" aria-hidden="true">
          <defs>
            <pattern id={gridId} width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${gridId})`} />
        </svg>

        <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md">
          <PinIcon className="w-6 h-6 text-primary motion-safe:animate-bounce" />
        </div>
        <p className="relative text-sm font-medium text-charcoal/70" role="status">
          Loading map…
        </p>
      </div>
    </div>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}
