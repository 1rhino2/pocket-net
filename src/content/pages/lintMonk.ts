import type { AuthoredPage } from '../types';

/**
 * lint_monk. Numbered items, original text quoted before the correction.
 *
 * Rule for these: he never speculates, and when he wants to he says out loud
 * that he is not going to. That refusal is the character.
 */
export const MONK_PAGES: AuthoredPage[] = [
  {
    slug: 'monk-corrections',
    title: 'The corrections desk',
    author: 'lint_monk',
    hour: 21,
    layout: 'card',
    tag: 'corrections',
    updated: '01 May 1999',
    search: 'corrections desk policy how it works notices',
    teaser: 'What he does, why he sends it to you first, and the one correction he got wrong.',
    paragraphs: [
      `This is the index of correction notices. There are fifty three. People find that number funny and I have decided to let them.`,
      `How this works. When I find an error I write to the author first and I wait a week. If it is corrected, I publish nothing, and roughly two thirds of them end there, which is the part nobody sees and which is why the boards think I am worse than I am.`,
      `What I correct: dates, figures, quotations, and any page that has been edited without a note saying it was edited. What I do not correct: opinions, spelling, or the way a person writes. A page can be badly written and entirely accurate and that page is none of my business.`,
      `I keep copies of pages before and after. All of them, not only the ones I end up publishing. This has been described to me as excessive. It was excessive right up until the day it was not, and I would rather be excessive on a lot of days than correct on one.`,
      `Notice 12 was wrong. I corrected a subscriber on a date and I had used the wrong year on my own copy. She was right and I was not. The notice is still up with the error preserved and the correction published above it, which is the same treatment I ask of everybody else, and it would be worth nothing at all if I exempted myself from it.`,
      `If I have corrected you and you think I am wrong, write and say so. I have been wrong once in fifty three and I do not think the true number is once.`,
    ],
    quote: `The original text is the point. Everything after it is commentary. - notice 1`,
    footnote: `53 notices. Copies of all cited pages held, before and after, available on request.`,
    related: [
      { label: 'Notice 44', url: 'rn:n-monk-status-wording' },
      { label: 'Notice 51', url: 'rn:n-monk-hollow-summary' },
    ],
  },

  {
    slug: 'monk-notice-12',
    title: 'Correction notice 12: in which I am the error',
    author: 'lint_monk',
    hour: 20,
    layout: 'card',
    tag: 'corrections',
    updated: '14 Sep 1998',
    search: 'notice twelve wrong correction apology year',
    teaser: 'Left up on purpose, with his own mistake preserved underneath the correction to it.',
    paragraphs: [
      `CORRECTION TO THIS NOTICE, published 21 Sep 1998, above the original as is the practice.`,
      `Item 1. The subscriber was correct. The lighthouse at Race Point was automated in 1972, not 1978. My source was a copy I made in 1997 of a page that has since been fixed, and I had been citing my own stale copy against the corrected original, which is precisely the failure this desk exists to catch.`,
      `Item 2. I have written to her and she has been gracious about it in a way I would like to record, since I published her error to the whole net and she replied in two sentences with no edge on either of them.`,
      `Item 3. I am leaving the original notice below rather than removing it. A corrections desk that deletes its own errors is an advertisement, not a record.`,
      `ORIGINAL NOTICE, published 14 Sep 1998, retained: "Item 1. The page states that the light was automated in 1978. The correct year is 1972. Source: my copy of the commonwealth register, retrieved 1997."`,
    ],
    footnote: `Retained with the error intact. Do not write to ask me to take it down, four people have.`,
  },

  {
    slug: 'monk-notice-31',
    title: 'Correction notice 31: the webring member count',
    author: 'lint_monk',
    hour: 10,
    layout: 'card',
    tag: 'corrections',
    updated: '04 Jan 1999',
    search: 'webring count nineteen members correction footer',
    teaser: 'A footer that has said nineteen sites since it said twelve, corrected in the least interesting way possible.',
    paragraphs: [
      `This is a small one and I am publishing it only because the administrator asked me to, which is a first.`,
      `Item 1. The ring footer states nineteen member sites. At the time of writing there are twenty two. The footer has been out of date since November and was last accurate when the count was twelve.`,
      `Item 2. The administrator's position, which I record in his words because I could not improve on them, is that he updates the number when somebody notices, and that somebody noticing is the only part of the process that has ever worked.`,
      `Item 3. I have offered to check it monthly. This offer was described as the most predictable thing that has ever happened on this net.`,
      `Item 4. No further action. The footer now says twenty two. It will be wrong again by March and I have made my peace with that in a way I am frankly not used to.`,
    ],
    footnote: `Source: manual count of the ring, 03 Jan 1999, walked twice in both directions.`,
    related: [{ label: 'The ring', url: 'rn:n-legend-webring' }],
  },

  {
    slug: 'monk-why-i-keep-copies',
    title: 'Why I keep copies, since I am asked about once a month',
    author: 'lint_monk',
    hour: 19,
    layout: 'card',
    tag: 'corrections',
    updated: '12 May 1999',
    search: 'why keep copies archive habit pages change',
    teaser: 'The answer is a page about a lighthouse, and a year he could not prove.',
    paragraphs: [
      `I am asked this about once a month, usually in a tone suggesting the asker has already decided, so here it is in one place.`,
      `In 1997 I corrected a subscriber on a date. She was right. I was working from a copy I had made of a page that had since been fixed, and I was citing my stale copy against the corrected original without knowing either of those things had happened.`,
      `What struck me was not that I was wrong. What struck me was that I could not tell. The page in front of me and the page in my drawer disagreed, and there was nothing on either of them, no note, no date, no version, that would let a careful person work out which came first.`,
      `So I keep copies with the date and time I took them. Not because the copy is the truth, it is not, it is just an earlier draft. Because two copies with dates on them let you see a change, and one copy with no date lets you see nothing at all.`,
      `People find the habit obsessive. I would only observe that in March a great many people wanted to know what a page had said the week before, and that the answer existed in exactly one place, and that place was a drawer belonging to somebody everyone had agreed was being excessive about it.`,
      `I take no satisfaction in that. I would genuinely rather have been the tiresome one about nothing.`,
    ],
    quote: `Two copies with dates let you see a change. One copy with no date lets you see nothing.`,
    footnote: `Notice 12 is the one about the lighthouse. It is still up and I am still wrong on it.`,
    related: [{ label: 'Notice 12', url: 'rn:n-monk-notice-12' }],
  },
];
