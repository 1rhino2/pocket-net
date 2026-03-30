import { useEffect, useState } from 'react';
import type { NetUrl } from '../../../types';

type Props = {
  onNavigate: (url: NetUrl) => void;
};

const GUESTBOOK = [
  { name: 'Kari_98', when: '04/12/98', line: 'if you are reading this i am already gone :)' },
  { name: 'sysop', when: '11/03/97', line: 'DO NOT MIRROR THIS PAGE. the relay answers backward.' },
  { name: 'Terry', when: 'yesterday', line: 'nice page!!! sent this from school library' },
  { name: '????', when: 'tomorrow', line: 'your ping returned before i sent it' },
  { name: 'mom', when: '09/14/96', line: 'call me when you get off the computer' },
];

export function SecretGhost({ onNavigate }: Props) {
  const [hits, setHits] = useState(41812);
  const [pingOut, setPingOut] = useState<string[]>([]);
  const [blinkOn, setBlinkOn] = useState(true);
  const wrongDate = 'Tuesday, November 4, 1997 · 11:59 PM (always)';

  useEffect(() => {
    const t = window.setInterval(() => setBlinkOn((b) => !b), 680);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const t = window.setInterval(() => {
      setHits((h) => h + Math.floor(Math.random() * 7) - 2);
    }, 2400);
    return () => window.clearInterval(t);
  }, []);

  function sendPing() {
    const stamps = [
      '64 bytes from 255.255.255.254: ttl=0 time=-847ms (reply arrived first)',
      '64 bytes from YOUR-PC: ttl=1 time=0ms (you were not online yet)',
      'Request timed out. (response cached from Tue Nov 04 1997)',
      '64 bytes from ghost.relay: ttl=255 time=41ms - PING PONG PING PONG',
      'Destination Host Unreachable. (host reachable yesterday)',
    ];
    const line = stamps[Math.floor(Math.random() * stamps.length)]!;
    setPingOut((prev) => [line, ...prev].slice(0, 6));
  }

  return (
    <div className='secret secret-ghost'>
      <table className='ghost-frame' cellPadding={0} cellSpacing={0} role='presentation'>
        <tbody>
          <tr>
            <td className='ghost-banner' colSpan={2}>
              <span className='ghost-blink' style={{ visibility: blinkOn ? 'visible' : 'hidden' }}>
                ★ WELCOME TO THE GHOST RELAY ★
              </span>
              <div className='ghost-subbanner'>Best viewed in Netscape 3.04 · 800×600 · sound on</div>
            </td>
          </tr>
          <tr>
            <td className='ghost-sidebar'>
              <div className='ghost-counter'>
                <div className='ghost-counter-label'>you are visitor</div>
                <div className='ghost-counter-digits'>{String(hits).padStart(6, '0')}</div>
              </div>
              <hr className='ghost-hr' />
              <p className='ghost-side-link'>
                <button type='button' className='ghost-link-btn' onClick={sendPing}>
                  [ ping relay ]
                </button>
              </p>
              <p className='ghost-side-link'>
                <button type='button' className='ghost-link-btn' onClick={() => onNavigate('rn:map')}>
                  [ net map ]
                </button>
              </p>
              <p className='ghost-side-link'>
                <button type='button' className='ghost-link-btn' onClick={() => onNavigate('rn:home')}>
                  [ leave ]
                </button>
              </p>
              <hr className='ghost-hr' />
              <div className='ghost-badge'>Under Construction</div>
              <div className='ghost-img-fake'>[broken.gif]</div>
              <div className='ghost-img-fake'>[midi.gif]</div>
              <p className='ghost-webring'>← Rhino Webring →</p>
            </td>
            <td className='ghost-main'>
              <h1 className='ghost-title'>Ghost Relay</h1>
              <p className='ghost-updated'>Last updated: {wrongDate}</p>
              <div className='ghost-marquee-wrap' aria-hidden>
                <div className='ghost-marquee'>
                  <span className='ghost-marquee-inner'>
                    this site answers pings from yesterday · do not refresh · someone is already reading your cache ·
                  </span>
                </div>
              </div>

              <p className='ghost-body'>
                Hello. You have reached a relay that was never provisioned on the public index. It still answers.
                Operators who find this page report hearing their own keyboard in the hit counter.
              </p>

              <table className='ghost-table' border={1} cellPadding={6} cellSpacing={0}>
                <thead>
                  <tr>
                    <th>status</th>
                    <th>meaning</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ONLINE</td>
                    <td>since before you connected</td>
                  </tr>
                  <tr>
                    <td>UPSTREAM</td>
                    <td>your ISP from 1997</td>
                  </tr>
                  <tr>
                    <td>DOWNSTREAM</td>
                    <td>you, slightly delayed</td>
                  </tr>
                </tbody>
              </table>

              <div className='ghost-terminal'>
                <div className='ghost-term-head'>C:\RELAY\PING.EXE</div>
                <button type='button' className='ghost-term-btn' onClick={sendPing}>
                  Send ping (free)
                </button>
                {pingOut.length === 0 ? (
                  <p className='ghost-term-line ghost-dim'>Waiting for a packet that already arrived…</p>
                ) : (
                  pingOut.map((line) => (
                    <p key={line} className='ghost-term-line'>
                      {line}
                    </p>
                  ))
                )}
              </div>

              <h2 className='ghost-h2'>Guestbook (read only)</h2>
              <div className='ghost-guestbook'>
                {GUESTBOOK.map((g) => (
                  <div key={g.name + g.when} className='ghost-guest-entry'>
                    <strong>{g.name}</strong>
                    <span className='ghost-guest-when'> - {g.when}</span>
                    <p>{g.line}</p>
                  </div>
                ))}
              </div>

              <p className='ghost-footer'>
                © 1996-1998 Ghost Relay · no ads · no cookies · one persistent error
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
