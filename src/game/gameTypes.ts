import type { ShiftMission } from '../data/contentEngine';

export { todayKey, hourKey, playHour, playHourBucket, formatPlayMs, CHRONICLE_RUN_MS, PLAY_HOUR_MS } from '../lib/seed';

export type GameStats = {
  searches: number;
  posts: number;
  commands: number;
  navs: number;
  martAdds: number;
  arcadeWins: number;
  arcadeBest: number;
  virusRuns: number;
  mailsRead: number;
  wikiReads: number;
  hackWins: number;
  hackBest: number;
  chatMsgs: number;
  jobsApplied: number;
  weatherChecks: number;
  radioTunes: number;
};

export type GameSnapshot = {
  credits: number;
  integrity: number;
  achievements: string[];
  stats: GameStats;
  questsDone: string[];
  dailyClaimDay: string;
  discovered: string[];
  stamps: string[];
  playMs: number;
  weeklyClaimKey: string;
  shiftHourKey: string;
  shiftPlayHour: number;
  activeMissions: ShiftMission[];
  shiftMissionsDone: string[];
  shiftClaimsTotal: number;
  visitedNodes: string[];
  chronicleDay: string;
  hoursUnlocked: number[];
  hourSignalsFound: string[];
  hoursCompleted: number[];
};

const STORAGE_V2 = 'rn_game_v2';
const STORAGE_V1 = 'rn_game_v1';

const defaultStats = (): GameStats => ({
  searches: 0,
  posts: 0,
  commands: 0,
  navs: 0,
  martAdds: 0,
  arcadeWins: 0,
  arcadeBest: 0,
  virusRuns: 0,
  mailsRead: 0,
  wikiReads: 0,
  hackWins: 0,
  hackBest: 0,
  chatMsgs: 0,
  jobsApplied: 0,
  weatherChecks: 0,
  radioTunes: 0,
});

function freshSnapshot(): GameSnapshot {
  return {
    credits: 0,
    integrity: 72,
    achievements: [],
    stats: defaultStats(),
    questsDone: [],
    dailyClaimDay: '',
    discovered: [],
    stamps: [],
    playMs: 0,
    weeklyClaimKey: '',
    shiftHourKey: '',
    shiftPlayHour: -1,
    activeMissions: [],
    shiftMissionsDone: [],
    shiftClaimsTotal: 0,
    visitedNodes: [],
    chronicleDay: '',
    hoursUnlocked: [],
    hourSignalsFound: [],
    hoursCompleted: [],
  };
}

function normalize(p: Partial<GameSnapshot>): GameSnapshot {
  const base = freshSnapshot();
  return {
    credits: typeof p.credits === 'number' ? p.credits : base.credits,
    integrity: typeof p.integrity === 'number' ? Math.min(100, Math.max(0, p.integrity)) : base.integrity,
    achievements: Array.isArray(p.achievements) ? p.achievements.filter((x) => typeof x === 'string') : [],
    stats: { ...base.stats, ...(p.stats ?? {}) },
    questsDone: Array.isArray(p.questsDone) ? p.questsDone.filter((x) => typeof x === 'string') : [],
    dailyClaimDay: typeof p.dailyClaimDay === 'string' ? p.dailyClaimDay : '',
    discovered: Array.isArray(p.discovered) ? p.discovered.filter((x) => typeof x === 'string') : [],
    stamps: Array.isArray(p.stamps) ? p.stamps.filter((x) => typeof x === 'string') : [],
    playMs: typeof p.playMs === 'number' ? Math.max(0, p.playMs) : 0,
    weeklyClaimKey: typeof p.weeklyClaimKey === 'string' ? p.weeklyClaimKey : '',
    shiftHourKey: typeof p.shiftHourKey === 'string' ? p.shiftHourKey : '',
    shiftPlayHour: typeof p.shiftPlayHour === 'number' ? p.shiftPlayHour : -1,
    activeMissions: Array.isArray(p.activeMissions) ? (p.activeMissions as ShiftMission[]) : [],
    shiftMissionsDone: Array.isArray(p.shiftMissionsDone) ? p.shiftMissionsDone.filter((x) => typeof x === 'string') : [],
    shiftClaimsTotal: typeof p.shiftClaimsTotal === 'number' ? p.shiftClaimsTotal : 0,
    visitedNodes: Array.isArray(p.visitedNodes) ? p.visitedNodes.filter((x) => typeof x === 'string') : [],
    chronicleDay: typeof p.chronicleDay === 'string' ? p.chronicleDay : '',
    hoursUnlocked: Array.isArray(p.hoursUnlocked)
      ? p.hoursUnlocked.filter((x) => typeof x === 'number' && x >= 0 && x <= 23)
      : [],
    hourSignalsFound: Array.isArray(p.hourSignalsFound) ? p.hourSignalsFound.filter((x) => typeof x === 'string') : [],
    hoursCompleted: Array.isArray(p.hoursCompleted)
      ? p.hoursCompleted.filter((x) => typeof x === 'number' && x >= 0 && x <= 23)
      : [],
  };
}

export function loadGame(): GameSnapshot {
  try {
    const rawV2 = localStorage.getItem(STORAGE_V2);
    if (rawV2) {
      return normalize(JSON.parse(rawV2) as Partial<GameSnapshot>);
    }
    const rawV1 = localStorage.getItem(STORAGE_V1);
    if (rawV1) {
      const migrated = normalize(JSON.parse(rawV1) as Partial<GameSnapshot>);
      saveGame(migrated);
      return migrated;
    }
    return freshSnapshot();
  } catch {
    return freshSnapshot();
  }
}

export function saveGame(s: GameSnapshot) {
  localStorage.setItem(STORAGE_V2, JSON.stringify(s));
}

export const FORUM_STORAGE_KEY = 'rn_forum_posts_v1';
export const CART_STORAGE_KEY = 'rn_mart_cart_v1';
export const MAIL_READ_KEY = 'rn_mail_read_v1';
