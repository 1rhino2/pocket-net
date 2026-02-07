import type { NetUrl, WindowId } from '../types';

export type MobileIcon =
  | 'globe'
  | 'doc'
  | 'screen'
  | 'flask'
  | 'search'
  | 'joystick'
  | 'gauge'
  | 'keyboard';

export type MobileTone =
  | 'browser'
  | 'term'
  | 'note'
  | 'smile'
  | 'warn'
  | 'arcade'
  | 'radio'
  | 'system'
  | 'social';

export type MobileLaunch =
  | { kind: 'browser'; url: NetUrl }
  | { kind: 'window'; id: WindowId }
  | { kind: 'virus' };

export type MobileAppDef = {
  id: string;
  label: string;
  sub?: string;
  launch: MobileLaunch;
  icon: MobileIcon;
  tone: MobileTone;
};

export type MobileSection = {
  id: string;
  title: string;
  apps: MobileAppDef[];
};

export const MOBILE_HOME_APPS: MobileAppDef[] = [
  { id: 'browser', label: 'Browser', launch: { kind: 'browser', url: 'rn:home' }, icon: 'globe', tone: 'browser' },
  { id: 'mail', label: 'Mail', launch: { kind: 'browser', url: 'rn:mail' }, icon: 'doc', tone: 'term' },
  { id: 'radio', label: 'Radio', launch: { kind: 'browser', url: 'rn:radio' }, icon: 'joystick', tone: 'radio' },
  { id: 'quests', label: 'Quests', launch: { kind: 'browser', url: 'rn:quests' }, icon: 'gauge', tone: 'arcade' },
  { id: 'shift', label: 'Shift', launch: { kind: 'browser', url: 'rn:shift' }, icon: 'gauge', tone: 'system' },
  { id: 'chronicle', label: 'Explore', launch: { kind: 'browser', url: 'rn:chronicle' }, icon: 'search', tone: 'system' },
  { id: 'terminal', label: 'Terminal', launch: { kind: 'window', id: 'terminal' }, icon: 'screen', tone: 'term' },
  { id: 'notes', label: 'Notes', launch: { kind: 'window', id: 'notepad' }, icon: 'doc', tone: 'note' },
  { id: 'arcade', label: 'Arcade', launch: { kind: 'browser', url: 'rn:arcade' }, icon: 'joystick', tone: 'arcade' },
  { id: 'smile', label: 'FREE_SMILE', launch: { kind: 'virus' }, icon: 'flask', tone: 'warn' },
];

export const MOBILE_QUICK: MobileAppDef[] = [
  { id: 'search', label: 'Search', launch: { kind: 'browser', url: 'rn:search' }, icon: 'search', tone: 'system' },
  { id: 'map', label: 'Map', launch: { kind: 'browser', url: 'rn:map' }, icon: 'globe', tone: 'browser' },
  { id: 'forum', label: 'Forum', launch: { kind: 'browser', url: 'rn:forum' }, icon: 'doc', tone: 'social' },
  { id: 'mart', label: 'Mart', launch: { kind: 'browser', url: 'rn:mart' }, icon: 'doc', tone: 'social' },
  { id: 'wiki', label: 'Wiki', launch: { kind: 'browser', url: 'rn:wiki' }, icon: 'doc', tone: 'note' },
  { id: 'hack', label: 'Cipher', launch: { kind: 'browser', url: 'rn:hack' }, icon: 'screen', tone: 'arcade' },
];

export const MOBILE_SECTIONS: MobileSection[] = [
  {
    id: 'network',
    title: 'Network',
    apps: [
      { id: 'home', label: 'Home', sub: 'rn:home', launch: { kind: 'browser', url: 'rn:home' }, icon: 'globe', tone: 'browser' },
      { id: 'search', label: 'Search', sub: 'rn:search', launch: { kind: 'browser', url: 'rn:search' }, icon: 'search', tone: 'system' },
      { id: 'directory', label: 'Directory', sub: 'rn:directory', launch: { kind: 'browser', url: 'rn:directory' }, icon: 'globe', tone: 'browser' },
      { id: 'map', label: 'Net map', sub: 'rn:map', launch: { kind: 'browser', url: 'rn:map' }, icon: 'globe', tone: 'browser' },
      { id: 'forum', label: 'Forum', sub: 'rn:forum', launch: { kind: 'browser', url: 'rn:forum' }, icon: 'doc', tone: 'social' },
      { id: 'mart', label: 'PixelMart', sub: 'rn:mart', launch: { kind: 'browser', url: 'rn:mart' }, icon: 'doc', tone: 'social' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    apps: [
      { id: 'mail', label: 'Mail', sub: 'rn:mail', launch: { kind: 'browser', url: 'rn:mail' }, icon: 'doc', tone: 'term' },
      { id: 'weather', label: 'Weather', sub: 'rn:weather', launch: { kind: 'browser', url: 'rn:weather' }, icon: 'gauge', tone: 'system' },
      { id: 'radio', label: 'RhinoFM', sub: 'rn:radio', launch: { kind: 'browser', url: 'rn:radio' }, icon: 'joystick', tone: 'radio' },
      { id: 'wiki', label: 'Wiki', sub: 'rn:wiki', launch: { kind: 'browser', url: 'rn:wiki' }, icon: 'doc', tone: 'note' },
      { id: 'jobs', label: 'Jobs', sub: 'rn:jobs', launch: { kind: 'browser', url: 'rn:jobs' }, icon: 'doc', tone: 'social' },
      { id: 'chat', label: 'Chat', sub: 'rn:chat', launch: { kind: 'browser', url: 'rn:chat' }, icon: 'keyboard', tone: 'social' },
    ],
  },
  {
    id: 'games',
    title: 'Games',
    apps: [
      { id: 'hack', label: 'Cipher', sub: 'rn:hack', launch: { kind: 'browser', url: 'rn:hack' }, icon: 'screen', tone: 'arcade' },
      { id: 'arcade', label: 'Arcade', sub: 'rn:arcade', launch: { kind: 'browser', url: 'rn:arcade' }, icon: 'joystick', tone: 'arcade' },
      { id: 'quests', label: 'Quests', sub: 'rn:quests', launch: { kind: 'browser', url: 'rn:quests' }, icon: 'gauge', tone: 'arcade' },
    ],
  },
  {
    id: 'system',
    title: 'System',
    apps: [
      { id: 'terminal', label: 'Terminal', launch: { kind: 'window', id: 'terminal' }, icon: 'screen', tone: 'term' },
      { id: 'notes', label: 'Notepad', launch: { kind: 'window', id: 'notepad' }, icon: 'doc', tone: 'note' },
      { id: 'status', label: 'Status', sub: 'rn:status', launch: { kind: 'browser', url: 'rn:status' }, icon: 'gauge', tone: 'system' },
      { id: 'discover', label: 'Discover', sub: 'rn:discover', launch: { kind: 'browser', url: 'rn:discover' }, icon: 'search', tone: 'system' },
      { id: 'shift', label: 'Shift', sub: 'rn:shift', launch: { kind: 'browser', url: 'rn:shift' }, icon: 'gauge', tone: 'system' },
      { id: 'archive', label: 'Archive', sub: 'rn:archive', launch: { kind: 'browser', url: 'rn:archive' }, icon: 'doc', tone: 'note' },
      { id: 'readme', label: 'Readme', sub: 'rn:readme', launch: { kind: 'browser', url: 'rn:readme' }, icon: 'doc', tone: 'note' },
      { id: 'smile', label: 'FREE_SMILE', launch: { kind: 'virus' }, icon: 'flask', tone: 'warn' },
    ],
  },
];
