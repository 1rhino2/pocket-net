import { todayKey } from '../../game/gameTypes';
import { QUESTS, questContext } from '../../data/quests';
import { useGame } from '../../game/GameContext';

export function SiteStatus() {
  const { snapshot, claimDailyBonus, discoveryProgress } = useGame();
  const s = snapshot.stats;
  const ctx = questContext(snapshot);
  const day = todayKey();
  const dailyOk = snapshot.dailyClaimDay === day;
  const questsDone = snapshot.questsDone.length;
  const questsReady = QUESTS.filter((q) => !snapshot.questsDone.includes(q.id) && q.check(ctx)).length;
  const prog = discoveryProgress();
  const playH = Math.floor(snapshot.playMs / 3600000);
  const playM = Math.floor((snapshot.playMs % 3600000) / 60000);

  return (
    <div className='site site-status'>
      <div className='status-console'>
        <header className='status-topbar'>
          <span className='status-live'>● LIVE</span>
          <h1>NOC Dashboard</h1>
          <span className='status-date'>{day}</span>
        </header>

        <p className='status-tagline'>Local save telemetry. Nothing phones home.</p>

        <div className='status-ticker' aria-hidden>
          <span>
            RC {snapshot.credits} · INT {snapshot.integrity}% · DISC {prog.found}/{prog.goal} · PLAY {playH}h {playM}m ·
            QUESTS {questsReady} ready
          </span>
        </div>

        <div className='status-grid'>
          <div className='status-panel status-panel-accent'>
            <h2>RhinoCoins</h2>
            <p className='status-big'>{snapshot.credits}</p>
            <span className='status-unit'>RC</span>
          </div>
          <div className='status-panel'>
            <h2>Integrity</h2>
            <div className='status-bar'>
              <div className='status-bar-fill' style={{ width: `${snapshot.integrity}%` }} />
            </div>
            <p className='status-val'>{snapshot.integrity}%</p>
          </div>
          <div className='status-panel'>
            <h2>Discovery</h2>
            <p className='status-val'>{prog.found} logged</p>
            <p className='status-sub'>{prog.pct}% chart</p>
          </div>
          <div className='status-panel'>
            <h2>Playtime</h2>
            <p className='status-val'>
              {playH}h {playM}m
            </p>
          </div>

          <div className='status-panel status-wide'>
            <h2>Daily stipend</h2>
            <button type='button' className='status-btn' disabled={dailyOk} onClick={() => claimDailyBonus()}>
              {dailyOk ? 'CLAIMED' : 'CLAIM +15 RC'}
            </button>
          </div>

          <div className='status-panel status-wide'>
            <h2>Quest queue</h2>
            <p className='status-val'>
              {questsDone} done · {questsReady} ready
            </p>
          </div>

          <div className='status-panel status-wide status-panel-table'>
            <h2>Career counters</h2>
            <table className='status-table'>
              <tbody>
                <tr>
                  <td>Navigations</td>
                  <td>{s.navs}</td>
                </tr>
                <tr>
                  <td>Searches</td>
                  <td>{s.searches}</td>
                </tr>
                <tr>
                  <td>Forum posts</td>
                  <td>{s.posts}</td>
                </tr>
                <tr>
                  <td>Mails read</td>
                  <td>{s.mailsRead}</td>
                </tr>
                <tr>
                  <td>Wiki articles</td>
                  <td>{s.wikiReads}</td>
                </tr>
                <tr>
                  <td>Cipher best</td>
                  <td>{s.hackBest}</td>
                </tr>
                <tr>
                  <td>Arcade hall</td>
                  <td>{s.arcadeBest}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
