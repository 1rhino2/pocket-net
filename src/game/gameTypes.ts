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
};

const STORAGE_KEY = 'rn_game_v1';

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

export function loadGame(): GameSnapshot {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        credits: 0,
        integrity: 72,
        achievements: [],
        stats: defaultStats(),
        questsDone: [],
        dailyClaimDay: '',
      };
    }
    const p = JSON.parse(raw) as Partial<GameSnapshot>;
    return {
      credits: typeof p.credits === 'number' ? p.credits : 0,
      integrity: typeof p.integrity === 'number' ? Math.min(100, Math.max(0, p.integrity)) : 72,
      achievements: Array.isArray(p.achievements) ? p.achievements.filter((x) => typeof x === 'string') : [],
      stats: { ...defaultStats(), ...(p.stats ?? {}) },
      questsDone: Array.isArray(p.questsDone) ? p.questsDone.filter((x) => typeof x === 'string') : [],
      dailyClaimDay: typeof p.dailyClaimDay === 'string' ? p.dailyClaimDay : '',
    };
  } catch {
    return {
      credits: 0,
      integrity: 72,
      achievements: [],
      stats: defaultStats(),
      questsDone: [],
      dailyClaimDay: '',
    };
  }
}

export function saveGame(s: GameSnapshot) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

export const FORUM_STORAGE_KEY = 'rn_forum_posts_v1';
export const CART_STORAGE_KEY = 'rn_mart_cart_v1';
export const MAIL_READ_KEY = 'rn_mail_read_v1';

export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}
