import { useEffect, useState } from 'react';
import { useGame } from '../../../game/GameContext';
import type { NetUrl } from '../../../types';

type Props = {
  onNavigate: (url: NetUrl) => void;
};

const CAMERAS = ['Lobby', 'Server aisle', 'Vending', 'Your desk'];

export function SecretMidnight({ onNavigate }: Props) {
  const { snapshot, addCredits } = useGame();
  const [clock, setClock] = useState(() => new Date());
  const [log, setLog] = useState<string[]>(['DESK ONLINE · BUILDING EMPTY']);
  const [badge, setBadge] = useState(false);
  const [stipend, setStipend] = useState(false);
  const [cam, setCam] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setClock(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const t = window.setInterval(() => {
      setCam((c) => (c + 1) % CAMERAS.length);
      setLog((prev) =>
        [...prev, `${clock.toLocaleTimeString()} · ${CAMERAS[cam]} · activity nominal`].slice(-8),
      );
    }, 4200);
    return () => window.clearInterval(t);
  }, [clock, cam]);

  const late =
    clock.getHours() >= 22 || clock.getHours() < 5
      ? 'Night shift rate active.'
      : 'Desk open. Feels later than it is.';

  function swipeBadge() {
    setBadge(true);
    setLog((prev) => [...prev, 'BADGE OK · OPERATOR VERIFIED']);
  }

  function claimStipend() {
    addCredits(8);
    setStipend(true);
    setLog((prev) => [...prev, 'OVERTIME +8 RC · drawer light blinked once']);
  }

  return (
    <div className='secret secret-midnight'>
      <div className='midnight-console'>
        <div className='midnight-monitors'>
          <div className='midnight-cctv'>
            <span className='midnight-cctv-label'>CAM {cam + 1}</span>
            <span className='midnight-cctv-feed'>{CAMERAS[cam]}</span>
            <span className='midnight-cctv-rec'>REC</span>
          </div>
          <div className='midnight-term'>
            <div className='midnight-term-head'>SECURITY LOG</div>
            {log.map((line, i) => (
              <div className='midnight-log-line' key={`${i}-${line}`}>
                {line}
              </div>
            ))}
          </div>
        </div>
        <div className='midnight-panel'>
          <div className='midnight-clock-block'>
            <span className='midnight-time'>
              {clock.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
            <span className='midnight-date'>{clock.toLocaleDateString()}</span>
            <p className='midnight-late'>{late}</p>
          </div>
          <div className='midnight-badge'>
            <button type='button' className='midnight-badge-btn' onClick={swipeBadge} disabled={badge}>
              {badge ? 'BADGE ACCEPTED' : 'SWIPE BADGE'}
            </button>
          </div>
          <ul className='midnight-tray'>
            <li>Stapler (empty)</li>
            <li>Cold coffee (circa 1998)</li>
            <li>Discovery forms filed: {snapshot.discovered.length}</li>
            <li>RhinoCoins in drawer: {snapshot.credits}</li>
          </ul>
          <button
            type='button'
            className='midnight-stipend'
            disabled={stipend || !badge}
            onClick={claimStipend}
          >
            {stipend ? 'Stipend claimed tonight' : 'Authorize night stipend (+8 RC)'}
          </button>
          <div className='midnight-links'>
            <button type='button' onClick={() => onNavigate('rn:quests')}>
              Quest board
            </button>
            <button type='button' onClick={() => onNavigate('rn:discover')}>
              Discovery log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
