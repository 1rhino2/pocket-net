import { useEffect, useMemo, useState } from 'react';
import { hourlyForumThreads } from '../../data/contentEngine';
import { useGame } from '../../game/GameContext';
import { FORUM_STORAGE_KEY } from '../../game/gameTypes';
import { hourKey } from '../../lib/seed';

type Post = { id: string; user: string; title: string; body: string; when: string };

/*
 * These three are the board as it stands when you arrive. They used to be a
 * router joke, a tabs-versus-spaces bit, and a post from cache_me_outside,
 * which is a 2017 meme handle sitting in a net set in 1999. Rewritten in the
 * voices the rest of the net uses.
 */
const SEED: Post[] = [
  { id: 'p1', user: 'modem_mary', title: 'the console line is answered all night', body: 'New subscribers keep being told there is nobody on overnight. There is. Let it ring past six, I am in the room with the loud equipment.', when: '1999-12-31' },
  { id: 'p2', user: 'soup_judge', title: 'is soup a beverage', body: 'raised at the diner on friday and it got heated in a way i did not predict. my position is that it depends entirely on whether you are holding a spoon.', when: '2000-01-03' },
  { id: 'p3', user: 'localhost_legend', title: 'this net is small and thats GOOD', body: 'my cousin has the big internet at his house and its just adverts and pages that want you to sign up for stuff. here i know who everyone is. i think thats better?? maybe im wrong', when: '2000-01-07' },
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
  const hour = hourKey();
  const hourly = useMemo(() => hourlyForumThreads(hour), [hour]);
  const [posts, setPosts] = useState<Post[]>(loadPosts);
  const [title, setTitle] = useState('Hello from the pocket internet');
  const [body, setBody] = useState('I am posting into fiction. It still counts.');

  useEffect(() => {
    const mine = posts.filter((p) => p.user === 'you');
    localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(mine));
  }, [posts]);

  const sorted = useMemo(() => [...hourly, ...posts].reverse(), [posts, hourly]);

  return (
    <div className="site site-forum">
      <header className="forum-banner">
        <h1>The Forum</h1>
        <p>phpBB pocket board · {hourly.length} hourly threads · {hour.slice(11)}:00</p>
      </header>
      <div className="forum-nav">
        <strong>Board index</strong> · posts stored locally
      </div>
      <div className="forum-compose">
        <h2>Post new thread</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Subject" />
        <textarea rows={3} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body" />
        <button
          type="button"
          className="forum-post-btn"
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
      </div>
      <table className="forum-table">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Author</th>
            <th>When</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => (
            <tr key={p.id}>
              <td>
                <span className="forum-thread-title">{p.title}</span>
                <p>{p.body}</p>
              </td>
              <td className="forum-thread-user">{p.user}</td>
              <td>{p.when}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
