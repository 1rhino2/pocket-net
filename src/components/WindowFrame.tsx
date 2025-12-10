import { useRef, type ReactNode } from 'react';

type FrameProps = {
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  onMove: (x: number, y: number) => void;
  onFocus: () => void;
  onMinimize: () => void;
  onClose: () => void;
  children: ReactNode;
};

export function WindowFrame({
  title,
  x,
  y,
  w,
  h,
  z,
  minimized,
  onMove,
  onFocus,
  onMinimize,
  onClose,
  children,
}: FrameProps) {
  const drag = useRef<{ px: number; py: number; sx: number; sy: number } | null>(null);

  if (minimized) return null;

  return (
    <div
      className="window-frame"
      style={{ left: x, top: y, width: w, height: h, zIndex: z }}
      onPointerDown={onFocus}
    >
      <div
        className="window-titlebar"
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest('.win-light')) return;
          if (e.button !== 0) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          drag.current = { px: e.clientX, py: e.clientY, sx: x, sy: y };
          onFocus();
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d) return;
          const dx = e.clientX - d.px;
          const dy = e.clientY - d.py;
          onMove(d.sx + dx, d.sy + dy);
        }}
        onPointerUp={(e) => {
          drag.current = null;
          try {
            e.currentTarget.releasePointerCapture(e.pointerId);
          } catch {
            // ignore
          }
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <div className="window-lights">
          <button
            type="button"
            className="win-light win-close"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          />
          <button
            type="button"
            className="win-light win-min"
            aria-label="Minimize"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
          />
          <span className="win-light win-idle" title="Maximize not installed on RhinoNet" aria-hidden />
        </div>
        <div className="window-title">{title}</div>
        <div className="window-titlebar-spacer" aria-hidden />
      </div>
      <div className="window-body">{children}</div>
    </div>
  );
}
