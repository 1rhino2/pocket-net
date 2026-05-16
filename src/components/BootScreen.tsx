import { useEffect, useMemo, useRef, useState } from 'react';

type BootProps = {
  onDone: () => void;
};

const LINES = [
  'BIOS: RhinoBoard v0.9 - OK',
  'RAM test: 640K should be enough (it is not)',
  'Detecting parallel universe… found 1',
  'Mounting /dev/imagination … OK',
  'Starting RhinoNet stack: PPP, DNS, DRAMA',
  'Handshake: polite',
  'Assigned IP: 10.66.6.42 (do not tell upstream)',
  'Loading desktop…',
];

export function BootScreen({ onDone }: BootProps) {
  const [idx, setIdx] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setIdx((i) => {
        if (i >= LINES.length - 1) {
          if (timer.current) window.clearInterval(timer.current);
          window.setTimeout(onDone, 420);
          return i;
        }
        return i + 1;
      });
    }, 520);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [onDone]);

  useEffect(() => {
    if (!skipped) return;
    if (timer.current) window.clearInterval(timer.current);
  }, [skipped]);

  const pct = useMemo(() => {
    if (skipped) return 100;
    return Math.min(100, Math.round(((idx + 1) / LINES.length) * 100));
  }, [idx, skipped]);

  return (
    <div className="boot">
      <div className="boot-card">
        <div className="boot-brand">
          <div className="boot-logo" aria-hidden>
            RN
          </div>
          <div>
            <div className="boot-title">RhinoNet 2000</div>
            <div className="boot-sub">Pocket Edition · build 0.8</div>
          </div>
        </div>

        <div className="boot-meter" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="boot-meter-fill" style={{ width: `${pct}%` }} />
        </div>

        <pre className="boot-log" aria-live="polite">
          {LINES.slice(0, skipped ? LINES.length : idx + 1).join('\n')}
          <span className="boot-cursor" aria-hidden />
        </pre>

        <div className="boot-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setSkipped(true);
              setIdx(LINES.length - 1);
            }}
          >
            Skip introspection
          </button>
          <button type="button" className="btn btn-primary" onClick={onDone}>
            Enter desktop
          </button>
        </div>
      </div>
    </div>
  );
}
