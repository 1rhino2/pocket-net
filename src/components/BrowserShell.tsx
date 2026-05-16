import { useEffect, useMemo, useState } from 'react';
import { useGame } from '../game/GameContext';
import type { NetUrl } from '../types';
import { parseUserUrl } from '../types';
import { BrowserPage } from './BrowserPage';

type Props = {
  url: NetUrl;
  onNavigate: (url: NetUrl) => void;
};

export function BrowserShell({ url, onNavigate }: Props) {
  const [draft, setDraft] = useState(() => String(url));
  const { recordNav } = useGame();

  useEffect(() => {
    setDraft(String(url));
  }, [url]);

  useEffect(() => {
    recordNav(url);
  }, [url, recordNav]);

  const title = useMemo(() => {
    if (url === 'rn:home') return 'RhinoNet Home';
    if (url === 'rn:search') return 'Search';
    if (url === 'rn:directory') return 'Directory';
    if (url === 'rn:forum') return 'The Forum';
    if (url === 'rn:mart') return 'PixelMart';
    if (url === 'rn:readme') return 'Readme';
    if (url === 'rn:arcade') return 'RhinoReflex';
    if (url === 'rn:status') return 'System status';
    return 'Browser';
  }, [url]);

  function go(next: NetUrl) {
    setDraft(String(next));
    onNavigate(next);
  }

  return (
    <div className="browser-root">
      <div className="browser-toolbar">
        <div className="browser-nav">
          <button type="button" className="btn" onClick={() => go('rn:home')}>
            Home
          </button>
        </div>
        <form
          className="browser-url"
          onSubmit={(e) => {
            e.preventDefault();
            const parsed = parseUserUrl(draft);
            if (parsed) go(parsed);
          }}
        >
          <span className="browser-lock" title="RhinoNet address space">
            rn
          </span>
          <input className="field" value={draft} onChange={(e) => setDraft(e.target.value)} spellCheck={false} />
          <button type="submit" className="btn btn-primary">
            Go
          </button>
        </form>
      </div>
      <div className="browser-content">
        <div className="browser-breadcrumb">
          <strong>{title}</strong>
          <span className="bc-sep">/</span>
          <span>{String(url)}</span>
        </div>
        <div key={url} className="browser-page ui-page-enter">
          <BrowserPage url={url} onNavigate={go} />
        </div>
      </div>
    </div>
  );
}
