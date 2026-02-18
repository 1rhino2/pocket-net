import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { browserTitle } from './browserTitle';
import { BootScreen } from './components/BootScreen';
import { BrowserShell } from './components/BrowserShell';
import { IconDoc, IconFlask, IconGlobe, IconScreen } from './components/icons';
import { HandsetDevFrame } from './components/HandsetDevFrame';
import { MobileShell, type MobileRoute } from './components/MobileShell';
import { NotepadView } from './components/NotepadView';
import { StartMenu } from './components/StartMenu';
import { TerminalView } from './components/TerminalView';
import { VirusModal } from './components/VirusModal';
import { RadioDock } from './components/RadioDock';
import { WindowFrame } from './components/WindowFrame';
import { useGame } from './game/GameContext';
import { useHandsetDevFrame } from './hooks/useHandsetDevFrame';
import { useMatchMobile } from './hooks/useMatchMobile';
import type { DesktopWindow, NetUrl, WindowId } from './types';

type Phase = 'boot' | 'desktop';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
] as const;

function nextZIndex(windows: DesktopWindow[]) {
  return windows.reduce((m, w) => Math.max(m, w.z), 0) + 1;
}

const MOBILE_MAX_W = 1024;

function layoutChrome() {
  const narrow = window.innerWidth <= MOBILE_MAX_W;
  const pad = narrow ? 6 : 8;
  const menubar = narrow ? 52 : 40;
  const dock = narrow ? 84 : 70;
  return { pad, menubar, dock, narrow };
}

function clampPos(x: number, y: number, w: number, h: number) {
  const { pad, menubar, dock } = layoutChrome();
  const maxX = Math.max(pad, window.innerWidth - w - pad);
  const maxY = Math.max(pad + menubar, window.innerHeight - h - dock);
  return {
    x: Math.min(Math.max(pad, x), maxX),
    y: Math.min(Math.max(pad + menubar, y), maxY),
  };
}

function windowSizeFor(kind: 'browser' | 'notepad' | 'terminal'): { w: number; h: number } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const narrow = vw <= MOBILE_MAX_W;
  const { menubar, dock } = layoutChrome();
  const usableH = Math.max(240, vh - menubar - dock);
  const usableW = Math.max(260, vw - (narrow ? 10 : 16));

  switch (kind) {
    case 'browser':
      if (narrow) {
        const w = Math.min(usableW, vw - 8);
        const h = Math.min(Math.max(320, usableH), vh - menubar - dock - 4);
        return { w, h };
      }
      return {
        w: Math.min(1040, Math.floor(vw * 0.94)),
        h: Math.min(680, Math.floor(vh * 0.78)),
      };
    case 'notepad':
      if (narrow) {
        const w = Math.min(usableW, vw - 8);
        const h = Math.min(Math.max(300, Math.floor(usableH * 0.92)), usableH);
        return { w, h };
      }
      return { w: 560, h: 460 };
    case 'terminal':
      if (narrow) {
        const w = Math.min(usableW, vw - 8);
        const h = Math.min(Math.max(300, Math.floor(usableH * 0.94)), usableH);
        return { w, h };
      }
      return { w: 680, h: 480 };
  }
}

function initialOpenPos(ww: number, hh: number) {
  const { narrow, pad, menubar, dock } = layoutChrome();
  if (narrow) {
    const sx = Math.floor((window.innerWidth - ww) / 2);
    const sy = Math.max(pad + menubar, Math.floor((window.innerHeight - hh - dock) * 0.26));
    return clampPos(sx, sy, ww, hh);
  }
  return clampPos(70, 100, ww, hh);
}

