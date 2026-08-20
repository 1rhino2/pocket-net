# pocket-net

RhinoNet 2000. A dial-up ISP desktop from 1999 that you can actually browse:
draggable windows, a net full of pages, quests, FM radio, and a handset layout
for phones. Saves to localStorage, no backend, nothing phones home.

There is a mystery in it. It has an answer and the answer is findable.

## The net

Petersham Valley Online is a small regional ISP. Its subscribers wrote pages,
argued on boards, ran a webring, and one of them kept a nightly copy of the
whole thing on borrowed rack space. On the night of 11 March 1999 a block of
those pages stopped resolving and the company called it a disk fault.

Every page on the permanent net is written by hand, 144 of them. Fourteen people
write on it and they dont sound alike, which is the point: cover the byline on
any page and you should still know who wrote it.

## Content rules, enforced by the build

`npm run build` runs `scripts/lint-content.mjs` first and fails on:

- a sentence that appears on two different pages
- a sentence repeated inside one page
- a page under its word floor, or with no author, or with no last-updated stamp
- a teaser that is just a slice of a paragraph
- an hour with no pages (the 24 hour threads assume one exists)
- a locked page whose prompt contains its own answer, or whose answer appears
  nowhere else and therefore cannot be worked out
- an em dash, en dash or curly quote anywhere in `src/content`

This exists because the net used to be 480 pages generated from 24 templates
and a pool of eight filler sentences reused sixty times each. If that ever
comes back, the build stops.

## Look

Gray 3D bevels, teal desktop, web safe colours, Tahoma and Times, blue
underlined links. Every rn: site gets its own skin, because in 1999 nobody
agreed on anything: search is early Google, the wiki is Wikipedia, the job
board is newsprint, chat is yellow, the readme is a black terminal.

## Run locally

```bash
npm install
npm run dev
```

```bash
npm run lint:content   # content rules only
npm run build          # lint + tsc + vite build
```

Deploy target is Vercel.

## License

Check LICENSE in repo.
