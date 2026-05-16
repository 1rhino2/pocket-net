import { useState } from 'react';
import { useGame } from '../../game/GameContext';

const DAYS = ['Today', 'Tomorrow', 'Day after'];

const CONDITIONS = [
  'Partly packety',
  'Heavy localhost',
  'Scattered pings',
  'Clear cache',
  'Meteor shower of tabs',
  'Fog of war (Wi-Fi)',
];

function forecast(seed: number) {
  const temp = 12 + ((seed * 17) % 18);
  const cond = CONDITIONS[seed % CONDITIONS.length]!;
  const wind = 3 + (seed % 22);
  return { temp, cond, wind };
}

export function SiteWeather() {
  const { recordWeatherCheck, setToast, addCredits } = useGame();
  const [checked, setChecked] = useState<Set<number>>(() => new Set());
  const [bonusPaid, setBonusPaid] = useState(false);

  function checkDay(i: number) {
    const next = new Set(checked);
    next.add(i);
    setChecked(next);
    recordWeatherCheck();
    if (next.size >= 3 && !bonusPaid) {
      setBonusPaid(true);
      addCredits(5);
      setToast('Triple forecast bonus: +5 RC', 2800);
    }
  }

  return (
    <div className="site">
      <h1>Packet Weather</h1>
      <p className="lead">Three-day outlook for your sector. Check each day for a stipend bonus.</p>

      <div className="weather-grid">
        {DAYS.map((label, i) => {
          const f = forecast(i + checked.size);
          return (
            <div key={label} className="card weather-card">
              <h2>{label}</h2>
              <p className="weather-temp">{f.temp} C</p>
              <p>{f.cond}</p>
              <p className="lead">Wind {f.wind} km/h</p>
              <button
                type="button"
                className={`btn${checked.has(i) ? '' : ' btn-primary'}`}
                disabled={checked.has(i)}
                onClick={() => checkDay(i)}
              >
                {checked.has(i) ? 'Logged' : 'Check forecast'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
