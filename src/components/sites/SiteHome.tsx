import type { NetUrl } from '../../types';
import { NET_SITES, sitesByCategory } from '../../data/netSites';
import { useGame } from '../../game/GameContext';

type Props = {
  onNavigate: (url: NetUrl) => void;
};

export function SiteHome({ onNavigate }: Props) {
  const { pendingQuestCount } = useGame();
  const pending = pendingQuestCount();

  return (
    <div className="site site-home">
      <h1>RhinoNet Home</h1>
      <p className="lead">
        Build 0.3.1 · {NET_SITES.length} destinations, live radio, quests, mail, cipher drill, and the net map.
      </p>

      {pending > 0 ? (
        <div className="card home-alert">
          <strong>{pending} quest{pending === 1 ? '' : 's'} ready to turn in</strong>
          <button type="button" className="btn btn-primary" onClick={() => onNavigate('rn:quests')}>
            Open Quest Board
          </button>
        </div>
      ) : null}

      <div className="card">
        <h2>Quick launch</h2>
        <div className="site-btn-grid">
          <button type="button" className="btn btn-primary" onClick={() => onNavigate('rn:search')}>
            Search
          </button>
          <button type="button" className="btn" onClick={() => onNavigate('rn:quests')}>
            Quests
          </button>
          <button type="button" className="btn" onClick={() => onNavigate('rn:mail')}>
            Mail
          </button>
          <button type="button" className="btn" onClick={() => onNavigate('rn:map')}>
            Net map
          </button>
          <button type="button" className="btn" onClick={() => onNavigate('rn:radio')}>
            Radio
          </button>
          <button type="button" className="btn" onClick={() => onNavigate('rn:arcade')}>
            Arcade
          </button>
          <button type="button" className="btn" onClick={() => onNavigate('rn:hack')}>
            Cipher drill
          </button>
        </div>
      </div>

      {(['core', 'tools', 'social', 'games', 'meta'] as const).map((cat) => {
        const items = sitesByCategory(cat);
        if (items.length === 0) return null;
        return (
          <div key={cat} className="card">
            <h2>{cat === 'core' ? 'Core' : cat === 'tools' ? 'Tools' : cat === 'social' ? 'Social' : cat === 'games' ? 'Games' : 'Meta'}</h2>
            <div className="home-link-grid">
              {items.map((it) => (
                <button key={it.url} type="button" className="home-link" onClick={() => onNavigate(it.url)}>
                  <span className="tag">{it.tag}</span>
                  <strong>{it.title}</strong>
                  <small>{it.desc}</small>
                </button>
              ))}
            </div>
          </div>
        );
      })}

      <div className="card">
        <h2>Progress</h2>
        <p>
          RhinoCoins, integrity, quests, and achievements live in <kbd>rn:status</kbd>. Daily stipend and contracts
          are on <kbd>rn:quests</kbd>.
        </p>
      </div>
    </div>
  );
}
