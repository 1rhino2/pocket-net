import type { HandbuiltDriftMeta, HandbuiltNodeMeta, HandbuiltNodePage } from './handbuiltTypes';
import { AUTHORED_AS_DRIFT, AUTHORED_AS_NODES, AUTHORED_PAGES } from '../../content/index';

/**
 * The permanent net.
 *
 * This used to be 24 files of 20 pages each, all of them spat out of one
 * template per file with a pool of eight filler sentences reused sixty times.
 * They are gone. Everything here now comes from src/content, where a person
 * typed it, and scripts/lint-content.mjs fails the build if that stops being
 * true.
 *
 * The exported shape is unchanged on purpose so nothing downstream had to move.
 */
export const PERMANENT_NODES: HandbuiltNodeMeta[] = AUTHORED_AS_NODES;

export const PERMANENT_NODE_COUNT = PERMANENT_NODES.length;

export const DRIFT_PAGES = AUTHORED_AS_DRIFT;
export const DRIFT_NODE_COUNT = DRIFT_PAGES.length;

/** what the net is allowed to claim about itself */
export const TOTAL_WRITTEN_PAGES = PERMANENT_NODE_COUNT + DRIFT_NODE_COUNT;

const PERM_BY_URL = new Map<string, HandbuiltNodeMeta>(
  PERMANENT_NODES.map((n) => [n.url, n]),
);
const DRIFT_BY_URL = new Map<string, HandbuiltDriftMeta>(
  DRIFT_PAGES.map((n) => [n.url, n]),
);

export function permanentNodesForChapter(chapter: number) {
  return PERMANENT_NODES.filter((n) => n.chapter === chapter);
}

export function permanentNodeByUrl(url: string): HandbuiltNodeMeta | null {
  return PERM_BY_URL.get(url) ?? null;
}

export function driftNodeByUrl(url: string): HandbuiltDriftMeta | null {
  return DRIFT_BY_URL.get(url) ?? null;
}

/** author handle for a page, so the browser chrome can show a byline */
export function nodeAuthor(url: string): string | null {
  const slug = url.startsWith('rn:n-') ? url.slice(5) : url;
  return AUTHORED_PAGES.find((p) => p.slug === slug)?.author ?? null;
}

export function handbuiltNodePage(url: string): (HandbuiltNodePage & { slug: string }) | null {
  const perm = PERM_BY_URL.get(url);
  if (perm) {
    return {
      slug: perm.slug,
      title: perm.title,
      tag: perm.tag,
      author: perm.author,
      updated: perm.updated,
      layout: perm.layout,
      paragraphs: perm.paragraphs,
      chapter: perm.chapter,
      isDrift: false,
      quote: perm.quote,
      bullets: perm.bullets,
      footnote: perm.footnote,
      related: perm.related,
    };
  }
  const drift = DRIFT_BY_URL.get(url);
  if (drift) {
    return {
      slug: drift.slug,
      title: drift.title,
      tag: drift.tag,
      author: drift.author,
      updated: drift.updated,
      layout: 'drift',
      paragraphs: drift.paragraphs,
      isDrift: true,
      quote: drift.quote,
      bullets: drift.bullets,
      footnote: drift.footnote,
      related: drift.related,
    };
  }
  return null;
}

export function permanentSearchDocs() {
  return PERMANENT_NODES.map((n, i) => ({
    id: `perm-search-${i}`,
    title: n.title,
    url: n.url,
    snippet: n.teaser,
    tags: [n.tag, `thread-${n.chapter}`, n.searchQuery, 'permanent', 'route'],
    // search the actual page, not a stub sentence about the page
    body: [n.title, n.teaser, ...n.paragraphs, ...(n.bullets ?? [])].join(' '),
  }));
}

export function driftSearchDocs() {
  return DRIFT_PAGES.map((n, i) => ({
    id: `drift-search-${i}`,
    title: n.title,
    url: n.url,
    snippet: n.teaser,
    tags: [n.tag, n.searchQuery, 'drift', 'route'],
    body: [n.title, n.teaser, ...n.paragraphs].join(' '),
  }));
}

export type { HandbuiltNodeMeta, HandbuiltDriftMeta, HandbuiltNodePage, NodeLayout } from './handbuiltTypes';
