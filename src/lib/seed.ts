export function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mulberry32(seed: number) {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededRng(seed: string) {
  return mulberry32(hashSeed(seed));
}

export function pick<T>(rng: () => number, list: readonly T[]): T {
  return list[Math.floor(rng() * list.length)]!;
}

export function pickMany<T>(rng: () => number, list: readonly T[], n: number): T[] {
  const copy = [...list];
  const out: T[] = [];
  while (out.length < n && copy.length > 0) {
    const i = Math.floor(rng() * copy.length);
    out.push(copy.splice(i, 1)[0]!);
  }
  return out;
}

export function weekKey(day = todayKey()): string {
  const d = new Date(day + 'T12:00:00');
  const onejan = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${String(week).padStart(2, '0')}`;
}

export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

/** ISO hour bucket, e.g. 2026-05-16T14 - content rotates every hour */
export function hourKey(d = new Date()) {
  return d.toISOString().slice(0, 13);
}

/** Local calendar date YYYY-MM-DD */
export function localDayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Local clock hour 0-23 */
export function localHour(d = new Date()) {
  return d.getHours();
}

/** Session rhythm buckets for drift content (not a completion gate). */
export const PLAY_HOUR_MS = 60 * 60 * 1000;
export const CHRONICLE_RUN_MS = 24 * PLAY_HOUR_MS;

export function playHour(playMs: number) {
  return Math.min(23, Math.floor(Math.max(0, playMs) / PLAY_HOUR_MS));
}

export function playHourBucket(playMs: number) {
  return `play-${playHour(playMs)}`;
}

export function playHourInto(playMs: number) {
  const h = playHour(playMs);
  const start = h * PLAY_HOUR_MS;
  const intoMs = Math.max(0, playMs - start);
  return {
    hour: h,
    intoMs,
    remainMs: Math.max(0, PLAY_HOUR_MS - intoMs),
    pct: Math.min(100, (intoMs / PLAY_HOUR_MS) * 100),
  };
}

export function formatPlayMs(playMs: number) {
  const h = Math.floor(playMs / PLAY_HOUR_MS);
  const m = Math.floor((playMs % PLAY_HOUR_MS) / 60000);
  return `${h}h ${m}m`;
}

/** Changes every 5 minutes for live ticker events */
export function pulseKey(d = new Date()) {
  const m = d.getUTCMinutes();
  const slot = Math.floor(m / 5);
  return `${hourKey(d)}-${slot}`;
}

export function slugFromSeed(seed: string, len = 8) {
  const n = hashSeed(seed);
  return n.toString(36).padStart(len, '0').slice(0, len);
}
