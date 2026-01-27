import type { NetUrl } from '../types';
import { SiteArcade } from './sites/SiteArcade';
import { SiteChat } from './sites/SiteChat';
import { SiteDirectory } from './sites/SiteDirectory';
import { SiteForum } from './sites/SiteForum';
import { SiteHack } from './sites/SiteHack';
import { SiteHome } from './sites/SiteHome';
import { SiteJobs } from './sites/SiteJobs';
import { SiteMail } from './sites/SiteMail';
import { SiteMap } from './sites/SiteMap';
import { SiteMart } from './sites/SiteMart';
import { SiteQuests } from './sites/SiteQuests';
import { SiteRadio } from './sites/SiteRadio';
import { SiteReadme } from './sites/SiteReadme';
import { SiteSearch } from './sites/SiteSearch';
import { SiteStatus } from './sites/SiteStatus';
import { SiteWeather } from './sites/SiteWeather';
import { SiteWiki } from './sites/SiteWiki';
import { SiteDiscover } from './sites/SiteDiscover';
import { SiteArchive } from './sites/SiteArchive';
import { SiteHidden } from './sites/SiteHidden';
import { SiteShift } from './sites/SiteShift';
import { SiteNode } from './sites/SiteNode';
import { isHourUrl, isNodeUrl } from '../types';
import { SiteChronicle } from './sites/SiteChronicle';
import { SiteHourChapter } from './sites/SiteHourChapter';

type Props = {
  url: NetUrl;
  onNavigate: (url: NetUrl) => void;
};

export function BrowserPage({ url, onNavigate }: Props) {
  switch (url) {
    case 'rn:home':
      return <SiteHome onNavigate={onNavigate} />;
    case 'rn:search':
      return <SiteSearch onNavigate={onNavigate} />;
    case 'rn:directory':
      return <SiteDirectory onNavigate={onNavigate} />;
    case 'rn:forum':
      return <SiteForum />;
    case 'rn:mart':
      return <SiteMart />;
    case 'rn:readme':
      return <SiteReadme />;
    case 'rn:arcade':
      return <SiteArcade />;
    case 'rn:status':
      return <SiteStatus />;
    case 'rn:mail':
      return <SiteMail />;
    case 'rn:weather':
      return <SiteWeather />;
    case 'rn:radio':
      return <SiteRadio />;
    case 'rn:wiki':
      return <SiteWiki />;
    case 'rn:jobs':
      return <SiteJobs />;
    case 'rn:chat':
      return <SiteChat />;
    case 'rn:hack':
      return <SiteHack />;
    case 'rn:map':
      return <SiteMap onNavigate={onNavigate} />;
    case 'rn:quests':
      return <SiteQuests />;
    case 'rn:discover':
      return <SiteDiscover />;
    case 'rn:archive':
      return <SiteArchive />;
    case 'rn:shift':
      return <SiteShift onNavigate={onNavigate} />;
    case 'rn:chronicle':
      return <SiteChronicle onNavigate={onNavigate} />;
    case 'rn:ghost':
    case 'rn:bunker':
    case 'rn:cache':
    case 'rn:relay':
    case 'rn:lint':
    case 'rn:midnight':
      return <SiteHidden url={url} onNavigate={onNavigate} />;
    default:
      if (isHourUrl(url)) return <SiteHourChapter url={url} onNavigate={onNavigate} />;
      if (isNodeUrl(url)) return <SiteNode url={url} onNavigate={onNavigate} />;
      return <SiteHome onNavigate={onNavigate} />;
  }
}
