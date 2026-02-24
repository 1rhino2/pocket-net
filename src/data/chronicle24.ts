import type { MailMessage } from './mailMessages';
import type { SearchDoc } from './searchIndex';
import type { WikiFragment } from './contentEngine';
import { CHRONICLE_STORY_BY_HOUR } from './chronicleStories';
import { permanentNodesForChapter } from './nodeCatalog';
import { formatPlayMs } from '../lib/seed';

export type HourNetUrl = `rn:h-${string}`;

export type HourSignalDef = {
  id: string;
  title: string;
  blurb: string;
  kind: 'trace' | 'search' | 'wiki' | 'node';
  searchQuery?: string;
  nodeUrl?: string;
  wikiId?: string;
};

export type HourChapterDef = {
  hour: number;
  codename: string;
  title: string;
  url: HourNetUrl;
  story: string[];
  signals: HourSignalDef[];
  mail: MailMessage;
  wiki: WikiFragment;
  searchPhrase: string;
  clueForNext: string;
};

function padHour(h: number) {
  return String(h).padStart(2, '0');
}

export function hourChapterUrl(h: number): HourNetUrl {
  return `rn:h-${padHour(h)}`;
}

export function isHourUrl(url: string): url is HourNetUrl {
  return /^rn:h-\d{2}$/.test(url);
}

export function hourFromUrl(url: string): number | null {
  if (!isHourUrl(url)) return null;
  return parseInt(url.slice(5), 10);
}

const CODENAMES = [
  'Boot Chorus', 'Static Rain', 'Queue Polite', 'Archivist Lamp', 'Printer Faith', 'Lunch Tabs',
  'Submarine Cable', 'Memo Storm', 'Neon Mall', 'Dinner Forum', 'Comet Buffer', 'Midnight Ledger',
  'Pond Packet', 'Cipher Lunch', 'Velvet Relay', 'Coffee Lint', 'Auction Hat', 'Tram Mirror',
  'Soup Tribunal', 'Fax Aurora', 'Choir Cache', 'Bunker Gospel', 'Satellite Yarn', 'Daybreak Index',
] as const;

const STORY_LEADS = [
  'The pocket net wakes with a handshake you can hum.',
  'Rain on the window sounds like lossy audio.',
  'Someone is already in line for a hat that does not ship.',
  'A lamp flickers above unread operator logs.',
  'The printer insists it is a fax machine from 1998.',
  'Tabs multiply while soup cools in the break room.',
  'A cable under the ocean whispers in monospace.',
  'Memos fall like snow and melt on the firewall.',
  'Neon signs advertise bandwidth by the feeling.',
  'Forum arguments peak when dinner is mentioned.',
  'A comet of buffered packets crosses the status bar.',
  'The ledger opens only when the clock forgives you.',
  'Packets circle a pond behind the directory.',
  'Cipher drills echo through an empty lunch hall.',
  'Velvet static wraps the relay like a coat.',
  'Lint monks debate whitespace over coffee.',
  'Hats are auctioned for coins that never expire.',
  'Tram mirrors show routes you have not opened yet.',
  'Soup is on trial for being a beverage.',
  'A fax machine prints auroras in black and white.',
  'The choir sings in cached harmonies.',
  'Gospel packets hide in an offline bunker.',
  'Satellite yarn tangles honest operators.',
  'Daybreak indexes every signal you filed tonight.',
] as const;

const SEARCH_PHRASES = [
  'boot chorus', 'static rain', 'queue polite', 'archivist lamp', 'printer faith', 'lunch tabs',
  'submarine cable', 'memo storm', 'neon mall', 'dinner forum', 'comet buffer', 'midnight ledger',
  'pond packet', 'cipher lunch', 'velvet relay', 'coffee lint', 'auction hat', 'tram mirror',
  'soup tribunal', 'fax aurora', 'choir cache', 'bunker gospel', 'satellite yarn', 'daybreak index',
] as const;

const TRACE_A = [
  'Dial-tone residue', 'Rain gauge ping', 'Ticket stub hash', 'Lamp filament note', 'Toner ghost',
  'Crumb in the trackpad', 'Cable hum sample', 'Memo paperclip', 'Neon flicker count', 'Forum pin',
  'Buffer star chart', 'Ledger wax seal', 'Pond ripple log', 'Cipher smudge', 'Velvet tear',
  'Lint ball relic', 'Auction paddle', 'Mirror smear', 'Soup ladle mark', 'Fax warm tray',
  'Choir note shard', 'Bunker hymn', 'Yarn knot', 'Index ribbon',
] as const;

