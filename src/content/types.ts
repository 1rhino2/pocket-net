import type { NetUrl } from '../types';
import type { NodeLayout } from '../data/nodes/handbuiltTypes';

export type CastId =
  | 'modem_mary'
  | 'xerox_angel'
  | 'lint_monk'
  | 'fax_aurora'
  | 'localhost_legend'
  | 'soup_judge'
  | 'pvo_operations'
  | 'anon'
  | 'baro_hank'
  | 'disk_daemon'
  | 'swap_meet'
  | 'town_annals'
  | 'carrier_wave'
  | 'aero_prophet';

// one hand-written page. no generator, lint-content.mjs fails the build if one
// sneaks back. hour is the old chapter number, 24 hour threads, each hour needs
// at least one page or chronicle24 blows up.
export type AuthoredPage = {
  slug: string;
  title: string;
  author: CastId;
  hour: number;
  layout: NodeLayout;
  tag: string;
  /** last-updated stamp as it appears on the page, period format */
  updated: string;
  /** what the search index should match on, plain words a person would type */
  search: string;
  teaser: string;
  paragraphs: string[];
  quote?: string;
  bullets?: string[];
  footnote?: string;
  related?: { label: string; url: NetUrl }[];
  /** marks a page as carrying a clue, used by the payoff check */
  clue?: string;
  // which mystery this clue is for. left off = the old hollow night arc so old
  // pages keep working. name the arc or its progress lands in the wrong count.
  arc?: 'hollow' | 'signal';
  /** drift pages are the odd corners: dead ends, stubs, one broken page */
  drift?: boolean;
  // a page that wants a passphrase. answer has to come from pages you can
  // actually read, never from a hint on the lock itself.
  lock?: {
    question: string;
    /** compared lowercased and trimmed, punctuation stripped */
    answer: string;
    /** shown only after a wrong attempt, and it points at a page, not the word */
    nudge: string;
    reward: number;
    discoveryId: string;
    /** badge to grant on open. defaults to the Hollow Night one if left off */
    achievement?: { id: string; title: string };
    /** the toast shown on a fresh solve, defaults to the archive line */
    revealToast?: string;
  };
  /** what the page says once it is open */
  unlocked?: {
    paragraphs: string[];
    quote?: string;
    footnote?: string;
  };
};
