import { useMemo, useState } from 'react';
import { useGame } from '../../game/GameContext';
import type { NetUrl } from '../../types';
import { searchDocs } from '../../data/searchIndex';

type Props = {
  onNavigate: (url: NetUrl) => void;
};

export function SiteSearch({ onNavigate }: Props) {
  const { recordSearch } = useGame();
  const [q, setQ] = useState('forum soup');
  const results = useMemo(() => searchDocs(q), [q]);

  function runSearch() {
    setQ((x) => x.trim());
    recordSearch();
  }

  return (
    <div className="site">
      <h1>RhinoSearch</h1>
      <p className="lead">Search the pocket index. Ranked by relevance and operator history.</p>

      <div className="row" style={{ marginTop: '0.35rem' }}>
        <input
          className="field"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') runSearch();
          }}
          placeholder="try: hats, soup, readme, arcade"
        />
        <button type="button" className="btn btn-primary" onClick={runSearch}>
          Search
        </button>
      </div>

      <div style={{ marginTop: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
        {results.length} hit(s)
      </div>

      {results.map((r) => (
        <div key={r.id} className="card">
          <div className="row" style={{ justifyContent: 'space-between', gap: '0.75rem' }}>
            <div style={{ minWidth: 0 }}>
              <button
                type="button"
                className="btn btn-ghost"
                style={{ padding: 0, border: 'none', textAlign: 'left' }}
                onClick={() => {
                  const u = r.url as NetUrl;
                  onNavigate(u);
                }}
              >
                <h2 style={{ margin: 0, color: 'var(--accent)' }}>{r.title}</h2>
              </button>
              <div style={{ color: 'var(--muted)', marginTop: '0.25rem', fontSize: '0.85rem' }}>{r.url}</div>
              <p style={{ marginTop: '0.55rem' }}>{r.snippet}</p>
              <div className="row" style={{ marginTop: '0.45rem' }}>
                {r.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {results.length === 0 ? (
        <div className="card">
          <h2>No results</h2>
          <p>Try a shorter query, or type rn:directory and pretend you planned it.</p>
        </div>
      ) : null}
    </div>
  );
}
