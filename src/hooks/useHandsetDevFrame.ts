import { useSyncExternalStore } from 'react';
import { isHandsetDevFrame } from '../lib/handsetMode';

function subscribe(onChange: () => void) {
  window.addEventListener('resize', onChange);
  return () => window.removeEventListener('resize', onChange);
}

function getSnapshot() {
  return isHandsetDevFrame();
}

function getServerSnapshot() {
  return false;
}

export function useHandsetDevFrame() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
