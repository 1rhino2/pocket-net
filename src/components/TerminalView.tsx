import { useMemo, useState } from 'react';
import { useGame } from '../game/GameContext';
import type { NetUrl } from '../types';
import { TERMINAL_JOKES } from '../data/jokes';
import { parseUserUrl } from '../types';

type Line = { kind: 'in' | 'out'; text: string };

type Props = {
  onOpenBrowser: (url: NetUrl) => void;
};

export function TerminalView({ onOpenBrowser }: Props) {
  const { recordCommand, snapshot, addCredits, recordDiscovery } = useGame();
  const [lines, setLines] = useState<Line[]>([{ kind: 'out', text: 'RhinoNet shell v0.3 - type help' }]);
  const [input, setInput] = useState('');

  const text = useMemo(() => lines.map((l) => (l.kind === 'in' ? '> ' : '') + l.text).join('\n'), [lines]);

  function pushOut(t: string) {
    setLines((ls) => [...ls, { kind: 'out', text: t }]);
  }

  function run(cmdRaw: string) {
    const cmd = cmdRaw.trim();
    if (!cmd) return;

    const parts = cmd.split(/\s+/);
    const head = parts[0]!.toLowerCase();

    if (head === 'clear') {
      setLines([]);
      recordCommand();
      return;
    }

    setLines((ls) => [...ls, { kind: 'in', text: cmd }]);

    if (head === 'help') {
      pushOut(
        'help clear echo open time joke sudo ping credits stats fortune quests sites whoami discover lore',
      );
      recordCommand();
      return;
    }
    if (head === 'echo') {
      pushOut(parts.slice(1).join(' '));
      recordCommand();
      return;
    }
    if (head === 'time') {
      pushOut(new Date().toString());
      recordCommand();
      return;
    }
    if (head === 'open') {
      const target = parts.slice(1).join(' ');
      const parsed = parseUserUrl(target);
      if (!parsed) {
        pushOut('Unknown destination. Try rn:mail, rn:wiki, rn:quests, rn:hack, rn:map');
        recordCommand();
        return;
      }
      onOpenBrowser(parsed);
      pushOut(`Opened browser at ${parsed}`);
      recordCommand();
      return;
    }
    if (head === 'joke' || head === 'fortune') {
      pushOut(TERMINAL_JOKES[Math.floor(Math.random() * TERMINAL_JOKES.length)]!);
      recordCommand();
      return;
    }
    if (head === 'sudo') {
      pushOut('Nice try. The only thing you are root of is this tab.');
      recordCommand();
      return;
    }
    if (head === 'ping') {
      pushOut('pong - 42ms');
      recordCommand();
      return;
    }
    if (head === 'credits' || head === 'stats') {
      pushOut(`RC ${snapshot.credits} | integrity ${snapshot.integrity}% | quests ${snapshot.questsDone.length}`);
      recordCommand();
      return;
    }
    if (head === 'quests') {
      pushOut('Quest board: rn:quests. Daily stipend lives there too.');
      recordCommand();
      return;
    }
    if (head === 'sites') {
      pushOut(
        'rn:home search directory forum mart mail weather radio wiki jobs chat hack map arcade quests status readme discover archive shift chronicle',
      );
      pushOut('Unlisted routes exist. Try search, map pings, or lore.');
      recordCommand();
      return;
    }
    if (head === 'whoami') {
      pushOut('operator@rhinonet (clearance: pocket)');
      recordCommand();
      return;
    }
    if (head === 'tip') {
      addCredits(1);
      pushOut('Dropped 1 RC behind the couch cushions.');
      recordCommand();
      return;
    }
    if (head === 'discover') {
      onOpenBrowser('rn:discover');
      pushOut('Opened Discovery Log.');
      recordCommand();
      return;
    }
    if (head === 'lore') {
      recordDiscovery('lore_01', { silent: false });
      pushOut('Filed lore fragment 01. Search and archive hide more.');
      recordCommand();
      return;
    }

    pushOut(`Command not found: ${head}`);
    recordCommand();
  }

  return (
    <div className="term-wrap">
      <pre className="terminal" aria-live="polite">
        {text}
      </pre>
      <div className="term-input-row">
        <span className="term-prompt">&gt;</span>
        <input
          className="field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const v = input;
              setInput('');
              run(v);
            }
          }}
        />
      </div>
    </div>
  );
}
