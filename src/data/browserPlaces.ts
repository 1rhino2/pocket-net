import type { NetUrl } from '../types';

export type BrowserPlace = {
  url: NetUrl;
  label: string;
  hint?: string;
};

/** Public destinations only - secret rn: routes are not bookmarked. */
export const BROWSER_BOOKMARKS: BrowserPlace[] = [
  { url: 'rn:home', label: 'Home' },
  { url: 'rn:search', label: 'Search' },
  { url: 'rn:chronicle', label: 'Explore' },
  { url: 'rn:shift', label: 'Net Index' },
  { url: 'rn:map', label: 'Map' },
  { url: 'rn:mail', label: 'Mail' },
  { url: 'rn:wiki', label: 'Wiki' },
  { url: 'rn:discover', label: 'Discover' },
  { url: 'rn:directory', label: 'Directory' },
  { url: 'rn:forum', label: 'Forum' },
  { url: 'rn:radio', label: 'Radio' },
  { url: 'rn:archive', label: 'Archive' },
];
