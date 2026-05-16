import { useMemo, useState } from 'react';
import { MAIL_INBOX } from '../../data/mailMessages';
import { MAIL_READ_KEY } from '../../game/gameTypes';
import { useGame } from '../../game/GameContext';

function loadRead(): Set<string> {
  try {
    const raw = localStorage.getItem(MAIL_READ_KEY);
    if (!raw) return new Set();
    const a = JSON.parse(raw) as unknown;
    if (!Array.isArray(a)) return new Set();
    return new Set(a.filter((x) => typeof x === 'string'));
  } catch {
    return new Set();
  }
}

export function SiteMail() {
  const { recordMailRead, setToast } = useGame();
  const [read, setRead] = useState(loadRead);
  const [active, setActive] = useState<string | null>(null);

  const unread = useMemo(() => MAIL_INBOX.filter((m) => !read.has(m.id)).length, [read]);
  const selected = MAIL_INBOX.find((m) => m.id === active);

  function openMail(id: string) {
    setActive(id);
    if (!read.has(id)) {
      const next = new Set(read);
      next.add(id);
      setRead(next);
      localStorage.setItem(MAIL_READ_KEY, JSON.stringify([...next]));
      recordMailRead();
    }
  }

  return (
    <div className="site">
      <h1>RhinoMail</h1>
      <p className="lead">Operator inbox · {unread} unread.</p>

      <div className="mail-layout">
        <div className="mail-list card">
          {MAIL_INBOX.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`mail-row${active === m.id ? ' active' : ''}${read.has(m.id) ? '' : ' unread'}`}
              onClick={() => openMail(m.id)}
            >
              <span className="mail-from">{m.from}</span>
              <strong>{m.subject}</strong>
              <span className="mail-preview">{m.preview}</span>
            </button>
          ))}
        </div>
        <div className="mail-view card">
          {selected ? (
            <>
              <h2>{selected.subject}</h2>
              <p className="mail-meta">From {selected.from}</p>
              <pre className="mail-body">{selected.body}</pre>
              <button
                type="button"
                className="btn"
                onClick={() => setToast('Reply sent.', 2200)}
              >
                Reply
              </button>
            </>
          ) : (
            <p className="lead">Select a message. Reading counts toward quests.</p>
          )}
        </div>
      </div>
    </div>
  );
}
