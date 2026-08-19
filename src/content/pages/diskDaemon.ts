import type { AuthoredPage } from '../types';

/**
 * disk_daemon, one-man shareware shelf. Uploads utilities he wrote or fixed.
 *
 * Rule for these: read like a README. Requirements, version, a changelog line.
 * If a sentence has no version number and no requirement in it, ask whether it
 * earns its place on a download page.
 */
export const DAEMON_PAGES: AuthoredPage[] = [
  {
    slug: 'daemon-shelf',
    title: 'The Shelf',
    author: 'disk_daemon',
    hour: 2,
    layout: 'bbs',
    tag: 'homepage',
    updated: '09 Feb 1999',
    search: 'shareware downloads utilities dos tools shelf',
    teaser: 'A one-man download shelf. Small tools that do one thing. Tested on his machine, which is the only machine he will vouch for.',
    paragraphs: [
      `Welcome to the Shelf. Everything here is a small utility that does one job. If you want a suite that does forty jobs badly, the mart sells those, and I wish you luck.`,
      `Ground rules, since a shelf needs them. Every file has a version. Every file has a requirements line. Every file has been tested on my machine and nowhere else, so if it breaks on yours, that is data, and I would like to hear it, but it is not a promise broken.`,
      `I write most of these. A few I found broken and fixed, and where I did I say whose it was to begin with, because taking the credit for a fix you did on somebody else's work is the shabbiest thing a sysop can do.`,
      `Nothing here phones home, nags you, or expires. Shareware meant "try it, and if you keep it, be decent about it." It did not mean a countdown timer. I am old enough to remember the difference and stubborn enough to keep coding like it.`,
      `The listing is one directory over. File of the week is pinned at the top. If a file has a known bug it is in the changelog, not hidden, because a bug you warned about is a footnote and a bug you buried is a betrayal.`,
    ],
    footnote: `The Shelf. Tested on my machine. Your mileage is your data.`,
    related: [{ label: 'Full listing', url: 'rn:n-daemon-listing' }],
  },

  {
    slug: 'daemon-listing',
    title: 'The Shelf: full listing',
    author: 'disk_daemon',
    hour: 4,
    layout: 'manifest',
    tag: 'downloads',
    updated: '01 Mar 1999',
    search: 'download list utilities file sizes requirements versions',
    teaser: 'Everything on the Shelf, with sizes and requirements. Read the requirements line before you complain.',
    paragraphs: [
      `The whole Shelf, in one list. Format is name, then version, then what it needs, then one line on what it does. If you skip the requirements line and then it does not run, we both know whose fault that is.`,
      `Sizes are honest. If a thing is small I say small, if a thing wants a meg of memory I say so up front, because there is nothing worse than a download that surprises you with what it eats.`,
    ],
    bullets: [
      `LOGSORT 1.4: needs 256K, sorts a log file by timestamp and nothing else, does that one thing perfectly`,
      `RENAMER 2.0: needs DOS 5, batch renames by pattern, will not touch a file it cannot back up first`,
      `PORCHWATCH 0.9: needs a serial port, reads a weather station off COM2, half of you wrote to ask about this one`,
      `SPLIT 1.1: needs nothing, cuts a big file onto floppies and glues it back, tested on my machine to a fault`,
      `NIGHTLOG 1.0: needs 512K, timestamps whatever your modem hears and writes it down, more on that one below`,
    ],
    footnote: `The Shelf. Requirements are not suggestions.`,
    related: [{ label: 'File of the week', url: 'rn:n-daemon-file-of-week' }],
  },

  {
    slug: 'daemon-file-of-week',
    title: 'The Shelf: file of the week is LOGSORT',
    author: 'disk_daemon',
    hour: 5,
    layout: 'card',
    tag: 'downloads',
    updated: '22 Feb 1999',
    search: 'logsort utility timestamp sort log files pick',
    teaser: 'His favorite kind of tool: one that does a single job and refuses to grow.',
    paragraphs: [
      `File of the week is LOGSORT 1.4, and it wins because it is everything I think a utility should be, which is small, dull, and completely trustworthy.`,
      `It takes a log file and sorts the lines by their timestamp. That is all. It does not filter, it does not colour, it does not offer to email the result to your mother. Somebody asked me to add a search feature and I said no, because the moment LOGSORT can do two things it will do neither of them as well.`,
      `The whole thing is under a hundred lines and it has not had a bug report in eight months, which is the highest praise a program can earn. A tool nobody has to think about is a tool that works.`,
      `If you keep it, drop me a line. Not money, I never took money for these. Just tell me what log you pointed it at, because I am nosy about what people are keeping records of, and lately the answers have gotten interesting.`,
    ],
    footnote: `The Shelf. LOGSORT 1.4. Small on purpose.`,
  },

  {
    slug: 'daemon-changelog',
    title: 'The Shelf: the changelog nobody reads',
    author: 'disk_daemon',
    hour: 4,
    layout: 'report',
    tag: 'changelog',
    updated: '15 Mar 1999',
    search: 'changelog version history bug fixes honest log',
    teaser: 'Where the bugs are admitted out loud, because a warned bug is a footnote and a buried one is worse.',
    paragraphs: [
      `The changelog is the most honest page on any software shelf and the least read, and those two facts are related. People want the download, not the confession attached to it.`,
      `I keep it anyway, in full, going back to version one of everything. When I fixed a thing I say what was broken. When I broke a thing and then unbroke it I say that too, because pretending a version never shipped is how you end up shipping it twice.`,
      `Sample, since examples beat lectures. RENAMER 1.9 could clobber a file if two patterns matched the same name, which is a genuinely bad bug, and 2.0 makes it back up first and refuse if it cannot. I do not hide that 1.9 existed. I mark it "do not use" and leave it up as a warning to my future self.`,
      `The warmest I ever get in writing is in here, oddly. A changelog is where you get to say "thanks to the guy who found this," and I mean it every time, because a bug report is a stranger doing your testing for free.`,
    ],
    quote: `a warned bug is a footnote, a buried one is a betrayal`,
    footnote: `The Shelf. Full history, no deletions.`,
  },

  {
    slug: 'daemon-nightlog',
    title: 'The Shelf: NIGHTLOG 1.0, and why I wrote it',
    author: 'disk_daemon',
    hour: 3,
    layout: 'bbs',
    tag: 'downloads',
    updated: '19 Mar 1999',
    search: 'nightlog modem timestamp recorder serial utility signal',
    teaser: 'A small recorder that timestamps whatever the modem hears. He wrote it for one user who kept asking, and the results unsettled him.',
    paragraphs: [
      `NIGHTLOG 1.0 timestamps whatever comes in on the modem and writes it to a file with the clock reading down to the second. Needs 512K and a machine you can leave running overnight. I wrote it because one user kept asking for it and would not tell me why, which is exactly the sort of thing that makes me want to know why.`,
      `Turns out he is logging a signal. Comes in at the same time most nights, he says, and he wanted a tool that would not miss it and would not lie about the timestamp. Fair. A recorder that fudges its clock is worse than no recorder, so NIGHTLOG reads the clock straight off the interrupt and does not round.`,
      `I ran it a few nights myself, out of curiosity, pointed at my own line. I got mostly nothing, which is what you should get. Then one night I got a run of the same bytes he had described, at the minute he had described, and I will be honest, it put a small cold feeling in me that a utility has no business causing.`,
      `The file is on the listing. Use it for whatever you keep records of overnight. If you point it at the same thing he did, compare notes with him and not with me, because he is the one who understands what it means and I just wrote the thing that catches it. His log is at rn:n-carrier-log1.`,
    ],
    footnote: `The Shelf. NIGHTLOG 1.0. Reads the clock straight, rounds nothing.`,
    clue: 'recorder',
    arc: 'signal',
    related: [{ label: 'The log he keeps', url: 'rn:n-carrier-log1' }],
  },

  {
    slug: 'daemon-porchwatch',
    title: 'The Shelf: PORCHWATCH, for the weather crowd',
    author: 'disk_daemon',
    hour: 8,
    layout: 'card',
    tag: 'downloads',
    updated: '26 Feb 1999',
    search: 'porchwatch weather station serial port com2 utility',
    teaser: 'A driver for a home weather station. Half his mail this month was about this one file.',
    paragraphs: [
      `PORCHWATCH 0.9 reads a home weather station off COM2 and logs it. It is at version 0.9 and not 1.0 for an honest reason, which is that it works on the two station models I could test and I refuse to call a thing finished when I have only proven two cases.`,
      `Half my mail this month has been about this file, which surprised me, because I did not know there were that many people out here logging their own weather. There are, and they are a specific and wonderful kind of stubborn, and I am glad to have coded them a small useful thing.`,
      `If you run it against a station I have not tested, the worst case is it logs garbage and you tell me, and then I have a third case, and 0.9 inches toward 1.0. That is how the version number is supposed to move. Slowly, and only on evidence.`,
      `One porch guy has been feeding me his readings to test against, and his data is clean enough that I half suspect he enjoys the logging more than the weather. Takes one to know one. His station page is worth a look if you are getting into this.`,
    ],
    footnote: `The Shelf. PORCHWATCH 0.9. Two models proven, more welcome.`,
    related: [{ label: 'A station that runs it', url: 'rn:n-hank-station' }],
  },

  {
    slug: 'daemon-support-policy',
    title: 'The Shelf: what "support" means here',
    author: 'disk_daemon',
    hour: 1,
    layout: 'report',
    tag: 'notes',
    updated: '11 Feb 1999',
    search: 'support policy shareware one person expectations help',
    teaser: 'One person, a shelf of free tools, and a plain account of what you can and cannot expect from him.',
    paragraphs: [
      `Let me set expectations, kindly but clearly, because unset expectations are how a free hobby turns into a resented obligation.`,
      `I will answer a good bug report. A good bug report says what you ran, what you expected, and what happened instead, and if you give me those three things I will usually find the problem inside a day because you have done the hard part for me.`,
      `I will not support software I did not write. If you got a tool somewhere else and it broke, I am sorry, but I cannot debug a stranger's code from a description of its symptoms, and I would be lying to pretend otherwise.`,
      `I will not add features on request most of the time. Not because your idea is bad but because every feature is a lifelong commitment to maintaining it, and a one-man shelf can only carry so many commitments before it collapses into the thing I built it to avoid. Small tools stay small or they stop being tools.`,
    ],
    footnote: `The Shelf. One person. Be the good bug report.`,
  },

  {
    slug: 'daemon-the-fix-i-am-proud-of',
    title: 'The Shelf: the fix I am quietly proud of',
    author: 'disk_daemon',
    hour: 23,
    layout: 'bbs',
    tag: 'changelog',
    updated: '30 Mar 1999',
    search: 'clever fix bug off by one memory pride programming',
    teaser: 'A programmer letting himself brag, once, about a bug that took two weeks and a bathtub to find.',
    paragraphs: [
      `Going to break my own rule and brag for one page, because I earned it and a man should get to enjoy a hard-won fix at least once before he goes back to being humble about it.`,
      `SPLIT 1.0 would occasionally corrupt the last byte of a file when it glued the pieces back together, but only on files whose length hit an exact multiple of the buffer size, which is why it passed every test I threw at it and then failed on somebody's tax return.`,
      `Two weeks I chased that. Added logging, took it out, added it back. The answer came to me in the bath, the way the good ones always do, hours after I had stopped looking. An off-by-one on the final read, so the last byte got written as zero instead of itself, on exactly and only the files that ended clean at a buffer boundary.`,
      `1.1 fixes it and I tested it against a file crafted to hit the exact boundary, which is the test I should have written the first time. The lesson, which I keep relearning, is that the bug always lives in the case you were too clever to check. Back to being humble tomorrow.`,
    ],
    footnote: `The Shelf. SPLIT 1.1. The bug lived in the case I skipped.`,
  },
];
