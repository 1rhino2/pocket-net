import type { MailMessage } from './mailMessages';
import type { SearchDoc } from './searchIndex';
import { chronicleSecretForSearch } from './chronicle24';
import { pick, pickMany, seededRng, todayKey, weekKey } from '../lib/seed';

/**
 * The daily wire. This replaces procedural.ts.
 *
 * The old version had a list of 15 adjectives, 15 nouns and 8 verbs and glued
 * one of each together, so the net's front page greeted you with "a sleepy
 * relay archives" and "a nocturnal handset pings". Three of those stacked in a
 * box was the first thing anybody read.
 *
 * The living layer is worth keeping, the salad is not. So every line below was
 * written whole, and the day seed only picks which written lines you get. A
 * pool of real sentences is a smaller number than adjectives times nouns times
 * verbs, and it is the right trade: 15x15x8 is 1800 combinations and none of
 * them are sentences.
 */

const WIRE_LINES = [
  `soup_judge has rated the coffee in the second floor break room. It is not food, so it gets no number.`,
  `Somebody signed the guestbook on a page whose owner has not logged in since March.`,
  `lint_monk is asking again whether anyone kept a copy of the board index from February.`,
  `The B side of the ring group dropped another call. Console 2 logged it, as it logs all of them.`,
  `Three sites in the webring stopped answering this week. The ring master is not removing them.`,
  `A subscriber wants to know if the net is closed on Sundays. It is not.`,
  `The fire door on floor 2 is propped open again. This has now been raised in six consecutive memos.`,
  `Someone is searching the archive for the same address every day at about the same time.`,
  `localhost_legend's hit counter went up by forty overnight and he would like everyone to know.`,
  `A wiki article was edited by an address with no other edits, and then edited back.`,
  `The good scissors are still missing. The office has stopped calling them the good scissors.`,
  `Night desk reports the room is quiet, which she notes is worth writing down while it is true.`,
] as const;

const WIRE_MAIL = [
  {
    from: 'soup_judge@pvo',
    subject: 'friday diner, still on',
    preview: 'no agenda, the place with the broken sign',
    body: `still on for friday. the place with the sign where the second o is out, 6ish.\n\nno agenda and nobody has to talk about computers. bring whoever.\n\n- sj`,
  },
  {
    from: 'lint_monk@pvo',
    subject: 'Correction notice, courtesy copy',
    preview: 'Sent to you before it is published, as always',
    body: `You have a date wrong on one of your pages. I have not published anything.\n\nI am sending this first because I always send it first, and if you fix it in the next week then nothing goes up and this exchange never happened.\n\nItem 1. The page reads 1997. The event was 1996. Source is your own earlier page, which is awkward for both of us.`,
  },
  {
    from: 'operations@pvo',
    subject: 'Scheduled maintenance notice',
    preview: 'Tuesday, 02:00 to 04:00, as usual',
    body: `Scheduled maintenance will be performed Tuesday between 02:00 and 04:00.\n\nService may be interrupted during this window. No action is required of subscribers.\n\nThis notice is sent to all subscribers and does not relate to your account specifically.`,
  },
  {
    from: 'modem_mary@pvo',
    subject: 'your line, from the console',
    preview: 'It is not your modem, before you buy a new one',
    body: `You rang about the drops. I looked.\n\nIt is the B side of the ring group and it is not your modem. Do not buy a new modem. I have logged it eleven times this month and the count is the only argument any of us have.\n\nIf it happens more than twice a night ring the console and I will move you to the A side by hand.`,
  },
  {
    from: 'todd@pvo',
    subject: 'webring: you are number 12',
    preview: 'Put the buttons at the bottom of your page',
    body: `You are in. Site number 12.\n\nPut the ring buttons at the bottom of your page where people can find them, and update the page sometimes. That second one is the rule everybody breaks.\n\nI do not remove sites that stop answering. People ask. The answer is no.`,
  },
  {
    from: 'fax_aurora@pvo',
    subject: 'MEMO: TIMESHEETS',
    preview: 'THURSDAY. NOT FRIDAY.',
    body: `TO: ALL STAFF. RE: TIMESHEET SUBMISSION.\n\nTIMESHEETS ARE DUE THURSDAY. THIS HAS ALWAYS BEEN THE CASE AND IS RESTATED WEEKLY WITHOUT EFFECT.\n\nSTAFF SUBMITTING ON FRIDAY WILL BE PAID. THE OFFICE SIMPLY WISHES IT ON RECORD THAT THURSDAY WAS ASKED FOR.`,
  },
  {
    from: 'localhost_legend@pvo',
    subject: 'PLEASE SIGN MY GUESTBOOK!!!',
    preview: 'it is at the bottom of my page',
    body: `hi!! i saw your page from the webring and it is really good.\n\nwill you sign my guestbook it is at the bottom of my page. you dont have to write a lot, one line is fine, i read all of them the same day.\n\nmy counter is at 3180 which is real and not faked!!!`,
  },
  {
    from: 'a.subscriber@pvo',
    subject: 'is there a copy of my page from before',
    preview: 'h- address, gone since March',
    body: `I am told you might know who keeps copies.\n\nMine is one of the h- ones. It went in March. Support say it was a disk fault and that I should have kept a copy, which I did not know I was supposed to do.\n\nIt is a recipe collection. Four years. If there is nothing then there is nothing, I would just like to know either way rather than keep asking.`,
  },
] as const;

