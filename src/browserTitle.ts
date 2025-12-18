import { getHourChapterByUrl } from './data/chronicle24';
import { microNodePage } from './data/contentEngine';
import { isHourUrl, isNodeUrl, type NetUrl, type StaticNetUrl } from './types';

const TITLES: Record<StaticNetUrl, string> = {
  'rn:home': 'RhinoBrowser - New Tab',
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
  'rn:discover': 'RhinoBrowser - Discovery Log',
  'rn:archive': 'RhinoBrowser - Packet Archive',
  'rn:shift': 'RhinoBrowser - Net Index',
  'rn:chronicle': 'RhinoBrowser - Explore',
  'rn:ghost': 'RhinoBrowser - Ghost Relay',
  'rn:bunker': 'RhinoBrowser - Offline Bunker',
  'rn:cache': 'RhinoBrowser - Stale Cache',
  'rn:relay': 'RhinoBrowser - Midnight Relay',
  'rn:lint': 'RhinoBrowser - Lint Cathedral',
  'rn:midnight': 'RhinoBrowser - After-Hours Desk',
};

const SHORT: Record<StaticNetUrl, string> = {
  'rn:home': 'New Tab',
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
  'rn:discover': 'Discover',
  'rn:archive': 'Archive',
  'rn:shift': 'Shift',
  'rn:chronicle': 'Explore',
  'rn:ghost': 'Ghost',
  'rn:bunker': 'Bunker',
  'rn:cache': 'Cache',
  'rn:relay': 'Relay',
  'rn:lint': 'Lint',
  'rn:midnight': 'Midnight',
};

export function browserTitle(url: NetUrl) {
  if (isHourUrl(url)) {
    const ch = getHourChapterByUrl(url);
    return ch ? `RhinoBrowser - ${ch.codename}` : 'RhinoBrowser - Explore';
  }
  if (isNodeUrl(url)) {
    const page = microNodePage(url);
    return page ? `RhinoBrowser - ${page.title}` : 'RhinoBrowser - Micro node';
  }
  return TITLES[url as StaticNetUrl] ?? 'RhinoBrowser';
}

export function browserScreenTitle(url: NetUrl) {
  if (isHourUrl(url)) {
    const ch = getHourChapterByUrl(url);
    return ch ? ch.codename.slice(0, 16) : 'Explore';
  }
  if (isNodeUrl(url)) {
    const page = microNodePage(url);
    return page ? page.title.slice(0, 18) : 'Node';
  }
  return SHORT[url as StaticNetUrl] ?? 'Browser';
}
