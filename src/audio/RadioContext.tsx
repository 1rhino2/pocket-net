import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { RADIO_STATIONS, stationById, type RadioStationId } from './radioStations';

type RadioStatus = 'idle' | 'loading' | 'live' | 'error';

type Ctx = {
  stationId: RadioStationId | null;
  status: RadioStatus;
  volume: number;
  tune: (id: RadioStationId | null) => void;
  toggle: (id: RadioStationId) => void;
  setVolume: (v: number) => void;
};

const RadioCtx = createContext<Ctx | null>(null);
const VOL_KEY = 'rn_radio_vol';

function readVolume() {
  try {
    const raw = localStorage.getItem(VOL_KEY);
    if (!raw) return 0.72;
    const n = Number(raw);
    if (!Number.isFinite(n)) return 0.72;
    return Math.min(1, Math.max(0, n));
  } catch {
    return 0.72;
  }
}

export function RadioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [stationId, setStationId] = useState<RadioStationId | null>(null);
  const [status, setStatus] = useState<RadioStatus>('idle');
  const [volume, setVolumeState] = useState(readVolume);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audioRef.current = audio;

    const onPlaying = () => setStatus('live');
    const onWaiting = () => setStatus((s) => (s === 'idle' ? 'idle' : 'loading'));
    const onError = () => setStatus('error');

    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeAttribute('src');
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('error', onError);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    localStorage.setItem(VOL_KEY, String(volume));
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!stationId) {
      audio.pause();
      audio.removeAttribute('src');
      setStatus('idle');
      return;
    }

    const station = stationById(stationId);
    if (!station) return;

    setStatus('loading');
    audio.src = station.streamUrl;
    audio.load();
    const playPromise = audio.play();
    if (playPromise) {
      playPromise.catch(() => setStatus('error'));
    }
  }, [stationId]);

  const tune = useCallback((id: RadioStationId | null) => {
    setStationId(id);
  }, []);

  const toggle = useCallback((id: RadioStationId) => {
    setStationId((cur) => (cur === id ? null : id));
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(Math.min(1, Math.max(0, v)));
  }, []);

  const value: Ctx = {
    stationId,
    status,
    volume,
    tune,
    toggle,
    setVolume,
  };

  return <RadioCtx.Provider value={value}>{children}</RadioCtx.Provider>;
}

export function useRadio() {
  const ctx = useContext(RadioCtx);
  if (!ctx) throw new Error('useRadio outside RadioProvider');
  return ctx;
}

export function radioStationName(id: RadioStationId | null) {
  if (!id) return null;
  return stationById(id)?.name ?? null;
}

export { RADIO_STATIONS };
