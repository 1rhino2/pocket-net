import { useMemo, useState } from 'react';
import { microNodesForHour, pulseEvents } from '../../data/contentEngine';
import { PERMANENT_NODES } from '../../data/nodeCatalog';
import { useGame } from '../../game/GameContext';
import { missionProgress, missionReady } from '../../game/shiftLogic';
import { formatPlayMs, playHourBucket } from '../../lib/seed';
import type { NetUrl } from '../../types';

type Props = { onNavigate: (url: NetUrl) => void };

const PERM_PAGE = 12;
const DRAWERS = ['PERM', 'DRIFT', 'PULSE', 'CONTRACTS'] as const;

export function SiteShift({ onNavigate }: Props) {
  const { snapshot, completeShiftMission } = useGame();
  const bucket = playHourBucket(snapshot.playMs);
  const [permPage, setPermPage] = useState(0);
  const [drawer, setDrawer] = useState<(typeof DRAWERS)[number]>('PERM');
  const nodes = useMemo(() => microNodesForHour(bucket), [bucket]);
  const pulses = useMemo(() => pulseEvents(snapshot.playMs), [snapshot.playMs]);
  const permSlice = PERMANENT_NODES.slice(permPage * PERM_PAGE, permPage * PERM_PAGE + PERM_PAGE);
  const permPages = Math.ceil(PERMANENT_NODES.length / PERM_PAGE);

  return (
    <div className="site site-shift">
      <div className="shift-cabinet">
        <header className="shift-plaque">
          <h1>Net Index</h1>
          <p>Card catalog · {PERMANENT_NODES.length} permanent · {nodes.length} drift · bucket {bucket}</p>
        </header>

        <div className="shift-led">
          <span className="shift-led-label">VISITED</span>
          <span className="shift-led-value">{snapshot.visitedNodes.length}</span>
          <span className="shift-led-label">WIRE TIME</span>
          <span className="shift-led-value">{formatPlayMs(snapshot.playMs)}</span>
        </div>

        <nav className="shift-drawers" aria-label="Catalog drawers">
          {DRAWERS.map((d) => (
            <button
              key={d}
              type="button"
              className={`shift-drawer-tab${drawer === d ? ' open' : ''}`}
              onClick={() => setDrawer(d)}
            >
              {d}
            </button>
          ))}
        </nav>

        <div className="shift-drawer-panel">
          {drawer === 'PULSE' ? (
            <ul className="shift-pulse-list">
              {pulses.map((p) => (
                <li key={p.id}>
                  {p.line}{' '}
                  {p.action ? (
                    <button type="button" className="shift-pulse-link" onClick={() => onNavigate(p.action as NetUrl)}>
                      {p.action}
                    </button>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : drawer === 'CONTRACTS' ? (
            <>
              <p className="shift-drawer-note">This hour's contracts. They refresh when the wire clock rolls over.</p>
              <ul className="shift-contract-list">
                {snapshot.activeMissions.length === 0 ? (
                  <li className="shift-contract-empty">No contracts posted this hour. Keep browsing, the clock rolls over as you play.</li>
                ) : (
                  snapshot.activeMissions.map((m) => {
                    const done = snapshot.shiftMissionsDone.includes(m.id);
                    const prog = Math.min(m.goal, missionProgress(m, snapshot));
                    const ready = missionReady(m, snapshot) && !done;
                    return (
                      <li key={m.id} className={`shift-contract${done ? ' done' : ''}`}>
                        <div className="shift-contract-head">
                          <strong>{m.title}</strong>
                          <span className="shift-contract-reward">+{m.reward} RC{m.integrity ? ` +${m.integrity} INT` : ''}</span>
                        </div>
                        <p className="shift-contract-blurb">{m.blurb}</p>
                        <div className="shift-contract-row">
                          <span className="shift-contract-prog">{done ? 'filed' : `${prog}/${m.goal}`}</span>
                          {m.searchQuery ? (
                            <button type="button" className="shift-pulse-link" onClick={() => onNavigate('rn:search')}>go search</button>
                          ) : m.targetNode ? (
                            <button type="button" className="shift-pulse-link" onClick={() => onNavigate(m.targetNode as NetUrl)}>open route</button>
                          ) : null}
                          <button
                            type="button"
                            className="shift-contract-claim"
                            disabled={!ready}
                            onClick={() => completeShiftMission(m.id)}
                          >
                            {done ? 'claimed' : ready ? 'claim' : 'in progress'}
                          </button>
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>
            </>
          ) : drawer === 'PERM' ? (
            <>
              <p className="shift-drawer-note">Fixed routes. Browse in any order.</p>
              <div className="shift-cards">
                {permSlice.map((n, i) => (
                  <button
                    key={n.url}
                    type="button"
                    className="shift-index-card"
                    style={{ transform: `rotate(${((i % 5) - 2) * 1.2}deg)` }}
                    onClick={() => onNavigate(n.url as NetUrl)}
                  >
                    <span className="shift-card-num">{String(permPage * PERM_PAGE + i + 1).padStart(3, '0')}</span>
                    <strong>{n.title}</strong>
                    <span className="shift-card-tag">{n.tag}</span>
                    <small>{n.url}</small>
                  </button>
                ))}
              </div>
              <div className="shift-pager">
                <button type="button" disabled={permPage <= 0} onClick={() => setPermPage((p) => p - 1)}>Prev drawer</button>
                <span>Page {permPage + 1} / {permPages}</span>
                <button type="button" disabled={permPage >= permPages - 1} onClick={() => setPermPage((p) => p + 1)}>Next drawer</button>
              </div>
            </>
          ) : (
            <>
              <p className="shift-drawer-note">The odd corners: stubs, dead ends, and one page that never did render.</p>
              <div className="shift-cards shift-cards-drift">
                {nodes.slice(0, 14).map((n, i) => (
                  <button
                    key={n.url}
                    type="button"
                    className="shift-index-card drift"
                    onClick={() => onNavigate(n.url as NetUrl)}
                  >
                    <span className="shift-card-num">DR{i + 1}</span>
                    <strong>{n.title}</strong>
                    <span className="shift-card-tag">{n.tag}</span>
                    <small>{n.url}</small>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <footer className="shift-foot">
          <button type="button" onClick={() => onNavigate('rn:search')}>RhinoSearch</button>
          <button type="button" onClick={() => onNavigate('rn:chronicle')}>Explore</button>
          <button type="button" onClick={() => onNavigate('rn:discover')}>Discovery Log</button>
        </footer>
      </div>
    </div>
  );
}
