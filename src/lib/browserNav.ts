import type { NetUrl } from '../types';

const RECENT_KEY = 'rn_browser_recent_v1';
const PENDING_SEARCH_KEY = 'rn_pending_search_v1';
const MAX_RECENT = 14;

export function pushRecent(url: NetUrl) {
  if (url === 'rn:home') return;
  try {
    const raw = sessionStorage.getItem(RECENT_KEY);
    const list: string[] = raw ? (JSON.parse(raw) as string[]) : [];
    const s = String(url);
    const next = [s, ...list.filter((u) => u !== s)].slice(0, MAX_RECENT);
    sessionStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function readRecent(): NetUrl[] {
  try {
    const raw = sessionStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw) as unknown;
    if (!Array.isArray(list)) return [];
    return list.filter((u) => typeof u === 'string') as NetUrl[];
  } catch {
    return [];
  }
}

export function setPendingSearch(query: string) {
  sessionStorage.setItem(PENDING_SEARCH_KEY, query.trim());
}

export function consumePendingSearch(): string | null {
  try {
    const q = sessionStorage.getItem(PENDING_SEARCH_KEY);
    if (q) sessionStorage.removeItem(PENDING_SEARCH_KEY);
    return q || null;
  } catch {
    return null;
  }
}
