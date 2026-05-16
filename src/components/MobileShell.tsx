import { useState, type ReactNode } from 'react';
import type { GameSnapshot } from '../game/gameTypes';
import {
  MOBILE_HOME_APPS,
  MOBILE_QUICK,
  MOBILE_SECTIONS,
  type MobileAppDef,
  type MobileIcon,
  type MobileLaunch,
} from '../data/mobileLauncher';
import { browserScreenTitle, browserTitle } from '../browserTitle';
import { BrowserShell } from './BrowserShell';
import {
  IconDoc,
  IconFlask,
  IconGauge,
  IconGlobe,
  IconHome,
  IconJoystick,
  IconKeyboard,
  IconScreen,
  IconSearch,
} from './icons';
import { NotepadView } from './NotepadView';
import { RadioDock } from './RadioDock';
import { TerminalView } from './TerminalView';
import type { DesktopWindow, NetUrl, WindowId } from '../types';

export type MobileRoute = 'home' | 'browser' | 'notepad' | 'terminal';

type Props = {
  snapshot: GameSnapshot;
  clock: Date;
  phosphor: boolean;
  setPhosphor: (next: boolean) => void;
  route: MobileRoute;
  setRoute: (r: MobileRoute) => void;
  windows: DesktopWindow[];
  openWindow: (kind: WindowId, url?: NetUrl) => void;
  closeWindow: (id: WindowId) => void;
  patchWindow: (id: WindowId, patch: Partial<DesktopWindow>) => void;
  setVirusOpen: (open: boolean) => void;
  pendingQuests: number;
};

