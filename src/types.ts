import type { HourNetUrl } from './data/chronicle24';

export type StaticNetUrl =
  | 'rn:home'
  | 'rn:search'
  | 'rn:directory'
  | 'rn:forum'
  | 'rn:mart'
  | 'rn:readme'
  | 'rn:arcade'
  | 'rn:status'
  | 'rn:mail'
  | 'rn:weather'
  | 'rn:radio'
  | 'rn:wiki'
  | 'rn:jobs'
  | 'rn:chat'
  | 'rn:hack'
  | 'rn:map'
  | 'rn:quests'
  | 'rn:discover'
  | 'rn:archive'
  | 'rn:shift'
  | 'rn:chronicle'
  | 'rn:ghost'
  | 'rn:bunker'
  | 'rn:cache'
  | 'rn:relay'
  | 'rn:lint'
  | 'rn:midnight';

export type ChronicleNetUrl = 'rn:chronicle';

export type NodeNetUrl = `rn:n-${string}`;

export type NetUrl = StaticNetUrl | NodeNetUrl | HourNetUrl | ChronicleNetUrl;

export type WindowId = 'browser' | 'notepad' | 'terminal';

export type DesktopWindow = {
  id: WindowId;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minimized: boolean;
  z: number;
  url?: NetUrl;
};

const URL_ALIASES: Record<string, StaticNetUrl | ChronicleNetUrl> = {
  '': 'rn:home',
  home: 'rn:home',
  search: 'rn:search',
  directory: 'rn:directory',
  forum: 'rn:forum',
  mart: 'rn:mart',
  shop: 'rn:mart',
  readme: 'rn:readme',
  arcade: 'rn:arcade',
  status: 'rn:status',
  mail: 'rn:mail',
  email: 'rn:mail',
  weather: 'rn:weather',
  radio: 'rn:radio',
  fm: 'rn:radio',
  wiki: 'rn:wiki',
  jobs: 'rn:jobs',
  job: 'rn:jobs',
  chat: 'rn:chat',
  hack: 'rn:hack',
  cipher: 'rn:hack',
  map: 'rn:map',
  quests: 'rn:quests',
  quest: 'rn:quests',
  discover: 'rn:discover',
  discovery: 'rn:discover',
  log: 'rn:discover',
  archive: 'rn:archive',
  shift: 'rn:shift',
  contracts: 'rn:shift',
  ops: 'rn:shift',
  chronicle: 'rn:chronicle',
  explore: 'rn:chronicle',
  ghost: 'rn:ghost',
  bunker: 'rn:bunker',
  cache: 'rn:cache',
  relay: 'rn:relay',
  lint: 'rn:lint',
  midnight: 'rn:midnight',
};

const FULL_URLS = new Set<string>(Object.values(URL_ALIASES));

export { isHourUrl, type HourNetUrl } from './data/chronicle24';

export function isNodeUrl(url: string): url is NodeNetUrl {
  return /^rn:n-[a-z0-9]+$/.test(url);
}

export function parseUserUrl(raw: string): NetUrl | null {
  let t = raw.trim().toLowerCase();
  if (t.startsWith('http://') || t.startsWith('https://')) return null;
  if (t.startsWith('www.')) return null;
  t = t.replace(/^\/+/, '');
  if (isNodeUrl(t)) return t;
  if (/^rn:h-\d{2}$/.test(t)) return t as HourNetUrl;
  if (FULL_URLS.has(t)) return t as StaticNetUrl | ChronicleNetUrl;
  if (t.startsWith('rn:')) {
    const key = t.slice(3);
    const hit = URL_ALIASES[key];
    if (hit) return hit;
  }
  const bare = URL_ALIASES[t];
  if (bare) return bare;
  return null;
}