const TRACE_B = [
  'Operator yawn', 'Window static', 'Queue number', 'Dust mote index', 'Paper jam prayer',
  'Tab seventeen', 'Depth reading', 'Storm footer', 'Mall receipt', 'Thread lock',
  'Comet tail', 'Ink blot', 'Frog packet', 'Lunch tray', 'Relay sigh',
  'Coffee ring', 'Bid whisper', 'Tram bell', 'Verdict stamp', 'Aurora sheet',
  'Alt harmony', 'Offline amen', 'Orbit thread', 'Sunrise ping',
] as const;

const TRACE_C = [
  'Handshake echo', 'Puddle hash', 'Polite beep', 'Shelf label', 'Faith LED',
  'Mustard packet', 'Sonar blink', 'Memo thunder', 'Sign reflection', 'Soup vote',
  'Buffer hymn', 'Ledger ghost', 'Lily pad', 'Keycap shine', 'Relay glove',
  'Whitespace scar', 'Hat feather', 'Glass fog', 'Broth thermometer', 'Thermal line',
  'Cache voice', 'Bunker candle', 'Star stitch', 'Morning clause',
] as const;

const TRACE_D = [
  'Packet sigh', 'Route echo', 'Chrome peel', 'Lint verse', 'Coin hush',
  'Tab fossil', 'Relay yarn', 'Archive blink', 'Cipher fold', 'Soup metric',
  'Forum static', 'Map grease', 'Hat echo', 'Boot amber', 'Rain ledger',
  'Queue socket', 'Lamp queue', 'Printer myth', 'Lunch cipher', 'Cable pond',
  'Memo neon', 'Mall buffer', 'Dinner comet', 'Ledger pond',
] as const;

const TRACE_E = [
  'Trace filament', 'Signal spoon', 'Drift paddle', 'Honest ping', 'Velvet index',
  'Static ladle', 'Rain paddle', 'Queue hymn', 'Lamp thread', 'Printer ripple',
  'Lunch beacon', 'Cable verdict', 'Memo aurora', 'Neon choir', 'Forum bunker',
  'Comet yarn', 'Ledger daybreak', 'Pond cipher', 'Cipher velvet', 'Relay coffee',
  'Lint auction', 'Hat tram', 'Mirror soup', 'Tribunal fax',
] as const;

function signalsForHour(h: number, nodeUrl: string): HourSignalDef[] {
  const base = `chronicle_h${padHour(h)}`;
  const phrase = SEARCH_PHRASES[h]!;
  const wikiId = `chronicle-wiki-${padHour(h)}`;
  return [
    { id: `${base}_s0`, title: TRACE_A[h]!,       blurb: 'A note you can pin while wandering this thread.', kind: 'trace' },
    { id: `${base}_s1`, title: TRACE_B[h]!, blurb: 'A note you can pin while wandering this thread.', kind: 'trace' },
    { id: `${base}_s2`, title: TRACE_C[h]!, blurb: 'A note you can pin while wandering this thread.', kind: 'trace' },
    { id: `${base}_s3`, title: TRACE_D[h]!, blurb: 'A note you can pin while wandering this thread.', kind: 'trace' },
    { id: `${base}_s4`, title: TRACE_E[h]!, blurb: 'A note you can pin while wandering this thread.', kind: 'trace' },
    {
      id: `${base}_s5`,
      title: `Search: ${phrase}`,
      blurb: `Search "${phrase}" anytime.`,
      kind: 'search',
      searchQuery: phrase,
    },
    {
      id: `${base}_s6`,
      title: `Thread seal: ${CODENAMES[h]}`,
      blurb: 'Read the thread mail in RhinoMail.',
      kind: 'trace',
    },
    {
      id: `${base}_s7`,
      title: 'Wiki filed',
      blurb: 'Read the thread article in PocketWiki.',
      kind: 'wiki',
      wikiId,
    },
    {
      id: `${base}_s8`,
      title: 'Permanent node filed',
      blurb: 'Open any permanent route tied to this thread on the Net Index.',
      kind: 'node',
      nodeUrl,
    },
  ];
}

function buildChapters(): HourChapterDef[] {
  return Array.from({ length: 24 }, (_, h) => {
    const codename = CODENAMES[h]!;
    const phrase = SEARCH_PHRASES[h]!;
    const nextPhrase = SEARCH_PHRASES[(h + 1) % 24]!;
    const mailId = `chronicle-mail-${padHour(h)}`;
    const wikiId = `chronicle-wiki-${padHour(h)}`;
    const nodeUrl = permanentNodesForChapter(h)[0]!.url;
    return {
      hour: h,
      codename,
      title: codename,
      url: hourChapterUrl(h),
      story: CHRONICLE_STORY_BY_HOUR[h] ?? [
        STORY_LEADS[h]!,
        'This thread is one corner of a very large net. Nothing unlocks later - you can leave and come back whenever.',
        `Nine notes to pin if you want, plus mail, wiki, search, and twenty permanent routes on the index.`,
        `Elsewhere on the net you might search "${nextPhrase}" when curiosity pulls you.`,
      ],
      signals: signalsForHour(h, nodeUrl),
      mail: {
        id: mailId,
        from: `chronicle.ops@${padHour(h)}.rn`,
        subject: `${codename} - field mail`,
        preview: `Thread mail: ${codename}.`,
        body:
          `Operator,\n\n` +
          `The thread "${codename}" is on the net whenever you want it.\n` +
          `Open ${hourChapterUrl(h)} or just read this and wander.\n` +
          `Search phrase: "${phrase}".\n\n` +
          `- Field desk`,
      },
      wiki: {
        id: wikiId,
        title: `${codename} (field wiki)`,
        paragraphs: [
          `Wiki fragment for the "${codename}" thread. Always in PocketWiki.`,
          STORY_LEADS[h]!,
          `Nine optional notes on the thread page. Permanent routes live on the Net Index.`,
        ],
      },
      searchPhrase: phrase,
      clueForNext: `Optional next search: ${nextPhrase}`,
    };
  });
}

