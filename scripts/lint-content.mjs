#!/usr/bin/env node
/**
 * Content linter. Runs before every build.
 *
 * This exists because the net used to be 480 pages spat out of a template with
 * eight filler sentences reused sixty times each. Every rule below is one of
 * the specific ways that content was fake. If the generator ever comes back,
 * the build stops here.
 *
 * Bundles src/content/index.ts with esbuild (already a vite dep) and checks the
 * real exported objects rather than grepping source.
 */
import { build } from 'esbuild';
import { readFileSync, unlinkSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'node_modules', '.content-lint.mjs');

/**
 * Min words in the body of a page. Short is fine, empty is not.
 *
 * Drift pages get a lower floor on purpose. A guestbook with no entries and a
 * four word away message are real page types, and padding them to hit a number
 * would be the exact failure this file exists to prevent.
 */
const MIN_WORDS = 70;
const MIN_WORDS_DRIFT = 25;
/** a sentence shorter than this is boilerplate-ish and not worth uniqueness-checking */
const MIN_SENTENCE_WORDS = 4;

/**
 * Form furniture that is allowed to repeat, because in 1999 it did. A fax
 * header really does say PAGE 1 OF 1 on every page and making aurora vary it
 * would be worse writing, not better. Keep this list short and boring: if
 * something here is a whole sentence of prose, it does not belong.
 */
const BOILERPLATE = new Set([
  'page 1 of 1',
  'page 1 of 2',
  'page 2 of 2',
  'this transmission is confirmed complete',
  'no response is requested',
]);

const problems = [];
function fail(page, msg) {
  problems.push(`${page ? page + ': ' : ''}${msg}`);
}

function sentences(text) {
  return String(text)
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim().replace(/\s+/g, ' '))
    .filter(Boolean);
}

function norm(s) {
  return s.toLowerCase().replace(/[^a-z0-9 ]+/g, '').replace(/\s+/g, ' ').trim();
}

function words(s) {
  return String(s).trim().split(/\s+/).filter(Boolean).length;
}

await build({
  entryPoints: [path.join(ROOT, 'src/content/index.ts')],
  outfile: OUT,
  bundle: true,
  format: 'esm',
  platform: 'node',
  logLevel: 'silent',
});

const mod = await import(pathToFileURL(OUT).href + '?t=' + Date.now());
try {
  unlinkSync(OUT);
} catch {
  /* fine */
}

const pages = mod.AUTHORED_PAGES;
const cast = mod.CAST;

if (!Array.isArray(pages) || pages.length === 0) {
  console.error('lint:content - no pages exported from src/content/index.ts');
  process.exit(1);
}

// sentence -> first page that used it
const seenSentence = new Map();
const seenSlug = new Map();
const hours = new Set();
const byAuthor = new Map();

for (const p of pages) {
  const id = p.slug;

  if (!id || !/^[a-z0-9-]+$/.test(id)) fail(id || '(no slug)', 'slug must be lowercase kebab');
  if (seenSlug.has(id)) fail(id, 'duplicate slug');
  seenSlug.set(id, true);

  if (!cast[p.author]) fail(id, `unknown author "${p.author}"`);
  byAuthor.set(p.author, (byAuthor.get(p.author) ?? 0) + 1);

  if (!Number.isInteger(p.hour) || p.hour < 0 || p.hour > 23) fail(id, `hour out of range: ${p.hour}`);
  hours.add(p.hour);

  if (!p.updated) fail(id, 'missing updated stamp');
  if (!p.teaser) fail(id, 'missing teaser');

  const body = (p.paragraphs ?? []).join(' ');
  const total = words(body) + words((p.bullets ?? []).join(' '));
  const floor = p.drift ? MIN_WORDS_DRIFT : MIN_WORDS;
  if (total < floor) fail(id, `too short: ${total} words, need ${floor}`);

  // the old teasers were mid-word slices of paragraph two. never again.
  if (p.teaser.endsWith('...') || /\w$/.test(p.teaser) === false) {
    // trailing punctuation is fine, only flag the truncation pattern below
  }
  for (const para of p.paragraphs ?? []) {
    if (para.startsWith(p.teaser.slice(0, 40)) && p.teaser.length > 40) {
      fail(id, 'teaser is a slice of a paragraph, write a real one');
      break;
    }
  }

  // no sentence twice on the same page, and no sentence shared across pages
  const local = new Set();
  const all = [
    ...(p.paragraphs ?? []),
    ...(p.bullets ?? []),
    p.quote ?? '',
    p.footnote ?? '',
    // the payoff text behind a lock is still prose somebody reads
    ...(p.unlocked?.paragraphs ?? []),
    p.unlocked?.quote ?? '',
    p.unlocked?.footnote ?? '',
  ];
  for (const chunk of all) {
    for (const s of sentences(chunk)) {
      if (words(s) < MIN_SENTENCE_WORDS) continue;
      const k = norm(s);
      if (!k || BOILERPLATE.has(k)) continue;
      if (local.has(k)) fail(id, `sentence repeats on this page: "${s.slice(0, 60)}"`);
      local.add(k);
      const prev = seenSentence.get(k);
      if (prev && prev !== id) fail(id, `sentence also appears on ${prev}: "${s.slice(0, 60)}"`);
      else if (!prev) seenSentence.set(k, id);
    }
  }
}

// a locked page must not hand over its own answer, and must have a payoff
for (const p of pages) {
  if (!p.lock) continue;
  const ans = String(p.lock.answer).toLowerCase();
  const prompt = `${p.lock.question} ${p.lock.nudge}`.toLowerCase();
  if (prompt.includes(ans)) fail(p.slug, 'the lock prompt gives away its own answer');
  if (!p.unlocked?.paragraphs?.length) fail(p.slug, 'locked page has nothing behind the lock');
  // the answer has to be derivable, so it must actually appear somewhere else
  const elsewhere = pages.some(
    (o) => o.slug !== p.slug && [...(o.paragraphs ?? []), o.quote ?? ''].join(' ').toLowerCase().includes(ans),
  );
  if (!elsewhere) fail(p.slug, `answer "${ans}" appears on no other page, so it cannot be worked out`);
}

for (let h = 0; h < 24; h += 1) {
  if (!hours.has(h)) fail('', `hour ${h} has no pages, chronicle24 asserts one exists`);
}

// operator rule, machine enforced: ascii punctuation only, anywhere in content
const SRC = path.join(ROOT, 'src/content');
const badChars = [
  ['—', 'em dash'],
  ['–', 'en dash'],
  ['‘', 'curly quote'],
  ['’', 'curly quote'],
  ['“', 'curly quote'],
  ['”', 'curly quote'],
];
const { globSync } = await import('node:fs');
for (const f of globSync('**/*.ts', { cwd: SRC })) {
  const text = readFileSync(path.join(SRC, f), 'utf8');
  for (const [ch, name] of badChars) {
    if (text.includes(ch)) fail(`src/content/${f}`, `contains ${name}, use ascii`);
  }
}

if (problems.length) {
  console.error(`\nlint:content FAILED (${problems.length})\n`);
  for (const p of problems) console.error('  ' + p);
  console.error('');
  process.exit(1);
}

const authorLine = [...byAuthor.entries()]
  .sort((a, b) => b[1] - a[1])
  .map(([a, n]) => `${a} ${n}`)
  .join(', ');
console.log(`lint:content ok - ${pages.length} pages, ${seenSentence.size} unique sentences`);
console.log(`  ${authorLine}`);
