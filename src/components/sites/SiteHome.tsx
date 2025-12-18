import { useMemo, useState, type FormEvent } from 'react';
import { CHRONICLE_HOURS } from '../../data/chronicle24';
import { pulseEvents } from '../../data/contentEngine';
import { NET_SITES, type NetSiteEntry } from '../../data/netSites';
import { dailyRumors } from '../../data/procedural';
import { useGame } from '../../game/GameContext';
import { readRecent, setPendingSearch } from '../../lib/browserNav';
import { formatPlayMs, pickMany, playHour, playHourBucket, seededRng, todayKey } from '../../lib/seed';
import type { NetUrl } from '../../types';

type Props = {
  onNavigate: (url: NetUrl) => void;
};

const OMNI_HINTS = [
  'packet archive',
  'shift routes',
  'archivist lamp',
  'neon mall',
  'pond packet',
  'daybreak index',
];

const PORTAL_CORE: NetUrl[] = [
  'rn:chronicle',
  'rn:shift',
  'rn:search',
  'rn:map',
  'rn:mail',
  'rn:wiki',
  'rn:discover',
  'rn:directory',
  'rn:forum',
  'rn:radio',
  'rn:archive',
];

const PORTAL_MORE: NetUrl[] = [
  'rn:weather',
  'rn:mart',
  'rn:jobs',
  'rn:chat',
  'rn:hack',
  'rn:arcade',
  'rn:quests',
  'rn:status',
  'rn:readme',
];

function tileCategory(url: NetUrl): NetSiteEntry['category'] {
  return NET_SITES.find((s) => s.url === url)?.category ?? 'meta';
}

