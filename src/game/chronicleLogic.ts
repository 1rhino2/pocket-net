import { hourSignalsComplete, interludeForPlayMs, syncChronicleUnlocks } from '../data/chronicle24';
import type { GameSnapshot } from './gameTypes';

export function withChronicleSync(s: GameSnapshot): GameSnapshot {
  const unlocked = syncChronicleUnlocks(s.hoursUnlocked, s.playMs);
  if (
    unlocked.length === s.hoursUnlocked.length &&
    unlocked.every((h, i) => h === s.hoursUnlocked[i])
  ) {
    return s;
  }
  return { ...s, hoursUnlocked: unlocked };
}

export function canCollectHourSignal(_h: number, s: GameSnapshot, signalId: string) {
  return !s.hourSignalsFound.includes(signalId);
}

export function chronicleSignalsSinceBaseline(s: GameSnapshot, baseline: number) {
  return Math.max(0, s.hourSignalsFound.length - baseline);
}

export function maybeCompleteHour(s: GameSnapshot, h: number): GameSnapshot {
  if (s.hoursCompleted.includes(h)) return s;
  const found = new Set(s.hourSignalsFound);
  if (!hourSignalsComplete(h, found)) return s;
  return { ...s, hoursCompleted: [...s.hoursCompleted, h].sort((a, b) => a - b) };
}

export function tryInterludeDiscovery(s: GameSnapshot): { id: string; title: string } | null {
  const hit = interludeForPlayMs(s.playMs);
  if (!hit) return null;
  if (s.discovered.includes(hit.id)) return null;
  return { id: hit.id, title: hit.title };
}
