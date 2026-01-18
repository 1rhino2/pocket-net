import { useRef, useState } from 'react';
import { useGame } from '../../game/GameContext';

type ChatLine = { who: 'you' | 'bot'; text: string };

function botReply(msg: string): string {
  const t = msg.toLowerCase();
  if (t.includes('help')) return 'Try: quest, coin, smile, wiki, hack, mail, radio.';
  if (t.includes('quest')) return 'Quest board is at rn:quests. Finish the goals, then turn in for RC.';
  if (t.includes('coin') || t.includes('rc')) return 'RhinoCoins pay for mart hauls and daily stipends. Check rn:status.';
  if (t.includes('smile')) return 'FREE_SMILE is on your desktop. Quarantine pays the best integrity.';
  if (t.includes('wiki')) return 'PocketWiki has lore and tips. Four articles read unlocks a quest.';
  if (t.includes('hack') || t.includes('cipher')) return 'Cipher Drill wants 70+ score. Type fast, stay calm.';
  if (t.includes('radio') || t.includes('music')) return 'RhinoFM streams live on rn:radio. Music keeps playing while you browse.';
  if (t.includes('hello') || t.includes('hi')) return 'Greetings operator. Relay is listening.';
  return 'Logged. Send another keyword if you want a real answer.';
}

export function SiteChat() {
  const { recordChatMessage } = useGame();
  const [lines, setLines] = useState<ChatLine[]>([{ who: 'bot', text: 'Relay online. Say help for commands.' }]);
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  function send() {
    const text = draft.trim();
    if (!text) return;
    setDraft('');
    recordChatMessage();
    setLines((ls) => {
      const next: ChatLine[] = [...ls, { who: 'you', text }, { who: 'bot', text: botReply(text) }];
      return next.slice(-40);
    });
    queueMicrotask(() => scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight));
  }

  return (
    <div className="site site-chat">
      <div className="chat-window">
        <div className="chat-titlebar">
          <span>Relay Chat</span>
          <span>_ □ X</span>
        </div>
        <div className="chat-layout">
          <aside className="chat-buddies">
            <strong>Buddies</strong>
            <div className="chat-buddy">relay (online)</div>
            <div className="chat-buddy offline">sysop</div>
            <div className="chat-buddy offline">modem_mary</div>
          </aside>
          <div className="chat-main">
            <div className="chat-log" ref={scrollRef}>
              {lines.map((l, i) => (
                <div key={`${i}-${l.text.slice(0, 8)}`} className={`chat-line chat-${l.who}`}>
                  <span className="chat-who">{l.who === 'you' ? 'you' : 'relay'}</span>
                  <span>{l.text}</span>
                </div>
              ))}
            </div>
            <div className="chat-input-row">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') send();
                }}
              />
              <button type="button" onClick={send}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
