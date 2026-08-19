import { useMemo, useState } from 'react';
import { useGame } from '../../game/GameContext';
import type { NetUrl } from '../../types';

// PocketPager: a buddy list of the cast. pick a buddy, read the opener, click a
// canned reply to hear more. away buddies show only an away message. talking to
// a buddy the first time records a small discovery. some replies hint at the
// two mysteries and a couple link out to a net page.

type Status = 'online' | 'away' | 'idle';

type Prompt = { you: string; them: string[]; open?: NetUrl };
type Buddy = {
  id: string;
  handle: string;
  status: Status;
  away?: string;
  opener: string[];
  prompts: Prompt[];
};

const BUDDIES: Buddy[] = [
  {
    id: 'mary',
    handle: 'modem_mary',
    status: 'online',
    opener: [`console 2, go ahead`, `im on till six. line is quiet. what do you need`],
    prompts: [
      {
        you: 'anything weird tonight?',
        them: [
          `define weird. b side dropped a call at 23:05, same port as tuesday.`,
          `thats not weird thats just tuesday being tuesday. logged it. move along`,
        ],
      },
      {
        you: 'you ever hear a signal around 2am?',
        them: [
          `the radio fella asked me that too. no. i hear the equipment and the phone and thats the whole concert`,
          `if theres a 2am signal its on his line not mine. try carrier_wave, thats his whole thing`,
        ],
        open: 'rn:n-carrier-log1',
      },
      {
        you: 'thanks, mary',
        them: [`dont thank me, log something. coffees in the cupboard not the machine`],
      },
    ],
  },
  {
    id: 'daemon',
    handle: 'disk_daemon',
    status: 'online',
    opener: [`the shelf is open. tested on my machine.`, `need a utility or a bug report?`],
    prompts: [
      {
        you: 'what is NIGHTLOG for?',
        them: [
          `timestamps whatever the modem hears, honest to the second, rounds nothing`,
          `built it for the signal guy. he wouldnt say why he wanted it, which is exactly why i built it`,
        ],
        open: 'rn:n-daemon-nightlog',
      },
      {
        you: 'got any file of the week?',
        them: [`LOGSORT. sorts a log by timestamp and does nothing else. thats the whole pitch and its enough`],
      },
    ],
  },
  {
    id: 'swap',
    handle: 'swap_meet',
    status: 'idle',
    opener: [`buying or selling`, `no lowballers. i mean it. what do you got`],
    prompts: [
      {
        you: 'tell me about the tape box',
        them: [
          `twelve cassettes, labelled with times not dates. played one, its a tone and clicks and then nothing`,
          `if thats your kind of mystery the times are yours free. i just want to know what i have`,
        ],
        open: 'rn:n-swap-the-mystery-box',
      },
      {
        you: 'whats the one that got away',
        them: [`a portable. eight dollars. do not ask me the model, im having a day`],
      },
    ],
  },
  {
    id: 'legend',
    handle: 'localhost_legend',
    status: 'online',
    opener: [`OH hi!!! did you sign my guestbook yet???`, `my hit counter is at 412 which is basically FAMOUS`],
    prompts: [
      {
        you: 'cool site!',
        them: [`THANK you i built the whole thing myself with only a Little help and the help doesnt count`],
        open: 'rn:n-legend-home',
      },
      {
        you: 'whats under construction?',
        them: [
          `everything!!! thats the Best part, its Always under construction`,
          `a page thats done is a page thats Dead, my dad said that, i think`,
        ],
      },
    ],
  },
  {
    id: 'aero',
    handle: 'aero_prophet',
    status: 'online',
    opener: [`you found me. good. sit down, the future is about to make sense`, `have you read the manifesto`],
    prompts: [
      {
        you: 'what is the glass age?',
        them: [
          `water. glass. green. buttons that look wet. a bubble drifting up for no reason but your comfort`,
          `everyone laughs, which is either how i know im right or exactly how im wrong. i cant tell from in here`,
        ],
        open: 'rn:aero',
      },
      {
        you: 'you really believe the signal is the future?',
        them: [
          `i choose to. the careful men say its a broken relay and theyre probably right`,
          `but a thing that arrives early, regular as a heartbeat, carrying something we cant read yet? let me have my reading`,
        ],
      },
    ],
  },
  {
    id: 'carrier',
    handle: 'carrier_wave',
    status: 'away',
    away: `away: listening. 02:14 tonight like every night. if you decoded it too, dont post the word, we compare privately. the log is at rn:n-carrier-log1`,
    opener: [],
    prompts: [],
  },
  {
    id: 'angel',
    handle: 'xerox_angel',
    status: 'away',
    away: `away: sorry, im not really here anymore. the index is still up at rn:n-angel-index if you want to understand what i was keeping and what i lost. - c`,
    opener: [],
    prompts: [],
  },
];