const WIKI_FRAGMENTS = [
  {
    title: 'Ring group B side',
    paragraphs: [
      `The B side of the dial-up ring group has dropped approximately one call in forty since February 1999.`,
      `The overnight operator has logged each occurrence. The modems on the B side were swapped in March and the rate did not change, which is generally taken to rule out the equipment.`,
    ],
  },
  {
    title: 'The h- address range',
    paragraphs: [
      `Addresses beginning h- were issued to subscribers who signed up during 1998, which was the year of heaviest growth.`,
      `It is the largest range on the net. This is the reason usually given for why losing it mattered more than losing any other range would have.`,
    ],
  },
  {
    title: 'The Friday diner',
    paragraphs: [
      `An informal weekly gathering of food board members, running since October 1998 at a diner with a partially failed sign.`,
      `Attendance peaked at eleven in January 1999 and has since fallen. The organiser keeps one seat at the end of the table clear and has declined to explain why.`,
    ],
  },
  {
    title: 'Correction notices',
    paragraphs: [
      `A series of published corrections maintained by a subscriber posting as lint_monk, running to over fifty notices.`,
      `The practice is to write to the author privately first and publish only if the error stands after a week. Roughly two thirds of cases are resolved without publication.`,
    ],
  },
  {
    title: 'The New England Net webring',
    paragraphs: [
      `A ring of nineteen personal sites, joined by a linked footer, administered by a subscriber known as Todd.`,
      `Six member sites have not resolved since March 1999. The administrator has declined requests to remove them from the ring.`,
    ],
  },
  {
    title: 'The August air handler failure',
    paragraphs: [
      `On a night in August 1998 the exchange air handling unit failed and equipment was shut down by the operator on duty, by hand, in an order chosen at the time.`,
      `The mail spool was taken down later than was ideal and took longest to restore. Three procedural changes followed, including a wall thermometer visible from the console.`,
    ],
  },
  {
    title: 'The volunteer archive',
    paragraphs: [
      `A nightly copy of the subscriber net maintained privately from October 1997 to March 1999.`,
      `The effort was not sanctioned and ran on equipment at the exchange. The index stopped updating on 10 March 1999.`,
    ],
  },
  {
    title: 'Petersham Valley Online',
    paragraphs: [
      `A regional dial-up provider serving subscribers across three counties, in operation since 1995.`,
      `The service is notable locally for having run a subscriber-authored net alongside the dial-up service, rather than only providing access to the wider internet.`,
    ],
  },
] as const;

