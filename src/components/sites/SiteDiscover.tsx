import { useMemo, useState } from 'react';
import { STATIC_DISCOVERIES, discoveryMeta, type DiscoveryCategory } from '../../data/discoveryCatalog';
import { useGame } from '../../game/GameContext';

const FILTERS: { id: 'all' | DiscoveryCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'site', label: 'Sites' },
  { id: 'secret', label: 'Secrets' },
  { id: 'stamp', label: 'Stamps' },
  { id: 'daily', label: 'Daily' },
  { id: 'hourly', label: 'Hourly' },
  { id: 'chronicle', label: 'Explore' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'lore', label: 'Lore' },
  { id: 'milestone', label: 'Milestones' },
];

export function SiteDiscover() {
  const { snapshot, discoveryProgress } = useGame();
  const [filter, setFilter] = useState<'all' | DiscoveryCategory>('all');
  const found = new Set(snapshot.discovered);
  const prog = discoveryProgress();

  const rows = useMemo(() => {
    const pool = [
      ...STATIC_DISCOVERIES,
      ...snapshot.discovered
        .filter((id) => !STATIC_DISCOVERIES.some((d) => d.id === id))
        .map((id) => discoveryMeta(id))
        .filter((x): x is NonNullable<typeof x> => x !== null),
    ];
    const uniq = new Map(pool.map((d) => [d.id, d]));
    return [...uniq.values()].filter((d) => filter === 'all' || d.category === filter);
  }, [snapshot.discovered, filter]);

  return (
    <div className="site site-discover">
      <div className="discover-album">
        <p className="discover-passport-label">RhinoNet field passport</p>
        <h1>Discovery Log</h1>
        <p>
          {prog.found} entries · {prog.pct}% of long chart · {snapshot.stamps.length}/50 stamps
        </p>
        <div className="discover-meter">
          <div className="discover-meter-fill" style={{ width: `${prog.pct}%` }} />
        </div>
        <div className="discover-filters">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={filter === f.id ? 'active' : ''}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="discover-stamps">
          {rows.map((d) => {
            const has = found.has(d.id);
            return (
              <div key={d.id} className={`discover-stamp${has ? ' found' : ''}`}>
                <span className="tag">{d.category}</span>
                <strong>{has ? d.title : '???'}</strong>
                <p>{has ? 'Logged.' : d.hint}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
