import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { discoveryMeta, totalDiscoveryGoal } from '../data/discoveryCatalog';
import { permanentNodeByUrl } from '../data/nodeCatalog';
import { QUESTS, questContext } from '../data/quests';
import {
  chronicleProgress as chronicleProgressCalc,
  hourFromUrl,
  tryChronicleSearchSignal,
} from '../data/chronicle24';
import { weekKey } from '../lib/seed';
import { isHourUrl, isNodeUrl } from '../types';
import { canCollectHourSignal, maybeCompleteHour, tryInterludeDiscovery, withChronicleSync } from './chronicleLogic';
import { loadGame, saveGame, todayKey, type GameSnapshot, type GameStats } from './gameTypes';
import { missionReady, refreshShiftMissions } from './shiftLogic';

type Ctx = {
  snapshot: GameSnapshot;
  toast: string | null;
  setToast: (t: string | null, ms?: number) => void;
  addCredits: (n: number) => void;
  bumpIntegrity: (d: number) => void;
  unlockAchievement: (id: string, title: string) => void;
  recordDiscovery: (id: string, opts?: { silent?: boolean }) => boolean;
  recordStamp: (stampId: string) => void;
  discoveryProgress: () => { found: number; goal: number; pct: number };
  recordNav: (url: string) => void;
  recordSearch: (query?: string) => void;
  recordPost: () => void;
  recordCommand: () => void;
  recordMartAdd: () => void;
  recordArcadeRound: () => void;
  recordArcadeComplete: (total: number) => void;
  awardBootBonus: () => void;
  recordVirusChoice: (kind: 'quarantine' | 'smile' | 'abort', quality?: number) => void;
  recordMailRead: (mailId?: string) => void;
  recordWikiRead: (articleId?: string) => void;
  recordHackComplete: (score: number) => void;
  recordChatMessage: () => void;
  recordJobApply: () => void;
  recordWeatherCheck: () => void;
  recordRadioTune: () => void;
  claimDailyBonus: () => boolean;
  claimWeeklyBonus: () => boolean;
  completeQuest: (questId: string) => void;
  pendingQuestCount: () => number;
  completeShiftMission: (missionId: string) => void;
  recordNodeVisit: (url: string) => void;
  recordHourSignal: (signalId: string) => boolean;
  recordChronicleSearch: (query: string) => void;
  chronicleProgress: () => ReturnType<typeof import('../data/chronicle24').chronicleProgress>;
};

const GameCtx = createContext<Ctx | null>(null);

const BOOT_FLAG = 'rn_boot_bonus_v1';
const NAV_SESSION = 'rn_nav_dedupe_v1';

const NAV_ACHIEVEMENTS: { url: string; id: string; title: string }[] = [
  { url: 'rn:mail', id: 'visit_mail', title: 'Inbox zero cosplay' },
  { url: 'rn:wiki', id: 'visit_wiki', title: 'Pocket scholar' },
  { url: 'rn:hack', id: 'visit_hack', title: 'Cipher curious' },
  { url: 'rn:quests', id: 'visit_quests', title: 'Contract hunter' },
  { url: 'rn:map', id: 'visit_map', title: 'Cartographer' },
  { url: 'rn:chat', id: 'visit_chat', title: 'Relay tourist' },
  { url: 'rn:radio', id: 'visit_radio', title: 'Listener' },
  { url: 'rn:weather', id: 'visit_weather', title: 'Cloud watcher' },
  { url: 'rn:jobs', id: 'visit_jobs', title: 'Applicant' },
  { url: 'rn:discover', id: 'visit_discover', title: 'Signal clerk' },
  { url: 'rn:archive', id: 'visit_archive', title: 'Archive browser' },
  { url: 'rn:shift', id: 'visit_shift', title: 'Index browser' },
  { url: 'rn:chronicle', id: 'visit_chronicle', title: 'Explorer' },
];

