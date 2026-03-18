import type { MailMessage } from './mailMessages';
import type { SearchDoc } from './searchIndex';
import { dailyMail, dailyWikiFragments } from './procedural';
import { dailySearchDocs } from './procedural';
import { SEARCH_DOCS } from './searchIndex';
import { chronicleMailActive, chronicleSearchDocs, chronicleWikiActive, getHourChapter } from './chronicle24';
import {
  DRIFT_PAGES,
  driftSearchDocs,
  handbuiltNodePage,
  permanentSearchDocs,
} from './nodeCatalog';
import { pick, pickMany, playHour, playHourBucket, seededRng, slugFromSeed, todayKey } from '../lib/seed';

const ADJ = [
  'sleepy', 'loyal', 'frayed', 'polite', 'hollow', 'bright', 'static', 'nested', 'forgotten', 'indexed',
  'sandboxed', 'nocturnal', 'packetized', 'honest', 'suspicious', 'velvet', 'rusty', 'amber', 'cobalt',
  'quiet', 'loud', 'gentle', 'bitter', 'sweet', 'frozen', 'molten', 'digital', 'analog', 'phantom',
  'loyal', 'rogue', 'tender', 'grim', 'lucky', 'cursed', 'holy', 'feral', 'cosmic', 'local',
] as const;

const NOUN = [
  'modem', 'relay', 'operator', 'forum', 'hat', 'cache', 'quest', 'stamp', 'window', 'tab',
  'signal', 'archive', 'coin', 'integrity', 'handset', 'packet', 'socket', 'daemon', 'lint', 'boot',
  'mirror', 'cable', 'ghost', 'soup', 'regex', 'mall', 'tower', 'bunker', 'ledger', 'whisper',
  'beacon', 'fossil', 'ripple', 'kernel', 'banner', 'cipher', 'mart', 'wiki', 'mail', 'map',
] as const;

const VERB = [
  'whispers', 'indexes', 'refunds', 'pings', 'folds', 'boots', 'archives', 'lints', 'hums', 'drifts',
  'mutters', 'glows', 'stalls', 'rewrites', 'forgets', 'remembers', 'blinks', 'overflows', 'waits',
] as const;

const PLACE = [
  'rn:map', 'rn:archive', 'rn:discover', 'rn:shift', 'rn:mail', 'rn:wiki', 'rn:search', 'rn:chronicle',
] as const;

export type WikiFragment = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type MicroNode = {
  url: string;
  slug: string;
  title: string;
  tag: string;
  teaser: string;
  searchQuery: string;
  chapter?: number;
};

export type ShiftMissionKind =
  | 'navs'
  | 'searches'
  | 'mailsRead'
  | 'wikiReads'
  | 'commands'
  | 'hackWins'
  | 'arcadeWins'
  | 'stamps'
  | 'nodes'
  | 'discover'
  | 'chronicleSignals';

export type ShiftMission = {
  id: string;
  hourKey: string;
  title: string;
  blurb: string;
  reward: number;
  integrity?: number;
  kind: ShiftMissionKind;
  goal: number;
  baseline: number;
  targetNode?: string;
  searchQuery?: string;
};

export type ForumThread = {
  id: string;
  user: string;
  title: string;
  body: string;
  when: string;
};

export type PulseEvent = {
  id: string;
  line: string;
  action?: string;
};

function phrase(rng: () => number) {
  return `${pick(rng, ADJ)} ${pick(rng, NOUN)}`;
}

