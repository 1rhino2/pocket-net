import { useGame } from '../../game/GameContext';
import { RADIO_STATIONS, useRadio } from '../../audio/RadioContext';
import { RadioVisualizer } from '../RadioVisualizer';

export function SiteRadio() {
  const { recordRadioTune, setToast } = useGame();
  const { stationId, status, volume, toggle, setVolume } = useRadio();
  const active = RADIO_STATIONS.find((s) => s.id === stationId);

  return (
    <div className="site site-radio">
      <h1>RhinoFM</h1>
      <p className="lead">Three live stations. Tune in and keep browsing.</p>

      {stationId ? (
        <div className="card radio-now-card">
          <div className="radio-now-head">
            <RadioVisualizer active={status === 'live'} bars={8} className="radio-now-viz" />
            <div>
              <p className="radio-now-label">
                {status === 'live' ? 'Now playing' : status === 'error' ? 'Could not connect' : 'Connecting'}
              </p>
              <strong className="radio-now-title">{active?.name}</strong>
            </div>
          </div>
          <label className="radio-vol-row">
            <span>Volume</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
            />
          </label>
        </div>
      ) : null}

      <div className="radio-grid">
        {RADIO_STATIONS.map((st) => {
          const on = stationId === st.id;
          return (
            <div key={st.id} className={`card radio-card${on ? ' playing' : ''}`}>
              <h2>{st.name}</h2>
              <p className="lead">{st.desc}</p>
              {on ? <RadioVisualizer active={status === 'live'} bars={5} className="radio-card-viz" /> : null}
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  const wasOff = !on;
                  toggle(st.id);
                  if (wasOff) {
                    recordRadioTune();
                    setToast(`Tuned to ${st.name}`, 2000);
                  }
                }}
              >
                {on ? 'Stop' : 'Tune in'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
