import { useCallback, useEffect, useMemo, useState } from 'react';
import { browserScreenTitle } from '../browserTitle';
import { BROWSER_BOOKMARKS } from '../data/browserPlaces';
import { useGame } from '../game/GameContext';
import { pushRecent } from '../lib/browserNav';
import type { NetUrl } from '../types';
import { parseUserUrl } from '../types';
import { BrowserPage } from './BrowserPage';

type Props = {
  url: NetUrl;
  onNavigate: (url: NetUrl) => void;
};

type NavState = {
  stack: NetUrl[];
  idx: number;
};

export function BrowserShell({ url, onNavigate }: Props) {
  const [draft, setDraft] = useState(() => String(url));
  const [reloadKey, setReloadKey] = useState(0);
  const [nav, setNav] = useState<NavState>({ stack: [url], idx: 0 });
  const { recordNav } = useGame();

  const screenTitle = useMemo(() => browserScreenTitle(url), [url]);
  const canBack = nav.idx > 0;
  const canForward = nav.idx < nav.stack.length - 1;

  const syncUrl = useCallback(
    (next: NetUrl, pushHistory: boolean) => {
      setDraft(String(next));
      if (pushHistory) {
        setNav((n) => {
          if (n.stack[n.idx] === next) return n;
          const stack = [...n.stack.slice(0, n.idx + 1), next];
          return { stack, idx: stack.length - 1 };
        });
        pushRecent(next);
      }
      onNavigate(next);
    },
    [onNavigate],
  );

  useEffect(() => {
    setDraft(String(url));
    setNav((n) => {
      if (n.stack[n.idx] === url) return n;
      const stack = [...n.stack.slice(0, n.idx + 1), url];
      return { stack, idx: stack.length - 1 };
    });
    pushRecent(url);
  }, [url]);

  useEffect(() => {
    recordNav(url);
  }, [url, recordNav]);

  function go(next: NetUrl) {
    syncUrl(next, true);
  }

  function submitUrl() {
    const parsed = parseUserUrl(draft);
    if (parsed) go(parsed);
  }

  return (
    <div className='browser-root'>
      <div className='browser-chrome'>
        <div className='browser-toolbar'>
          <div className='browser-nav' aria-label='Navigation'>
            <button type='button' className='browser-icon-btn' disabled={!canBack} onClick={() => go(nav.stack[nav.idx - 1]!)} title='Back'>
              ←
            </button>
            <button
              type='button'
              className='browser-icon-btn'
              disabled={!canForward}
              onClick={() => go(nav.stack[nav.idx + 1]!)}
              title='Forward'
            >
              →
            </button>
            <button
              type='button'
              className='browser-icon-btn'
              onClick={() => {
                setReloadKey((k) => k + 1);
                recordNav(url);
              }}
              title='Reload'
            >
              ↻
            </button>
            <button type='button' className='browser-icon-btn' onClick={() => go('rn:home')} title='Home'>
              ⌂
            </button>
          </div>
          <form
            className='browser-url'
            onSubmit={(e) => {
              e.preventDefault();
              submitUrl();
            }}
          >
            <span className='browser-lock' title='RhinoNet address space'>
              rn://
            </span>
            <input
              className='field browser-url-input'
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              spellCheck={false}
              aria-label='Address'
              placeholder='rn:search · rn:chronicle · rn:shift …'
            />
            <button type='submit' className='btn btn-primary browser-go'>
              Go
            </button>
          </form>
        </div>

        <div className='browser-bookmarks' aria-label='Bookmarks'>
          {BROWSER_BOOKMARKS.map((b) => (
            <button
              key={b.url}
              type='button'
              className={`browser-bookmark${url === b.url ? ' active' : ''}`}
              onClick={() => go(b.url)}
            >
              {b.label}
            </button>
          ))}
        </div>

        <div className='browser-tabstrip'>
          <span className='browser-tab active'>
            <span className='browser-tab-dot' aria-hidden />
            {screenTitle}
          </span>
        </div>
      </div>

      <div className='browser-content'>
        <div key={`${url}-${reloadKey}`} className='browser-page ui-page-enter'>
          <BrowserPage url={url} onNavigate={go} />
        </div>
      </div>

      <div className='browser-statusbar'>
        <span className='browser-status-left'>
          <span className='browser-status-pill'>offline sandbox</span>
          <span className='browser-status-pill'>rn network</span>
        </span>
        <span className='browser-status-url'>{String(url)}</span>
        <span className='browser-status-right'>RhinoBrowser</span>
      </div>
    </div>
  );
}
