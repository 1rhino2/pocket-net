import { useCallback, useEffect, useRef, useState } from 'react';
import { hackPhrases } from '../../data/procedural';
import { todayKey } from '../../lib/seed';
import { useGame } from '../../game/GameContext';

type Phase = 'idle' | 'running' | 'done';

export function SiteHack() {
  const { recordHackComplete, snapshot, setToast } = useGame();
  const [phase, setPhase] = useState<Phase>('idle');
  const day = todayKey();
  const [round, setRound] = useState(0);
  const [phrase, setPhrase] = useState(() => hackPhrases(day, 0)[0]!);
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
    const nextRound = round + 1;
    setRound(nextRound);
    const pool = hackPhrases(day, nextRound);
    const p = pool[Math.floor(Math.random() * pool.length)]!;
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
    <div className='site site-hack'>
      <div className='hack-crt'>
        <div className='hack-scanlines' aria-hidden />
        <div className='hack-frame'>
          <div className='hack-titlebar'>
            <span>CIPHER.EXE</span>
            <span className='hack-titlebar-sub'>SECURE SHELL v2.1</span>
          </div>
          <div className='hack-body'>
            <p className='hack-intro'>
              &gt; Type the phrase before the buffer drains. Hall score: {snapshot.stats.hackBest}. Pass at 70+.
            </p>

            {phase === 'idle' ? (
              <button type='button' className='hack-btn hack-btn-primary' onClick={startRound}>
                [ START DRILL ]
              </button>
            ) : null}

            {phase === 'running' ? (
              <div className='hack-active'>
                <div className='hack-meter'>
                  <div className='hack-meter-fill' style={{ width: `${timeLeft}%` }} />
                </div>
                <p className='hack-label'>TARGET PHRASE</p>
                <p className='hack-phrase'>{phrase}</p>
                <p className='hack-label'>YOUR INPUT</p>
                <input
                  className='hack-input'
                  value={typed}
                  onChange={(e) => onType(e.target.value)}
                  autoFocus
                  spellCheck={false}
                />
              </div>
            ) : null}

            {phase === 'done' ? (
              <div className='hack-result'>
                <p className='hack-score'>&gt; SCORE: {score}</p>
                <button type='button' className='hack-btn hack-btn-primary' onClick={startRound}>
                  [ RUN AGAIN ]
                </button>
              </div>
            ) : null}

            <p className='hack-cursor' aria-hidden>
              _
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
