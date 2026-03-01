import { getHourChapterByUrl } from '../../data/chronicle24';
import { permanentNodesForChapter } from '../../data/nodeCatalog';
import { useGame } from '../../game/GameContext';
import type { HourNetUrl, NetUrl } from '../../types';

type Props = {
  url: HourNetUrl;
  onNavigate: (url: NetUrl) => void;
};

const LAYOUTS = ['dossier', 'casefile', 'zine', 'logbook'] as const;

export function SiteHourChapter({ url, onNavigate }: Props) {
  const { snapshot, recordHourSignal, setToast } = useGame();
  const ch = getHourChapterByUrl(url);
  const found = new Set(snapshot.hourSignalsFound);

  if (!ch) {
    return (
      <div className='site site-hour-chapter site-hour-missing'>
        <div className='hour-missing-panel'>
          <h1>Missing thread</h1>
          <button type='button' className='hour-btn' onClick={() => onNavigate('rn:chronicle')}>
            Back to Explore
          </button>
        </div>
      </div>
    );
  }

  const threadNodes = permanentNodesForChapter(ch.hour);
  const hourPad = String(ch.hour).padStart(2, '0');
  const layout = LAYOUTS[ch.hour % LAYOUTS.length];
  const wrapClass =
    layout === 'dossier'
      ? 'hour-folder'
      : layout === 'casefile'
        ? 'hour-case'
        : layout === 'zine'
          ? 'hour-zine'
          : 'hour-log';

  const layoutLabel =
    layout === 'dossier'
      ? 'CONFIDENTIAL DOSSIER'
      : layout === 'casefile'
        ? 'CASE FILE'
        : layout === 'zine'
          ? 'UNDERGROUND ZINE'
          : 'SHIP LOGBOOK';

  function pinNote(signalId: string, title: string) {
    const ok = recordHourSignal(signalId);
    if (ok) setToast(`Pinned: ${title}`, 2800);
  }

  return (
    <div className='site site-hour-chapter' data-hour={hourPad} data-chapter={String(ch.hour)} data-layout={layout}>
      <header className='hour-chrome'>
        <span className='hour-chrome-kind'>{layoutLabel}</span>
        <span className='hour-chrome-hour'>THREAD {hourPad}</span>
      </header>

      <div className={wrapClass}>
        <span className='hour-tag'>explore thread</span>
        <h1>{ch.codename}</h1>
        <p className='hour-route'>{url}</p>

        <div className='hour-story'>
          {ch.story.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <section className='hour-notes'>
          <h2>Field notes</h2>
          <p className='hour-notes-lead'>
            Optional bookmarks. Search notes need RhinoSearch. Mail and wiki notes pin when you read them.
          </p>
          <ul className='hour-trace-list'>
            {ch.signals.map((sig) => {
              const has = found.has(sig.id);
              return (
                <li key={sig.id} className={`hour-trace${has ? ' filed' : ''}`}>
                  <div className='hour-trace-body'>
                    <strong>{sig.title}</strong>
                    <p>{sig.blurb}</p>
                    {sig.kind === 'search' && sig.searchQuery ? (
                      <p className='hour-trace-meta'>Search: {sig.searchQuery}</p>
                    ) : null}
                    {sig.kind === 'node' && sig.nodeUrl ? (
                      <button type='button' className='hour-link' onClick={() => onNavigate(sig.nodeUrl as NetUrl)}>
                        {sig.nodeUrl}
                      </button>
                    ) : null}
                  </div>
                  <div className='hour-trace-actions'>
                    {sig.kind === 'trace' && sig.id.endsWith('_s6') ? (
                      <button type='button' className='hour-btn' disabled={has} onClick={() => onNavigate('rn:mail')}>
                        {has ? 'Pinned' : 'Open mail'}
                      </button>
                    ) : sig.kind === 'trace' && !sig.id.endsWith('_s6') ? (
                      <button type='button' className='hour-btn hour-btn-primary' disabled={has} onClick={() => pinNote(sig.id, sig.title)}>
                        {has ? 'Pinned' : 'Pin note'}
                      </button>
                    ) : sig.kind === 'wiki' ? (
                      <button type='button' className='hour-btn' disabled={has} onClick={() => onNavigate('rn:wiki')}>
                        {has ? 'Pinned' : 'Open wiki'}
                      </button>
                    ) : sig.kind === 'search' ? (
                      <button type='button' className='hour-btn' disabled={has} onClick={() => onNavigate('rn:search')}>
                        {has ? 'Pinned' : 'Search'}
                      </button>
                    ) : (
                      <span className='hour-tag'>{has ? 'pinned' : sig.kind}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className='hour-routes'>
          <h2>Routes nearby</h2>
          <p className='hour-notes-lead'>Permanent pages tied to this thread.</p>
          <div className='hour-route-grid'>
            {threadNodes.slice(0, 8).map((n) => (
              <button key={n.url} type='button' className='hour-route-chip' onClick={() => onNavigate(n.url as NetUrl)}>
                <span className='hour-tag'>{n.tag}</span>
                <strong>{n.title}</strong>
              </button>
            ))}
          </div>
          <button type='button' className='hour-btn' onClick={() => onNavigate('rn:shift')}>
            Net Index (all routes)
          </button>
        </section>

        <nav className='hour-nav'>
          <button type='button' className='hour-btn' onClick={() => onNavigate('rn:chronicle')}>
            Explore
          </button>
          <button type='button' className='hour-btn' onClick={() => onNavigate('rn:search')}>
            Search
          </button>
          <button type='button' className='hour-btn' onClick={() => onNavigate('rn:mail')}>
            Mail
          </button>
        </nav>
      </div>
    </div>
  );
}
