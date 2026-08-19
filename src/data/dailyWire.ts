import type { MailMessage } from './mailMessages';
import type { SearchDoc } from './searchIndex';
import { chronicleSecretForSearch } from './chronicle24';
import { pick, pickMany, seededRng, todayKey, weekKey } from '../lib/seed';
import {
  ARCHIVE_ENTRIES,
  CODE_WORDS,
  GHOST_NODES,
  WIKI_FRAGMENTS,
  WIRE_LINES,
  WIRE_MAIL,
} from '../content/wire';

/**
 * The daily wire. This replaces procedural.ts.
 *
 * The old version had a list of 15 adjectives, 15 nouns and 8 verbs and glued
 * one of each together, so the net's front page greeted you with "a sleepy
 * relay archives" and "a nocturnal handset pings". Three of those stacked in a
 * box was the first thing anybody read.
 *
 * The living layer is worth keeping, the salad is not. The pools live in
 * src/content/wire.ts, written whole, and the day seed only picks which of
 * those written lines you get today.
 */

export type WikiFragment = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type ArchiveEntry = {
  id: string;
  title: string;
  week: string;
  body: string;
};

export type GhostNode = {
  id: string;
  stampId: string;
  label: string;
  blurb: string;
};

export function dailyMail(day = todayKey()): MailMessage[] {
  const rng = seededRng(`mail-${day}`);
  const count = 3 + Math.floor(rng() * 3);
  return pickMany(rng, [...WIRE_MAIL], count).map((m, i) => ({
    id: `daily-${day}-m${i}`,
    from: m.from,
    subject: m.subject,
    preview: m.preview,
    body: m.body,
    urgent: false,
  }));
}

export function dailyRumors(day = todayKey()): string[] {
  const rng = seededRng(`rumor-${day}`);
  return pickMany(rng, [...WIRE_LINES], 4);
}

export function dailyWikiFragments(day = todayKey()): WikiFragment[] {
  const rng = seededRng(`wiki-${day}`);
  return pickMany(rng, [...WIKI_FRAGMENTS], 5).map((f, i) => ({
    id: `daily-${day}-w${i}`,
    title: f.title,
    paragraphs: [...f.paragraphs],
  }));
}

export function dailySearchDocs(day = todayKey()): SearchDoc[] {
  const rng = seededRng(`search-${day}`);
  return pickMany(rng, [...WIKI_FRAGMENTS], 6).map((f, i) => ({
    id: `daily-${day}-s${i}`,
    title: f.title,
    url: i % 3 === 0 ? 'rn:archive' : 'rn:discover',
    snippet: f.paragraphs[0]!.slice(0, 120),
    tags: [f.title.toLowerCase(), day, 'wire'],
    body: f.paragraphs.join(' '),
  }));
}

export function weeklyArchiveEntries(week = weekKey()): ArchiveEntry[] {
  const rng = seededRng(`archive-${week}`);
  return pickMany(rng, [...ARCHIVE_ENTRIES], 12).map((e, i) => ({
    id: `weekly-${week}-${i}`,
    title: e.title,
    week,
    body: e.body,
  }));
}

export function mapGhostNodes(day = todayKey()): GhostNode[] {
  const rng = seededRng(`ghost-${day}`);
  const count = 3 + Math.floor(rng() * 2);
  return pickMany(rng, [...GHOST_NODES], count).map((g, i) => {
    const stampNum = 1 + Math.floor(rng() * 50);
    return {
      id: `ghost-${day}-${i}`,
      stampId: `stamp_${String(stampNum).padStart(2, '0')}`,
      label: g.label,
      blurb: g.blurb,
    };
  });
}

export function hackPhrases(day = todayKey(), round: number): string[] {
  const rng = seededRng(`hack-${day}-${round}`);
  return Array.from({ length: 8 }, () => {
    const a = pick(rng, CODE_WORDS);
    const b = pick(rng, CODE_WORDS);
    return `${a}-${b}-${Math.floor(rng() * 900 + 100)}`;
  });
}

export const SECRET_SEARCH_KEYS = [
  'ghost relay',
  'offline bunker',
  'stale cache',
  'midnight relay',
  'lint cathedral',
  'after hours',
  'packet archive',
  'discovery log',
  'terry goldfish',
  'free smile',
  'sandbox honesty',
  'operator sigil',
] as const;

export function secretUrlForSearch(query: string, playMs = 0): string | null {
  const q = query.trim().toLowerCase();
  const chronicle = chronicleSecretForSearch(query, playMs);
  if (chronicle) return chronicle;
  if (q.includes('ghost relay')) return 'rn:ghost';
  if (q.includes('offline bunker') || q.includes('bunker gospel')) return 'rn:bunker';
  if (q.includes('stale cache')) return 'rn:cache';
  if (q.includes('midnight relay')) return 'rn:relay';
  if (q.includes('lint cathedral')) return 'rn:lint';
  if (q.includes('after hours') || q.includes('after-hours') || q.includes('midnight desk')) return 'rn:midnight';
  return null;
}

export function dailyDiscoveryId(kind: 'mail' | 'rumor' | 'wiki' | 'search', day = todayKey(), index = 0) {
  return `daily_${day}_${kind}_${index}`;
}

export function weeklyDiscoveryId(week = weekKey()) {
  return `weekly_${week}`;
}
