import { useState } from 'react';
import { useGame } from '../../game/GameContext';

const DAYS = ['Today', 'Tomorrow', 'Day after'];
const CONDITIONS = ['Partly packety', 'Heavy localhost', 'Scattered pings', 'Clear cache', 'Meteor shower of tabs', 'Fog of war (Wi-Fi)'];

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
    <div className="site site-weather">
      <div className="weather-live">
        <span className="weather-live-dot" />
        PACKET WEATHER · LIVE
      </div>
      <div className="weather-studio">
        <div className="weather-map">
          Sector 127.0.0.1
          <br />
          Radar loop · on tape
        </div>
        <div className="weather-days">
          {DAYS.map((label, i) => {
            const f = forecast(i + checked.size);
            return (
              <article key={label} className="weather-day">
                <h2>{label}</h2>
                <p>{f.cond}</p>
                <p>Wind {f.wind} km/h</p>
                <span className="weather-temp">{f.temp} C</span>
                <button type="button" disabled={checked.has(i)} onClick={() => checkDay(i)}>
                  {checked.has(i) ? 'Logged' : 'Check forecast'}
                </button>
              </article>
            );
          })}
        </div>
      </div>
      <p className="weather-crawl">Packet Weather · sponsored by localhost · stay indoors during tab storms</p>
    </div>
  );
}