export function shiftMissionsForHour(
  bucket = playHourBucket(0),
  baselines: Record<ShiftMissionKind, number>,
  playMs = 0,
): ShiftMission[] {
  const rng = seededRng(`shift-${bucket}`);
  const count = 24;
  const clockH = playHour(playMs);
  const ch = getHourChapter(clockH);
  const kinds: ShiftMissionKind[] = [
    'navs', 'searches', 'mailsRead', 'wikiReads', 'commands', 'hackWins', 'arcadeWins', 'stamps',
    'nodes', 'discover', 'navs', 'searches', 'nodes', 'discover',
  ];
  const nodes = microNodesForHour(bucket);
  const out: ShiftMission[] = [];

  for (let i = 0; i < count; i++) {
    const kind = kinds[i % kinds.length] ?? 'navs';
    const goal =
      kind === 'nodes' ? 1 :
        kind === 'stamps' ? 1 :
          kind === 'hackWins' || kind === 'arcadeWins' ? 1 :
            kind === 'discover' ? 3 + Math.floor(rng() * 4) :
              2 + Math.floor(rng() * 5);

    const p = phrase(rng);
    let title = '';
    let blurb = '';
    let targetNode: string | undefined;
    let searchQuery: string | undefined;

    if (kind === 'nodes') {
      const node = nodes[Math.floor(rng() * nodes.length)]!;
      targetNode = node.url;
      title = `Ping ${node.title}`;
      blurb = `Open ${node.url} and read the full transmission.`;
    } else if (kind === 'searches') {
      searchQuery = p;
      title = `Index: ${p}`;
      blurb = `Search RhinoSearch for "${p}" and open a hit.`;
    } else if (kind === 'discover') {
      title = `Log ${goal} signals`;
      blurb = `File new entries in the Discovery Log this hour.`;
    } else if (kind === 'stamps') {
      title = 'Collect a stamp';
      blurb = 'Ping a ghost node on the net map.';
    } else if (kind === 'hackWins') {
      title = 'Cipher clearance';
      blurb = 'Finish Cipher Drill at 70+ this hour.';
    } else if (kind === 'arcadeWins') {
      title = 'Needle contract';
      blurb = 'Clear RhinoReflex once this hour.';
    } else if (kind === 'mailsRead') {
      title = `Drift mail x${goal}`;
      blurb = 'Read hourly drift messages in RhinoMail.';
    } else if (kind === 'wikiReads') {
      title = `Fragments x${goal}`;
      blurb = 'Open hourly PocketWiki fragments.';
    } else if (kind === 'commands') {
      title = `Shell x${goal}`;
      blurb = 'Run terminal commands.';
    } else if (kind === 'chronicleSignals') {
      title = `Chronicle traces x${goal}`;
      blurb = `File ${goal} chronicle traces from any rn:h-* chapter.`;
    } else {
      title = `Tour ${goal} routes`;
      blurb = 'Visit unique rn: pages this session.';
    }

    out.push({
      id: `m-${bucket}-${i}`,
      hourKey: bucket,
      title,
      blurb,
      reward: 8 + Math.floor(rng() * 18),
      integrity: rng() > 0.7 ? 1 : undefined,
      kind,
      goal,
      baseline: baselines[kind] ?? 0,
      targetNode,
      searchQuery,
    });
  }

  if (ch) {
    out.push({
      id: `m-${bucket}-chronicle-1`,
      hourKey: bucket,
      title: `Open ${ch.codename}`,
      blurb: `Visit ${ch.url} and file traces.`,
      reward: 22,
      integrity: 2,
      kind: 'navs',
      goal: 1,
      baseline: baselines.navs,
    });
    out.push({
      id: `m-${bucket}-chronicle-2`,
      hourKey: bucket,
      title: 'Chronicle filing',
      blurb: 'File three chronicle traces this hour.',
      reward: 28,
      kind: 'chronicleSignals',
      goal: 3,
      baseline: 0,
    });
    out.push({
      id: `m-${bucket}-chronicle-3`,
      hourKey: bucket,
      title: `Search: ${ch.searchPhrase}`,
      blurb: 'Run the chronicle search trace.',
      reward: 18,
      kind: 'searches',
      goal: 1,
      baseline: baselines.searches,
      searchQuery: ch.searchPhrase,
    });
  }

  return out;
}

export function microNodesForHour(_bucket = playHourBucket(0)): MicroNode[] {
  return DRIFT_PAGES.map((n) => ({
    url: n.url,
    slug: n.slug,
    title: n.title,
    tag: n.tag,
    teaser: n.teaser,
    searchQuery: n.searchQuery,
  }));
}

export type MicroNodePage = {
  title: string;
  tag: string;
  layout: import('./nodes/handbuiltTypes').NodeLayout;
  paragraphs: string[];
  chapter?: number;
  isDrift?: boolean;
  quote?: string;
  bullets?: string[];
  footnote?: string;
};

export function microNodePage(url: string): MicroNodePage | null {
  const built = handbuiltNodePage(url);
  if (!built) return null;
  return {
    title: built.title,
    tag: built.tag,
    layout: built.layout,
    paragraphs: built.paragraphs,
    chapter: built.chapter,
    isDrift: built.isDrift,
    quote: built.quote,
    bullets: built.bullets,
    footnote: built.footnote,
  };
}