function shortTime(d: Date) {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function headerDate(d: Date) {
  return d.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
}

function MobileGlyph({ icon, size }: { icon: MobileIcon; size: number }) {
  const cls = 'icon-svg';
  switch (icon) {
    case 'globe':
      return <IconGlobe size={size} className={cls} />;
    case 'doc':
      return <IconDoc size={size} className={cls} />;
    case 'screen':
      return <IconScreen size={size} className={cls} />;
    case 'flask':
      return <IconFlask size={size} className={cls} />;
    case 'search':
      return <IconSearch size={size} className={cls} />;
    case 'joystick':
      return <IconJoystick size={size} className={cls} />;
    case 'gauge':
      return <IconGauge size={size} className={cls} />;
    case 'keyboard':
      return <IconKeyboard size={size} className={cls} />;
    default:
      return <IconGlobe size={size} className={cls} />;
  }
}

function MobileSheet({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <>
      <div className="mobile-os-sheet-backdrop" role="presentation" onPointerDown={onClose} />
      <div className="mobile-os-sheet" role="dialog" aria-modal="true" aria-label={title}>
        <div className="mobile-os-sheet-handle" aria-hidden />
        <header className="mobile-os-sheet-head">
          <h2 className="mobile-os-sheet-title">{title}</h2>
          <button type="button" className="mobile-os-sheet-close" onClick={onClose}>
            Done
          </button>
        </header>
        <div className="mobile-os-sheet-body">{children}</div>
      </div>
    </>
  );
}

export function MobileShell({
  snapshot,
  clock,
  phosphor,
  setPhosphor,
  route,
  setRoute,
  windows,
  openWindow,
  closeWindow,
  patchWindow,
  setVirusOpen,
  pendingQuests,
}: Props) {
  const [launcherOpen, setLauncherOpen] = useState(false);
  const [systemOpen, setSystemOpen] = useState(false);

  const browserW = windows.find((w) => w.id === 'browser');
  const url = (browserW?.url ?? 'rn:home') as NetUrl;
  const hasBrowser = windows.some((w) => w.id === 'browser');
  const hasTerminal = windows.some((w) => w.id === 'terminal');
  const hasNotepad = windows.some((w) => w.id === 'notepad');

  function closeSheets() {
    setLauncherOpen(false);
    setSystemOpen(false);
  }

  function runLaunch(launch: MobileLaunch) {
    closeSheets();
    if (launch.kind === 'virus') {
      setVirusOpen(true);
      return;
    }
    if (launch.kind === 'window') {
      openWindow(launch.id);
      if (launch.id === 'browser') setRoute('browser');
      if (launch.id === 'notepad') setRoute('notepad');
      if (launch.id === 'terminal') setRoute('terminal');
      return;
    }
    openWindow('browser', launch.url);
    setRoute('browser');
  }

  function goHome() {
    closeSheets();
    setRoute('home');
  }

  function shutApp() {
    if (route === 'home') return;
    closeWindow(route);
    setRoute('home');
  }

  const appBarTitle =
    route === 'browser'
      ? browserScreenTitle(url)
      : route === 'notepad'
        ? 'Notepad'
        : route === 'terminal'
          ? 'Terminal'
          : '';

  function renderAppTile(app: MobileAppDef, variant: 'home' | 'sheet') {
    const warn = app.tone === 'warn';
    return (
      <button
        key={app.id}
        type="button"
        className={`mobile-os-app${variant === 'sheet' ? ' mobile-os-app-row' : ''}${warn ? ' mobile-os-app-warn' : ''}`}
        onClick={() => runLaunch(app.launch)}
      >
        <span className={`mobile-os-app-icon mobile-os-tone-${app.tone}`} aria-hidden>
          <MobileGlyph icon={app.icon} size={variant === 'sheet' ? 28 : 32} />
        </span>
        <span className="mobile-os-app-text">
          <span className="mobile-os-app-name">{app.label}</span>
          {variant === 'sheet' && app.sub ? <span className="mobile-os-app-sub">{app.sub}</span> : null}
        </span>
      </button>
    );
  }

  const batteryPct = Math.max(18, Math.min(100, snapshot.integrity));

  return (
    <div className="mobile-os" data-mobile-os="1">
      <header className="mobile-os-status" aria-label="Device status">
        <span className="mobile-os-time">{shortTime(clock)}</span>
        <span className="mobile-os-notch" aria-hidden />
        <div className="mobile-os-status-right">
          <span className="mobile-os-signal" aria-hidden>
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="mobile-os-battery" aria-hidden>
            <span className="mobile-os-battery-inner" style={{ width: `${batteryPct}%` }} />
          </span>
        </div>
      </header>

      {route === 'home' ? (
        <main className="mobile-os-home">
          <div className="mobile-os-scroll">
            <section className="mobile-os-widget ui-page-enter">
              <div className="mobile-os-widget-top">
                <div>
                  <p className="mobile-os-date">{headerDate(clock)}</p>
                  <p className="mobile-os-clock">{shortTime(clock)}</p>
                </div>
                <button type="button" className="mobile-os-gear" onClick={() => setSystemOpen(true)}>
                  System
                </button>
              </div>
              <p className="mobile-os-brand">RhinoNet</p>
              <div className="mobile-os-stat-row">
                <button type="button" className="mobile-os-stat" onClick={() => runLaunch({ kind: 'browser', url: 'rn:status' })}>
                  <span className="mobile-os-stat-label">Credits</span>
                  <strong>{snapshot.credits} RC</strong>
                </button>
                <button type="button" className="mobile-os-stat" onClick={() => runLaunch({ kind: 'browser', url: 'rn:status' })}>
                  <span className="mobile-os-stat-label">Integrity</span>
                  <strong>{snapshot.integrity}%</strong>
                </button>
                <button
                  type="button"
                  className={`mobile-os-stat${pendingQuests > 0 ? ' mobile-os-stat-alert' : ''}`}
                  onClick={() => runLaunch({ kind: 'browser', url: 'rn:quests' })}
                >
                  <span className="mobile-os-stat-label">Quests</span>
                  <strong>{pendingQuests > 0 ? `${pendingQuests} ready` : 'Clear'}</strong>
                </button>
              </div>
              {pendingQuests > 0 ? (
                <button type="button" className="mobile-os-quest-pill" onClick={() => runLaunch({ kind: 'browser', url: 'rn:quests' })}>
                  Turn in {pendingQuests} quest{pendingQuests === 1 ? '' : 's'}
                </button>
              ) : null}
            </section>

            <section className="mobile-os-section">
              <h2 className="mobile-os-section-title">Quick</h2>
              <div className="mobile-os-quick">
                {MOBILE_QUICK.map((app) => (
                  <button key={app.id} type="button" className="mobile-os-quick-btn" onClick={() => runLaunch(app.launch)}>
                    <span className={`mobile-os-quick-icon mobile-os-tone-${app.tone}`}>
                      <MobileGlyph icon={app.icon} size={20} />
                    </span>
                    <span>{app.label}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="mobile-os-section">
              <div className="mobile-os-section-head">
                <h2 className="mobile-os-section-title">Apps</h2>
                <button type="button" className="mobile-os-link-btn" onClick={() => setLauncherOpen(true)}>
                  All apps
                </button>
              </div>
              <div className="mobile-os-grid">{MOBILE_HOME_APPS.map((app) => renderAppTile(app, 'home'))}</div>
            </section>
          </div>

          <div className="mobile-os-footer">
            <div className="mobile-os-player-slot">
              <RadioDock compact onOpenRadio={() => runLaunch({ kind: 'browser', url: 'rn:radio' })} />
            </div>
            <nav className="mobile-os-dock" aria-label="Dock">
              <button type="button" className="mobile-os-dock-btn active" onClick={goHome}>
                <IconHome size={24} className="icon-svg" />
                <span>Home</span>
              </button>
              <button
                type="button"
                className={`mobile-os-dock-btn${launcherOpen ? ' active' : ''}`}
                onClick={() => {
                  setSystemOpen(false);
                  setLauncherOpen((o) => !o);
                }}
              >
                <IconGlobe size={24} className="icon-svg" />
                <span>Apps</span>
              </button>
              <button
                type="button"
                className={`mobile-os-dock-btn${hasBrowser ? ' session' : ''}`}
                onClick={() => runLaunch({ kind: 'browser', url })}
              >
                <IconScreen size={24} className="icon-svg" />
                <span>Web</span>
              </button>
              <button
                type="button"
                className="mobile-os-dock-btn"
                onClick={() => runLaunch({ kind: 'browser', url: 'rn:radio' })}
              >
                <IconJoystick size={24} className="icon-svg" />
                <span>Radio</span>
              </button>
              <button
                type="button"
                className={`mobile-os-dock-btn${systemOpen ? ' active' : ''}`}
                onClick={() => {
                  setLauncherOpen(false);
                  setSystemOpen((o) => !o);
                }}
              >
                <IconGauge size={24} className="icon-svg" />
                <span>System</span>
              </button>
            </nav>
          </div>
        </main>
      ) : (
        <main className="mobile-os-stage">
          <header className="mobile-os-appbar">
            <button type="button" className="mobile-os-back" onClick={goHome}>
              <span aria-hidden>‹</span> Home
            </button>
            <h2 className="mobile-os-appbar-title">{appBarTitle}</h2>
            <button type="button" className="mobile-os-shut" onClick={shutApp}>
              Close
            </button>
          </header>
          <div className="mobile-os-appbody">
            {route === 'browser' ? (
              <BrowserShell
                url={url}
                onNavigate={(next) => {
                  patchWindow('browser', { url: next, title: browserTitle(next) });
                }}
              />
            ) : null}
            {route === 'notepad' ? <NotepadView /> : null}
            {route === 'terminal' ? <TerminalView onOpenBrowser={(u) => runLaunch({ kind: 'browser', url: u })} /> : null}
          </div>
          <div className="mobile-os-footer mobile-os-footer-stage">
            <div className="mobile-os-player-slot">
              <RadioDock compact onOpenRadio={() => runLaunch({ kind: 'browser', url: 'rn:radio' })} />
            </div>
            <nav className="mobile-os-dock mobile-os-dock-mini" aria-label="Dock">
              <button type="button" className="mobile-os-dock-btn" onClick={goHome}>
                <IconHome size={22} className="icon-svg" />
              </button>
              <button
                type="button"
                className={`mobile-os-dock-btn${hasBrowser ? ' session' : ''}`}
                onClick={() => runLaunch({ kind: 'browser', url })}
              >
                <IconGlobe size={22} className="icon-svg" />
              </button>
              <button
                type="button"
                className={`mobile-os-dock-btn${hasTerminal ? ' session' : ''}`}
                onClick={() => runLaunch({ kind: 'window', id: 'terminal' })}
              >
                <IconScreen size={22} className="icon-svg" />
              </button>
              <button
                type="button"
                className={`mobile-os-dock-btn${hasNotepad ? ' session' : ''}`}
                onClick={() => runLaunch({ kind: 'window', id: 'notepad' })}
              >
                <IconDoc size={22} className="icon-svg" />
              </button>
            </nav>
          </div>
        </main>
      )}

      <MobileSheet open={launcherOpen} title="All apps" onClose={() => setLauncherOpen(false)}>
        {MOBILE_SECTIONS.map((section) => (
          <section key={section.id} className="mobile-os-sheet-section">
            <h3 className="mobile-os-sheet-section-title">{section.title}</h3>
            <div className="mobile-os-sheet-list">{section.apps.map((app) => renderAppTile(app, 'sheet'))}</div>
          </section>
        ))}
      </MobileSheet>

      <MobileSheet open={systemOpen} title="System" onClose={() => setSystemOpen(false)}>
        <div className="mobile-os-system-card">
          <p className="mobile-os-system-line">
            <span>Carrier</span>
            <strong>RN-NET</strong>
          </p>
          <p className="mobile-os-system-line">
            <span>Build</span>
            <strong>0.3.1</strong>
          </p>
          <p className="mobile-os-system-line">
            <span>Integrity</span>
            <strong>{snapshot.integrity}%</strong>
          </p>
        </div>
        <label className="mobile-os-toggle">
          <input type="checkbox" checked={phosphor} onChange={(e) => setPhosphor(e.target.checked)} />
          <span>Phosphor CRT filter</span>
        </label>
        <button type="button" className="btn btn-primary mobile-os-sheet-action" onClick={() => runLaunch({ kind: 'browser', url: 'rn:status' })}>
          Open system status
        </button>
        <button type="button" className="btn mobile-os-sheet-action" onClick={() => runLaunch({ kind: 'browser', url: 'rn:quests' })}>
          Quest board
        </button>
        <button type="button" className="btn mobile-os-sheet-action" onClick={() => setVirusOpen(true)}>
          FREE_SMILE installer
        </button>
      </MobileSheet>
    </div>
  );
}
