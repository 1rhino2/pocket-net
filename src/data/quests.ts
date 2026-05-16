import type { GameStats } from '../game/gameTypes';

export type QuestDef = {
  id: string;
  title: string;
  blurb: string;
  reward: number;
  integrity?: number;
  check: (s: GameStats) => boolean;
};

export const QUESTS: QuestDef[] = [
  {
    id: 'q_nav_5',
    title: 'Tourist loop',
    blurb: 'Visit 5 unique rn: pages this session.',
    reward: 12,
    check: (s) => s.navs >= 5,
  },
  {
    id: 'q_search_3',
    title: 'Search operator',
    blurb: 'Run 3 searches on RhinoSearch.',
    reward: 10,
    check: (s) => s.searches >= 3,
  },
  {
    id: 'q_post_1',
    title: 'Voice of the forum',
    blurb: 'Publish one forum thread.',
    reward: 18,
    integrity: 2,
    check: (s) => s.posts >= 1,
  },
  {
    id: 'q_arcade_1',
    title: 'Reflex graduate',
    blurb: 'Clear one full RhinoReflex run.',
    reward: 22,
    check: (s) => s.arcadeWins >= 1,
  },
  {
    id: 'q_mail_3',
    title: 'Inbox janitor',
    blurb: 'Read 3 RhinoMail messages.',
    reward: 8,
    check: (s) => s.mailsRead >= 3,
  },
  {
    id: 'q_wiki_4',
    title: 'Scholar',
    blurb: 'Open 4 PocketWiki articles.',
    reward: 14,
    check: (s) => s.wikiReads >= 4,
  },
  {
    id: 'q_hack_1',
    title: 'Cipher runner',
    blurb: 'Finish one Cipher Drill with 70+ score.',
    reward: 16,
    check: (s) => s.hackWins >= 1,
  },
  {
    id: 'q_cmd_10',
    title: 'Shell tourist',
    blurb: 'Run 10 terminal commands.',
    reward: 9,
    check: (s) => s.commands >= 10,
  },
  {
    id: 'q_virus_1',
    title: 'Smile survivor',
    blurb: 'Complete FREE_SMILE once (any ending).',
    reward: 20,
    check: (s) => s.virusRuns >= 1,
  },
  {
    id: 'q_chat_5',
    title: 'Relay regular',
    blurb: 'Send 5 messages in Relay Chat.',
    reward: 7,
    check: (s) => s.chatMsgs >= 5,
  },
];
