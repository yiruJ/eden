import posthog from 'posthog-js';

// PostHog product analytics: page paths, funnels and session recordings.
// The project token is a write-only public key, safe to ship in client code.
const POSTHOG_TOKEN = 'phc_wVQnLseki7qsUxCckyrp92NdqQadqZ3iDLpgVbGvk8m7';

// Staff-only areas. Visiting one opts the device out, and nothing there is recorded.
const INTERNAL_PATHS = ['/admin', '/reset-password', '/shader-demo'];

export function isInternalPath(pathname: string) {
  return INTERNAL_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

let started = false;

export function initAnalytics() {
  // Local dev visits are never tracked.
  if (import.meta.env.DEV || started) return;
  started = true;

  // Visit /?notrack once on a device to stop tracking it for good, /?track to undo.
  // Decided before init so the opt-out visit's own page view is never sent.
  const params = new URLSearchParams(window.location.search);
  const optOutNow = params.has('notrack') || isInternalPath(window.location.pathname);

  posthog.init(POSTHOG_TOKEN, {
    opt_out_capturing_by_default: optOutNow,
    api_host: 'https://us.i.posthog.com',
    // Includes a $pageview on every client-side route change.
    defaults: '2026-05-30',
    // Every visitor stays anonymous: no names or emails attached, cheaper event tier.
    person_profiles: 'identified_only',
    disable_surveys: true,
    session_recording: {
      maskAllInputs: true,
    },
  });

  // Persist the choice so later visits on this device stay opted out.
  if (optOutNow) posthog.opt_out_capturing();
  else if (params.has('track')) posthog.opt_in_capturing();
}

export function optOutDevice() {
  if (started && !posthog.has_opted_out_capturing()) posthog.opt_out_capturing();
}

export function captureEvent(name: string, properties?: Record<string, string>) {
  if (import.meta.env.DEV) {
    console.debug(`[posthog] ${name}`, properties ?? '');
  }
  if (!started) return;
  posthog.capture(name, properties);
}
