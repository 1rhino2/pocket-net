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

export type HandbuiltNodePage = {
  title: string;
  tag: string;
  layout: NodeLayout;
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
