import { useMemo } from 'react';
import { weeklyArchiveEntries } from '../../data/procedural';
import { weekKey } from '../../lib/seed';
import { useGame } from '../../game/GameContext';

export function SiteArchive() {
  const { snapshot, claimWeeklyBonus, recordDiscovery } = useGame();
  const week = weekKey();
  const entries = useMemo(() => weeklyArchiveEntries(week), [week]);
  const claimed = snapshot.weeklyClaimKey === week;
  const found = new Set(snapshot.discovered);

  return (
    <div className="site site-archive">
      <div className="archive-vault">
        <header className="archive-vault-head">
          <h1>Packet Archive</h1>
          <p>Microfiche vault · week {week}</p>
        </header>

        <div className="archive-reel-grant">
          <span className="archive-reel-label">WEEKLY TAPE</span>
          <p>+45 RC and +4 integrity once per week.</p>
          <button type="button" disabled={claimed} onClick={() => claimWeeklyBonus()}>
            {claimed ? 'Grant claimed' : 'Load weekly grant'}
          </button>
        </div>

        <div className="archive-film-strip">
          {entries.map((e, i) => {
            const discId = `weekly_${week}_${e.id.split('-').pop()}`;
            const read = found.has(discId) || found.has(`weekly_${week}`);
            return (
              <article key={e.id} className={`archive-frame${read ? ' filed' : ''}`}>
                <header className="archive-frame-head">
                  <span>FRAME {String(i + 1).padStart(2, '0')}</span>
                  <span>{e.week}</span>
                </header>
                <h2>{e.title}</h2>
                <pre className="archive-frame-body">{e.body}</pre>
                <button
                  type="button"
                  onClick={() => {
                    recordDiscovery(discId, { silent: false });
                    recordDiscovery(`weekly_${week}`, { silent: true });
                    recordDiscovery(`lore_${String((parseInt(e.id.slice(-1), 10) % 26) + 1).padStart(2, '0')}`, { silent: true });
                  }}
                >
                  {read ? 'Filed in log' : 'File in Discovery Log'}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
