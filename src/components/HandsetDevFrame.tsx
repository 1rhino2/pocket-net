import type { ReactNode } from 'react';
import { handsetDevLabel } from '../lib/handsetMode';

type Props = {
  children: ReactNode;
};

export function HandsetDevFrame({ children }: Props) {
  return (
    <div className="handset-dev-site">
      <header className="handset-dev-banner">
        <div className="handset-dev-banner-text">
          <span className="handset-dev-badge">Handset dev</span>
          <strong>RhinoNet pocket UI</strong>
          <span className="handset-dev-host">{handsetDevLabel()}</span>
        </div>
        <p className="handset-dev-hint">Desktop preview · same build as production</p>
      </header>
      <div className="handset-dev-phone" role="presentation">
        <div className="handset-dev-screen">{children}</div>
      </div>
    </div>
  );
}