const ARCHIVE_ENTRIES = [
  { title: 'Board digest: the salt pork argument', body: `Forty one messages over nine days about whether bacon is acceptable in chowder. The board owner closed it by declaring himself right, which nobody appealed.` },
  { title: 'Board digest: modems, again', body: `The technical board relitigates the B side drop rate for the fourth month. One poster has the call log and everybody else has a theory.` },
  { title: 'Board digest: what a fault report looks like', body: `A night operator explains what you are normally told when hardware fails, and what it means when you are told nothing. Read more than any other post that month.` },
  { title: 'Board digest: the guestbook chain', body: `Members agree to sign one stalled guestbook a week so the pages do not go completely quiet. It ran for six weeks and then it ran without needing to be agreed.` },
  { title: 'Board digest: 800x600 or 640x480', body: `Nine posts of genuine hostility about a screen resolution. The best viewed at line stays on most pages regardless of the outcome.` },
  { title: 'Board digest: lighthouses', body: `A member posts photographs of every lighthouse in the commonwealth. The page takes nine minutes to load and is the most linked page on the net for a month.` },
  { title: 'Board digest: the vending machine coil', body: `Sustained investigation into which coil in the floor 2 machine is bent, conducted with more rigour than most of the technical board.` },
  { title: 'Board digest: keeping your own copy', body: `After March, a long thread on how to keep a copy of your own page. Nobody in it sounds like they are enjoying being right.` },
  { title: 'Board digest: the ring master will not remove them', body: `Members ask for six dead sites to be dropped from the webring. The administrator declines in one sentence and the thread ends there.` },
  { title: 'Board digest: timesheets are due Thursday', body: `Staff forward the office memo to the boards as a joke. The office joins the board to reply and stays, which nobody expected.` },
  { title: 'Board digest: is the net closed on Sundays', body: `One subscriber's question becomes a running joke and then a genuinely useful thread about what the service actually does at night.` },
  { title: 'Board digest: the January backup', body: `Subscribers compare which version of their page came back and establish between themselves that the backup was six weeks old.` },
  { title: 'Board digest: welcome to the new signups', body: `A thread that ran continuously through 1998 as the h- range filled up, ending with the last entry in December.` },
  { title: 'Board digest: nothing happened tonight', body: `The overnight operator posts a quiet week to the boards on request. It is the least eventful thing on the net and gets read anyway.` },
] as const;

const GHOST_NODES = [
  { label: 'the stalled guestbook', blurb: `A page nobody has updated since March, still taking signatures.` },
  { label: 'the ninth signature', blurb: `Somebody has signed the same guestbook nine times as "a friend".` },
  { label: 'ring stop 15', blurb: `The lighthouse page. Nine minutes to load, when it loaded.` },
  { label: 'drawer 3', blurb: `One held envelope, addressed and sent by the same person.` },
  { label: 'the end seat', blurb: `Kept clear at the diner on Fridays. It faces the door.` },
  { label: 'the wall thermometer', blurb: `Installed after August so the console can see the room.` },
  { label: 'the middle bank', blurb: `Fourteen units on the tenth. None on the twelfth.` },
  { label: 'the second ring', blurb: `The on-call line, answered at four in the morning, once.` },
] as const;

/** codeword pool for the hack minigame. these are passwords, not prose. */
const CODE_WORDS = [
  'trunk', 'splice', 'carrier', 'handset', 'exchange', 'ringer', 'pulse', 'tone',
  'spool', 'platter', 'sled', 'bank', 'rack', 'console', 'patch', 'jack',
] as const;

export type WikiFragment = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type ArchiveEntry = {
  id: string;
  title: string;
  week: string;
  body: string;
};

export type GhostNode = {
  id: string;
  stampId: string;
  label: string;
  blurb: string;
};

