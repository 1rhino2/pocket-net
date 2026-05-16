import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { QUESTS } from '../data/quests';
import { loadGame, saveGame, todayKey, type GameSnapshot, type GameStats } from './gameTypes';

type Ctx = {
  snapshot: GameSnapshot;
  toast: string | null;
  setToast: (t: string | null, ms?: number) => void;
  addCredits: (n: number) => void;
  bumpIntegrity: (d: number) => void;
  unlockAchievement: (id: string, title: string) => void;
  recordNav: (url: string) => void;
  recordSearch: () => void;
  recordPost: () => void;
  recordCommand: () => void;
  recordMartAdd: () => void;
  recordArcadeRound: () => void;
  recordArcadeComplete: (total: number) => void;
  awardBootBonus: () => void;
  recordVirusChoice: (kind: 'quarantine' | 'smile' | 'abort', quality?: number) => void;
  recordMailRead: () => void;
  recordWikiRead: () => void;
  recordHackComplete: (score: number) => void;
  recordChatMessage: () => void;
  recordJobApply: () => void;
  recordWeatherCheck: () => void;
  recordRadioTune: () => void;
  claimDailyBonus: () => boolean;
  completeQuest: (questId: string) => void;
  pendingQuestCount: () => number;
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
];

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
  sessionStorage.setItem(NAV_SESSION, JSON.stringify([...s].slice(-120)));
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<GameSnapshot>(() => loadGame());
  const [toast, setToastState] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  const setToast = useCallback((t: string | null, ms = 3200) => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    setToastState(t);
    if (t && ms > 0) {
      toastTimer.current = window.setTimeout(() => setToastState(null), ms);
    }
  }, []);

  const persist = useCallback((fn: (s: GameSnapshot) => GameSnapshot) => {
    setSnapshot((s) => {
      const next = fn(s);
      saveGame(next);
      return next;
    });
  }, []);

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

  const patchStats = useCallback(
    (fn: (st: GameStats) => GameStats) => {
      persist((s) => ({ ...s, stats: fn(s.stats) }));
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

  const completeQuest = useCallback(
    (questId: string) => {
      const def = QUESTS.find((q) => q.id === questId);
      if (!def) return;
      persist((s) => {
        if (s.questsDone.includes(questId)) return s;
        if (!def.check(s.stats)) return s;
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
    (stats: GameStats, questsDone: string[]) => {
      for (const q of QUESTS) {
        if (questsDone.includes(q.id)) continue;
        if (q.check(stats)) completeQuest(q.id);
      }
    },
    [completeQuest],
  );

  const recordNav = useCallback(
    (url: string) => {
      const cur = readNavDedupe();
      const first = !cur.has(url);
      if (first) {
        cur.add(url);
        writeNavDedupe(cur);
        addCredits(2);
        patchStats((st) => {
          const next = { ...st, navs: st.navs + 1 };
          return next;
        });
      }
      const hit = NAV_ACHIEVEMENTS.find((a) => a.url === url);
      if (hit) unlockAchievement(hit.id, hit.title);
      if (url === 'rn:arcade') unlockAchievement('visit_arcade', 'Arcade tourist');
    },
    [addCredits, patchStats, unlockAchievement],
  );

  const recordSearch = useCallback(() => {
    addCredits(3);
    patchStats((st) => ({ ...st, searches: st.searches + 1 }));
    unlockAchievement('first_search', 'Search operator');
    setSnapshot((s) => {
      tryAutoQuests({ ...s.stats, searches: s.stats.searches + 1 }, s.questsDone);
      return s;
    });
  }, [addCredits, patchStats, unlockAchievement, tryAutoQuests]);

  const recordPost = useCallback(() => {
    addCredits(15);
    patchStats((st) => ({ ...st, posts: st.posts + 1 }));
    unlockAchievement('first_post', 'Forum regular');
    setSnapshot((s) => {
      tryAutoQuests({ ...s.stats, posts: s.stats.posts + 1 }, s.questsDone);
      return s;
    });
  }, [addCredits, patchStats, unlockAchievement, tryAutoQuests]);

  const recordCommand = useCallback(() => {
    addCredits(1);
    patchStats((st) => ({ ...st, commands: st.commands + 1 }));
    setSnapshot((s) => {
      tryAutoQuests({ ...s.stats, commands: s.stats.commands + 1 }, s.questsDone);
      return s;
    });
  }, [addCredits, patchStats, tryAutoQuests]);

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
      setSnapshot((s) => {
        tryAutoQuests(
          {
            ...s.stats,
            arcadeWins: s.stats.arcadeWins + 1,
          },
          s.questsDone,
        );
        return s;
      });
    },
    [addCredits, patchStats, unlockAchievement, tryAutoQuests],
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
      setSnapshot((s) => {
        tryAutoQuests({ ...s.stats, virusRuns: s.stats.virusRuns + 1 }, s.questsDone);
        return s;
      });
    },
    [addCredits, bumpIntegrity, patchStats, unlockAchievement, tryAutoQuests],
  );

  const recordMailRead = useCallback(() => {
    addCredits(1);
    patchStats((st) => ({ ...st, mailsRead: st.mailsRead + 1 }));
    setSnapshot((s) => {
      tryAutoQuests({ ...s.stats, mailsRead: s.stats.mailsRead + 1 }, s.questsDone);
      return s;
    });
  }, [addCredits, patchStats, tryAutoQuests]);

  const recordWikiRead = useCallback(() => {
    addCredits(2);
    patchStats((st) => ({ ...st, wikiReads: st.wikiReads + 1 }));
    unlockAchievement('wiki_reader', 'Article hopper');
    setSnapshot((s) => {
      tryAutoQuests({ ...s.stats, wikiReads: s.stats.wikiReads + 1 }, s.questsDone);
      return s;
    });
  }, [addCredits, patchStats, unlockAchievement, tryAutoQuests]);

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
      setSnapshot((s) => {
        tryAutoQuests(
          {
            ...s.stats,
            hackWins: win ? s.stats.hackWins + 1 : s.stats.hackWins,
          },
          s.questsDone,
        );
        return s;
      });
    },
    [addCredits, patchStats, unlockAchievement, tryAutoQuests],
  );

  const recordChatMessage = useCallback(() => {
    patchStats((st) => ({ ...st, chatMsgs: st.chatMsgs + 1 }));
    setSnapshot((s) => {
      tryAutoQuests({ ...s.stats, chatMsgs: s.stats.chatMsgs + 1 }, s.questsDone);
      return s;
    });
  }, [patchStats, tryAutoQuests]);

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
      return {
        ...s,
        credits: s.credits + 1,
        stats: { ...s.stats, weatherChecks },
      };
    });
  }, [persist, unlockAchievement]);

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
    return true;
  }, [persist, setToast, snapshot.dailyClaimDay, unlockAchievement]);

  const pendingQuestCount = useCallback(() => {
    return QUESTS.filter((q) => !snapshot.questsDone.includes(q.id) && q.check(snapshot.stats)).length;
  }, [snapshot]);

  const value: Ctx = {
    snapshot,
    toast,
    setToast,
    addCredits,
    bumpIntegrity,
    unlockAchievement,
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
    completeQuest,
    pendingQuestCount,
  };

  return <GameCtx.Provider value={value}>{children}</GameCtx.Provider>;
}

export function useGame() {
  const v = useContext(GameCtx);
  if (!v) throw new Error('useGame outside GameProvider');
  return v;
}
