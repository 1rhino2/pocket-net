import type { NetUrl } from './types';

const TITLES: Record<NetUrl, string> = {
  'rn:home': 'RhinoBrowser - Home',
  'rn:search': 'RhinoBrowser - Search',
  'rn:directory': 'RhinoBrowser - Directory',
  'rn:forum': 'RhinoBrowser - Forum',
  'rn:mart': 'RhinoBrowser - PixelMart',
  'rn:readme': 'RhinoBrowser - Readme',
  'rn:arcade': 'RhinoBrowser - RhinoReflex',
  'rn:status': 'RhinoBrowser - System status',
  'rn:mail': 'RhinoBrowser - RhinoMail',
  'rn:weather': 'RhinoBrowser - Packet Weather',
  'rn:radio': 'RhinoBrowser - RhinoFM',
  'rn:wiki': 'RhinoBrowser - PocketWiki',
  'rn:jobs': 'RhinoBrowser - Job Board',
  'rn:chat': 'RhinoBrowser - Relay Chat',
  'rn:hack': 'RhinoBrowser - Cipher Drill',
  'rn:map': 'RhinoBrowser - Net Map',
  'rn:quests': 'RhinoBrowser - Quest Board',
};

const SHORT: Record<NetUrl, string> = {
  'rn:home': 'Browser',
  'rn:search': 'Search',
  'rn:directory': 'Directory',
  'rn:forum': 'Forum',
  'rn:mart': 'PixelMart',
  'rn:readme': 'Readme',
  'rn:arcade': 'RhinoReflex',
  'rn:status': 'Status',
  'rn:mail': 'Mail',
  'rn:weather': 'Weather',
  'rn:radio': 'RhinoFM',
  'rn:wiki': 'Wiki',
  'rn:jobs': 'Jobs',
  'rn:chat': 'Chat',
  'rn:hack': 'Cipher',
  'rn:map': 'Map',
  'rn:quests': 'Quests',
};

export function browserTitle(url: NetUrl) {
  return TITLES[url] ?? 'RhinoBrowser';
}

export function browserScreenTitle(url: NetUrl) {
  return SHORT[url] ?? 'Browser';
}
