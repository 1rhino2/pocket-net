import type { ShiftMission, ShiftMissionKind } from './contentEngine';
import { CHRONICLE_HOURS } from './chronicle24';
import { PERMANENT_NODES } from './nodeCatalog';
import { seededRng } from '../lib/seed';

const KINDS: ShiftMissionKind[] = [
  'navs', 'searches', 'mailsRead', 'wikiReads', 'commands', 'nodes', 'discover', 'chronicleSignals',
  'hackWins', 'arcadeWins', 'stamps',
];

/** 96 permanent contracts - always on the board, never rotate away. */
export function expeditionMissions(baselines: Record<ShiftMissionKind, number>): ShiftMission[] {
  const rng = seededRng('expedition-v1');
  const out: ShiftMission[] = [];

  for (let i = 0; i < 96; i++) {
    const kind = KINDS[i % KINDS.length] ?? 'navs';
    const goal =
      kind === 'nodes' ? 1 :
        kind === 'stamps' ? 1 :
          kind === 'hackWins' || kind === 'arcadeWins' ? 1 :
            kind === 'chronicleSignals' ? 2 + (i % 4) :
              kind === 'discover' ? 5 + (i % 8) :
                3 + (i % 6);

    let title = '';
    let blurb = '';
    let targetNode: string | undefined;
    const ch = CHRONICLE_HOURS[i % 24]!;

    if (kind === 'nodes') {
      const node = PERMANENT_NODES[i % PERMANENT_NODES.length]!;
      targetNode = node.url;
      title = `Expedition ping: ${node.title.slice(0, 32)}`;
      blurb = `Open ${node.url} and log the node.`;
    } else if (kind === 'chronicleSignals') {
      title = `File ${goal} chronicle traces`;
      blurb = `Any chapter. Traces from rn:chronicle and rn:h-* pages.`;
    } else if (kind === 'discover') {
      title = `Log ${goal} discoveries`;
      blurb = 'Grow the discovery chart.';
    } else if (kind === 'searches') {
      title = `Search ops x${goal}`;
      blurb = `Try "${ch.searchPhrase}" or any index term.`;
    } else if (kind === 'navs') {
      title = `Tour ${goal} routes`;
      blurb = `Visit ${ch.url} and other rn: pages.`;
    } else if (kind === 'mailsRead') {
      title = `Read ${goal} messages`;
      blurb = 'Inbox includes all chronicle mail at once.';
    } else if (kind === 'wikiReads') {
      title = `Wiki depth x${goal}`;
      blurb = 'All chronicle articles are in PocketWiki now.';
    } else if (kind === 'commands') {
      title = `Shell x${goal}`;
      blurb = 'Terminal commands count.';
    } else if (kind === 'hackWins') {
      title = 'Cipher win';
      blurb = 'Score 70+ on Cipher Drill.';
    } else if (kind === 'arcadeWins') {
      title = 'Needle clear';
      blurb = 'Clear RhinoReflex once.';
    } else {
      title = 'Stamp ping';
      blurb = 'Collect a map ghost stamp.';
    }

    out.push({
      id: `exp-${i}`,
      hourKey: 'expedition',
      title,
      blurb,
      reward: 10 + Math.floor(rng() * 22),
      integrity: i % 11 === 0 ? 1 : undefined,
      kind,
      goal,
      baseline: kind === 'chronicleSignals' ? 0 : baselines[kind] ?? 0,
      targetNode,
    });
  }

  return out;
}
