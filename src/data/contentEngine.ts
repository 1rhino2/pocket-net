import type { MailMessage } from './mailMessages';
import type { SearchDoc } from './searchIndex';
import { dailyMail, dailyWikiFragments } from './dailyWire';
import { dailySearchDocs } from './dailyWire';
import { SEARCH_DOCS } from './searchIndex';
import { chronicleMailActive, chronicleSearchDocs, chronicleWikiActive, getHourChapter } from './chronicle24';
import {
  DRIFT_PAGES,
  PERMANENT_NODES,
  driftSearchDocs,
  handbuiltNodePage,
  permanentSearchDocs,
} from './nodeCatalog';
import { pick, pickMany, playHour, playHourBucket, seededRng, todayKey } from '../lib/seed';
import { FORUM_POSTS, PULSE_LINES, WIKI_FRAGMENTS, WIRE_MAIL } from '../content/wire';

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

    // missions used to ask you to search a generated phrase like "cobalt tower",
    // which matched nothing. pull a real search term off a real page instead.
    const p = pick(rng, PERMANENT_NODES).searchQuery;
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
  author?: string;
  updated?: string;
  lock?: import('./nodes/handbuiltTypes').NodeLock;
  unlocked?: import('./nodes/handbuiltTypes').NodeUnlocked;
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
    author: built.author,
    updated: built.updated,
    lock: built.lock,
    unlocked: built.unlocked,
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
  return pickMany(rng, [...WIRE_MAIL], 4).map((m, i) => ({
    id: `${bucket}-m${i}`,
    from: m.from,
    subject: m.subject,
    preview: m.preview,
    body: m.body,
  }));
}

export function hourlyWiki(bucket = playHourBucket(0)): WikiFragment[] {
  const rng = seededRng(`hwiki-${bucket}`);
  return pickMany(rng, [...WIKI_FRAGMENTS], 6).map((f, i) => ({
    id: `${bucket}-w${i}`,
    title: f.title,
    paragraphs: [...f.paragraphs],
  }));
}

export function hourlySearchDocs(bucket = playHourBucket(0), nodes = microNodesForHour(bucket)): SearchDoc[] {
  // there used to be 24 docs here built from single words, titled things like
  // "cobalt - play-3 index". they matched searches and led nowhere. gone.
  return nodes.map((n, i) => ({
    id: `${bucket}-n${i}`,
    title: n.title,
    url: n.url,
    snippet: n.teaser,
    tags: [n.tag, n.searchQuery, 'node', bucket],
    body: n.teaser,
  }));
}

export function hourlyForumThreads(bucket = playHourBucket(0)): ForumThread[] {
  const rng = seededRng(`hforum-${bucket}`);
  return pickMany(rng, [...FORUM_POSTS], 8).map((t, i) => ({
    id: `${bucket}-f${i}`,
    user: t.user,
    title: t.title,
    body: t.body,
    when: bucket,
  }));
}

export function pulseEvents(playMs = 0): PulseEvent[] {
  const slot = Math.floor(playMs / (5 * 60 * 1000));
  const pulse = `play-${slot}`;
  const rng = seededRng(`pulse-${pulse}`);
  const places = ['rn:shift', 'rn:discover', 'rn:archive', 'rn:chronicle'];
  return pickMany(rng, [...PULSE_LINES], 4).map((line, i) => ({
    id: `pulse-${pulse}-${i}`,
    line,
    action: places[i % places.length],
  }));
}

export function mergedMail(day = todayKey(), playMs = 0) {
  const bucket = playHourBucket(playMs);
  const all = [...dailyMail(day), ...hourlyMail(bucket), ...chronicleMailActive(playMs)];
  // daily and hourly draw from the same written pool, so the inbox can pick the
  // same letter twice. keep the first copy.
  const seen = new Set<string>();
  return all.filter((m) => (seen.has(m.subject) ? false : (seen.add(m.subject), true)));
}

export function mergedWiki(day = todayKey(), playMs = 0) {
  const bucket = playHourBucket(playMs);
  const all = [...dailyWikiFragments(day), ...hourlyWiki(bucket), ...chronicleWikiActive(playMs)];
  const seen = new Set<string>();
  return all.filter((w) => (seen.has(w.title) ? false : (seen.add(w.title), true)));
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
