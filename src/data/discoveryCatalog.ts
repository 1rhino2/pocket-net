import { CHRONICLE_HOURS, CHRONICLE_STATIC_DISCOVERIES } from './chronicle24';

export type DiscoveryCategory =
  | 'site'
  | 'secret'
  | 'stamp'
  | 'daily'
  | 'hourly'
  | 'chronicle'
  | 'weekly'
  | 'lore'
  | 'milestone';

export type DiscoveryEntry = {
  id: string;
  title: string;
  category: DiscoveryCategory;
  hint: string;
  hidden?: boolean;
};

const SITE_URLS = [
  'rn:home',
  'rn:search',
  'rn:directory',
  'rn:forum',
  'rn:mart',
  'rn:mail',
  'rn:weather',
  'rn:radio',
  'rn:wiki',
  'rn:jobs',
  'rn:chat',
  'rn:hack',
  'rn:map',
  'rn:arcade',
  'rn:quests',
  'rn:status',
  'rn:readme',
  'rn:discover',
  'rn:archive',
  'rn:shift',
  'rn:chronicle',
] as const;

const SECRET_URLS = ['rn:ghost', 'rn:bunker', 'rn:cache', 'rn:relay', 'rn:lint', 'rn:midnight'] as const;

const SITE_TITLES: Record<string, string> = {
  'rn:home': 'RhinoNet Home',
  'rn:search': 'RhinoSearch',
  'rn:directory': 'Directory',
  'rn:forum': 'The Forum',
  'rn:mart': 'PixelMart',
  'rn:mail': 'RhinoMail',
  'rn:weather': 'Packet Weather',
  'rn:radio': 'RhinoFM',
  'rn:wiki': 'PocketWiki',
  'rn:jobs': 'Job Board',
  'rn:chat': 'Relay Chat',
  'rn:hack': 'Cipher Drill',
  'rn:map': 'Net Map',
  'rn:arcade': 'RhinoReflex',
  'rn:quests': 'Quest Board',
  'rn:status': 'System Status',
  'rn:readme': 'Readme',
  'rn:discover': 'Discovery Log',
  'rn:archive': 'Packet Archive',
  'rn:shift': 'Net Index',
  'rn:chronicle': 'Explore',
  'rn:ghost': 'Ghost Relay',
  'rn:bunker': 'Offline Bunker',
  'rn:cache': 'Stale Cache',
  'rn:relay': 'Midnight Relay',
  'rn:lint': 'Lint Cathedral',
  'rn:midnight': 'After-Hours Desk',
};

function siteDiscoveries(): DiscoveryEntry[] {
  return SITE_URLS.map((url) => ({
    id: `site_${url.replace('rn:', '')}`,
    title: SITE_TITLES[url] ?? url,
    category: 'site' as const,
    hint: `Navigate to ${url} or find it on the net map.`,
  }));
}

function secretDiscoveries(): DiscoveryEntry[] {
  return SECRET_URLS.map((url) => ({
    id: `secret_${url.replace('rn:', '')}`,
    title: SITE_TITLES[url] ?? url,
    category: 'secret' as const,
    hint: 'Search odd keywords, terminal lore, or follow map ghost nodes.',
    hidden: true,
  }));
}

const STAMP_NAMES = [
  'Copper Packet',
  'Glass Tab',
  'Green Phosphor',
  'Dial Tone',
  'Rubber Duck',
  'Null Island',
  'Soup Ladle',
  'Regex Goblin',
  'Cable Yank',
  'Smile Disk',
  'Terry the Goldfish',
  'Abstract Hat',
  'Needle Peak',
  'Cipher Smoke',
  'Forum Tab',
  'Weather Balloon',
  'FM Static',
  'Quest Wax',
  'Archive Moth',
  'Bunker Candle',
  'Ghost Ping',
  'Lint Halo',
  'Relay Echo',
  'Midnight Stamp',
  'Operator Sigil',
  'Sandbox Key',
  'Integrity Seal',
  'RC Hoard',
  'Map Fold',
  'Wiki Margin',
  'Mail Crease',
  'Terminal Blink',
  'Boot Sector',
  'Handset Notch',
  'Virus Patch',
  'Quarantine Tag',
  'Mart Receipt',
  'Job Application',
  'Chat Bubble',
  'Search Index',
  'Directory Spine',
  'Home Tile',
  'Readme Footnote',
  'Status LED',
  'Arcade Token',
  'Hack Glyph',
  'Radio Knob',
  'Discovery Pin',
  'Weekly Ribbon',
  'Daily Perforation',
];

function stampDiscoveries(): DiscoveryEntry[] {
  return STAMP_NAMES.map((name, i) => ({
    id: `stamp_${String(i + 1).padStart(2, '0')}`,
    title: name,
    category: 'stamp' as const,
    hint: 'Ping ghost nodes on the net map. Some days hide different nodes.',
    hidden: true,
  }));
}

