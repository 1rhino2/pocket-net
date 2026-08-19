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
  | 'anon';

/**
 * One page somebody wrote. Every field here is typed by hand, there is no
 * generator behind this file and scripts/lint-content.mjs fails the build if
 * one sneaks back in.
 *
 * `hour` is the old `chapter` number. The net is organised into 24 hour
 * threads and every hour needs at least one page or chronicle24 blows up.
 */
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
  /** marks a page as carrying a Hollow Night clue, used by the payoff check */
  clue?: string;
  /** drift pages are the odd corners: dead ends, stubs, one broken page */
  drift?: boolean;
};
