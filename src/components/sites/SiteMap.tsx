import type { NetUrl } from '../../types';
import { NET_SITES } from '../../data/netSites';

type Props = {
  onNavigate: (url: NetUrl) => void;
};

export function SiteMap({ onNavigate }: Props) {
  return (
    <div className="site">
      <h1>Net Map</h1>
      <p className="lead">Topology of rn: space. Tap a node to route your browser.</p>

      <div className="netmap card">
        <div className="netmap-core">
          <button type="button" className="netmap-node core" onClick={() => onNavigate('rn:home')}>
            rn:home
          </button>
        </div>
        <div className="netmap-ring">
          {NET_SITES.map((s) => (
            <button
              key={s.url}
              type="button"
              className="netmap-node"
              onClick={() => onNavigate(s.url)}
            >
              <span className="tag">{s.tag}</span>
              <strong>{s.title}</strong>
              <small>{s.url}</small>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
