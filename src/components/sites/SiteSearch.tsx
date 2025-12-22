import { useEffect, useMemo, useState } from 'react';
import { useGame } from '../../game/GameContext';
import type { NetUrl } from '../../types';
import { searchDocs, type SearchDoc } from '../../data/searchIndex';
import { secretUrlForSearch } from '../../data/procedural';
import { consumePendingSearch } from '../../lib/browserNav';
import { playHourBucket, todayKey } from '../../lib/seed';

type Props = {
  onNavigate: (url: NetUrl) => void;
};

export function SiteSearch({ onNavigate }: Props) {
  const { recordSearch, setToast, snapshot } = useGame();
  const [q, setQ] = useState('');
  useEffect(() => {
    const pending = consumePendingSearch();
    if (pending) setQ(pending);
  }, []);
  const day = todayKey();
  const playMs = snapshot.playMs;
  const bucket = playHourBucket(playMs);
  const results = useMemo(() => searchDocs(q, day, playMs), [q, day, playMs]);
  const secret = useMemo(() => secretUrlForSearch(q, playMs), [q, playMs]);

  function runSearch() {
    const trimmed = q.trim();
    setQ(trimmed);
    recordSearch(trimmed);
    if (secret) {
      setToast(`Hidden route found: ${secret}`, 4000);
      onNavigate(secret as NetUrl);
    }
  }

  return (
    <div className='site site-search'>
      <header className='search-brand'>
        <div className='search-logo' aria-hidden>
          <span className='search-logo-r'>R</span>
          <span className='search-logo-h'>h</span>
          <span className='search-logo-i'>i</span>
          <span className='search-logo-n'>n</span>
          <span className='search-logo-o'>o</span>
          <span>Search</span>
        </div>
      </header>

      <form
        className='search-form'
        onSubmit={(e) => {
          e.preventDefault();
          runSearch();
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder='search mail rumors, wiki fragments, map whispers...'
          aria-label='Search query'
        />
        <button type='submit'>Search</button>
      </form>

      <p className='search-meta'>
        {results.length} results · daily + drift + routes + threads ({day} · bucket {bucket})
      </p>

      {secret ? (
        <div className='search-secret'>
          <strong>Hidden route detected</strong>
          <p>This query maps to {secret}.</p>
          <button type='button' className='btn btn-primary' onClick={() => onNavigate(secret as NetUrl)}>
            Open {secret}
          </button>
        </div>
      ) : null}

      {results.length === 0 && !secret ? (
        <div className='search-empty'>
          <h2>No results</h2>
          <p>Try a rumor from rn:home, or open rn:discover for your log.</p>
        </div>
      ) : (
        <ol className='search-results'>
          {results.map((r: SearchDoc) => (
            <li key={r.id} className='search-hit'>
              <button type='button' className='search-hit-url' onClick={() => onNavigate(r.url as NetUrl)}>
                {r.title}
              </button>
              <div className='search-hit-route'>{r.url}</div>
              <p className='search-hit-snippet'>{r.snippet}</p>
              <div className='search-hit-tags'>
                {r.tags.map((t: string) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
