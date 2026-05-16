import { todayKey } from '../../game/gameTypes';
import { QUESTS } from '../../data/quests';
import { useGame } from '../../game/GameContext';

export function SiteStatus() {
  const { snapshot, claimDailyBonus } = useGame();
  const s = snapshot.stats;
  const day = todayKey();
  const dailyOk = snapshot.dailyClaimDay === day;
  const questsDone = snapshot.questsDone.length;
  const questsReady = QUESTS.filter((q) => !snapshot.questsDone.includes(q.id) && q.check(s)).length;

  return (
    <div className="site site-status">
      <h1>System status</h1>
      <p className="lead">Live counters from your local save. Nothing phones home.</p>

      <div className="card">
        <h2>Daily stipend</h2>
        <p className="lead">+15 RC and +2 integrity once per day.</p>
        <button type="button" className="btn btn-primary" disabled={dailyOk} onClick={() => claimDailyBonus()}>
          {dailyOk ? 'Claimed today' : 'Claim stipend'}
        </button>
      </div>

      <div className="card">
        <h2>RhinoCoins</h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.75rem', margin: '0.35rem 0' }}>{snapshot.credits} RC</p>
      </div>

      <div className="card">
        <h2>Integrity</h2>
        <div className="integrity-bar">
          <div className="integrity-fill" style={{ width: `${snapshot.integrity}%` }} />
        </div>
        <p className="lead" style={{ marginTop: '0.45rem' }}>
          {snapshot.integrity}% nominal. Quarantine raises it. Questionable EXE choices lower it.
        </p>
      </div>

      <div className="card">
        <h2>Quests</h2>
        <p>
          {questsDone} completed, {questsReady} ready to turn in.
        </p>
      </div>

      <div className="card">
        <h2>Career stats</h2>
        <table className="stat-table">
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
              <td>Shell commands</td>
              <td>{s.commands}</td>
            </tr>
            <tr>
              <td>PixelMart adds</td>
              <td>{s.martAdds}</td>
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
              <td>Chat messages</td>
              <td>{s.chatMsgs}</td>
            </tr>
            <tr>
              <td>Job applications</td>
              <td>{s.jobsApplied}</td>
            </tr>
            <tr>
              <td>Weather checks</td>
              <td>{s.weatherChecks}</td>
            </tr>
            <tr>
              <td>Radio tunes</td>
              <td>{s.radioTunes}</td>
            </tr>
            <tr>
              <td>Arcade clears</td>
              <td>{s.arcadeWins}</td>
            </tr>
            <tr>
              <td>Arcade best run</td>
              <td>{s.arcadeBest}</td>
            </tr>
            <tr>
              <td>Cipher wins</td>
              <td>{s.hackWins}</td>
            </tr>
            <tr>
              <td>Cipher best</td>
              <td>{s.hackBest}</td>
            </tr>
            <tr>
              <td>Smileware runs</td>
              <td>{s.virusRuns}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>Achievements ({snapshot.achievements.length})</h2>
        {snapshot.achievements.length === 0 ? (
          <p className="lead">None yet. Browse, quest, play, survive the smileware.</p>
        ) : (
          <ul className="ach-list">
            {snapshot.achievements.map((id) => (
              <li key={id}>
                <span className="tag">{id}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
