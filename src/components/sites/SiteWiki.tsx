import { useState } from 'react';
import { WIKI_ARTICLES } from '../../data/wikiArticles';
import { useGame } from '../../game/GameContext';

export function SiteWiki() {
  const { recordWikiRead } = useGame();
  const [slug, setSlug] = useState<string | null>(null);
  const article = WIKI_ARTICLES.find((a) => a.slug === slug);

  function openArticle(s: string) {
    setSlug(s);
    recordWikiRead();
  }

  return (
    <div className="site">
      <h1>PocketWiki</h1>
      <p className="lead">Articles written by interns who never logged off.</p>

      {!article ? (
        <div className="wiki-list">
          {WIKI_ARTICLES.map((a) => (
            <button key={a.slug} type="button" className="card wiki-card" onClick={() => openArticle(a.slug)}>
              <span className="tag">{a.category}</span>
              <h2>{a.title}</h2>
              <p className="lead">{a.summary}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="card">
          <button type="button" className="btn btn-ghost" onClick={() => setSlug(null)}>
            Back to index
          </button>
          <span className="tag">{article.category}</span>
          <h2>{article.title}</h2>
          {article.body.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
      )}
    </div>
  );
}
