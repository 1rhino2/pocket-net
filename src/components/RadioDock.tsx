import { useRadio, radioStationName } from '../audio/RadioContext';
import { RadioVisualizer } from './RadioVisualizer';

type Props = {
  compact?: boolean;
  onOpenRadio?: () => void;
};

export function RadioDock({ compact = false, onOpenRadio }: Props) {
  const { stationId, status, volume, tune, setVolume } = useRadio();
  const name = radioStationName(stationId);

  if (!stationId) return null;

  const live = status === 'live';

  return (
    <div className={`radio-dock${compact ? ' radio-dock-compact' : ''}`} role="region" aria-label="Now playing">
      <RadioVisualizer active={live} bars={compact ? 4 : 6} />
      <div className="radio-dock-meta">
        <span className="radio-dock-label">{live ? 'On air' : status === 'error' ? 'Signal lost' : 'Buffering'}</span>
        <strong className="radio-dock-title">{name}</strong>
      </div>
      {!compact ? (
        <label className="radio-dock-vol">
          <span className="sr-only">Volume</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.02}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </label>
      ) : null}
      <div className="radio-dock-actions">
        {onOpenRadio ? (
          <button type="button" className="btn btn-ghost" onClick={onOpenRadio}>
            Open
          </button>
        ) : null}
        <button type="button" className="btn btn-ghost" onClick={() => tune(null)}>
          Stop
        </button>
      </div>
    </div>
  );
}
