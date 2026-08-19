/** Re-export the authored node catalog. Counts come from the pages, never from a literal. */
export {
  PERMANENT_NODES,
  PERMANENT_NODE_COUNT,
  DRIFT_PAGES,
  DRIFT_NODE_COUNT,
  permanentNodesForChapter,
  permanentNodeByUrl,
  driftNodeByUrl,
  handbuiltNodePage,
  permanentSearchDocs,
  driftSearchDocs,
} from './nodes/index';

export type { HandbuiltNodeMeta, HandbuiltDriftMeta, HandbuiltNodePage, NodeLayout } from './nodes/handbuiltTypes';

import { handbuiltNodePage } from './nodes/index';

/** @deprecated Use handbuiltNodePage */
export function permanentNodePage(url: string) {
  const built = handbuiltNodePage(url);
  if (!built || built.isDrift || built.chapter === undefined) return null;
  return {
    title: built.title,
    tag: built.tag,
    chapter: built.chapter,
    paragraphs: built.paragraphs,
  };
}
