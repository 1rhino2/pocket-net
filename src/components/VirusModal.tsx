import { useCallback, useEffect, useRef, useState } from 'react';
import { useGame } from '../game/GameContext';
import { IconFlask } from './icons';

type Phase = 'welcome' | 'eula' | 'install' | 'breach' | 'verdict';

type Props = {
  onClose: () => void;
  onResolve: (kind: 'quarantine' | 'smile' | 'abort', quality: number) => void;
};

const INSTALL_SNIPPETS = [
  '[SMILE] mapping emotional surface area',
  '[SMILE] negotiating with your better judgement',
  '[SMILE] pinning shortcuts you did not ask for',
  '[SMILE] warming up the clipboard (sandboxed)',
  '[SMILE] importing optimism.dll (fake)',
  '[SMILE] mirroring desktop pixels to /dev/null',
  '[SMILE] asking the browser for one more cookie',
  '[SMILE] staging confetti that will never render',
  '[SMILE] compressing doubts into a zip bomb of vibes',
  '[SMILE] registering a scheduled task called Later',
  '[SMILE] whispering to the taskbar',
  '[SMILE] painting smile layers on the glass pane',
  '[SMILE] syncing telemetry to nowhere.local',
  '[SMILE] replacing Cancel with Later (again)',
];

const EULA_BLOCKS = [
  'By continuing you grant FREE_SMILE.EXE permission to display rhetorical questions inside modal dialogs.',
  'You agree that any resemblance to real malware is coincidental and that this is a toy UI inside a toy OS.',
  'The publisher may simulate progress bars, fake checksums, and emotional manipulation for entertainment.',
  'You waive the right to be surprised when a button says Agree and the other button also says Agree but smaller.',
  'If you scroll to the bottom, you confirm you read this with the same attention you give cookie banners.',
  'Quarantine is always available. Accepting the smile is optional and lowers integrity because that is the bit.',
  'RhinoNet is not liable for smirks, chuckles, or sudden urges to audit your dependencies on a Friday.',
];

function randomSnippet() {
  return INSTALL_SNIPPETS[Math.floor(Math.random() * INSTALL_SNIPPETS.length)] ?? INSTALL_SNIPPETS[0];
}

function computeQuality(cableYanked: boolean, breachMisses: number) {
  let q = 1;
  if (breachMisses === 0) q += 1;
  if (cableYanked) q += 1;
  return Math.min(3, q);
}

