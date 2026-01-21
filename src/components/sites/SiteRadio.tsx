import { useGame } from '../../game/GameContext';
import { RADIO_STATIONS, useRadio } from '../../audio/RadioContext';
import { RadioVisualizer } from '../RadioVisualizer';

export function SiteRadio() {
  const { recordRadioTune, setToast } = useGame();
  const { stationId, status, volume, toggle, setVolume } = useRadio();
  const active = RADIO_STATIONS.find((s) => s.id === stationId);
  const live = status === 'live' && stationId;

  return (
    <div className="site site-radio">
      <div className="radio-studio">
        <header className="radio-studio-head">
          <h1>RhinoFM</h1>
          <span className={`radio-on-air${live ? ' live' : ''}`}>{live ? 'ON AIR' : 'STANDBY'}</span>
        </header>

        <div className="radio-deck">
          <div className="radio-vu-panel">
            <RadioVisualizer active={!!live} bars={14} className="radio-vu-bars" />
            <div className="radio-now-readout">
              {stationId ? (
                <>
                  <span className="radio-status-text">
                    {status === 'live' ? 'Now playing' : status === 'error' ? 'Signal lost' : 'Tuning...'}
                  </span>
                  <strong>{active?.name}</strong>
                </>
              ) : (
                <span className="radio-status-text">Select a station</span>
              )}
            </div>
          </div>

          <div className="radio-presets">
            {RADIO_STATIONS.map((st) => {
              const on = stationId === st.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  className={`radio-preset-btn${on ? ' tuned' : ''}`}
                  onClick={() => {
                    const wasOff = !on;
                    toggle(st.id);
                    if (wasOff) {
                      recordRadioTune();
                      setToast(`Tuned to ${st.name}`, 2000);
                    }
                  }}
                >
                  <span className="radio-preset-num">{st.id}</span>
                  <strong>{st.name}</strong>
                  <small>{st.desc}</small>
                  {on ? <RadioVisualizer active={status === 'live'} bars={4} className="radio-preset-viz" /> : null}
                </button>
              );
            })}
          </div>

          <label className="radio-fader">
            <span>Master volume</span>
            <input type="range" min={0} max={1} step={0.02} value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
          </label>
        </div>
      </div>
    </div>
  );
}
