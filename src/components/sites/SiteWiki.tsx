import { useMemo, useState } from 'react';
import { WIKI_ARTICLES } from '../../data/wikiArticles';
import { mergedWiki } from '../../data/contentEngine';
import { todayKey } from '../../lib/seed';
import { useGame } from '../../game/GameContext';

export function SiteWiki() {
  const { recordWikiRead, snapshot } = useGame();
  const [slug, setSlug] = useState<string | null>(null);
  const day = todayKey();
  const playMs = snapshot.playMs;

  const fragments = useMemo(() => mergedWiki(day, playMs), [day, playMs]);
  const article = WIKI_ARTICLES.find((a) => a.slug === slug);
  const fragment = fragments.find((f) => f.id === slug);

  function openArticle(s: string) {
    setSlug(s);
    recordWikiRead(s);
  }

  const title = article?.title ?? fragment?.title ?? 'PocketWiki';

  return (
    <div className="site site-wiki">
      <header className="wiki-header">
        <h1>PocketWiki</h1>
      </header>
      <div className={`wiki-body-wrap${slug ? ' has-article' : ''}`}>
        <aside className="wiki-sidebar">
          <h2>Contents</h2>
          {fragments.slice(0, 6).map((f) => (
            <button key={f.id} type="button" onClick={() => openArticle(f.id)}>
              {f.title}
            </button>
          ))}
          {WIKI_ARTICLES.map((a) => (
            <button key={a.slug} type="button" onClick={() => openArticle(a.slug)}>
              {a.title}
            </button>
          ))}
          {slug ? (
            <button type="button" onClick={() => setSlug(null)}>
              Back to index
            </button>
          ) : null}
        </aside>
        <main className="wiki-main">
          {!slug ? (
            <div className="wiki-card-grid">
              {fragments.map((f) => (
                <button key={f.id} type="button" className="wiki-index-card" onClick={() => openArticle(f.id)}>
                  <span className="tag">fragment</span>
                  <h2>{f.title}</h2>
                  <p>{f.paragraphs[0]}</p>
                </button>
              ))}
              {WIKI_ARTICLES.map((a) => (
                <button key={a.slug} type="button" className="wiki-index-card" onClick={() => openArticle(a.slug)}>
                  <span className="tag">{a.category}</span>
                  <h2>{a.title}</h2>
                  <p>{a.summary}</p>
                </button>
              ))}
            </div>
          ) : (
            <>
              <aside className="wiki-infobox">
                <div className="wiki-infobox-title">{title}</div>
                <div className="wiki-infobox-body">
                  <p>Type: pocket lore</p>
                  <p>Status: readable</p>
                </div>
              </aside>
              <h2>{title}</h2>
              {article
                ? article.body.map((para) => <p key={para.slice(0, 24)}>{para}</p>)
                : fragment
                  ? fragment.paragraphs.map((para) => <p key={para.slice(0, 24)}>{para}</p>)
                  : null}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
