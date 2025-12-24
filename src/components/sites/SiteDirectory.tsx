import type { NetUrl } from '../../types';
import { NET_SITES } from '../../data/netSites';

type Props = { onNavigate: (url: NetUrl) => void };

const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function SiteDirectory({ onNavigate }: Props) {
  return (
    <div className="site site-directory">
      <header className="dir-masthead">
        <h1>RhinoNet Directory</h1>
        <p>{NET_SITES.length} certified destinations</p>
      </header>
      <nav className="dir-alpha" aria-hidden>
        {ALPHA.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </nav>
      <div className="dir-columns">
        {NET_SITES.map((it) => (
          <button key={it.url} type="button" className="dir-entry" onClick={() => onNavigate(it.url)}>
            <strong>{it.title}</strong>
            <small>{it.desc}</small>
            <span className="dir-entry-url">{it.url}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