const SITE_DISCOVERY: Record<string, string> = {
  'rn:home': 'site_home',
  'rn:search': 'site_search',
  'rn:directory': 'site_directory',
  'rn:forum': 'site_forum',
  'rn:mart': 'site_mart',
  'rn:mail': 'site_mail',
  'rn:weather': 'site_weather',
  'rn:radio': 'site_radio',
  'rn:wiki': 'site_wiki',
  'rn:jobs': 'site_jobs',
  'rn:chat': 'site_chat',
  'rn:hack': 'site_hack',
  'rn:map': 'site_map',
  'rn:arcade': 'site_arcade',
  'rn:quests': 'site_quests',
  'rn:status': 'site_status',
  'rn:readme': 'site_readme',
  'rn:discover': 'site_discover',
  'rn:archive': 'site_archive',
  'rn:shift': 'site_shift',
  'rn:chronicle': 'site_chronicle',
  'rn:ghost': 'secret_ghost',
  'rn:bunker': 'secret_bunker',
  'rn:cache': 'secret_cache',
  'rn:relay': 'secret_relay',
  'rn:lint': 'secret_lint',
  'rn:midnight': 'secret_midnight',
};

function readNavDedupe(): Set<string> {
  try {
    const raw = sessionStorage.getItem(NAV_SESSION);
    if (!raw) return new Set();
    const a = JSON.parse(raw) as unknown;
    if (!Array.isArray(a)) return new Set();
    return new Set(a.filter((x) => typeof x === 'string'));
  } catch {
    return new Set();
  }
}

function writeNavDedupe(s: Set<string>) {
  sessionStorage.setItem(NAV_SESSION, JSON.stringify([...s].slice(-160)));
}

function discoveryReward(category: string | undefined) {
  if (category === 'secret') return 12;
  if (category === 'stamp') return 8;
  if (category === 'milestone') return 15;
  if (category === 'weekly') return 10;
  if (category === 'chronicle') return 9;
  return 5;
}

function autoMilestones(s: GameSnapshot): string[] {
  const have = new Set(s.discovered);
  const out: string[] = [];
  const push = (id: string) => {
    if (!have.has(id)) {
      out.push(id);
      have.add(id);
    }
  };
  const n = s.discovered.length;
  const stamps = s.stamps.length;
  const hours = s.playMs / (60 * 60 * 1000);
  const quests = s.questsDone.length;

  if (n >= 10) push('mile_disc_10');
  if (n >= 25) push('mile_disc_25');
  if (n >= 50) push('mile_disc_50');
  if (n >= 75) push('mile_disc_75');
  if (n >= 100) push('mile_disc_100');
  if (n >= 150) push('mile_disc_150');
  if (n >= 200) push('mile_disc_200');
  if (hours >= 1) push('mile_time_1h');
  if (hours >= 5) push('mile_time_5h');
  if (hours >= 10) push('mile_time_10h');
  if (stamps >= 10) push('mile_stamp_10');
  if (stamps >= 25) push('mile_stamp_25');
  if (stamps >= 40) push('mile_stamp_40');
  if (quests >= 15) push('mile_quest_15');
  if (quests >= 30) push('mile_quest_30');
  return out;
}

function unlockMilestoneAchievements(s: GameSnapshot, unlock: (id: string, title: string) => void) {
  for (const id of s.discovered) {
    const meta = discoveryMeta(id);
    if (meta?.category === 'milestone') unlock(id, meta.title);
  }
}

