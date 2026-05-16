import { QUESTS } from '../../data/quests';
import { todayKey } from '../../game/gameTypes';
import { useGame } from '../../game/GameContext';

export function SiteQuests() {
  const { snapshot, completeQuest, claimDailyBonus } = useGame();
  const done = new Set(snapshot.questsDone);
  const day = todayKey();
  const dailyOk = snapshot.dailyClaimDay === day;

  return (
    <div className="site">
      <h1>Quest Board</h1>
      <p className="lead">Contracts read your save file. Complete them once for RhinoCoins.</p>

      <div className="card">
        <h2>Daily stipend</h2>
        <p className="lead">+15 RC and +2 integrity once per calendar day.</p>
        <button type="button" className="btn btn-primary" disabled={dailyOk} onClick={() => claimDailyBonus()}>
          {dailyOk ? 'Claimed today' : 'Claim stipend'}
        </button>
      </div>

      <div className="quest-list">
        {QUESTS.map((q) => {
          const complete = done.has(q.id);
          const ready = !complete && q.check(snapshot.stats);
          return (
            <div key={q.id} className={`card quest-card${ready ? ' ready' : ''}${complete ? ' done' : ''}`}>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <h2>{q.title}</h2>
                <span className="tag">{complete ? 'done' : ready ? 'ready' : 'locked'}</span>
              </div>
              <p className="lead">{q.blurb}</p>
              <p>Reward: {q.reward} RC{q.integrity ? `, +${q.integrity} integrity` : ''}</p>
              {ready ? (
                <button type="button" className="btn btn-primary" onClick={() => completeQuest(q.id)}>
                  Turn in contract
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