export function MessengerView({ onOpenBrowser }: { onOpenBrowser: (url: NetUrl) => void }) {
  const { snapshot, recordDiscovery } = useGame();
  const [active, setActive] = useState<string | null>(null);
  const [log, setLog] = useState<{ who: 'you' | 'them'; text: string }[]>([]);
  const [used, setUsed] = useState<Set<number>>(new Set());

  const buddy = useMemo(() => BUDDIES.find((b) => b.id === active) ?? null, [active]);

  const onlineCount = BUDDIES.filter((b) => b.status === 'online').length;

  function openChat(b: Buddy) {
    setActive(b.id);
    setUsed(new Set());
    if (b.status === 'away' || b.opener.length === 0) {
      setLog([]);
      return;
    }
    setLog(b.opener.map((t) => ({ who: 'them' as const, text: t })));
    recordDiscovery(`msgr_${b.id}`);
  }

  function say(b: Buddy, pi: number) {
    const p = b.prompts[pi];
    setLog((l) => [...l, { who: 'you', text: p.you }, ...p.them.map((t) => ({ who: 'them' as const, text: t }))]);
    setUsed((u) => new Set(u).add(pi));
    if (p.open) {
      const url = p.open;
      setLog((l) => [...l, { who: 'them', text: `[ opening ${url} ]` }]);
      setTimeout(() => onOpenBrowser(url), 350);
    }
  }

  const talkedTo = BUDDIES.filter((b) => snapshot.discovered.includes(`msgr_${b.id}`)).length;

  return (
    <div className='pager'>
      <div className='pager-list'>
        <div className='pager-head'>
          <strong>PocketPager</strong>
          <span className='pager-online'>{onlineCount} online</span>
        </div>
        <ul>
          {BUDDIES.map((b) => (
            <li key={b.id}>
              <button
                className={`pager-buddy ${active === b.id ? 'pager-buddy-on' : ''}`}
                onClick={() => openChat(b)}
              >
                <span className={`pager-dot pager-dot-${b.status}`} />
                <span className='pager-handle'>{b.handle}</span>
                <span className='pager-status'>{b.status}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className='pager-foot'>{talkedTo} of {BUDDIES.length} paged</div>
      </div>

      <div className='pager-chat'>
        {!buddy ? (
          <div className='pager-empty'>
            <p>Pick a buddy to page.</p>
            <p className='pager-tip'>Some are away. Away messages still say something.</p>
          </div>
        ) : buddy.status === 'away' ? (
          <div className='pager-away'>
            <div className='pager-chat-head'>
              {buddy.handle} <span className='pager-status'>is away</span>
            </div>
            <blockquote className='pager-awaymsg'>{buddy.away}</blockquote>
            {buddy.away && /rn:[a-z0-9-]+/.test(buddy.away) ? (
              <button
                className='pager-open'
                onClick={() => {
                  const m = buddy.away!.match(/rn:[a-z0-9-]+/);
                  if (m) onOpenBrowser(m[0] as NetUrl);
                }}
              >
                open the page they left
              </button>
            ) : null}
          </div>
        ) : (
          <>
            <div className='pager-chat-head'>
              {buddy.handle} <span className='pager-status'>online</span>
            </div>
            <div className='pager-scroll'>
              {log.map((m, i) => (
                <div key={i} className={`pager-msg pager-msg-${m.who}`}>
                  <span className='pager-msg-who'>{m.who === 'you' ? 'you' : buddy.handle}</span>
                  <span className='pager-msg-text'>{m.text}</span>
                </div>
              ))}
            </div>
            <div className='pager-prompts'>
              {buddy.prompts.map((p, pi) =>
                used.has(pi) ? null : (
                  <button key={pi} className='pager-prompt' onClick={() => say(buddy, pi)}>
                    {p.you}
                  </button>
                ),
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
