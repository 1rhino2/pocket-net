import { useMemo } from 'react';
import { microNodesForHour } from '../../data/contentEngine';
import { mapGhostNodes } from '../../data/procedural';
import { hourKey, todayKey } from '../../lib/seed';
import type { NetUrl } from '../../types';
import { NET_SITES } from '../../data/netSites';
import { useGame } from '../../game/GameContext';

type Props = { onNavigate: (url: NetUrl) => void };

export function SiteMap({ onNavigate }: Props) {
  const { recordStamp, snapshot } = useGame();
  const day = todayKey();
  const hour = hourKey();
  const ghosts = useMemo(() => mapGhostNodes(day), [day]);
  const hourNodes = useMemo(() => microNodesForHour(hour).slice(0, 10), [hour]);
  const owned = new Set(snapshot.stamps);

  return (
    <div className="site site-map">
      <div className="map-console">
        <header className="map-header">
          <h1>Net Map</h1>
          <p>Topology scan · {day} · hour {hour.slice(11)}:00</p>
        </header>

        <div className="map-radar">
          <div className="map-grid" aria-hidden />
          <div className="map-sweep" aria-hidden />
          <button type="button" className="map-hub" onClick={() => onNavigate('rn:home')}>
            <span>CORE</span>
            <strong>rn:home</strong>
          </button>
          {NET_SITES.map((s, i) => (
            <button
              key={s.url}
              type="button"
              className="map-blip"
              style={{
                left: `${12 + (i % 6) * 14}%`,
                top: `${18 + Math.floor(i / 6) * 22}%`,
              }}
              onClick={() => onNavigate(s.url)}
            >
              <span className="map-blip-ping" />
              <span className="map-blip-label">{s.title}</span>
            </button>
          ))}
        </div>

        <div className="map-panels">
          <section className="map-panel">
            <h2>Micro nodes</h2>
            <div className="map-node-list">
              {hourNodes.map((n) => (
                <button key={n.url} type="button" className="map-node-chip" onClick={() => onNavigate(n.url as NetUrl)}>
                  <span>{n.tag}</span>
                  <strong>{n.title}</strong>
                </button>
              ))}
            </div>
          </section>
          <section className="map-panel map-panel-ghosts">
            <h2>Ghost stamps</h2>
            <div className="map-ghost-list">
              {ghosts.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  className={`map-ghost-stamp${owned.has(g.stampId) ? ' owned' : ''}`}
                  onClick={() => recordStamp(g.stampId)}
                >
                  <span className="map-stamp-ring" />
                  <strong>{g.label}</strong>
                  <small>{owned.has(g.stampId) ? 'collected' : g.blurb}</small>
                </button>
              ))}
            </div>
          </section>
        </div>

        <button type="button" className="map-index-link" onClick={() => onNavigate('rn:shift')}>
          Open full Net Index
        </button>
      </div>
    </div>
  );
}
