import { useCallback, useEffect, useRef, useState } from 'react';
import { useGame } from '../../game/GameContext';

const PHRASES = [
  'sudo rm -rf /vibes',
  'openssl smile --force',
  'cat /dev/random | cowsay',
  'ping localhost -t optimism',
  'export RHINO=1',
];

type Phase = 'idle' | 'running' | 'done';

export function SiteHack() {
  const { recordHackComplete, snapshot, setToast } = useGame();
  const [phase, setPhase] = useState<Phase>('idle');
  const [phrase, setPhrase] = useState(PHRASES[0]!);
  const [typed, setTyped] = useState('');
  const [timeLeft, setTimeLeft] = useState(100);
  const [score, setScore] = useState(0);
  const timerRef = useRef<number>(0);
  const phraseRef = useRef(phrase);
  const typedRef = useRef(typed);

  phraseRef.current = phrase;
  typedRef.current = typed;

  const finish = useCallback(
    (completed: boolean, remaining: number) => {
      window.clearInterval(timerRef.current);
      const p = phraseRef.current;
      const t = typedRef.current;
      const accuracy = completed ? Math.min(100, Math.round((p.length / Math.max(t.length, 1)) * 80)) : 0;
      const speedBonus = completed ? Math.floor(remaining / 5) : 0;
      const total = completed ? Math.min(100, accuracy + speedBonus) : Math.floor(remaining / 10);
      setScore(total);
      setPhase('done');
      recordHackComplete(total);
      if (total >= 70) setToast(`Cipher cleared: ${total} pts`, 3000);
    },
    [recordHackComplete, setToast],
  );

  useEffect(() => {
    if (phase !== 'running') return;
    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 2) {
          finish(false, 0);
          return 0;
        }
        return prev - 2;
      });
    }, 120);
    return () => window.clearInterval(timerRef.current);
  }, [phase, finish]);

  function startRound() {
    const p = PHRASES[Math.floor(Math.random() * PHRASES.length)]!;
    setPhrase(p);
    phraseRef.current = p;
    setTyped('');
    typedRef.current = '';
    setTimeLeft(100);
    setScore(0);
    setPhase('running');
  }

  function onType(val: string) {
    if (phase !== 'running') return;
    setTyped(val);
    typedRef.current = val;
    if (val === phraseRef.current) finish(true, timeLeft);
  }

  return (
    <div className="site site-hack">
      <h1>Cipher Drill</h1>
      <p className="lead">
        Type the phrase before the bar empties. Hall score: {snapshot.stats.hackBest}. Wins need 70+.
      </p>

      <div className="card hack-card">
        {phase === 'idle' ? (
          <button type="button" className="btn btn-primary" onClick={startRound}>
            Start drill
          </button>
        ) : null}

        {phase === 'running' ? (
          <>
            <div className="hack-meter">
              <div className="hack-meter-fill" style={{ width: `${timeLeft}%` }} />
            </div>
            <p className="hack-phrase">{phrase}</p>
            <input
              className="field hack-input"
              value={typed}
              onChange={(e) => onType(e.target.value)}
              autoFocus
              spellCheck={false}
            />
          </>
        ) : null}

        {phase === 'done' ? (
          <>
            <p>Score: {score}</p>
            <button type="button" className="btn btn-primary" onClick={startRound}>
              Again
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
