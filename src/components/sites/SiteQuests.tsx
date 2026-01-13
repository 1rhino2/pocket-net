import { QUESTS, questContext } from '../../data/quests';
import { todayKey } from '../../game/gameTypes';
import { useGame } from '../../game/GameContext';

export function SiteQuests() {
  const { snapshot, completeQuest, claimDailyBonus } = useGame();
  const done = new Set(snapshot.questsDone);
  const ctx = questContext(snapshot);
  const day = todayKey();
  const dailyOk = snapshot.dailyClaimDay === day;

  return (
    <div className="site site-quests">
      <div className="quests-board">
        <h1>Quest Board</h1>
        <div className="quests-stipend">
          <h2>Daily stipend</h2>
          <p>+15 RC and +2 integrity once per calendar day.</p>
          <button type="button" className="quest-stipend-btn" disabled={dailyOk} onClick={() => claimDailyBonus()}>
            {dailyOk ? 'Claimed today' : 'Claim stipend'}
          </button>
        </div>
        <div className="quest-pins">
          {QUESTS.map((q, i) => {
            const complete = done.has(q.id);
            const ready = !complete && q.check(ctx);
            const rot = ((i % 5) - 2) * 2;
            return (
              <article
                key={q.id}
                className={`quest-pin${ready ? ' ready' : ''}${complete ? ' done' : ''}`}
                style={{ transform: `rotate(${rot}deg)` }}
              >
                <h2>{q.title}</h2>
                <p>{q.blurb}</p>
                <p>Reward: {q.reward} RC{q.integrity ? `, +${q.integrity} integrity` : ''}</p>
                {ready ? (
                  <button type="button" className="quest-stamp-btn" onClick={() => completeQuest(q.id)}>
                    Turn in
                  </button>
                ) : (
                  <span className="tag">{complete ? 'done' : 'locked'}</span>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
