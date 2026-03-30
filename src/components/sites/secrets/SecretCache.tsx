import { useMemo, useState } from 'react';
import { useGame } from '../../../game/GameContext';
import type { NetUrl } from '../../../types';

type Props = {
  onNavigate: (url: NetUrl) => void;
};

type CacheRow = {
  url: string;
  status: string;
  size: string;
  checked: boolean;
};

export function SecretCache({ onNavigate }: Props) {
  const { snapshot } = useGame();
  const [tab, setTab] = useState<'general' | 'files'>('files');
  const [clearing, setClearing] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const rows = useMemo<CacheRow[]>(() => {
    const visited = snapshot.visitedNodes.slice(0, 10);
    const base: CacheRow[] = [
      { url: 'rn:home', status: 'document', size: '12 KB', checked: true },
      { url: 'rn:readme', status: 'document', size: '41 KB', checked: false },
    ];
    if (snapshot.discovered.includes('secret_ghost')) {
      base.splice(1, 0, {
        url: 'rn:ghost',
        status: 'document',
        size: '1997 KB',
        checked: true,
      });
    }
    visited.forEach((u, i) => {
      base.push({
        url: u,
        status: i % 3 === 0 ? 'error page (saved)' : 'document',
        size: `${8 + i * 13} KB`,
        checked: i % 2 === 0,
      });
    });
    return base;
  }, [snapshot.visitedNodes, snapshot.discovered]);

  const totalKb = rows.reduce((n, r) => n + parseInt(r.size, 10) || 0, 0);

  function toggleRow(url: string) {
    setChecked((prev) => ({ ...prev, [url]: !prev[url] }));
  }

  function clearCache() {
    setClearing(true);
    window.setTimeout(() => setClearing(false), 2400);
  }

  return (
    <div className='secret secret-cache'>
      <div className='cache-win'>
        <div className='cache-titlebar'>
          <span className='cache-titlebar-icon' aria-hidden>
            IE
          </span>
          <span className='cache-titlebar-text'>Internet Properties</span>
          <span className='cache-titlebar-btns' aria-hidden>
            <span>_</span>
            <span>□</span>
            <span>×</span>
          </span>
        </div>

        <div className='cache-tabs'>
          {(['general', 'files'] as const).map((t) => (
            <button
              key={t}
              type='button'
              className={`cache-tab${tab === t ? ' active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t === 'general' ? 'General' : 'Temporary Internet Files'}
            </button>
          ))}
        </div>

        <div className='cache-body'>
          {tab === 'general' ? (
            <div className='cache-general'>
              <p>Home page: rn:home (you never left)</p>
              <p>History: kept forever in a jar labeled STALE</p>
              <p>Colors: 256 · Fonts: Arial · Connection: disconnected since Tuesday</p>
            </div>
          ) : (
            <>
              <p className='cache-files-lead'>
                Pages you never opened still left fingerprints. Disk space used:{' '}
                <strong>{clearing ? '0 KB (lie)' : `${totalKb} KB`}</strong>
              </p>
              <div className='cache-meter'>
                <span className='cache-meter-fill' style={{ width: clearing ? '2%' : '78%' }} />
              </div>
              <div className='cache-listbox'>
                <div className='cache-list-head'>
                  <span />
                  <span>Address</span>
                  <span>Type</span>
                  <span>Size</span>
                </div>
                {rows.map((r) => {
                  const on = checked[r.url] ?? r.checked;
                  return (
                    <div className='cache-list-row' key={r.url}>
                      <input
                        type='checkbox'
                        checked={on}
                        onChange={() => toggleRow(r.url)}
                        aria-label={`Select ${r.url}`}
                      />
                      <button type='button' className='cache-url' onClick={() => onNavigate(r.url as NetUrl)}>
                        {r.url}
                      </button>
                      <span>{r.status}</span>
                      <span>{r.size}</span>
                    </div>
                  );
                })}
              </div>
              <div className='cache-cookie-jar'>
                <span className='cache-cookie-label'>Cookie jar</span>
                <code>
                  rn_session=still_here; VISITOR=41812; LAST_PAGE=one_you_forgot; rn_phosphor=maybe
                </code>
              </div>
            </>
          )}
        </div>

        <div className='cache-actions'>
          <button type='button' className='cache-btn' onClick={clearCache} disabled={clearing}>
            {clearing ? 'Deleting…' : 'Delete Files'}
          </button>
          <button type='button' className='cache-btn' onClick={() => onNavigate('rn:archive')}>
            View Files
          </button>
          <span className='cache-actions-spacer' />
          <button type='button' className='cache-btn cache-btn-ok' onClick={() => onNavigate('rn:home')}>
            OK
          </button>
          <button type='button' className='cache-btn' onClick={() => onNavigate('rn:home')}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