function withSession(s: GameSnapshot): GameSnapshot {
  return refreshShiftMissions(withChronicleSync(s));
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<GameSnapshot>(() => withSession(loadGame()));
  const [toast, setToastState] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);
  const playTick = useRef<number | null>(null);

  const setToast = useCallback((t: string | null, ms = 3200) => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    setToastState(t);
    if (t && ms > 0) {
      toastTimer.current = window.setTimeout(() => setToastState(null), ms);
    }
  }, []);

  const persist = useCallback((fn: (s: GameSnapshot) => GameSnapshot) => {
    setSnapshot((s) => {
      const next = withSession(fn(s));
      saveGame(next);
      return next;
    });
  }, []);

  useEffect(() => {
    playTick.current = window.setInterval(() => {
      persist((s) => {
        let next = { ...s, playMs: s.playMs + 15000 };
        const inter = tryInterludeDiscovery(next);
        if (inter) {
          next = {
            ...next,
            discovered: [...next.discovered, inter.id],
            credits: next.credits + 6,
          };
          queueMicrotask(() => setToast(`Interlude filed: ${inter.title}`, 3200));
        }
        const extras = autoMilestones(next);
        if (extras.length === 0) return next;
        let credits = next.credits;
        credits += extras.length * discoveryReward('milestone');
        return { ...next, discovered: [...next.discovered, ...extras], credits };
      });
    }, 15000);
    return () => {
      if (playTick.current) window.clearInterval(playTick.current);
    };
  }, [persist, setToast]);

  useEffect(() => {
    const tick = window.setInterval(() => {
      persist((s) => s);
    }, 30000);
    return () => window.clearInterval(tick);
  }, [persist]);

  const addCredits = useCallback(
    (n: number) => {
      if (n === 0) return;
      persist((s) => ({ ...s, credits: Math.max(0, s.credits + n) }));
    },
    [persist],
  );

  const bumpIntegrity = useCallback(
    (d: number) => {
      persist((s) => ({
        ...s,
        integrity: Math.min(100, Math.max(0, s.integrity + d)),
      }));
    },
    [persist],
  );

  const unlockAchievement = useCallback(
    (id: string, title: string) => {
      persist((s) => {
        if (s.achievements.includes(id)) return s;
        queueMicrotask(() => setToast(`Unlocked: ${title}`, 4200));
        return { ...s, achievements: [...s.achievements, id] };
      });
    },
    [persist, setToast],
  );

  const recordDiscovery = useCallback(
    (id: string, opts?: { silent?: boolean }) => {
      let added = false;
      persist((s) => {
        if (s.discovered.includes(id)) return s;
        added = true;
        const meta = discoveryMeta(id);
        let discovered = [...s.discovered, id];
        let credits = s.credits + discoveryReward(meta?.category);
        const draft = { ...s, discovered, credits };
        const extras = autoMilestones(draft);
        credits += extras.length * discoveryReward('milestone');
        discovered = [...discovered, ...extras];
        const next = { ...s, discovered, credits };
        queueMicrotask(() => {
          if (!opts?.silent && meta) {
            setToast(`Discovered: ${meta.title} (+${discoveryReward(meta.category)} RC)`, 3800);
          }
          unlockMilestoneAchievements(next, unlockAchievement);
        });
        return next;
      });
      return added;
    },
    [persist, setToast, unlockAchievement],
  );

  const recordStamp = useCallback(
    (stampId: string) => {
      persist((s) => {
        if (s.stamps.includes(stampId)) return s;
        return { ...s, stamps: [...s.stamps, stampId] };
      });
      recordDiscovery(stampId, { silent: true });
    },
    [persist, recordDiscovery],
  );

  const discoveryProgress = useCallback(() => {
    const goal = totalDiscoveryGoal();
    const found = snapshot.discovered.length;
    const pct = Math.min(100, Math.round((found / goal) * 100));
    return { found, goal, pct };
  }, [snapshot.discovered.length]);

  const completeQuest = useCallback(
    (questId: string) => {
      const def = QUESTS.find((q) => q.id === questId);
      if (!def) return;
      persist((s) => {
        if (s.questsDone.includes(questId)) return s;
        if (!def.check(questContext(s))) return s;
        const credits = s.credits + def.reward;
        const integrity =
          def.integrity !== undefined
            ? Math.min(100, Math.max(0, s.integrity + def.integrity))
            : s.integrity;
        queueMicrotask(() =>
          setToast(`Quest complete: ${def.title} (+${def.reward} RC)`, 4000),
        );
        return {
          ...s,
          credits,
          integrity,
          questsDone: [...s.questsDone, questId],
        };
      });
    },
    [persist, setToast],
  );

  const tryAutoQuests = useCallback(
    (s: GameSnapshot) => {
      const ctx = questContext(s);
      for (const q of QUESTS) {
        if (s.questsDone.includes(q.id)) continue;
        if (q.check(ctx)) completeQuest(q.id);
      }
    },
    [completeQuest],
  );

  const patchStats = useCallback(
    (fn: (st: GameStats) => GameStats) => {
      persist((s) => {
        const stats = fn(s.stats);
        const next = { ...s, stats };
        queueMicrotask(() => tryAutoQuests(next));
        return next;
      });
    },
    [persist, tryAutoQuests],
  );

  const completeShiftMission = useCallback(
    (missionId: string) => {
      persist((s) => {
        const m = s.activeMissions.find((x) => x.id === missionId);
        if (!m || s.shiftMissionsDone.includes(missionId)) return s;
        if (!missionReady(m, s)) return s;
        queueMicrotask(() =>
          setToast(`Shift claimed: ${m.title} (+${m.reward} RC)`, 4000),
        );
        const integrity =
          m.integrity !== undefined
            ? Math.min(100, Math.max(0, s.integrity + m.integrity))
            : s.integrity;
        return {
          ...s,
          credits: s.credits + m.reward,
          integrity,
          shiftMissionsDone: [...s.shiftMissionsDone, missionId],
          shiftClaimsTotal: s.shiftClaimsTotal + 1,
        };
      });
    },
    [persist, setToast],
  );

  const recordHourSignal = useCallback(
    (signalId: string): boolean => {
      const match = /^chronicle_h(\d{2})_/.exec(signalId);
      if (!match) return false;
      const h = parseInt(match[1]!, 10);
      let added = false;
      persist((s) => {
        if (!canCollectHourSignal(h, s, signalId)) return s;
        if (s.hourSignalsFound.includes(signalId)) return s;
        added = true;
        let next: GameSnapshot = {
          ...s,
          hourSignalsFound: [...s.hourSignalsFound, signalId],
        };
        next = maybeCompleteHour(next, h);
        if (next.hoursCompleted.includes(h) && !s.hoursCompleted.includes(h)) {
          queueMicrotask(() => setToast('You have been sitting with this thread a while.', 4000));
        }
        queueMicrotask(() => tryAutoQuests(next));
        return next;
      });
      if (added) recordDiscovery(signalId, { silent: true });
      return added;
    },
    [persist, recordDiscovery, setToast, tryAutoQuests],
  );

  const recordNodeVisit = useCallback(
    (url: string) => {
      if (!isNodeUrl(url)) return;
      const slug = url.slice(5);
      persist((s) => {
        if (s.visitedNodes.includes(url)) return s;
        return { ...s, visitedNodes: [...s.visitedNodes, url] };
      });
      recordDiscovery(`node_${slug}`, { silent: true });
      const perm = permanentNodeByUrl(url);
      if (perm) {
        const sealId = `chronicle_h${String(perm.chapter).padStart(2, '0')}_s8`;
        recordHourSignal(sealId);
      }
    },
    [persist, recordDiscovery, recordHourSignal],
  );

  const recordChronicleSearch = useCallback(
    (query: string) => {
      const sigId = tryChronicleSearchSignal(query, snapshot.playMs);
      if (sigId) recordHourSignal(sigId);
    },
    [recordHourSignal, snapshot.playMs],
  );

  const chronicleProgress = useCallback(() => {
    return chronicleProgressCalc(
      new Set(snapshot.hourSignalsFound),
      snapshot.hoursCompleted,
      snapshot.playMs,
    );
  }, [snapshot.hourSignalsFound, snapshot.hoursCompleted, snapshot.playMs]);

  const recordNav = useCallback(
    (url: string) => {
      const discId = SITE_DISCOVERY[url];
      if (discId) recordDiscovery(discId, { silent: true });
      if (isNodeUrl(url)) recordNodeVisit(url);
      if (isHourUrl(url)) {
        const h = hourFromUrl(url);
        if (h !== null) recordDiscovery(`chronicle_page_${String(h).padStart(2, '0')}`, { silent: true });
      }

      const cur = readNavDedupe();
      const first = !cur.has(url);
      if (first) {
        cur.add(url);
        writeNavDedupe(cur);
        addCredits(2);
        patchStats((st) => ({ ...st, navs: st.navs + 1 }));
      }
      const hit = NAV_ACHIEVEMENTS.find((a) => a.url === url);
      if (hit) unlockAchievement(hit.id, hit.title);
      if (url === 'rn:arcade') unlockAchievement('visit_arcade', 'Arcade tourist');
    },
    [addCredits, patchStats, unlockAchievement, recordDiscovery, recordNodeVisit],
  );

  const recordSearch = useCallback(
    (query?: string) => {
      addCredits(3);
      patchStats((st) => ({ ...st, searches: st.searches + 1 }));
      unlockAchievement('first_search', 'Search operator');
      if (query) recordChronicleSearch(query);
    },
    [addCredits, patchStats, unlockAchievement, recordChronicleSearch],
  );

  const recordPost = useCallback(() => {
    addCredits(15);
    patchStats((st) => ({ ...st, posts: st.posts + 1 }));
    unlockAchievement('first_post', 'Forum regular');
  }, [addCredits, patchStats, unlockAchievement]);

  const recordCommand = useCallback(() => {
    addCredits(1);
    patchStats((st) => ({ ...st, commands: st.commands + 1 }));
  }, [addCredits, patchStats]);

  const recordMartAdd = useCallback(() => {
    addCredits(4);
    patchStats((st) => ({ ...st, martAdds: st.martAdds + 1 }));
  }, [addCredits, patchStats]);

  const recordArcadeRound = useCallback(() => {
    addCredits(2);
  }, [addCredits]);

  const recordArcadeComplete = useCallback(
    (total: number) => {
      addCredits(25 + Math.floor(total / 10));
      patchStats((st) => ({
        ...st,
        arcadeWins: st.arcadeWins + 1,
        arcadeBest: Math.max(st.arcadeBest, total),
      }));
      unlockAchievement('arcade_clear', 'Needle master');
    },
    [addCredits, patchStats, unlockAchievement],
  );

  const awardBootBonus = useCallback(() => {
    if (localStorage.getItem(BOOT_FLAG) === '1') return;
    localStorage.setItem(BOOT_FLAG, '1');
    addCredits(25);
    bumpIntegrity(3);
    queueMicrotask(() => setToast('Session grant: +25 RC, integrity +3', 3800));
  }, [addCredits, bumpIntegrity, setToast]);

  const recordVirusChoice = useCallback(
    (kind: 'quarantine' | 'smile' | 'abort', quality = 0) => {
      const q = Math.min(3, Math.max(0, quality));
      if (kind === 'abort') {
        addCredits(4);
        bumpIntegrity(3);
        unlockAchievement('virus_bail', 'Closed the door');
        return;
      }
      patchStats((st) => ({ ...st, virusRuns: st.virusRuns + 1 }));
      if (kind === 'quarantine') {
        addCredits(10 + q * 5);
        bumpIntegrity(5 + q * 2);
        unlockAchievement('quarantine', 'Containment officer');
        if (q >= 3) unlockAchievement('virus_flawless_quarantine', 'Lab-clean install');
      } else {
        addCredits(4 + q * 3);
        bumpIntegrity(-3 - Math.min(5, q + 1));
        unlockAchievement('smile', 'Optimist.exe');
        if (q >= 3) unlockAchievement('virus_full_smile', 'Trusted the grin');
      }
    },
    [addCredits, bumpIntegrity, patchStats, unlockAchievement],
  );

  const recordMailRead = useCallback(
    (mailId?: string) => {
      addCredits(1);
      patchStats((st) => ({ ...st, mailsRead: st.mailsRead + 1 }));
      if (mailId?.startsWith('daily-')) {
        const day = mailId.split('-')[1];
        if (day) recordDiscovery(`daily_${day}_mail_0`, { silent: true });
      }
      if (mailId?.startsWith('play-') || mailId?.startsWith('hour-')) {
        recordDiscovery(mailId, { silent: true });
      }
      if (mailId?.startsWith('chronicle-mail-')) {
        recordDiscovery(mailId, { silent: true });
        const match = /chronicle-mail-(\d{2})/.exec(mailId);
        if (match) {
          const sealId = `chronicle_h${match[1]}_s6`;
          queueMicrotask(() => recordHourSignal(sealId));
        }
      }
    },
    [addCredits, patchStats, recordDiscovery, recordHourSignal, persist],
  );

  const recordWikiRead = useCallback(
    (articleId?: string) => {
      addCredits(2);
      patchStats((st) => ({ ...st, wikiReads: st.wikiReads + 1 }));
      unlockAchievement('wiki_reader', 'Article hopper');
      if (articleId?.startsWith('daily-')) {
        const parts = articleId.split('-');
        const day = parts[1];
        const idx = parts[2]?.replace('w', '') ?? '0';
        if (day) recordDiscovery(`daily_${day}_wiki_${idx}`, { silent: true });
      }
      if (articleId?.startsWith('play-') || articleId?.startsWith('hour-')) {
        recordDiscovery(articleId, { silent: true });
      }
      if (articleId?.startsWith('chronicle-wiki-')) {
        recordDiscovery(articleId, { silent: true });
        const match = /chronicle-wiki-(\d{2})/.exec(articleId);
        if (match) {
          const sealId = `chronicle_h${match[1]}_s7`;
          queueMicrotask(() => recordHourSignal(sealId));
        }
      }
    },
    [addCredits, patchStats, unlockAchievement, recordDiscovery, recordHourSignal],
  );

  const recordHackComplete = useCallback(
    (score: number) => {
      const win = score >= 70;
      addCredits(win ? 8 + Math.floor(score / 15) : 2);
      patchStats((st) => ({
        ...st,
        hackBest: Math.max(st.hackBest, score),
        hackWins: win ? st.hackWins + 1 : st.hackWins,
      }));
      if (win) unlockAchievement('hack_win', 'Cipher runner');
    },
    [addCredits, patchStats, unlockAchievement],
  );

  const recordChatMessage = useCallback(() => {
    patchStats((st) => ({ ...st, chatMsgs: st.chatMsgs + 1 }));
  }, [patchStats]);

  const recordJobApply = useCallback(() => {
    addCredits(5);
    patchStats((st) => ({ ...st, jobsApplied: st.jobsApplied + 1 }));
    unlockAchievement('job_hunter', 'Applicant');
  }, [addCredits, patchStats, unlockAchievement]);

  const recordWeatherCheck = useCallback(() => {
    persist((s) => {
      const weatherChecks = s.stats.weatherChecks + 1;
      if (weatherChecks >= 3 && !s.achievements.includes('weather_3')) {
        queueMicrotask(() => unlockAchievement('weather_3', 'Meteorology hobbyist'));
      }
      const next = {
        ...s,
        credits: s.credits + 1,
        stats: { ...s.stats, weatherChecks },
      };
      queueMicrotask(() => tryAutoQuests(next));
      return next;
    });
  }, [persist, unlockAchievement, tryAutoQuests]);

  const recordRadioTune = useCallback(() => {
    addCredits(1);
    patchStats((st) => ({ ...st, radioTunes: st.radioTunes + 1 }));
    unlockAchievement('radio_tune', 'On the air');
  }, [addCredits, patchStats, unlockAchievement]);

  const claimDailyBonus = useCallback(() => {
    const day = todayKey();
    if (snapshot.dailyClaimDay === day) return false;
    persist((s) => ({
      ...s,
      dailyClaimDay: day,
      credits: s.credits + 15,
      integrity: Math.min(100, s.integrity + 2),
    }));
    setToast('Daily stipend: +15 RC, integrity +2', 3800);
    unlockAchievement('daily_claim', 'Stipend collector');
    recordDiscovery(`daily_${day}_stipend`, { silent: true });
    return true;
  }, [persist, setToast, snapshot.dailyClaimDay, unlockAchievement, recordDiscovery]);

  const claimWeeklyBonus = useCallback(() => {
    const week = weekKey();
    if (snapshot.weeklyClaimKey === week) return false;
    persist((s) => ({
      ...s,
      weeklyClaimKey: week,
      credits: s.credits + 45,
      integrity: Math.min(100, s.integrity + 4),
    }));
    setToast('Weekly archive grant: +45 RC, integrity +4', 4000);
    recordDiscovery(`weekly_${week}`, { silent: true });
    return true;
  }, [persist, setToast, snapshot.weeklyClaimKey, recordDiscovery]);

  const pendingQuestCount = useCallback(() => {
    const ctx = questContext(snapshot);
    return QUESTS.filter((q) => !snapshot.questsDone.includes(q.id) && q.check(ctx)).length;
  }, [snapshot]);

  const value: Ctx = {
    snapshot,
    toast,
    setToast,
    addCredits,
    bumpIntegrity,
    unlockAchievement,
    recordDiscovery,
    recordStamp,
    discoveryProgress,
    recordNav,
    recordSearch,
    recordPost,
    recordCommand,
    recordMartAdd,
    recordArcadeRound,
    recordArcadeComplete,
    awardBootBonus,
    recordVirusChoice,
    recordMailRead,
    recordWikiRead,
    recordHackComplete,
    recordChatMessage,
    recordJobApply,
    recordWeatherCheck,
    recordRadioTune,
    claimDailyBonus,
    claimWeeklyBonus,
    completeQuest,
    pendingQuestCount,
    completeShiftMission,
    recordNodeVisit,
    recordHourSignal,
    recordChronicleSearch,
    chronicleProgress,
  };

  return <GameCtx.Provider value={value}>{children}</GameCtx.Provider>;
}

export function useGame() {
  const v = useContext(GameCtx);
  if (!v) throw new Error('useGame outside GameProvider');
  return v;
}