export function VirusModal({ onClose, onResolve }: Props) {
  const { addCredits, setToast, unlockAchievement } = useGame();
  const [phase, setPhase] = useState<Phase>('welcome');
  const [eulaOk, setEulaOk] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [installLines, setInstallLines] = useState<string[]>([]);
  const [cableYanked, setCableYanked] = useState(false);
  const [showCable, setShowCable] = useState(false);
  const [breachHits, setBreachHits] = useState(0);
  const [breachMisses, setBreachMisses] = useState(0);
  const [activeCell, setActiveCell] = useState(0);
  const [breachToken, setBreachToken] = useState(0);
  const [holdPct, setHoldPct] = useState(0);
  const eulaRef = useRef<HTMLDivElement>(null);
  const holdRaf = useRef<number>(0);
  const holdStart = useRef<number>(0);
  const holding = useRef(false);
  const lastInstallLogP = useRef(-1);

  const finishAbort = useCallback(() => {
    onResolve('abort', 0);
    onClose();
  }, [onClose, onResolve]);

  const finishVerdict = useCallback(
    (kind: 'quarantine' | 'smile') => {
      const q = computeQuality(cableYanked, breachMisses);
      onResolve(kind, q);
      onClose();
    },
    [breachMisses, cableYanked, onClose, onResolve],
  );

  useEffect(() => {
    if (phase !== 'install') return;
    const id = window.setInterval(() => {
      setInstallProgress((p) => {
        if (p >= 100) return 100;
        return p + 1.6;
      });
    }, 42);
    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'install') return;
    const p = Math.floor(installProgress);
    setShowCable(p >= 40 && p <= 62 && !cableYanked);
    if (p !== lastInstallLogP.current && p > 0 && p < 100 && p % 6 === 0) {
      lastInstallLogP.current = p;
      setInstallLines((lines) => [...lines, randomSnippet()].slice(-14));
    }
    if (p >= 100) lastInstallLogP.current = -1;
  }, [installProgress, phase, cableYanked]);

  useEffect(() => {
    if (phase !== 'install' || installProgress < 100) return;
    const t = window.setTimeout(() => {
      setInstallLines((lines) => [...lines, '[SMILE] payload armed (still harmless)', '[SMILE] opening breach drill'].slice(-14));
      setBreachHits(0);
      setBreachMisses(0);
      const c = Math.floor(Math.random() * 9);
      setActiveCell(c);
      setBreachToken((x) => x + 1);
      setPhase('breach');
    }, 420);
    return () => window.clearTimeout(t);
  }, [phase, installProgress]);

  useEffect(() => {
    if (phase !== 'breach' || breachHits >= 6) return;
    const id = window.setTimeout(() => {
      setBreachMisses((m) => m + 1);
      setActiveCell(Math.floor(Math.random() * 9));
      setBreachToken((t) => t + 1);
    }, 820);
    return () => window.clearTimeout(id);
  }, [phase, breachHits, breachToken]);

  const onEulaScroll = () => {
    const el = eulaRef.current;
    if (!el || eulaOk) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollTop + clientHeight >= scrollHeight - 14) {
      setEulaOk(true);
    }
  };

  const yankCable = () => {
    if (cableYanked) return;
    setCableYanked(true);
    setShowCable(false);
    addCredits(3);
    unlockAchievement('virus_cable', 'Hard disconnect');
    setToast('Cable yanked. Installer pretends to be upset. +3 RC', 2800);
  };

  const onBreachCell = (idx: number) => {
    if (phase !== 'breach' || breachHits >= 6) return;
    if (idx === activeCell) {
      const next = breachHits + 1;
      setBreachHits(next);
      addCredits(1);
      setToast('Sector patched +1 RC', 900);
      if (next >= 6) {
        window.setTimeout(() => setPhase('verdict'), 200);
        return;
      }
      setActiveCell(Math.floor(Math.random() * 9));
      setBreachToken((t) => t + 1);
    } else {
      setBreachMisses((m) => m + 1);
      setActiveCell(Math.floor(Math.random() * 9));
      setBreachToken((t) => t + 1);
      setToast('Wrong tile. Smile spreads a little.', 1100);
    }
  };

  const stopHold = () => {
    holding.current = false;
    if (holdRaf.current) window.cancelAnimationFrame(holdRaf.current);
    holdRaf.current = 0;
    setHoldPct(0);
  };

  const tickHold = () => {
    if (!holding.current) return;
    const elapsed = Date.now() - holdStart.current;
    const pct = Math.min(100, (elapsed / 1200) * 100);
    setHoldPct(pct);
    if (elapsed >= 1200) {
      stopHold();
      finishVerdict('quarantine');
      return;
    }
    holdRaf.current = window.requestAnimationFrame(tickHold);
  };

  const startHold = () => {
    holding.current = true;
    holdStart.current = Date.now();
    holdRaf.current = window.requestAnimationFrame(tickHold);
  };

  useEffect(() => {
    return () => {
      if (holdRaf.current) window.cancelAnimationFrame(holdRaf.current);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && phase === 'welcome') {
        e.preventDefault();
        finishAbort();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, finishAbort]);

  useEffect(() => {
    if (phase === 'breach' && breachHits >= 6 && breachMisses === 0) {
      unlockAchievement('virus_breach_ace', 'Patch reflex');
    }
  }, [phase, breachHits, breachMisses, unlockAchievement]);

  return (
    <div className="modal-overlay smile-overlay" role="dialog" aria-modal="true" aria-labelledby="virus-title">
      <div className="modal smile-wizard">
        <div className="modal-head smile-head">
          <div className="modal-badge smile-badge" aria-hidden>
            <IconFlask size={22} className="icon-svg" />
          </div>
          <div className="smile-head-text">
            <h2 id="virus-title">FREE_SMILE.EXE</h2>
            <p className="smile-sub">RhinoNet sandbox ritual v1</p>
          </div>
          <span className="smile-phase-pill" aria-live="polite">
            {phase === 'welcome' && 'intro'}
            {phase === 'eula' && 'license'}
            {phase === 'install' && 'deploy'}
            {phase === 'breach' && 'breach drill'}
            {phase === 'verdict' && 'verdict'}
          </span>
        </div>

        <div className="modal-body smile-body">
          <div key={phase} className="ui-phase-enter">
          {phase === 'welcome' ? (
            <div className="smile-stack">
              <p className="smile-lede">
                FREE_SMILE wants one thing: your attention. Everything here is a fake installer inside a fake OS.
              </p>
              <ul className="smile-list">
                <li>Scroll contract, staged deploy, timed breach patches, then a real choice.</li>
                <li>Press Escape here to bail early with a small reward.</li>
                <li>Quality score (1 to 3) depends on perfect patches and a mid-install cable yank.</li>
              </ul>
              <div className="smile-actions">
                <button type="button" className="btn" onClick={finishAbort}>
                  Eject floppy (bail)
                </button>
                <button type="button" className="btn btn-primary" onClick={() => setPhase('eula')}>
                  Begin installer
                </button>
              </div>
            </div>
          ) : null}

          {phase === 'eula' ? (
            <div className="smile-stack">
              <p className="smile-muted">Scroll to the bottom to unlock Agree. Classic dark pattern cosplay.</p>
              <div className="smile-eula" ref={eulaRef} onScroll={onEulaScroll}>
                {EULA_BLOCKS.map((block, i) => (
                  <p key={`eula-${i}`}>{block}</p>
                ))}
                <p className="smile-eula-end">End of scroll region. You did the reading. Probably.</p>
              </div>
              <div className="smile-actions">
                <button type="button" className="btn" onClick={finishAbort}>
                  Back out
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!eulaOk}
                  onClick={() => {
                    lastInstallLogP.current = -1;
                    setInstallProgress(0);
                    setInstallLines([randomSnippet()]);
                    setPhase('install');
                  }}
                >
                  {eulaOk ? 'Agree and continue' : 'Scroll the license first'}
                </button>
              </div>
            </div>
          ) : null}

          {phase === 'install' ? (
            <div className="smile-stack">
              <div className="smile-meter-wrap" aria-label="Install progress">
                <div className="smile-meter">
                  <div className="smile-meter-fill" style={{ width: `${Math.min(100, installProgress)}%` }} />
                </div>
                <span className="smile-meter-label">{Math.floor(Math.min(100, installProgress))}% staged</span>
              </div>
              {showCable ? (
                <div className="smile-cable-banner">
                  <span>Transient window: yank the cable for bonus score and RC.</span>
                  <button type="button" className="btn btn-warn" onClick={yankCable}>
                    Yank cable
                  </button>
                </div>
              ) : null}
              <div className="smile-console" role="log" aria-live="polite">
                {installLines.map((line, i) => (
                  <div key={`log-${i}-${line.slice(0, 12)}`} className="smile-console-line">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {phase === 'breach' ? (
            <div className="smile-stack">
              <p className="smile-lede">
                Patch six flashing sectors before the timer slips. Wrong tile costs time. Hits pay +1 RC.
              </p>
              <div className="smile-breach-hud">
                <span>Patches {Math.min(6, breachHits)} / 6</span>
                <span>Misses {breachMisses}</span>
              </div>
              <div className="smile-grid" role="group" aria-label="Breach patch grid">
                {Array.from({ length: 9 }, (_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={idx === activeCell ? 'smile-cell smile-cell-hot' : 'smile-cell'}
                    onClick={() => onBreachCell(idx)}
                    disabled={breachHits >= 6}
                  >
                    {idx === activeCell ? 'PATCH' : `${idx + 1}`}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {phase === 'verdict' ? (
            <div className="smile-stack">
              <p className="smile-lede">
                Final chamber. Hold Quarantine for 1.2s to purge, or Accept smile for credits with an integrity hit.
              </p>
              <p className="smile-muted">
                Quality this run: {computeQuality(cableYanked, breachMisses)} of 3 (perfect patches + optional cable).
              </p>
              <div className="smile-verdict">
                <div className="smile-hold-wrap">
                  <button
                    type="button"
                    className="btn smile-hold-btn"
                    onPointerDown={(e) => {
                      e.preventDefault();
                      startHold();
                    }}
                    onPointerUp={stopHold}
                    onPointerLeave={stopHold}
                    onPointerCancel={stopHold}
                  >
                    Hold to quarantine
                  </button>
                  <div className="smile-hold-meter">
                    <div className="smile-hold-fill" style={{ width: `${holdPct}%` }} />
                  </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={() => finishVerdict('smile')}>
                  Accept smile
                </button>
              </div>
            </div>
          ) : null}
          </div>
        </div>

        <div className="modal-foot smile-foot">
          <span className="smile-foot-hint">Hold quarantine for full integrity payout.</span>
        </div>
      </div>
    </div>
  );
}
