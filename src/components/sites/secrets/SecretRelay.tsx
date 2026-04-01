import { useEffect, useState } from 'react';
import type { NetUrl } from '../../../types';

type Props = {
  onNavigate: (url: NetUrl) => void;
};

const STATIONS = [
  { freq: 88.4, label: 'RhinoFM Lo-Fi', tag: 'live' },
  { freq: 91.0, label: 'Packet Weather', tag: 'wx' },
  { freq: 99.7, label: 'Midnight Relay', tag: 'you' },
  { freq: 101.3, label: 'Static Only', tag: 'hiss' },
  { freq: 104.2, label: 'Archive hum', tag: 'loop' },
];

export function SecretRelay({ onNavigate }: Props) {
  const [tuned, setTuned] = useState(99.7);
  const [power, setPower] = useState(true);
  const [bars, setBars] = useState<number[]>([2, 5, 3, 7, 4]);

  useEffect(() => {
    if (!power) return;
    const t = window.setInterval(() => {
      setBars(Array.from({ length: 16 }, () => 1 + Math.floor(Math.random() * 9)));
    }, 120);
    return () => window.clearInterval(t);
  }, [power]);

  const station = STATIONS.find((s) => s.freq === tuned) ?? STATIONS[2]!;
  const needleLeft = `${((tuned - 87) / 20) * 100}%`;

  return (
    <div className='secret secret-relay'>
      <div className='relay-cabinet'>
        <div className='relay-brand-plate'>RHINO RECEIVER · MODEL 41</div>
        <div className='relay-dial-face'>
          <div className='relay-scale'>
            {STATIONS.map((s) => (
              <button
                key={s.freq}
                type='button'
                className={`relay-tick${s.freq === tuned ? ' active' : ''}`}
                style={{ left: `${((s.freq - 87) / 20) * 100}%` }}
                onClick={() => setTuned(s.freq)}
              >
                {s.freq}
              </button>
            ))}
            <span className='relay-needle' style={{ left: needleLeft }} aria-hidden />
          </div>
          <div className='relay-readout'>
            <span className='relay-freq-big'>{tuned.toFixed(1)}</span>
            <span className='relay-mhz'>MHz</span>
          </div>
        </div>
        <div className='relay-speaker' aria-hidden>
          {bars.map((h, i) => (
            <span key={i} className='relay-grill-bar' style={{ opacity: power ? 0.35 + h * 0.06 : 0.08 }} />
          ))}
        </div>
        <p className='relay-caption'>
          {power
            ? tuned === 99.7
              ? 'Your own session breathes on the carrier wave.'
              : `Cross-talk on ${station.label}. Nothing dangerous.`
            : 'Power off. The hum continues anyway.'}
        </p>
        <div className='relay-controls'>
          <button type='button' className='relay-knob' onClick={() => setPower((p) => !p)}>
            {power ? 'PWR ON' : 'PWR OFF'}
          </button>
          {STATIONS.map((s) => (
            <button
              key={s.freq}
              type='button'
              className={`relay-preset${s.freq === tuned ? ' lit' : ''}`}
              onClick={() => setTuned(s.freq)}
            >
              {s.tag}
            </button>
          ))}
        </div>
        <div className='relay-station-list'>
          {STATIONS.map((s) => (
            <div className={`relay-station-row${s.freq === tuned ? ' on' : ''}`} key={s.freq}>
              <span>{s.freq}</span>
              <strong>{s.label}</strong>
              <em>{s.tag}</em>
            </div>
          ))}
        </div>
        <div className='relay-footer-btns'>
          <button type='button' className='relay-footer-btn' onClick={() => onNavigate('rn:radio')}>
            Open RhinoFM
          </button>
          <button type='button' className='relay-footer-btn' onClick={() => onNavigate('rn:archive')}>
            Packet Archive
          </button>
        </div>
      </div>
    </div>
  );
}
