import { useSyncExternalStore } from 'react';
import { shouldUseMobileShell } from '../lib/handsetMode';

const MOBILE_OS_MQ = '(max-width: 1024px)';

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(MOBILE_OS_MQ);
  mq.addEventListener('change', onChange);
  window.addEventListener('resize', onChange);
  window.addEventListener('rn-handset', onChange);
  return () => {
    mq.removeEventListener('change', onChange);
    window.removeEventListener('resize', onChange);
    window.removeEventListener('rn-handset', onChange);
  };
}

function getSnapshot() {
  return shouldUseMobileShell();
}

function getServerSnapshot() {
  if (typeof window === 'undefined') return false;
  return getSnapshot();
}

export function useMatchMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
