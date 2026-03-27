import type { NetUrl } from '../../types';
import { SecretBunker } from './secrets/SecretBunker';
import { SecretCache } from './secrets/SecretCache';
import { SecretGhost } from './secrets/SecretGhost';
import { SecretLint } from './secrets/SecretLint';
import { SecretMidnight } from './secrets/SecretMidnight';
import { SecretRelay } from './secrets/SecretRelay';

type Props = {
  url: NetUrl;
  onNavigate: (url: NetUrl) => void;
};

export function SiteHidden({ url, onNavigate }: Props) {
  switch (url) {
    case 'rn:ghost':
      return <SecretGhost onNavigate={onNavigate} />;
    case 'rn:bunker':
      return <SecretBunker onNavigate={onNavigate} />;
    case 'rn:cache':
      return <SecretCache onNavigate={onNavigate} />;
    case 'rn:relay':
      return <SecretRelay onNavigate={onNavigate} />;
    case 'rn:lint':
      return <SecretLint onNavigate={onNavigate} />;
    case 'rn:midnight':
      return <SecretMidnight onNavigate={onNavigate} />;
    default:
      return (
        <div className='site'>
          <h1>Unknown route</h1>
          <p className='lead'>This secret has not been wired yet.</p>
        </div>
      );
  }
}