export function SiteHome({ onNavigate }: Props) {
  const { snapshot } = useGame();
  const [omni, setOmni] = useState('');
  const day = todayKey();
  const playH = playHour(snapshot.playMs);
  const bucket = playHourBucket(snapshot.playMs);
  const rumors = useMemo(() => dailyRumors(day), [day]);
  const pulses = useMemo(() => pulseEvents(snapshot.playMs), [snapshot.playMs]);
  const recent = useMemo(() => readRecent(), []);
  const hint = OMNI_HINTS[playH % OMNI_HINTS.length]!;

  const featured = useMemo(() => {
    const rng = seededRng(`portal-${day}-${bucket}`);
    return pickMany(rng, CHRONICLE_HOURS, 8);
  }, [day, bucket]);

  const coreSites = useMemo(
    () => PORTAL_CORE.map((url) => NET_SITES.find((s) => s.url === url)).filter(Boolean),
    [],
  );

  const moreSites = useMemo(
    () => PORTAL_MORE.map((url) => NET_SITES.find((s) => s.url === url)).filter(Boolean),
    [],
  );

  function runOmni(e: FormEvent) {
    e.preventDefault();
    const q = omni.trim();
    if (!q) {
      onNavigate('rn:search');
      return;
    }
    if (q.startsWith('rn:')) {
      onNavigate(q as NetUrl);
      return;
    }
    setPendingSearch(q);
    onNavigate('rn:search');
  }

  return (
    <div className='site site-home site-portal'>
      <div className='portal-statusbar' role='status'>
        <span className='portal-status-item'>
          <em>DATE</em> {day}
        </span>
        <span className='portal-status-item'>
          <em>WIRE</em> {formatPlayMs(snapshot.playMs)}
        </span>
        <span className='portal-status-item'>
          <em>BUCKET</em> {bucket}
        </span>
        <span className='portal-status-item'>
          <em>RC</em> {snapshot.credits}
        </span>
        <span className='portal-status-item portal-status-grow'>
          <em>FOUND</em> {snapshot.discovered.length} routes
        </span>
      </div>

      <header className='portal-hero'>
        <div className='portal-chrome'>
          <span className='portal-chrome-dots' aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className='portal-chrome-title'>RhinoBrowser · New Tab</span>
        </div>

        <div className='portal-hero-body'>
          <div className='portal-brand'>
            <span className='portal-logo' aria-hidden>
              RN
            </span>
            <div>
              <h1 className='portal-title'>RhinoNet</h1>
              <p className='portal-tagline'>Pocket internet · wander the rn: space at your own pace</p>
            </div>
          </div>

          <form className='portal-omni' onSubmit={runOmni}>
            <label className='portal-omni-label' htmlFor='portal-search'>
              Search or type an address
            </label>
            <div className='portal-omni-frame'>
              <div className='portal-omni-row'>
                <span className='portal-omni-prefix'>rn://</span>
                <input
                  id='portal-search'
                  className='portal-omni-input'
                  value={omni}
                  onChange={(e) => setOmni(e.target.value)}
                  placeholder={`try ${hint} or rn:chronicle`}
                  spellCheck={false}
                  autoComplete='off'
                />
                <button type='submit' className='portal-omni-go'>
                  Go
                </button>
              </div>
            </div>
            <p className='portal-omni-hint'>
              Addresses like <kbd>rn:shift</kbd> open directly. Plain text runs RhinoSearch.
            </p>
          </form>
        </div>
      </header>

      <div className='portal-columns'>
        <div className='portal-main'>
          <section className='portal-section'>
            <h2 className='portal-section-title'>Start wandering</h2>
            <p className='portal-section-lead'>Core destinations on the pocket net. Each site has its own layout.</p>
            <div className='portal-tiles'>
              {coreSites.map((it) =>
                it ? (
                  <button
                    key={it.url}
                    type='button'
                    className='portal-tile'
                    data-cat={tileCategory(it.url)}
                    onClick={() => onNavigate(it.url)}
                  >
                    <span className='portal-tile-tag'>{it.tag}</span>
                    <strong>{it.title}</strong>
                    <small>{it.desc}</small>
                    <span className='portal-tile-url'>{it.url}</span>
                  </button>
                ) : null,
              )}
            </div>
          </section>

          <section className='portal-section portal-section-compact'>
            <h2 className='portal-section-title'>Also on the net</h2>
            <div className='portal-more-row'>
              {moreSites.map((it) =>
                it ? (
                  <button
                    key={it.url}
                    type='button'
                    className='portal-more-link'
                    onClick={() => onNavigate(it.url)}
                  >
                    {it.title}
                  </button>
                ) : null,
              )}
            </div>
          </section>

          {recent.length > 0 ? (
            <section className='portal-section portal-section-compact'>
              <h2 className='portal-section-title'>Recent tabs</h2>
              <div className='portal-recent'>
                {recent.map((u) => (
                  <button key={u} type='button' className='portal-recent-btn' onClick={() => onNavigate(u)}>
                    {u}
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          <section className='portal-section'>
            <h2 className='portal-section-title'>Explore threads · {day}</h2>
            <p className='portal-section-lead'>
              Eight codenames picked for this session. Open any thread for fiction, mail, wiki, and search phrases.
            </p>
            <div className='portal-thread-grid'>
              {featured.map((ch) => (
                <button key={ch.url} type='button' className='portal-thread' onClick={() => onNavigate(ch.url)}>
                  <span className='portal-thread-hour'>{String(ch.hour).padStart(2, '0')}</span>
                  <strong>{ch.codename}</strong>
                  <small>{ch.title}</small>
                </button>
              ))}
              <button type='button' className='portal-thread portal-thread-all' onClick={() => onNavigate('rn:chronicle')}>
                <strong>All threads</strong>
                <small>Open the full Explore index</small>
              </button>
            </div>
          </section>
        </div>

        <aside className='portal-aside'>
          <section className='portal-panel portal-pulse'>
            <h2 className='portal-panel-title'>Wire pulse</h2>
            <ul className='portal-rumor-list'>
              {rumors.slice(0, 3).map((r) => (
                <li key={r}>{r}</li>
              ))}
              {pulses.slice(0, 2).map((p) => (
                <li key={p.id}>{p.line}</li>
              ))}
            </ul>
            <div className='portal-panel-actions'>
              <button type='button' className='portal-action-btn' onClick={() => onNavigate('rn:shift')}>
                Net Index
              </button>
              <button type='button' className='portal-action-btn' onClick={() => onNavigate('rn:discover')}>
                Discovery log
              </button>
              <button type='button' className='portal-action-btn' onClick={() => onNavigate('rn:directory')}>
                Directory
              </button>
            </div>
          </section>

          <section className='portal-panel portal-tip'>
            <h2 className='portal-panel-title'>Operator note</h2>
            <p>
              Hour <strong>{String(playH).padStart(2, '0')}</strong> of your session. Drift routes in the Net Index
              rotate with bucket <strong>{bucket}</strong>.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
