# Pocket Net (RhinoNet 2000)

A browser-based toy ISP desktop: boot screen, draggable windows, a fake `rn:` URL scheme, mini sites, search, and a harmless joke virus modal.

## Quick start

```bash
cd pocket-net
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## v1 (gameplay) feature set

- Boot sequence (skippable) into a desktop, one-time session grant (RhinoCoins + integrity)
- Start menu + taskbar + clock, SVG desktop icons (no emoji marks)
- Windows: browser, notepad, terminal; windows clamp inside the viewport when dragged
- `rn:home`, `rn:search`, `rn:directory`, `rn:forum`, `rn:mart`, `rn:readme`, `rn:arcade`, `rn:status`
- RhinoReflex needle game at `rn:arcade` (5 rounds, payouts at end of a full run)
- Local economy: credits, integrity, achievements, stats (persisted in `localStorage`)
- Forum threads + PixelMart cart persist locally; nav credit dedupe per session
- Client-side search index (no network)
- Konami code enables phosphor mode (stable listener; tray toggle too)

## Build

```bash
npm run build
npm run preview
```
