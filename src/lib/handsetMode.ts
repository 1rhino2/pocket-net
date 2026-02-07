const FORCE_KEY = 'rn_force_handset';
const MOBILE_MAX_W = 1024;

export function isHandsetHostname(hostname: string) {
  const h = hostname.toLowerCase();
  if (h === 'localhost' || h === '127.0.0.1' || h === '[::1]') return false;
  return (
    h.startsWith('m.') ||
    h.startsWith('mobile.') ||
    h.startsWith('handset.') ||
    h === 'pocket-net-handset.vercel.app' ||
    h.endsWith('-handset.vercel.app')
  );
}

export function initHandsetMode() {
  if (typeof window === 'undefined') return false;

  const params = new URLSearchParams(window.location.search);
  const queryForce = params.has('handset') || params.get('mobile') === '1' || params.get('handset') === '1';

  if (queryForce) {
    sessionStorage.setItem(FORCE_KEY, '1');
  }

  const stored = sessionStorage.getItem(FORCE_KEY) === '1';
  const hostForce = isHandsetHostname(window.location.hostname);
  const forced = stored || hostForce || queryForce;

  if (forced) {
    document.documentElement.dataset.rnForceHandset = '1';
    document.documentElement.dataset.rhinoShell = 'handset';
    window.dispatchEvent(new Event('rn-handset'));
  }

  return forced;
}

export function shouldUseMobileShell() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(`(max-width: ${MOBILE_MAX_W}px)`).matches || isForceHandset() || isHandsetHostname(window.location.hostname);
}

export function isForceHandset() {
  if (typeof document === 'undefined') return false;
  return document.documentElement.dataset.rnForceHandset === '1';
}

export function isHandsetDevFrame() {
  if (typeof window === 'undefined') return false;
  return isForceHandset() && window.innerWidth > MOBILE_MAX_W;
}

export function handsetDevLabel() {
  if (typeof window === 'undefined') return 'Handset dev';
  const h = window.location.hostname;
  if (isHandsetHostname(h)) return h;
  return 'Query ?handset=1';
}
