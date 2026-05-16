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
    return () => stopLoop();
  }, [phase, round, stopLoop]);

  function beginRun() {
    paidRef.current = false;
    setTotal(0);
    setLastRound(0);
    startRound(1);
  }

  function startRound(r: number) {
    needleRef.current = 12 + r * 4;
    setNeedle(needleRef.current);
    dirRef.current = 1;
    speedRef.current = 34 + r * 11;
    setRound(r);
    setPhase('running');
  }

  function stopNeedle() {
    if (phase !== 'running') return;
    stopLoop();
    const pts = roundScore(needleRef.current);
    setLastRound(pts);
    recordArcadeRound();
    setTotal((t) => t + pts);
    setPhase('result');
  }

  function continueAfterResult() {
    if (round >= ROUNDS) {
      setPhase('done');
      setTotal((t) => {
        if (!paidRef.current) {
          paidRef.current = true;
          recordArcadeComplete(t);
        }
        return t;
      });
      return;
    }
    startRound(round + 1);
  }

  function playAgain() {
    setPhase('lobby');
  }

  return (
    <div className="site site-arcade">
      <h1>RhinoReflex</h1>
      <p className="lead">
        Five rounds. Needle oscillates 0-100. Hit STOP while it sits near the center band. Faster each round. Payouts
        land in RhinoCoins automatically at the end of a full run.
      </p>

      <div className="card arcade-card">
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span className="tag">
            round {Math.min(round, ROUNDS)} / {ROUNDS}
          </span>
          <span className="tag">running total {total}</span>
          <span className="tag">hall {snapshot.stats.arcadeBest}</span>
        </div>

        <div className="arcade-lane" aria-label="Needle lane">
          <div className="arcade-green" />
          <div className="arcade-needle" style={{ left: `${needle}%` }} />
        </div>

        <div className="arcade-actions row" style={{ marginTop: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          {phase === 'lobby' ? (
            <button type="button" className="btn btn-primary" onClick={beginRun}>
              Start 5-round run
            </button>
          ) : null}
          {phase === 'running' ? (
            <button type="button" className="btn btn-primary" onClick={stopNeedle}>
              STOP NEEDLE
            </button>
          ) : null}
          {phase === 'result' ? (
            <button type="button" className="btn btn-primary" onClick={continueAfterResult}>
              {round >= ROUNDS ? 'Finish run' : 'Next round'}
            </button>
          ) : null}
          {phase === 'done' ? (
            <button type="button" className="btn btn-primary" onClick={playAgain}>
              Back to lobby
            </button>
          ) : null}
        </div>

        {phase === 'result' ? (
          <p style={{ marginTop: '0.65rem', color: 'var(--muted)' }}>
            Freeze value: {lastRound} pts this round.
          </p>
        ) : null}
        {phase === 'done' ? (
          <p style={{ marginTop: '0.65rem' }}>Run banked. Check RhinoCoins in the menu bar. Beat your hall score next time.</p>
        ) : null}
      </div>
    </div>
  );
}
