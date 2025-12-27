import { useMemo, useState } from 'react';
import { MAIL_INBOX } from '../../data/mailMessages';
import { mergedMail } from '../../data/contentEngine';
import { playHourBucket, todayKey } from '../../lib/seed';
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
  const { recordMailRead, setToast, snapshot } = useGame();
  const [read, setRead] = useState(loadRead);
  const [active, setActive] = useState<string | null>(null);
  const day = todayKey();
  const playMs = snapshot.playMs;
  const bucket = playHourBucket(playMs);

  const inbox = useMemo(() => [...MAIL_INBOX, ...mergedMail(day, playMs)], [day, playMs]);
  const driftCount = inbox.filter((m) => m.id.startsWith('daily-') || m.id.startsWith('play-')).length;
  const unread = useMemo(() => inbox.filter((m) => !read.has(m.id)).length, [inbox, read]);
  const selected = inbox.find((m) => m.id === active);

  function openMail(id: string) {
    setActive(id);
    if (!read.has(id)) {
      const next = new Set(read);
      next.add(id);
      setRead(next);
      localStorage.setItem(MAIL_READ_KEY, JSON.stringify([...next]));
      recordMailRead(id);
    }
  }

  return (
    <div className="site site-mail">
      <div className="mail-chrome">RhinoMail - Inbox</div>
      <div className="mail-toolbar">
        <button type="button">New</button>
        <button type="button">Reply</button>
        <button type="button">Delete</button>
      </div>
      <p className="mail-stats">
        {unread} unread · {driftCount} drift · bucket {bucket}
      </p>
      <div className="mail-layout">
        <div className="mail-list">
          {inbox.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`mail-row${active === m.id ? ' active' : ''}${read.has(m.id) ? '' : ' unread'}${m.id.startsWith('daily-') || m.id.startsWith('hour-') || m.id.startsWith('chronicle-mail-') ? ' drift' : ''}`}
              onClick={() => openMail(m.id)}
            >
              <span className="mail-from">{m.from}</span>
              <strong>{m.subject}</strong>
              <span className="mail-preview">{m.preview}</span>
            </button>
          ))}
        </div>
        <div className="mail-view">
          {selected ? (
            <>
              <h2>{selected.subject}</h2>
              <p className="mail-meta">From {selected.from}</p>
              <pre className="mail-body">{selected.body}</pre>
              <button type="button" className="btn" onClick={() => setToast('Reply sent.', 2200)}>
                Reply
              </button>
            </>
          ) : (
            <p>Select a message. Daily drift mail rotates at midnight.</p>
          )}
        </div>
      </div>
    </div>
  );
}
