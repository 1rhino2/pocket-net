import type { NetUrl } from '../../types';
import { NET_SITES } from '../../data/netSites';

type Props = {
  onNavigate: (url: NetUrl) => void;
};

export function SiteDirectory({ onNavigate }: Props) {
  return (
    <div className="site">
      <h1>RhinoNet Directory</h1>
      <p className="lead">Certified destinations on build 0.3. {NET_SITES.length} sites indexed.</p>

      <div className="card">
        <h2>All sites</h2>
        <div className="dir-grid">
          {NET_SITES.map((it) => (
            <button key={it.url} type="button" className="start-item dir-item" onClick={() => onNavigate(it.url)}>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <strong>{it.title}</strong>
                <span className="tag">{it.tag}</span>
              </div>
              <small>{it.desc}</small>
              <small style={{ marginTop: '0.35rem', color: 'var(--accent)' }}>{it.url}</small>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