const LORE_FRAGMENTS = [
  'The pocket net was never online.',
  'Terry processes refunds at the speed of guilt.',
  'Every rn: address resolves to fiction.',
  'Integrity is a mood, not a metric.',
  'FREE_SMILE ships with optimism included.',
  'RhinoCoins cannot buy regret, only hats.',
  'The forum moderator is a polite regex.',
  'Cipher drills measure typing, not truth.',
  'Ghost relays answer pings from yesterday.',
  'The archive breathes when nobody reads it.',
  'Sandbox mode is honesty with better fonts.',
  'Packet weather forecasts nostalgia storms.',
  'Quest boards pay in stories and RC.',
  'Map folds hide nodes between sessions.',
  'Boot grants are taxable in vibes only.',
  'Handset shells dream of desktop windows.',
  'Search indexes rumors on purpose.',
  'Wiki margins hold the real citations.',
  'Mail threads outlive their senders.',
  'Terminal tips cost one RC and worth it.',
  'Konami codes enable phosphor honesty.',
  'Lint cathedrals compile prayers to tabs.',
  'Midnight desks answer after stipend hour.',
  'Bunkers store dial-up ASMR tapes.',
  'Caches remember pages you never opened.',
  'Relays hum in frequencies FM ignores.',
  'Discovery pins unlock nothing but pride.',
  'Weekly ribbons mark calendars without years.',
  'Daily perforations tear neatly at dawn.',
  'Operators sign logs they cannot verify.',
];

function loreDiscoveries(): DiscoveryEntry[] {
  return LORE_FRAGMENTS.map((line, i) => ({
    id: `lore_${String(i + 1).padStart(2, '0')}`,
    title: line.slice(0, 42) + (line.length > 42 ? '...' : ''),
    category: 'lore' as const,
    hint: 'Archive pages, terminal lore, and chat keywords.',
    hidden: i > 8,
  }));
}

const MILESTONES = [
  { id: 'mile_disc_10', n: 10, title: 'Curious tourist' },
  { id: 'mile_disc_25', n: 25, title: 'Pattern spotter' },
  { id: 'mile_disc_50', n: 50, title: 'Field researcher' },
  { id: 'mile_disc_75', n: 75, title: 'Deep indexer' },
  { id: 'mile_disc_100', n: 100, title: 'Net naturalist' },
  { id: 'mile_disc_150', n: 150, title: 'Pocket archivist' },
  { id: 'mile_disc_200', n: 200, title: 'Completionist myth' },
  { id: 'mile_time_1h', n: 0, title: 'One hour on the wire' },
  { id: 'mile_time_5h', n: 0, title: 'Five hour shift' },
  { id: 'mile_time_10h', n: 0, title: 'Double shift operator' },
  { id: 'mile_stamp_10', n: 10, title: 'Stamp album started' },
  { id: 'mile_stamp_25', n: 25, title: 'Philatelist' },
  { id: 'mile_stamp_40', n: 40, title: 'Packet collector' },
  { id: 'mile_quest_15', n: 15, title: 'Contract veteran' },
  { id: 'mile_quest_30', n: 30, title: 'Board regular' },
];

function milestoneDiscoveries(): DiscoveryEntry[] {
  return MILESTONES.map((m) => ({
    id: m.id,
    title: m.title,
    category: 'milestone' as const,
    hint: 'Keep exploring. Milestones unlock themselves.',
    hidden: true,
  }));
}

function chroniclePageDiscoveries(): DiscoveryEntry[] {
  return CHRONICLE_HOURS.map((ch) => ({
    id: `chronicle_page_${String(ch.hour).padStart(2, '0')}`,
    title: `${ch.codename} thread`,
    category: 'chronicle' as const,
    hint: `Open ${ch.url} - always available.`,
  }));
}

export const STATIC_DISCOVERIES: DiscoveryEntry[] = [
  ...siteDiscoveries(),
  ...secretDiscoveries(),
  ...stampDiscoveries(),
  ...loreDiscoveries(),
  ...milestoneDiscoveries(),
  ...CHRONICLE_STATIC_DISCOVERIES,
  ...chroniclePageDiscoveries(),
];

export const STATIC_DISCOVERY_IDS = new Set(STATIC_DISCOVERIES.map((d) => d.id));

export function discoveryMeta(id: string): DiscoveryEntry | null {
  const hit = STATIC_DISCOVERIES.find((d) => d.id === id);
  if (hit) return hit;
  if (id.startsWith('daily_')) {
    return {
      id,
      title: 'Daily signal',
      category: 'daily',
      hint: 'Comes back tomorrow with a new face.',
    };
  }
  if (id.startsWith('weekly_')) {
    return {
      id,
      title: 'Weekly transmission',
      category: 'weekly',
      hint: 'Rotates each calendar week.',
    };
  }
  if (id.startsWith('hour-')) {
    return {
      id,
      title: 'Hourly drift signal',
      category: 'hourly',
      hint: 'Mail, wiki, and search rotate every hour.',
    };
  }
  if (id.startsWith('chronicle-mail-') || id.startsWith('chronicle-wiki-')) {
    return {
      id,
      title: 'Explore mail',
      category: 'chronicle',
      hint: 'Thread mail - always in inbox.',
    };
  }
  if (id.startsWith('chronicle_page_')) {
    return {
      id,
      title: 'Explore thread visit',
      category: 'chronicle',
      hint: 'Open any thread on Explore.',
    };
  }
  if (id.startsWith('node_')) {
    return {
      id,
      title: `Micro node ${id.slice(5)}`,
      category: 'hourly',
      hint: 'Open rn:n-* routes from this hour bucket.',
    };
  }
  return null;
}

export function totalDiscoveryGoal(): number {
  return 15000;
}
