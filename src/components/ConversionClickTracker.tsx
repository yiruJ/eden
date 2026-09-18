import { useEffect } from 'react';
import { trackConversion } from '../lib/adsTracking';

// Tracks clicks on every tel: and mailto: link site-wide, including ones added later.
// Opt a link out (e.g. teacher recruitment) with data-conversion="off" on it or a parent.
export function ConversionClickTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!(e.target instanceof Element)) return;
      const link = e.target.closest<HTMLAnchorElement>('a[href^="tel:"], a[href^="mailto:"]');
      if (!link || link.closest('[data-conversion="off"]')) return;
      trackConversion(link.href.startsWith('tel:') ? 'phoneClick' : 'emailClick');
    }

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return null;
}
