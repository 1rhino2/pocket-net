import { useEffect, useRef, useState } from 'react';
import { useGame } from '../../game/GameContext';

// PixelPaint: a canvas, the 16 VGA colors, pen/eraser/fill, brush sizes. saved
// doodles go to localStorage and show as a little gallery. first save records
// one discovery. drawing state is on the canvas, the gallery is its own key.

const VGA = [
  '#000000', '#800000', '#008000', '#808000',
  '#000080', '#800080', '#008080', '#c0c0c0',
  '#808080', '#ff0000', '#00ff00', '#ffff00',
  '#0000ff', '#ff00ff', '#00ffff', '#ffffff',
];

const GALLERY_KEY = 'rn_gallery_v1';
const W = 320;
const H = 220;

type Tool = 'pen' | 'eraser' | 'fill';

function loadGallery(): string[] {
  try {
    const raw = localStorage.getItem(GALLERY_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.slice(0, 12) : [];
  } catch {
    return [];
  }
}

export function PaintView() {
  const { recordDiscovery, setToast } = useGame();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [color, setColor] = useState('#000000');
  const [tool, setTool] = useState<Tool>('pen');
  const [size, setSize] = useState(4);
  const [gallery, setGallery] = useState<string[]>(() => loadGallery());

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);
  }, []);

  function pos(e: React.PointerEvent) {
    const c = canvasRef.current!;
    const rect = c.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const y = ((e.clientY - rect.top) / rect.height) * H;
    return { x, y };
  }

  function paintDot(x: number, y: number) {
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.fillStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  function paintLine(a: { x: number; y: number }, b: { x: number; y: number }) {
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  function floodFill(sx: number, sy: number) {
    const ctx = canvasRef.current!.getContext('2d')!;
    const img = ctx.getImageData(0, 0, W, H);
    const data = img.data;
    const ix = Math.floor(sx);
    const iy = Math.floor(sy);
    const at = (x: number, y: number) => (y * W + x) * 4;
    const start = at(ix, iy);
    const target = [data[start], data[start + 1], data[start + 2], data[start + 3]];
    // parse chosen color to rgb
    const hex = color.replace('#', '');
    const fr = parseInt(hex.slice(0, 2), 16);
    const fg = parseInt(hex.slice(2, 4), 16);
    const fb = parseInt(hex.slice(4, 6), 16);
    if (target[0] === fr && target[1] === fg && target[2] === fb) return;
    const match = (i: number) =>
      data[i] === target[0] && data[i + 1] === target[1] && data[i + 2] === target[2] && data[i + 3] === target[3];
    const stack = [[ix, iy]];
    while (stack.length) {
      const [x, y] = stack.pop()!;
      if (x < 0 || y < 0 || x >= W || y >= H) continue;
      const i = at(x, y);
      if (!match(i)) continue;
      data[i] = fr;
      data[i + 1] = fg;
      data[i + 2] = fb;
      data[i + 3] = 255;
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
    ctx.putImageData(img, 0, 0);
  }

  function onDown(e: React.PointerEvent) {
    e.preventDefault();
    const p = pos(e);
    if (tool === 'fill') {
      floodFill(p.x, p.y);
      return;
    }
    drawing.current = true;
    last.current = p;
    paintDot(p.x, p.y);
  }

  function onMove(e: React.PointerEvent) {
    if (!drawing.current || tool === 'fill') return;
    const p = pos(e);
    if (last.current) paintLine(last.current, p);
    last.current = p;
  }

  function onUp() {
    drawing.current = false;
    last.current = null;
  }

  function clear() {
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);
  }

  function save() {
    const url = canvasRef.current!.toDataURL('image/png');
    const next = [url, ...gallery].slice(0, 12);
    setGallery(next);
    try {
      localStorage.setItem(GALLERY_KEY, JSON.stringify(next));
    } catch {
      // gallery is a nicety, not worth crashing over if storage is full
    }
    const isNew = recordDiscovery('made_art');
    setToast(isNew ? 'Saved to the gallery. +RC' : 'Saved to the gallery.', 2600);
  }

  return (
    <div className='paint-app'>
      <div className='paint-tools'>
        <div className='paint-palette'>
          {VGA.map((c) => (
            <button
              key={c}
              className={`paint-swatch ${color === c ? 'paint-swatch-on' : ''}`}
              style={{ background: c }}
              onClick={() => setColor(c)}
              aria-label={c}
            />
          ))}
        </div>
        <div className='paint-toolset'>
          <button className={`paint-tool ${tool === 'pen' ? 'paint-tool-on' : ''}`} onClick={() => setTool('pen')}>
            pen
          </button>
          <button className={`paint-tool ${tool === 'eraser' ? 'paint-tool-on' : ''}`} onClick={() => setTool('eraser')}>
            eraser
          </button>
          <button className={`paint-tool ${tool === 'fill' ? 'paint-tool-on' : ''}`} onClick={() => setTool('fill')}>
            fill
          </button>
          <label className='paint-size'>
            size
            <input type='range' min={1} max={16} value={size} onChange={(e) => setSize(Number(e.target.value))} />
          </label>
          <button className='paint-tool' onClick={clear}>
            clear
          </button>
          <button className='paint-tool paint-save' onClick={save}>
            save
          </button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className='paint-canvas'
        width={W}
        height={H}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      />

      {gallery.length > 0 ? (
        <div className='paint-gallery'>
          <div className='paint-gallery-head'>Saved ({gallery.length})</div>
          <div className='paint-thumbs'>
            {gallery.map((src, i) => (
              <img key={i} src={src} className='paint-thumb' alt={`doodle ${i + 1}`} />
            ))}
          </div>
        </div>
      ) : (
        <p className='paint-hint'>Draw something. Save keeps it in the gallery on this machine.</p>
      )}
    </div>
  );
}