export function App() {
  const { snapshot, toast, setToast, awardBootBonus, recordVirusChoice, pendingQuestCount } = useGame();
  const isMobileOs = useMatchMobile();
  const handsetDevFrame = useHandsetDevFrame();
  const [phase, setPhase] = useState<Phase>('boot');
  const [windows, setWindows] = useState<DesktopWindow[]>([]);
  const [startOpen, setStartOpen] = useState(false);
  const [virusOpen, setVirusOpen] = useState(false);
  const [phosphor, setPhosphor] = useState(() => localStorage.getItem('rn_phosphor') === '1');
  const [clock, setClock] = useState(() => new Date());
  const [mobileRoute, setMobileRoute] = useState<MobileRoute>('home');
  const konamiRef = useRef(0);
  const bootBrowserRef = useRef(false);

  function wrapHandsetDev(node: ReactNode) {
    if (handsetDevFrame) return <HandsetDevFrame>{node}</HandsetDevFrame>;
    return node;
  }

  useEffect(() => {
    if (!isMobileOs) setMobileRoute('home');
  }, [isMobileOs]);

  useEffect(() => {
    document.documentElement.dataset.rhinoShell = isMobileOs ? 'handset' : 'desktop';
  }, [isMobileOs]);

  useEffect(() => {
    const t = window.setInterval(() => setClock(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    localStorage.setItem('rn_phosphor', phosphor ? '1' : '0');
  }, [phosphor]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest('input, textarea')) return;

      const want = KONAMI[konamiRef.current];
      if (want === undefined) {
        konamiRef.current = 0;
        return;
      }
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const w2 = want.length === 1 ? want.toLowerCase() : want;
      if (key === w2) {
        const next = konamiRef.current + 1;
        if (next >= KONAMI.length) {
          konamiRef.current = 0;
          setPhosphor(true);
          setToast('Konami accepted. Phosphor mode ON. You are now legally interesting.', 4200);
        } else {
          konamiRef.current = next;
        }
        return;
      }
      const first = KONAMI[0]!;
      const f2 = first.length === 1 ? first.toLowerCase() : first;
      konamiRef.current = key === f2 ? 1 : 0;
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setToast]);

  useEffect(() => {
    if (!startOpen) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest('.start-menu') || t.closest('.task-start')) return;
      setStartOpen(false);
    };
    window.addEventListener('pointerdown', onDown, true);
    return () => window.removeEventListener('pointerdown', onDown, true);
  }, [startOpen]);

  useEffect(() => {
    const clampAll = () => {
      if (window.innerWidth <= MOBILE_MAX_W) return;
      const chrome = layoutChrome();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setWindows((ws) =>
        ws.map((w) => {
          const kind: 'browser' | 'notepad' | 'terminal' =
            w.id === 'browser' ? 'browser' : w.id === 'notepad' ? 'notepad' : 'terminal';
          const cap = windowSizeFor(kind);
          const nw = Math.max(260, Math.min(cap.w, vw - chrome.pad * 2));
          const nh = Math.max(160, Math.min(cap.h, vh - chrome.menubar - chrome.dock - chrome.pad));
          const c = clampPos(w.x, w.y, nw, nh);
          return { ...w, x: c.x, y: c.y, w: nw, h: nh };
        }),
      );
    };
    window.addEventListener('resize', clampAll);
    return () => window.removeEventListener('resize', clampAll);
  }, []);

  const active = useMemo(() => {
    const vis = windows.filter((w) => !w.minimized);
    const top = vis.sort((a, b) => b.z - a.z)[0];
    return top?.id ?? null;
  }, [windows]);

  function patchWindow(id: WindowId, patch: Partial<DesktopWindow>) {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, ...patch } : w)));
  }

  function closeWindow(id: WindowId) {
    setWindows((ws) => ws.filter((w) => w.id !== id));
  }

  function focusWindow(id: WindowId) {
    setWindows((ws) => {
      const z = nextZIndex(ws);
      return ws.map((w) => (w.id === id ? { ...w, z } : w));
    });
  }

  function openWindow(kind: WindowId, url?: NetUrl) {
    setStartOpen(false);
    setWindows((ws) => {
      const mx = ws.reduce((m, w) => Math.max(m, w.z), 0);
      const existing = ws.find((w) => w.id === kind);
      if (existing) {
        return ws.map((w) => {
          if (w.id !== kind) return w;
          return {
            ...w,
            minimized: false,
            z: mx + 1,
            url: kind === 'browser' ? (url ?? w.url ?? 'rn:home') : w.url,
            title: kind === 'browser' ? browserTitle((url ?? w.url ?? 'rn:home') as NetUrl) : w.title,
          };
        });
      }

      if (kind === 'browser') {
        const u = url ?? 'rn:home';
        const { w: ww, h: hh } = windowSizeFor('browser');
        const c = initialOpenPos(ww, hh);
        return [
          ...ws,
          {
            id: 'browser',
            title: browserTitle(u),
            x: c.x,
            y: c.y,
            w: ww,
            h: hh,
            minimized: false,
            z: mx + 1,
            url: u,
          },
        ];
      }

      if (kind === 'notepad') {
        const { w: nw, h: nh } = windowSizeFor('notepad');
        const c = initialOpenPos(nw, nh);
        return [
          ...ws,
          {
            id: 'notepad',
            title: 'Notepad',
            x: c.x,
            y: c.y,
            w: nw,
            h: nh,
            minimized: false,
            z: mx + 1,
          },
        ];
      }

      const { w: tw, h: th } = windowSizeFor('terminal');
      const c = initialOpenPos(tw, th);
      return [
        ...ws,
        {
          id: 'terminal',
          title: 'Terminal',
          x: c.x,
          y: c.y,
          w: tw,
          h: th,
          minimized: false,
          z: mx + 1,
        },
      ];
    });
  }

  useEffect(() => {
    if (phase !== 'desktop' || isMobileOs || bootBrowserRef.current) return;
    bootBrowserRef.current = true;
    openWindow('browser', 'rn:home');
  }, [phase, isMobileOs]);

  if (phase === 'boot') {
    return wrapHandsetDev(
      <div className={phosphor ? 'app-root crt-on handset-dev-root' : 'app-root handset-dev-root'}>
        <BootScreen
          onDone={() => {
            awardBootBonus();
            setPhase('desktop');
          }}
        />
      </div>,
    );
  }

  return wrapHandsetDev(
    <div className={phosphor ? 'app-root crt-on handset-dev-root' : 'app-root handset-dev-root'}>
      {toast ? (
        <div className="toast" role="status">
          {toast}
        </div>
      ) : null}

      {virusOpen ? (
        <VirusModal
          onClose={() => setVirusOpen(false)}
          onResolve={(kind, quality) => {
            recordVirusChoice(kind, quality);
          }}
        />
      ) : null}

      {isMobileOs ? (
        <MobileShell
          snapshot={snapshot}
          clock={clock}
          phosphor={phosphor}
          setPhosphor={setPhosphor}
          route={mobileRoute}
          setRoute={setMobileRoute}
          windows={windows}
          openWindow={openWindow}
          closeWindow={closeWindow}
          patchWindow={patchWindow}
          setVirusOpen={setVirusOpen}
          pendingQuests={pendingQuestCount()}
        />
      ) : null}

      {!isMobileOs ? (
      <div className="desktop" onPointerDown={() => setStartOpen(false)}>
        <div className="desktop-wallpaper" aria-hidden />

        <div className="menubar">
          <span className="menubar-brand">RN</span>
          <button type="button" className="menubar-item">
            Session
          </button>
          <button type="button" className="menubar-item">
            Places
          </button>
          <button type="button" className="menubar-item">
            Help
          </button>
          <span className="menubar-spacer" />
          <div className="menubar-hud" aria-label="Session economy">
            <span className="menubar-coins">{snapshot.credits} RC</span>
            <div className="menubar-integrity" title="Integrity">
              <div className="menubar-integrity-fill" style={{ width: `${snapshot.integrity}%` }} />
            </div>
          </div>
          <span className="menubar-status">offline - sandbox</span>
        </div>

        <div className="desktop-body">
          <div className="desktop-icons">
            <button type="button" className="d-icon" onClick={() => openWindow('browser', 'rn:home')}>
              <div className="d-icon-tile" aria-hidden>
                <IconGlobe size={24} className="icon-svg" />
              </div>
              <div className="d-icon-label">RhinoBrowser</div>
            </button>

            <button type="button" className="d-icon" onClick={() => openWindow('notepad')}>
              <div className="d-icon-tile" aria-hidden>
                <IconDoc size={24} className="icon-svg" />
              </div>
              <div className="d-icon-label">Notepad</div>
            </button>

            <button type="button" className="d-icon" onClick={() => openWindow('terminal')}>
              <div className="d-icon-tile" aria-hidden>
                <IconScreen size={24} className="icon-svg" />
              </div>
              <div className="d-icon-label">Terminal</div>
            </button>

            <button type="button" className="d-icon" onClick={() => setVirusOpen(true)}>
              <div className="d-icon-tile" aria-hidden>
                <IconFlask size={24} className="icon-svg" />
              </div>
              <div className="d-icon-label">FREE_SMILE</div>
            </button>
          </div>

          {windows.map((w) => {
            if (w.id === 'browser') {
              const url = w.url ?? 'rn:home';
              return (
                <WindowFrame
                  key={w.id}
                  title={browserTitle(url)}
                  x={w.x}
                  y={w.y}
                  w={w.w}
                  h={w.h}
                  z={w.z}
                  minimized={w.minimized}
                  onMove={(x, y) => {
                    const c = clampPos(x, y, w.w, w.h);
                    patchWindow(w.id, { x: c.x, y: c.y });
                  }}
                  onFocus={() => focusWindow(w.id)}
                  onMinimize={() => patchWindow(w.id, { minimized: true })}
                  onClose={() => closeWindow(w.id)}
                >
                  <BrowserShell
                    url={url}
                    onNavigate={(next) => {
                      patchWindow(w.id, { url: next, title: browserTitle(next) });
                    }}
                  />
                </WindowFrame>
              );
            }

            if (w.id === 'notepad') {
              return (
                <WindowFrame
                  key={w.id}
                  title={w.title}
                  x={w.x}
                  y={w.y}
                  w={w.w}
                  h={w.h}
                  z={w.z}
                  minimized={w.minimized}
                  onMove={(x, y) => {
                    const c = clampPos(x, y, w.w, w.h);
                    patchWindow(w.id, { x: c.x, y: c.y });
                  }}
                  onFocus={() => focusWindow(w.id)}
                  onMinimize={() => patchWindow(w.id, { minimized: true })}
                  onClose={() => closeWindow(w.id)}
                >
                  <NotepadView />
                </WindowFrame>
              );
            }

            return (
              <WindowFrame
                key={w.id}
                title={w.title}
                x={w.x}
                y={w.y}
                w={w.w}
                h={w.h}
                z={w.z}
                minimized={w.minimized}
                onMove={(x, y) => {
                  const c = clampPos(x, y, w.w, w.h);
                  patchWindow(w.id, { x: c.x, y: c.y });
                }}
                onFocus={() => focusWindow(w.id)}
                onMinimize={() => patchWindow(w.id, { minimized: true })}
                onClose={() => closeWindow(w.id)}
              >
                <TerminalView
                  onOpenBrowser={(u) => {
                    openWindow('browser', u);
                  }}
                />
              </WindowFrame>
            );
          })}

          <StartMenu
            open={startOpen}
            onClose={() => setStartOpen(false)}
            onOpen={(kind, url) => {
              if (kind === 'browser') openWindow('browser', url);
              if (kind === 'notepad') openWindow('notepad');
              if (kind === 'terminal') openWindow('terminal');
            }}
          />

          <div className="taskbar" onPointerDown={(e) => e.stopPropagation()}>
            <button type="button" className="task-start" onClick={() => setStartOpen((s) => !s)}>
              RN
            </button>

            <div className="task-pill" role="tablist" aria-label="Open windows">
              {windows.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  className={`task-item${active === w.id ? ' active' : ''}`}
                  onClick={() => {
                    if (w.minimized) patchWindow(w.id, { minimized: false });
                    focusWindow(w.id);
                  }}
                >
                  {w.id === 'browser' ? 'Browser' : w.title}
                </button>
              ))}
            </div>

            <div className="task-tray">
              <RadioDock
                compact
                onOpenRadio={() => {
                  openWindow('browser', 'rn:radio');
                }}
              />
              <button type="button" className="btn btn-ghost" onClick={() => setPhosphor((p) => !p)} title="Phosphor mode">
                {phosphor ? 'PHOS:ON' : 'PHOS:OFF'}
              </button>
              <span className="task-clock" aria-live="polite">
                {clock.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      </div>
      ) : null}
    </div>,
  );
}
