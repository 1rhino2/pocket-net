import { CHRONICLE_HOURS } from '../../data/chronicle24';
import type { NetUrl } from '../../types';

type Props = { onNavigate: (url: NetUrl) => void };

export function SiteChronicle({ onNavigate }: Props) {
  return (
    <div className="site site-chronicle">
      <div className="chronicle-board">
        <h1>Explore</h1>
        <p className="chronicle-intro">
          Story threads on the pocket net. Pick a name that sounds interesting. No order, no finish line.
        </p>
        <div className="chronicle-polaroids">
          {CHRONICLE_HOURS.map((ch, i) => (
            <button
              key={ch.hour}
              type="button"
              className="chronicle-polaroid"
              style={{ transform: `rotate(${((i % 7) - 3) * 3}deg)` }}
              onClick={() => onNavigate(ch.url)}
            >
              <span className="tag">thread {ch.hour}</span>
              <strong>{ch.codename}</strong>
              <small>{ch.url}</small>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