export const CHRONICLE_HOURS = buildChapters();

export function getHourChapter(h: number): HourChapterDef | null {
  return CHRONICLE_HOURS.find((c) => c.hour === h) ?? null;
}

export function getHourChapterByUrl(url: string): HourChapterDef | null {
  const h = hourFromUrl(url);
  if (h === null) return null;
  return getHourChapter(h);
}

/** All explore threads are always open. */
export function isHourUnlocked(_h: number, _hoursUnlocked: number[], _playMs: number) {
  return true;
}

/** Traces can be filed anytime. */
export function isHourLive(_h: number, _playMs: number) {
  return true;
}

export function syncChronicleUnlocks(_hoursUnlocked: number[], _playMs: number): number[] {
  return Array.from({ length: 24 }, (_, i) => i);
}

export function chronicleMailAll(): MailMessage[] {
  return CHRONICLE_HOURS.map((ch) => ch.mail);
}

export function chronicleWikiAll(): WikiFragment[] {
  return CHRONICLE_HOURS.map((ch) => ch.wiki);
}

export function chronicleSearchDocsAll(): SearchDoc[] {
  return CHRONICLE_HOURS.map((ch) => ({
    id: `chronicle-search-${padHour(ch.hour)}`,
    title: `Explore: ${ch.codename}`,
    url: ch.url,
    snippet: `Search "${ch.searchPhrase}" to find this thread in RhinoSearch.`,
    tags: ['explore', ch.codename, `thread-${ch.hour}`, ch.searchPhrase],
    body: ch.story.join(' '),
  }));
}

export function chronicleMailActive(_playMs: number) {
  return chronicleMailAll();
}

export function chronicleWikiActive(_playMs: number) {
  return chronicleWikiAll();
}

export function chronicleSearchDocs(_playMs: number) {
  return chronicleSearchDocsAll();
}

export function chronicleSecretForSearch(query: string, _playMs: number): HourNetUrl | null {
  const q = query.trim().toLowerCase();
  for (const ch of CHRONICLE_HOURS) {
    if (q.includes(ch.searchPhrase)) return ch.url;
  }
  return null;
}

export function tryChronicleSearchSignal(query: string, _playMs: number): string | null {
  const q = query.trim().toLowerCase();
  for (const ch of CHRONICLE_HOURS) {
    const sig = ch.signals.find((s) => s.kind === 'search' && s.searchQuery && q.includes(s.searchQuery));
    if (sig) return sig.id;
  }
  return null;
}

export function hourSignalsComplete(h: number, found: Set<string>) {
  const ch = getHourChapter(h);
  if (!ch) return false;
  return ch.signals.every((s) => found.has(s.id));
}

export function chronicleProgress(found: Set<string>, hoursCompleted: number[], playMs = 0) {
  const totalSignals = CHRONICLE_HOURS.reduce((n, ch) => n + ch.signals.length, 0);
  let signalsFound = 0;
  for (const ch of CHRONICLE_HOURS) {
    for (const s of ch.signals) {
      if (found.has(s.id)) signalsFound += 1;
    }
  }
  return {
    hoursCompleted: hoursCompleted.length,
    signalsFound,
    totalSignals,
    threadCount: CHRONICLE_HOURS.length,
    playMs,
    timeLabel: formatPlayMs(playMs),
  };
}

export const CHRONICLE_STATIC_DISCOVERIES = CHRONICLE_HOURS.flatMap((ch) =>
  ch.signals.map((s) => ({
    id: s.id,
    title: s.title,
    category: 'chronicle' as const,
    hint: s.blurb,
  })),
);

/** Bonus discovery every twenty minutes of tracked playtime. */
export function interludeForPlayMs(playMs: number): { id: string; title: string } | null {
  const slot = Math.floor(playMs / (20 * 60 * 1000));
  if (slot < 1) return null;
  return { id: `interlude_${slot}`, title: `Interlude ${slot}` };
}
