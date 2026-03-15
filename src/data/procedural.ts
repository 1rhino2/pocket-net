import type { MailMessage } from './mailMessages';
import type { SearchDoc } from './searchIndex';
import { chronicleSecretForSearch } from './chronicle24';
import { pick, pickMany, seededRng, todayKey, weekKey } from '../lib/seed';

const ADJECTIVES = [
  'sleepy',
  'loyal',
  'frayed',
  'polite',
  'hollow',
  'bright',
  'static',
  'nested',
  'forgotten',
  'indexed',
  'sandboxed',
  'nocturnal',
  'packetized',
  'honest',
  'suspicious',
] as const;

const NOUNS = [
  'modem',
  'relay',
  'operator',
  'forum',
  'hat',
  'cache',
  'quest',
  'stamp',
  'window',
  'tab',
  'signal',
  'archive',
  'coin',
  'integrity',
  'handset',
] as const;

const VERBS = ['whispers', 'indexes', 'refunds', 'pings', 'folds', 'boots', 'archives', 'lints'] as const;

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
  const out: MailMessage[] = [];
  for (let i = 0; i < count; i++) {
    const adj = pick(rng, ADJECTIVES);
    const noun = pick(rng, NOUNS);
    const id = `daily-${day}-m${i}`;
    out.push({
      id,
      from: `${adj}.${noun}@drift.rn`,
      subject: `${adj} ${noun} report (${day})`,
      preview: `Field note #${i + 1} from the pocket net.`,
      body:
        `Operator,\n\n` +
        `Today the ${adj} ${noun} ${pick(rng, VERBS)} near rn:map. ` +
        `Search for "${adj} ${noun}" if you want the index entry.\n\n` +
        `Stamp collectors report node activity after midnight.\n\n- Drift mail`,
      urgent: rng() > 0.85,
    });
  }
  return out;
}

export function dailyRumors(day = todayKey()): string[] {
  const rng = seededRng(`rumor-${day}`);
  return Array.from({ length: 4 }, () => {
    const a = pick(rng, ADJECTIVES);
    const n = pick(rng, NOUNS);
    const v = pick(rng, VERBS);
    return `Rumor: a ${a} ${n} ${v} on ${day}. Try searching it.`;
  });
}

export function dailyWikiFragments(day = todayKey()): WikiFragment[] {
  const rng = seededRng(`wiki-${day}`);
  return Array.from({ length: 5 }, (_, i) => {
    const a = pick(rng, ADJECTIVES);
    const n = pick(rng, NOUNS);
    return {
      id: `daily-${day}-w${i}`,
      title: `${a} ${n} (${day})`,
      paragraphs: [
        `Fragment ${i + 1} archived on ${day}. Operators debate whether the ${a} ${n} is canonical.`,
        `Terminal command lore may reference rn:ghost when the ${n} ${pick(rng, VERBS)}.`,
        `Collectors file this under daily signals. It expires at local midnight.`,
      ],
    };
  });
}

export function dailySearchDocs(day = todayKey()): SearchDoc[] {
  const rng = seededRng(`search-${day}`);
  const words = pickMany(rng, [...ADJECTIVES, ...NOUNS], 8);
  return words.map((w, i) => ({
    id: `daily-${day}-s${i}`,
    title: `${w} - field note ${day}`,
    url: i % 3 === 0 ? 'rn:archive' : 'rn:discover',
    snippet: `Indexed ${day}. Searchers keep finding ${w}.`,
    tags: [w, day, 'daily', 'rumor'],
    body:
      `This page was generated for ${day}. The word "${w}" may unlock map nodes or terminal lore. ` +
      `Try rn:discover to log what you find.`,
  }));
}

export function weeklyArchiveEntries(week = weekKey()): ArchiveEntry[] {
  const rng = seededRng(`archive-${week}`);
  return Array.from({ length: 12 }, (_, i) => {
    const a = pick(rng, ADJECTIVES);
    const n = pick(rng, NOUNS);
    return {
      id: `weekly-${week}-${i}`,
      title: `Transmission ${i + 1}: ${a} ${n}`,
      week,
      body:
        `Week ${week}, entry ${i + 1}.\n\n` +
        `Archivists logged a ${a} ${n} crossing rn:relay. ` +
        `Nothing here is dangerous except boredom.\n\n` +
        `Cross-reference: rn:wiki, rn:discover, terminal lore.`,
    };
  });
}

export function mapGhostNodes(day = todayKey()): GhostNode[] {
  const rng = seededRng(`ghost-${day}`);
  const count = 3 + Math.floor(rng() * 2);
  const out: GhostNode[] = [];
  for (let i = 0; i < count; i++) {
    const stampNum = 1 + Math.floor(rng() * 50);
    const stampId = `stamp_${String(stampNum).padStart(2, '0')}`;
    const a = pick(rng, ADJECTIVES);
    const n = pick(rng, NOUNS);
    out.push({
      id: `ghost-${day}-${i}`,
      stampId,
      label: `${a} node`,
      blurb: `Pinged ${n} on ${day}. Awards stamp ${stampNum}.`,
    });
  }
  return out;
}

export function hackPhrases(day = todayKey(), round: number): string[] {
  const rng = seededRng(`hack-${day}-${round}`);
  return Array.from({ length: 8 }, () => {
    const a = pick(rng, ADJECTIVES);
    const n = pick(rng, NOUNS);
    return `${a}-${n}-${Math.floor(rng() * 900 + 100)}`;
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
