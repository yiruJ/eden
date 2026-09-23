import { captureEvent } from './analytics';

// Google Ads conversion tracking. The base tag is loaded in index.html.
// Every action is also sent to PostHog under a readable name, label or not.
// Each conversion action in Google Ads (Goals → Conversions → Summary) has a label,
// shown in its "Event snippet" as send_to: 'AW-18033582805/<label>'.
// An action with an empty label is skipped until its label is added here.

const ADS_ACCOUNT_TAG = 'AW-18033582805';

export type ConversionAction =
  | 'trialRequest'
  | 'contactMessage'
  | 'phoneClick'
  | 'emailClick'
  | 'enrolPageView'
  | 'enrolFormStart';

const CONVERSION_LABELS: Record<ConversionAction, string> = {
  // "Submit lead form": Enrol page trial request. Primary.
  trialRequest: 'tEA9COH_w44cENXFipdD',
  // "Contact form message": Contact page form. Primary.
  contactMessage: '',
  // "Phone number click": any tel: link on the site. Secondary.
  phoneClick: '',
  // "Email click": any mailto: link on the site. Secondary.
  emailClick: '',
  // "Reached trial page": the Enrol page opened. Secondary.
  enrolPageView: '',
  // "Started trial form": first field filled on the Enrol page, once per visit. Secondary.
  enrolFormStart: '',
};

const POSTHOG_EVENT_NAMES: Record<ConversionAction, string> = {
  trialRequest: 'trial request submitted',
  contactMessage: 'contact message sent',
  phoneClick: 'phone number clicked',
  emailClick: 'email clicked',
  enrolPageView: 'enrol page viewed',
  enrolFormStart: 'enrol form started',
};

// Properties go to PostHog only. Never pass names, emails or phone numbers.
export function trackConversion(action: ConversionAction, properties?: Record<string, string>) {
  captureEvent(POSTHOG_EVENT_NAMES[action], properties);

  const label = CONVERSION_LABELS[action];
  if (import.meta.env.DEV) {
    console.debug(`[ads] ${action}${label ? '' : ' (no label set, not sent)'}`);
  }
  if (!label || typeof window.gtag !== 'function') return;
  window.gtag('event', 'conversion', { send_to: `${ADS_ACCOUNT_TAG}/${label}` });
}
