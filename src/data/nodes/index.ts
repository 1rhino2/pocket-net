import type { HandbuiltDriftMeta, HandbuiltNodeMeta, HandbuiltNodePage } from './handbuiltTypes';
import { DRIFT_PAGES } from './drift/driftPages';
import { PERMANENT_CH00 } from './permanent/ch00';
import { PERMANENT_CH01 } from './permanent/ch01';
import { PERMANENT_CH02 } from './permanent/ch02';
import { PERMANENT_CH03 } from './permanent/ch03';
import { PERMANENT_CH04 } from './permanent/ch04';
import { PERMANENT_CH05 } from './permanent/ch05';
import { PERMANENT_CH06 } from './permanent/ch06';
import { PERMANENT_CH07 } from './permanent/ch07';
import { PERMANENT_CH08 } from './permanent/ch08';
import { PERMANENT_CH09 } from './permanent/ch09';
import { PERMANENT_CH10 } from './permanent/ch10';
import { PERMANENT_CH11 } from './permanent/ch11';
import { PERMANENT_CH12 } from './permanent/ch12';
import { PERMANENT_CH13 } from './permanent/ch13';
import { PERMANENT_CH14 } from './permanent/ch14';
import { PERMANENT_CH15 } from './permanent/ch15';
import { PERMANENT_CH16 } from './permanent/ch16';
import { PERMANENT_CH17 } from './permanent/ch17';
import { PERMANENT_CH18 } from './permanent/ch18';
import { PERMANENT_CH19 } from './permanent/ch19';
import { PERMANENT_CH20 } from './permanent/ch20';
import { PERMANENT_CH21 } from './permanent/ch21';
import { PERMANENT_CH22 } from './permanent/ch22';
import { PERMANENT_CH23 } from './permanent/ch23';

export const PERMANENT_NODES: HandbuiltNodeMeta[] = [
  ...PERMANENT_CH00,
  ...PERMANENT_CH01,
  ...PERMANENT_CH02,
  ...PERMANENT_CH03,
  ...PERMANENT_CH04,
  ...PERMANENT_CH05,
  ...PERMANENT_CH06,
  ...PERMANENT_CH07,
  ...PERMANENT_CH08,
  ...PERMANENT_CH09,
  ...PERMANENT_CH10,
  ...PERMANENT_CH11,
  ...PERMANENT_CH12,
  ...PERMANENT_CH13,
  ...PERMANENT_CH14,
  ...PERMANENT_CH15,
  ...PERMANENT_CH16,
  ...PERMANENT_CH17,
  ...PERMANENT_CH18,
  ...PERMANENT_CH19,
  ...PERMANENT_CH20,
  ...PERMANENT_CH21,
  ...PERMANENT_CH22,
  ...PERMANENT_CH23,
];

export const PERMANENT_NODE_COUNT = PERMANENT_NODES.length;
export const NODES_PER_CHAPTER = 20;

export { DRIFT_PAGES };
export const DRIFT_NODE_COUNT = DRIFT_PAGES.length;

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

export function handbuiltNodePage(url: string): (HandbuiltNodePage & { slug: string }) | null {
  const perm = PERM_BY_URL.get(url);
  if (perm) {
    return {
      slug: perm.slug,
      title: perm.title,
      tag: perm.tag,
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
    body: n.teaser + ` Open ${n.url}.`,
  }));
}

export function driftSearchDocs() {
  return DRIFT_PAGES.map((n, i) => ({
    id: `drift-search-${i}`,
    title: n.title,
    url: n.url,
    snippet: n.teaser,
    tags: [n.tag, n.searchQuery, 'drift', 'route'],
    body: n.teaser + ` Open ${n.url}.`,
  }));
}

export type { HandbuiltNodeMeta, HandbuiltDriftMeta, HandbuiltNodePage, NodeLayout } from './handbuiltTypes';
