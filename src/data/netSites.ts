import type { NetUrl } from '../types';

export type NetSiteEntry = {
  url: NetUrl;
  title: string;
  desc: string;
  tag: string;
  category: 'core' | 'tools' | 'social' | 'games' | 'meta';
};

export const NET_SITES: NetSiteEntry[] = [
  { url: 'rn:search', title: 'RhinoSearch', desc: 'Find pages across the pocket net.', tag: 'tool', category: 'tools' },
  { url: 'rn:directory', title: 'Directory', desc: 'Official map of every destination.', tag: 'guide', category: 'core' },
  { url: 'rn:forum', title: 'The Forum', desc: 'Threads about soup, tabs, and drama.', tag: 'social', category: 'social' },
  { url: 'rn:mart', title: 'PixelMart', desc: 'Curated goods and instant receipts.', tag: 'shop', category: 'social' },
  { url: 'rn:mail', title: 'RhinoMail', desc: 'Your operator inbox.', tag: 'mail', category: 'tools' },
  { url: 'rn:weather', title: 'Packet Weather', desc: 'Regional forecast and wind.', tag: 'live', category: 'tools' },
  { url: 'rn:radio', title: 'RhinoFM', desc: 'Three live stations.', tag: 'audio', category: 'tools' },
  { url: 'rn:wiki', title: 'PocketWiki', desc: 'Reference articles and lore.', tag: 'docs', category: 'tools' },
  { url: 'rn:jobs', title: 'Job Board', desc: 'Open roles at pocket startups.', tag: 'work', category: 'social' },
  { url: 'rn:chat', title: 'Relay Chat', desc: 'Talk to the network relay bot.', tag: 'chat', category: 'social' },
  { url: 'rn:hack', title: 'Cipher Drill', desc: 'Type fast, earn RhinoCoins.', tag: 'skill', category: 'games' },
  { url: 'rn:map', title: 'Net Map', desc: 'Topology of the rn: network.', tag: 'map', category: 'core' },
  { url: 'rn:arcade', title: 'RhinoReflex', desc: 'Stop the needle. Five rounds.', tag: 'game', category: 'games' },
  { url: 'rn:quests', title: 'Quest Board', desc: 'Contracts with RC payouts.', tag: 'quests', category: 'games' },
  { url: 'rn:status', title: 'System status', desc: 'Credits, stats, achievements.', tag: 'system', category: 'meta' },
  { url: 'rn:readme', title: 'Readme', desc: 'Build notes and changelog.', tag: 'meta', category: 'meta' },
];

export function sitesByCategory(cat: NetSiteEntry['category']) {
  return NET_SITES.filter((s) => s.category === cat);
}