export function hourlyMail(bucket = playHourBucket(0)): MailMessage[] {
  const rng = seededRng(`hmail-${bucket}`);
  return Array.from({ length: 8 }, (_, i) => {
    const p = phrase(rng);
    return {
      id: `${bucket}-m${i}`,
      from: `${pick(rng, ADJ)}.ops@hour.rn`,
      subject: `[${bucket}] ${p}`,
      preview: `Play-hour drift ${i + 1}`,
      body:
        `Operator,\n\n` +
        `Play bucket ${bucket}. Signal "${p}" crossed the net.\n` +
        `Open rn:shift for contracts. Nodes: rn:n-* (56 this play hour).\n\n` +
        `Search: ${p}\n\n- Hourly ops`,
    };
  });
}

export function hourlyWiki(bucket = playHourBucket(0)): WikiFragment[] {
  const rng = seededRng(`hwiki-${bucket}`);
  return Array.from({ length: 14 }, (_, i) => {
    const p = phrase(rng);
    return {
      id: `${bucket}-w${i}`,
      title: `${p} (${bucket})`,
      paragraphs: [
        `Drift fragment ${i + 1} for ${bucket}.`,
        `The ${p} ${pick(rng, VERB)} when operators complete shift missions.`,
        `Cross-link: ${pick(rng, PLACE)} and micro nodes rn:n-*.`,
      ],
    };
  });
}

export function hourlySearchDocs(bucket = playHourBucket(0), nodes = microNodesForHour(bucket)): SearchDoc[] {
  const rng = seededRng(`hsearch-${bucket}`);
  const words = pickMany(rng, [...ADJ, ...NOUN], 24);
  const generic = words.map((w, i) => ({
    id: `${bucket}-s${i}`,
    title: `${w} - ${bucket} index`,
    url: i % 4 === 0 ? 'rn:shift' : (`rn:n-${slugFromSeed(`hs-${bucket}-${i}`)}` as string),
    snippet: `Play-hour index entry for "${w}".`,
    tags: [w, bucket, 'hourly', 'shift'],
    body: `Filed at ${bucket}. Try rn:shift and search ${w} again next play hour.`,
  }));
  const nodeDocs: SearchDoc[] = nodes.map((n, i) => ({
    id: `${bucket}-n${i}`,
    title: n.title,
    url: n.url,
    snippet: n.teaser,
    tags: [n.tag, n.searchQuery, 'node', bucket],
    body: n.teaser + ` Open ${n.url} to log discovery.`,
  }));
  return [...generic, ...nodeDocs];
}

export function hourlyForumThreads(bucket = playHourBucket(0)): ForumThread[] {
  const rng = seededRng(`hforum-${bucket}`);
  return Array.from({ length: 10 }, (_, i) => {
    const p = phrase(rng);
    return {
      id: `${bucket}-f${i}`,
      user: `${pick(rng, ADJ)}_${pick(rng, NOUN)}`,
      title: `${p}? (${bucket})`,
      body: `Posting at ${bucket}. ${pick(rng, VERB)} ${pick(rng, NOUN)}. Anyone else seeing new rn:n- nodes?`,
      when: bucket,
    };
  });
}

export function pulseEvents(playMs = 0): PulseEvent[] {
  const slot = Math.floor(playMs / (5 * 60 * 1000));
  const pulse = `play-${slot}`;
  const rng = seededRng(`pulse-${pulse}`);
  return Array.from({ length: 4 }, (_, i) => ({
    id: `pulse-${pulse}-${i}`,
    line: `Live: ${phrase(rng)} ${pick(rng, VERB)} near ${pick(rng, PLACE)}.`,
    action: i === 0 ? 'rn:shift' : pick(rng, PLACE),
  }));
}

export function mergedMail(day = todayKey(), playMs = 0) {
  const bucket = playHourBucket(playMs);
  return [...dailyMail(day), ...hourlyMail(bucket), ...chronicleMailActive(playMs)];
}

export function mergedWiki(day = todayKey(), playMs = 0) {
  const bucket = playHourBucket(playMs);
  return [...dailyWikiFragments(day), ...hourlyWiki(bucket), ...chronicleWikiActive(playMs)];
}

export function mergedSearchDocs(day = todayKey(), playMs = 0): SearchDoc[] {
  const bucket = playHourBucket(playMs);
  const nodes = microNodesForHour(bucket);
  return [
    ...SEARCH_DOCS,
    ...dailySearchDocs(day),
    ...hourlySearchDocs(bucket, nodes),
    ...permanentSearchDocs(),
    ...driftSearchDocs(),
    ...chronicleSearchDocs(playMs),
  ];
}

export function discoveryGoalEstimate() {
  return 15000;
}
