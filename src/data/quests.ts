import type { GameSnapshot, GameStats } from '../game/gameTypes';

export type QuestContext = {
  stats: GameStats;
  discovered: string[];
  stamps: string[];
  playMs: number;
  shiftClaimsTotal: number;
  shiftMissionsDone: string[];
  visitedNodes: string[];
  hoursCompleted: number[];
  hourSignalsFound: string[];
};

export type QuestDef = {
  id: string;
  title: string;
  blurb: string;
  reward: number;
  integrity?: number;
  tier?: 'starter' | 'daily' | 'deep' | 'legend';
  check: (ctx: QuestContext) => boolean;
};

function discCount(ctx: QuestContext, n: number) {
  return ctx.discovered.length >= n;
}

function stampCount(ctx: QuestContext, n: number) {
  return ctx.stamps.length >= n;
}

function hours(ctx: QuestContext, h: number) {
  return ctx.playMs >= h * 60 * 60 * 1000;
}

export const QUESTS: QuestDef[] = [
  {
    id: 'q_nav_5',
    title: 'Tourist loop',
    blurb: 'Visit 5 unique rn: pages this session.',
    reward: 12,
    tier: 'starter',
    check: (c) => c.stats.navs >= 5,
  },
  {
    id: 'q_search_3',
    title: 'Search operator',
    blurb: 'Run 3 searches on RhinoSearch.',
    reward: 10,
    tier: 'starter',
    check: (c) => c.stats.searches >= 3,
  },
  {
    id: 'q_post_1',
    title: 'Voice of the forum',
    blurb: 'Publish one forum thread.',
    reward: 18,
    integrity: 2,
    tier: 'starter',
    check: (c) => c.stats.posts >= 1,
  },
  {
    id: 'q_arcade_1',
    title: 'Reflex graduate',
    blurb: 'Clear one full RhinoReflex run.',
    reward: 22,
    tier: 'starter',
    check: (c) => c.stats.arcadeWins >= 1,
  },
  {
    id: 'q_mail_3',
    title: 'Inbox janitor',
    blurb: 'Read 3 RhinoMail messages.',
    reward: 8,
    tier: 'starter',
    check: (c) => c.stats.mailsRead >= 3,
  },
  {
    id: 'q_wiki_4',
    title: 'Scholar',
    blurb: 'Open 4 PocketWiki articles.',
    reward: 14,
    tier: 'starter',
    check: (c) => c.stats.wikiReads >= 4,
  },
  {
    id: 'q_hack_1',
    title: 'Cipher runner',
    blurb: 'Finish one Cipher Drill with 70+ score.',
    reward: 16,
    tier: 'starter',
    check: (c) => c.stats.hackWins >= 1,
  },
  {
    id: 'q_cmd_10',
    title: 'Shell tourist',
    blurb: 'Run 10 terminal commands.',
    reward: 9,
    tier: 'starter',
    check: (c) => c.stats.commands >= 10,
  },
  {
    id: 'q_virus_1',
    title: 'Smile survivor',
    blurb: 'Complete FREE_SMILE once (any ending).',
    reward: 20,
    tier: 'starter',
    check: (c) => c.stats.virusRuns >= 1,
  },
  {
    id: 'q_chat_5',
    title: 'Relay regular',
    blurb: 'Send 5 messages in Relay Chat.',
    reward: 7,
    tier: 'starter',
    check: (c) => c.stats.chatMsgs >= 5,
  },
  {
    id: 'q_disc_10',
    title: 'Signal hunter',
    blurb: 'Log 10 discoveries in the Discovery Log.',
    reward: 20,
    tier: 'daily',
    check: (c) => discCount(c, 10),
  },
  {
    id: 'q_disc_25',
    title: 'Field notes',
    blurb: 'Log 25 discoveries.',
    reward: 35,
    integrity: 2,
    tier: 'daily',
    check: (c) => discCount(c, 25),
  },
  {
    id: 'q_disc_50',
    title: 'Indexer',
    blurb: 'Log 50 discoveries.',
    reward: 55,
    tier: 'deep',
    check: (c) => discCount(c, 50),
  },
  {
    id: 'q_disc_100',
    title: 'Archivist',
    blurb: 'Log 100 discoveries.',
    reward: 90,
    integrity: 4,
    tier: 'deep',
    check: (c) => discCount(c, 100),
  },
  {
    id: 'q_stamp_5',
    title: 'Stamp runner',
    blurb: 'Collect 5 map stamps from ghost nodes.',
    reward: 24,
    tier: 'daily',
    check: (c) => stampCount(c, 5),
  },
  {
    id: 'q_stamp_15',
    title: 'Album half-full',
    blurb: 'Collect 15 stamps.',
    reward: 48,
    tier: 'deep',
    check: (c) => stampCount(c, 15),
  },
  {
    id: 'q_stamp_30',
    title: 'Packet philatelist',
    blurb: 'Collect 30 stamps.',
    reward: 80,
    tier: 'legend',
    check: (c) => stampCount(c, 30),
  },
  {
    id: 'q_secret_2',
    title: 'Hidden routes',
    blurb: 'Find 2 secret rn: pages.',
    reward: 30,
    tier: 'deep',
    check: (c) => c.discovered.filter((d) => d.startsWith('secret_')).length >= 2,
  },
  {
    id: 'q_secret_all',
    title: 'Black map',
    blurb: 'Find every secret rn: page.',
    reward: 120,
    integrity: 5,
    tier: 'legend',
    check: (c) => c.discovered.filter((d) => d.startsWith('secret_')).length >= 6,
  },
  {
    id: 'q_search_25',
    title: 'Search addict',
    blurb: 'Run 25 searches (daily rumors count).',
    reward: 40,
    tier: 'deep',
    check: (c) => c.stats.searches >= 25,
  },
  {
    id: 'q_wiki_20',
    title: 'Margin scholar',
    blurb: 'Open 20 wiki articles including daily fragments.',
    reward: 45,
    tier: 'deep',
    check: (c) => c.stats.wikiReads >= 20,
  },
  {
    id: 'q_mail_20',
    title: 'Inbox archaeologist',
    blurb: 'Read 20 mails including daily drift mail.',
    reward: 38,
    tier: 'deep',
    check: (c) => c.stats.mailsRead >= 20,
  },
  {
    id: 'q_arcade_10',
    title: 'Needle addict',
    blurb: 'Clear RhinoReflex 10 times.',
    reward: 70,
    tier: 'legend',
    check: (c) => c.stats.arcadeWins >= 10,
  },
  {
    id: 'q_time_1h',
    title: 'Hour on the wire',
    blurb: 'Spend 1 hour in RhinoNet (save tracks playtime).',
    reward: 25,
    tier: 'deep',
    check: (c) => hours(c, 1),
  },
  {
    id: 'q_time_5h',
    title: 'Long shift',
    blurb: 'Spend 5 hours in RhinoNet.',
    reward: 60,
    tier: 'legend',
    check: (c) => hours(c, 5),
  },
];

export function questContext(s: GameSnapshot): QuestContext {
  return {
    stats: s.stats,
    discovered: s.discovered,
    stamps: s.stamps,
    playMs: s.playMs,
    shiftClaimsTotal: s.shiftClaimsTotal,
    shiftMissionsDone: s.shiftMissionsDone,
    visitedNodes: s.visitedNodes,
    hoursCompleted: s.hoursCompleted,
    hourSignalsFound: s.hourSignalsFound,
  };
}
