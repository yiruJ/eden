// Google Ads conversion tracking. The base tag is loaded in index.html.
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

export function trackConversion(action: ConversionAction) {
  const label = CONVERSION_LABELS[action];
  if (import.meta.env.DEV) {
    console.debug(`[ads] ${action}${label ? '' : ' (no label set, not sent)'}`);
  }
  if (!label || typeof window.gtag !== 'function') return;
  window.gtag('event', 'conversion', { send_to: `${ADS_ACCOUNT_TAG}/${label}` });
}
