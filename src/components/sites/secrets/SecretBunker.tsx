import { useEffect, useState } from 'react';
import type { NetUrl } from '../../../types';

type Props = {
  onNavigate: (url: NetUrl) => void;
};

const TAPES = [
  { id: 'A1', label: 'Dial tone loop', len: '∞' },
  { id: 'B4', label: 'Rain on server room', len: '74:02' },
  { id: 'C9', label: 'Modem handshakes', len: '12:08' },
  { id: 'D2', label: 'Typing next door', len: '03:41' },
];

export function SecretBunker({ onNavigate }: Props) {
  const [lines, setLines] = useState<string[]>([
    'RHINONET BUNKER SYS v2.1 (air-gapped)',
    'UPLINK: severed',
    'DOOR: sealed',
    '',
    'Type HELP or use keys below.',
  ]);
  const [playing, setPlaying] = useState<string | null>(null);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const t = window.setInterval(() => setCursor((c) => !c), 530);
    return () => window.clearInterval(t);
  }, []);

  function log(msg: string) {
    setLines((prev) => [...prev.slice(-14), msg]);
  }

  function playTape(id: string) {
    const tape = TAPES.find((t) => t.id === id);
    if (!tape) return;
    if (playing === id) {
      setPlaying(null);
      log(`[STOP] ${id} ${tape.label}`);
      return;
    }
    setPlaying(id);
    log(`[PLAY] ${id} ${tape.label} ... tape rolling`);
    log(`[audio] hiss ok · levels nominal · no uplink`);
  }

  function toggleDoor() {
    log('DOOR: checking hydraulics...');
    window.setTimeout(() => {
      log('DOOR: cracked 4cm. dial-up light visible. still offline.');
    }, 600);
  }

  return (
    <div className='secret secret-bunker'>
      <div className='bunker-crt'>
        <div className='bunker-screen'>
          {lines.map((line, i) => (
            <div key={`${i}-${line}`} className='bunker-line'>
              {line || '\u00a0'}
            </div>
          ))}
          <div className='bunker-line bunker-cursor-line'>
            &gt; <span className={cursor ? 'bunker-cursor' : 'bunker-cursor off'}>_</span>
          </div>
        </div>

        <div className='bunker-keys'>
          <span className='bunker-keys-label'>tape deck</span>
          {TAPES.map((t) => (
            <button key={t.id} type='button' className='bunker-key' onClick={() => playTape(t.id)}>
              [{t.id}] {playing === t.id ? '■' : '▶'} {t.label}
            </button>
          ))}
          <button type='button' className='bunker-key' onClick={toggleDoor}>
            [DOOR] cycle seal
          </button>
          <button type='button' className='bunker-key' onClick={() => onNavigate('rn:chronicle')}>
            [FILE] bunker gospel thread
          </button>
          <button type='button' className='bunker-key bunker-key-exit' onClick={() => onNavigate('rn:home')}>
            [EXIT] surface
          </button>
        </div>
      </div>
    </div>
  );
}