export function dailyMail(day = todayKey()): MailMessage[] {
  const rng = seededRng(`mail-${day}`);
  const count = 3 + Math.floor(rng() * 3);
  return pickMany(rng, [...WIRE_MAIL], count).map((m, i) => ({
    id: `daily-${day}-m${i}`,
    from: m.from,
    subject: m.subject,
    preview: m.preview,
    body: m.body,
    urgent: false,
  }));
}

export function dailyRumors(day = todayKey()): string[] {
  const rng = seededRng(`rumor-${day}`);
  return pickMany(rng, [...WIRE_LINES], 4);
}

export function dailyWikiFragments(day = todayKey()): WikiFragment[] {
  const rng = seededRng(`wiki-${day}`);
  return pickMany(rng, [...WIKI_FRAGMENTS], 5).map((f, i) => ({
    id: `daily-${day}-w${i}`,
    title: f.title,
    paragraphs: [...f.paragraphs],
  }));
}

export function dailySearchDocs(day = todayKey()): SearchDoc[] {
  const rng = seededRng(`search-${day}`);
  return pickMany(rng, [...WIKI_FRAGMENTS], 6).map((f, i) => ({
    id: `daily-${day}-s${i}`,
    title: f.title,
    url: i % 3 === 0 ? 'rn:archive' : 'rn:discover',
    snippet: f.paragraphs[0]!.slice(0, 120),
    tags: [f.title.toLowerCase(), day, 'wire'],
    body: f.paragraphs.join(' '),
  }));
}

export function weeklyArchiveEntries(week = weekKey()): ArchiveEntry[] {
  const rng = seededRng(`archive-${week}`);
  return pickMany(rng, [...ARCHIVE_ENTRIES], 12).map((e, i) => ({
    id: `weekly-${week}-${i}`,
    title: e.title,
    week,
    body: e.body,
  }));
}

export function mapGhostNodes(day = todayKey()): GhostNode[] {
  const rng = seededRng(`ghost-${day}`);
  const count = 3 + Math.floor(rng() * 2);
  return pickMany(rng, [...GHOST_NODES], count).map((g, i) => {
    const stampNum = 1 + Math.floor(rng() * 50);
    return {
      id: `ghost-${day}-${i}`,
      stampId: `stamp_${String(stampNum).padStart(2, '0')}`,
      label: g.label,
      blurb: g.blurb,
    };
  });
}

export function hackPhrases(day = todayKey(), round: number): string[] {
  const rng = seededRng(`hack-${day}-${round}`);
  return Array.from({ length: 8 }, () => {
    const a = pick(rng, CODE_WORDS);
    const b = pick(rng, CODE_WORDS);
    return `${a}-${b}-${Math.floor(rng() * 900 + 100)}`;
  });
}

export const SECRET_SEARCH_KEYS = [
  'ghost relay',
  'offline bunker',
  'stale cache',
  'midnight relay',
  'lint cathedral',
  'after hours',
  'packet archive',
  'discovery log',
  'terry goldfish',
  'free smile',
  'sandbox honesty',
  'operator sigil',
] as const;

export function secretUrlForSearch(query: string, playMs = 0): string | null {
  const q = query.trim().toLowerCase();
  const chronicle = chronicleSecretForSearch(query, playMs);
  if (chronicle) return chronicle;
  if (q.includes('ghost relay')) return 'rn:ghost';
  if (q.includes('offline bunker') || q.includes('bunker gospel')) return 'rn:bunker';
  if (q.includes('stale cache')) return 'rn:cache';
  if (q.includes('midnight relay')) return 'rn:relay';
  if (q.includes('lint cathedral')) return 'rn:lint';
  if (q.includes('after hours') || q.includes('after-hours') || q.includes('midnight desk')) return 'rn:midnight';
  return null;
}

export function dailyDiscoveryId(kind: 'mail' | 'rumor' | 'wiki' | 'search', day = todayKey(), index = 0) {
  return `daily_${day}_${kind}_${index}`;
}

export function weeklyDiscoveryId(week = weekKey()) {
  return `weekly_${week}`;
}
