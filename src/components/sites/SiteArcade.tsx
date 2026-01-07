import { useCallback, useEffect, useRef, useState } from 'react';
import { useGame } from '../../game/GameContext';

const ROUNDS = 5;

function roundScore(needle: number) {
  const d = Math.abs(needle - 50);
  return Math.max(0, Math.round(100 - d * 2.2));
}

type Phase = 'lobby' | 'running' | 'result' | 'done';

export function SiteArcade() {
  const { recordArcadeRound, recordArcadeComplete, snapshot } = useGame();
  const [phase, setPhase] = useState<Phase>('lobby');
  const [round, setRound] = useState(1);
  const [total, setTotal] = useState(0);
  const [lastRound, setLastRound] = useState(0);
  const [needle, setNeedle] = useState(15);
  const needleRef = useRef(15);
  const dirRef = useRef(1);
  const speedRef = useRef(38);
  const rafRef = useRef(0);
  const paidRef = useRef(false);

  const stopLoop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
  }, []);

  useEffect(() => () => stopLoop(), [stopLoop]);

  useEffect(() => {
    if (phase !== 'running') return;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(40, now - last);
      last = now;
      const sp = speedRef.current * (dt / 16.67);
      let n = needleRef.current + dirRef.current * sp * 0.088;
      if (n >= 100) {
        n = 100;
        dirRef.current = -1;
      } else if (n <= 0) {
        n = 0;
        dirRef.current = 1;
      }
      needleRef.current = n;
      setNeedle(n);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return stopLoop;
  }, [phase, stopLoop]);

  function beginRun() {
    setRound(1);
    setTotal(0);
    setLastRound(0);
    needleRef.current = 15;
    setNeedle(15);
    speedRef.current = 38;
    paidRef.current = false;
    setPhase('running');
  }

  function stopNeedle() {
    stopLoop();
    const pts = roundScore(needleRef.current);
    setLastRound(pts);
    setTotal((t) => t + pts);
    recordArcadeRound();
    setPhase('result');
  }

  function continueAfterResult() {
    if (round >= ROUNDS) {
      if (!paidRef.current) {
        paidRef.current = true;
        recordArcadeComplete(total + lastRound);
      }
      setPhase('done');
      return;
    }
    setRound((r) => r + 1);
    speedRef.current += 14;
    needleRef.current = 20 + Math.random() * 60;
    setNeedle(needleRef.current);
    setPhase('running');
  }

  function playAgain() {
    setPhase('lobby');
  }

  return (
    <div className='site site-arcade'>
      <div className='arcade-cabinet'>
        <header className='arcade-marquee'>
          <span className='arcade-marquee-glow'>RHINO</span>
          <span className='arcade-marquee-title'>REFLEX</span>
          <span className='arcade-marquee-sub'>INSERT COIN · 5 ROUNDS</span>
        </header>

        <div className='arcade-screen-bezel'>
          <div className='arcade-screen'>
            <p className='arcade-rules'>
              Needle sweeps 0-100. Hit STOP in the green band. Speed climbs each round. Payout banks at run end.
            </p>

            <div className='arcade-hud'>
              <span>ROUND {Math.min(round, ROUNDS)}/{ROUNDS}</span>
              <span>SCORE {total}</span>
              <span>HALL {snapshot.stats.arcadeBest}</span>
            </div>

            <div className='arcade-lane' aria-label='Needle lane'>
              <div className='arcade-green' />
              <div className='arcade-needle' style={{ left: `${needle}%` }} />
            </div>

            <div className='arcade-controls'>
              {phase === 'lobby' ? (
                <button type='button' className='arcade-btn arcade-btn-start' onClick={beginRun}>
                  START
                </button>
              ) : null}
              {phase === 'running' ? (
                <button type='button' className='arcade-btn arcade-btn-stop' onClick={stopNeedle}>
                  STOP
                </button>
              ) : null}
              {phase === 'result' ? (
                <button type='button' className='arcade-btn arcade-btn-start' onClick={continueAfterResult}>
                  {round >= ROUNDS ? 'FINISH' : 'NEXT'}
                </button>
              ) : null}
              {phase === 'done' ? (
                <button type='button' className='arcade-btn' onClick={playAgain}>
                  LOBBY
                </button>
              ) : null}
            </div>

            {phase === 'result' ? (
              <p className='arcade-msg'>Freeze: {lastRound} pts this round.</p>
            ) : null}
            {phase === 'done' ? (
              <p className='arcade-msg arcade-msg-win'>Run banked. Check RhinoCoins in the menu bar.</p>
            ) : null}
          </div>
        </div>

        <footer className='arcade-coin-tray'>RHINONET ARCADE · LOCAL HIGH SCORES ONLY</footer>
      </div>
    </div>
  );
}
