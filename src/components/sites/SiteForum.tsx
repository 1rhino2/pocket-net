import { useEffect, useMemo, useState } from 'react';
import { useGame } from '../../game/GameContext';
import { FORUM_STORAGE_KEY } from '../../game/gameTypes';

type Post = { id: string; user: string; title: string; body: string; when: string };

const SEED: Post[] = [
  {
    id: 'p1',
    user: 'modem_mary',
    title: 'Is soup a beverage?',
    body: 'I need this settled before dinner. My router agrees with me but it is biased.',
    when: '1999-12-31',
  },
  {
    id: 'p2',
    user: 'cache_me_outside',
    title: 'Tabs vs spaces vs emotional damage',
    body: 'I use spaces but only because my IDE bullied me. Seeking support group.',
    when: '2000-01-03',
  },
  {
    id: 'p3',
    user: 'localhost_legend',
    title: 'RhinoNet feels small?',
    body: 'That is the point. Big internet is loud. This one fits in a backpack.',
    when: '2000-01-07',
  },
];

function loadPosts(): Post[] {
  const seedIds = new Set(SEED.map((p) => p.id));
  const extra: Post[] = [];
  try {
    const raw = localStorage.getItem(FORUM_STORAGE_KEY);
    if (!raw) return [...SEED];
    const saved = JSON.parse(raw) as Post[];
    if (!Array.isArray(saved)) return [...SEED];
    const seen = new Set<string>();
    for (const p of saved) {
      if (!p || typeof p.id !== 'string' || seedIds.has(p.id) || seen.has(p.id)) continue;
      seen.add(p.id);
      extra.push(p);
    }
  } catch {
    return [...SEED];
  }
  return [...SEED, ...extra];
}

export function SiteForum() {
  const { recordPost } = useGame();
  const [posts, setPosts] = useState<Post[]>(loadPosts);
  const [title, setTitle] = useState('Hello from the pocket internet');
  const [body, setBody] = useState('I am posting into fiction. It still counts.');

  useEffect(() => {
    const mine = posts.filter((p) => p.user === 'you');
    localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(mine));
  }, [posts]);

  const sorted = useMemo(() => [...posts].reverse(), [posts]);

  return (
    <div className="site">
      <h1>The Forum</h1>
      <p className="lead">Threads persist in your browser disk. Export nothing. Import vibes.</p>

      <div className="card">
        <h2>New thread</h2>
        <div style={{ display: 'grid', gap: '0.45rem', marginTop: '0.55rem' }}>
          <input className="field" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className="field" rows={4} value={body} onChange={(e) => setBody(e.target.value)} />
          <div className="row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                const t = title.trim();
                const b = body.trim();
                if (!t || !b) return;
                const id = `p_${Math.random().toString(16).slice(2)}`;
                setPosts((p) => [...p, { id, user: 'you', title: t, body: b, when: new Date().toISOString().slice(0, 10) }]);
                recordPost();
                setTitle('Another banger title');
                setBody('Still fiction. Still sincere.');
              }}
            >
              Post
            </button>
            <span className="tag">local-only</span>
          </div>
        </div>
      </div>

      {sorted.map((p) => (
        <div key={p.id} className="card">
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <h2 style={{ margin: 0 }}>{p.title}</h2>
            <span className="tag">{p.when}</span>
          </div>
          <div style={{ color: 'var(--muted)', marginTop: '0.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
            by {p.user}
          </div>
          <p>{p.body}</p>
        </div>
      ))}
    </div>
  );
}
