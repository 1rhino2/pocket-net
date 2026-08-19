import type { NetUrl } from '../../types';

export type NodeLayout =
  | 'fax'
  | 'bbs'
  | 'card'
  | 'telegram'
  | 'report'
  | 'receipt'
  | 'broadsheet'
  | 'warrant'
  | 'label'
  | 'ticket'
  | 'manifest'
  | 'blotter'
  | 'drift';

export type NodeLock = {
  question: string;
  answer: string;
  nudge: string;
  reward: number;
  discoveryId: string;
  achievement?: { id: string; title: string };
  revealToast?: string;
};

export type NodeUnlocked = {
  paragraphs: string[];
  quote?: string;
  footnote?: string;
};

export type HandbuiltNodePage = {
  title: string;
  tag: string;
  layout: NodeLayout;
  /** handle of whoever wrote it, so a page can carry a byline */
  author?: string;
  /** last-updated stamp as shown on the page */
  updated?: string;
  lock?: NodeLock;
  unlocked?: NodeUnlocked;
  paragraphs: string[];
  chapter?: number;
  isDrift?: boolean;
  quote?: string;
  bullets?: string[];
  footnote?: string;
  related?: { label: string; url: NetUrl }[];
};

export type HandbuiltNodeMeta = {
  url: `rn:n-${string}`;
  slug: string;
  title: string;
  tag: string;
  author?: string;
  updated?: string;
  lock?: NodeLock;
  unlocked?: NodeUnlocked;
  teaser: string;
  searchQuery: string;
  chapter: number;
  layout: NodeLayout;
  paragraphs: string[];
  quote?: string;
  bullets?: string[];
  footnote?: string;
  related?: { label: string; url: NetUrl }[];
};

export type HandbuiltDriftMeta = {
  url: `rn:n-${string}`;
  slug: string;
  title: string;
  tag: string;
  author?: string;
  updated?: string;
  teaser: string;
  searchQuery: string;
  layout: NodeLayout;
  paragraphs: string[];
  driftIndex: number;
  quote?: string;
  bullets?: string[];
  footnote?: string;
  related?: { label: string; url: NetUrl }[];
};
