import type { NetUrl } from '../types';
import { IconDoc, IconGlobe, IconGauge, IconJoystick, IconKeyboard, IconSearch } from './icons';

type Props = {
  open: boolean;
  onClose: () => void;
  onOpen: (kind: 'browser' | 'notepad' | 'terminal', url?: NetUrl) => void;
};

export function StartMenu({ open, onClose, onOpen }: Props) {
  if (!open) return null;

  return (
    <div className="start-menu" role="menu" aria-label="Start menu">
      <div className="start-menu-head">
        <h3>RhinoNet</h3>
        <p className="start-menu-sub">Pocket Edition · operator online</p>
      </div>
      <div className="start-grid" role="presentation">
        <button type="button" className="start-item" onClick={() => onOpen('browser', 'rn:home')}>
          <span className="start-item-icon" aria-hidden>
            <IconGlobe size={18} className="icon-svg" />
          </span>
          <span className="start-item-body">
            <strong>RhinoBrowser</strong>
            <small>Surf the pocket internet</small>
          </span>
        </button>
        <button type="button" className="start-item" onClick={() => onOpen('browser', 'rn:search')}>
          <span className="start-item-icon" aria-hidden>
            <IconSearch size={18} className="icon-svg" />
          </span>
          <span className="start-item-body">
            <strong>Search</strong>
            <small>rn:search</small>
          </span>
        </button>
        <button type="button" className="start-item" onClick={() => onOpen('notepad')}>
          <span className="start-item-icon" aria-hidden>
            <IconDoc size={18} className="icon-svg" />
          </span>
          <span className="start-item-body">
            <strong>Notepad</strong>
            <small>Operator scratch pad</small>
          </span>
        </button>
        <button type="button" className="start-item" onClick={() => onOpen('terminal')}>
          <span className="start-item-icon" aria-hidden>
            <IconKeyboard size={18} className="icon-svg" />
          </span>
          <span className="start-item-body">
            <strong>Terminal</strong>
            <small>Fake shell, real attitude</small>
          </span>
        </button>
        <button type="button" className="start-item" onClick={() => onOpen('browser', 'rn:arcade')}>
          <span className="start-item-icon" aria-hidden>
            <IconJoystick size={18} className="icon-svg" />
          </span>
          <span className="start-item-body">
            <strong>RhinoReflex</strong>
            <small>rn:arcade</small>
          </span>
        </button>
        <button type="button" className="start-item" onClick={() => onOpen('browser', 'rn:quests')}>
          <span className="start-item-icon" aria-hidden>
            <IconGauge size={18} className="icon-svg" />
          </span>
          <span className="start-item-body">
            <strong>Quest board</strong>
            <small>rn:quests</small>
          </span>
        </button>
        <button type="button" className="start-item" onClick={() => onOpen('browser', 'rn:mail')}>
          <span className="start-item-icon" aria-hidden>
            <IconDoc size={18} className="icon-svg" />
          </span>
          <span className="start-item-body">
            <strong>RhinoMail</strong>
            <small>rn:mail</small>
          </span>
        </button>
        <button type="button" className="start-item" onClick={() => onOpen('browser', 'rn:wiki')}>
          <span className="start-item-icon" aria-hidden>
            <IconSearch size={18} className="icon-svg" />
          </span>
          <span className="start-item-body">
            <strong>PocketWiki</strong>
            <small>rn:wiki</small>
          </span>
        </button>
        <button type="button" className="start-item" onClick={() => onOpen('browser', 'rn:hack')}>
          <span className="start-item-icon" aria-hidden>
            <IconJoystick size={18} className="icon-svg" />
          </span>
          <span className="start-item-body">
            <strong>Cipher drill</strong>
            <small>rn:hack</small>
          </span>
        </button>
        <button type="button" className="start-item" onClick={() => onOpen('browser', 'rn:map')}>
          <span className="start-item-icon" aria-hidden>
            <IconGlobe size={18} className="icon-svg" />
          </span>
          <span className="start-item-body">
            <strong>Net map</strong>
            <small>rn:map</small>
          </span>
        </button>
        <button type="button" className="start-item" onClick={() => onOpen('browser', 'rn:chat')}>
          <span className="start-item-icon" aria-hidden>
            <IconKeyboard size={18} className="icon-svg" />
          </span>
          <span className="start-item-body">
            <strong>Relay chat</strong>
            <small>rn:chat</small>
          </span>
        </button>
        <button type="button" className="start-item" onClick={() => onOpen('browser', 'rn:weather')}>
          <span className="start-item-icon" aria-hidden>
            <IconGauge size={18} className="icon-svg" />
          </span>
          <span className="start-item-body">
            <strong>Packet weather</strong>
            <small>rn:weather</small>
          </span>
        </button>
        <button type="button" className="start-item" onClick={() => onOpen('browser', 'rn:radio')}>
          <span className="start-item-icon" aria-hidden>
            <IconJoystick size={18} className="icon-svg" />
          </span>
          <span className="start-item-body">
            <strong>RhinoFM</strong>
            <small>rn:radio</small>
          </span>
        </button>
        <button type="button" className="start-item" onClick={() => onOpen('browser', 'rn:jobs')}>
          <span className="start-item-icon" aria-hidden>
            <IconDoc size={18} className="icon-svg" />
          </span>
          <span className="start-item-body">
            <strong>Job board</strong>
            <small>rn:jobs</small>
          </span>
        </button>
        <button type="button" className="start-item" onClick={() => onOpen('browser', 'rn:directory')}>
          <span className="start-item-icon" aria-hidden>
            <IconGlobe size={18} className="icon-svg" />
          </span>
          <span className="start-item-body">
            <strong>Directory</strong>
            <small>rn:directory</small>
          </span>
        </button>
        <button type="button" className="start-item" onClick={() => onOpen('browser', 'rn:status')}>
          <span className="start-item-icon" aria-hidden>
            <IconGauge size={18} className="icon-svg" />
          </span>
          <span className="start-item-body">
            <strong>System status</strong>
            <small>rn:status</small>
          </span>
        </button>
      </div>
      <div className="start-menu-foot">
        <button type="button" className="btn btn-ghost" onClick={onClose}>
          Close menu
        </button>
      </div>
    </div>
  );
}
