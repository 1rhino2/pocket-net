# Pocket Net (RhinoNet 0.8)

A browser-based toy ISP desktop: boot screen, draggable windows, a fake `rn:` URL scheme, hand-built mini sites, search, and a harmless joke virus modal.

**Live:** https://pocket-net.vercel.app/

## Quick start

```bash
cd pocket-net
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## What is on the net

- Desktop shell: boot sequence, start menu, taskbar, terminal, notepad, radio dock
- **20** main `rn:` apps (home, search, mail, wiki, map, forum, mart, and more)
- **24** explore threads (`rn:h-00` through `rn:h-23`)
- **536** hand-filed micro-routes (`480` permanent + `56` drift shelves on `rn:n-*`)
- **6** hidden routes for curious operators
- Local economy: RhinoCoins, integrity, quests, discovery log (saved in `localStorage`)
- Client-side search only (no network calls for page content)

## Build

```bash
npm run build
npm run preview
```

## Stack

React 19, Vite 6, TypeScript. Deployed on Vercel.
