import type { HandbuiltDriftMeta, HandbuiltNodeMeta } from '../data/nodes/handbuiltTypes';
import type { AuthoredPage } from './types';
import { CAST } from './cast';
import { DRIFT_AUTHORED } from './pages/drift';
import { HOLLOW_NIGHT } from './pages/hollowNight';
import { MARY_PAGES } from './pages/mary';
import { SOUP_PAGES } from './pages/soupJudge';
import { LEGEND_PAGES } from './pages/legend';
import { AURORA_PAGES } from './pages/aurora';
import { MONK_PAGES } from './pages/lintMonk';
import { TEXTURE_PAGES } from './pages/netTexture';
import { ANGEL_PAGES } from './pages/angel';

/**
 * Every page on the permanent net, in one list, all of it typed by hand.
 *
 * scripts/lint-content.mjs imports this file and fails the build on a repeated
 * sentence, a page with no author, an hour with no pages, or a teaser that is
 * just a slice of a paragraph. That last one is what the old generator did.
 */
export const AUTHORED_PAGES: AuthoredPage[] = [
  ...HOLLOW_NIGHT,
  ...MARY_PAGES,
  ...SOUP_PAGES,
  ...LEGEND_PAGES,
  ...AURORA_PAGES,
  ...MONK_PAGES,
  ...TEXTURE_PAGES,
  ...ANGEL_PAGES,
  ...DRIFT_AUTHORED,
];

export { CAST };
export type { AuthoredPage };

/** the net advertises this number, so it has to come from the pages themselves */
export const AUTHORED_PAGE_COUNT = AUTHORED_PAGES.length;

export function authoredPagesBy(author: string): AuthoredPage[] {
  return AUTHORED_PAGES.filter((p) => p.author === author);
}

/** pages carrying a Hollow Night clue, for the vault payoff to count against */
export const CLUE_PAGES = AUTHORED_PAGES.filter((p) => p.clue);

/**
 * Adapt to the shape the rest of the app already speaks. The old catalog had
 * `chapter` where this has `hour`, and `searchQuery` where this has `search`.
 * Everything downstream stays as it is.
 */
export const AUTHORED_AS_NODES: HandbuiltNodeMeta[] = AUTHORED_PAGES.filter((p) => !p.drift).map((p) => ({
  url: `rn:n-${p.slug}` as `rn:n-${string}`,
  slug: p.slug,
  title: p.title,
  tag: p.tag,
  author: p.author,
  updated: p.updated,
  lock: p.lock,
  unlocked: p.unlocked,
  teaser: p.teaser,
  searchQuery: p.search,
  chapter: p.hour,
  layout: p.layout,
  paragraphs: p.paragraphs,
  quote: p.quote,
  bullets: p.bullets,
  footnote: p.footnote,
  related: p.related,
}));

export const AUTHORED_AS_DRIFT: HandbuiltDriftMeta[] = AUTHORED_PAGES.filter((p) => p.drift).map(
  (p, i) => ({
    url: `rn:n-${p.slug}` as `rn:n-${string}`,
    slug: p.slug,
    title: p.title,
    tag: p.tag,
    author: p.author,
    updated: p.updated,
    teaser: p.teaser,
    searchQuery: p.search,
    layout: p.layout,
    paragraphs: p.paragraphs,
    driftIndex: i,
    quote: p.quote,
    bullets: p.bullets,
    footnote: p.footnote,
    related: p.related,
  }),
);
