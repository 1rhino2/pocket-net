import type { AuthoredPage } from '../types';

/**
 * Drift: the odd corners of the net.
 *
 * This replaces 56 generated pages that all carried the same four sentences,
 * one of which claimed they were "hand-filed, not assembled from adjective
 * buckets at runtime". They were assembled from adjective buckets at runtime.
 *
 * These are the pages a real net is full of and a designed one never includes:
 * stubs, dead ends, a page that is only a caption, and one that is broken.
 */
export const DRIFT_AUTHORED: AuthoredPage[] = [
  {
    slug: 'drift-under-construction',
    title: 'UNDER CONSTRUCTION',
    author: 'anon',
    hour: 19,
    layout: 'drift',
    tag: 'stub',
    updated: '14 Dec 1998',
    search: 'under construction coming soon placeholder',
    teaser: 'A page announcing that a page is coming. It has been coming since December.',
    paragraphs: [
      `THIS PAGE IS UNDER CONSTRUCTION! Please check back soon for photos, links, and more about me and my family.`,
      `I am still learning HTML so please be patient with the layout. My son set this up for me and he is at college now so it is going slower than I thought.`,
      `Thank you for visiting and please come back soon.`,
      `[animated shovel graphic, 3.4 KB, does not load]`,
    ],
    footnote: `Last modified 14 Dec 1998. Nothing has been added since.`,
    drift: true,
  },

  {
    slug: 'drift-not-found',
    title: 'Not Found',
    author: 'pvo_operations',
    hour: 6,
    layout: 'drift',
    tag: 'error',
    updated: '11 Mar 1999',
    search: 'not found error page missing address',
    teaser: 'The standard error page. Six webring stops end here.',
    paragraphs: [
      `The requested address was not found on this server. Please check the address and try again.`,
      `If you reached this page from a link on another page, the link may be out of date. The page owner should be advised.`,
      `If this is your own address and you believe it should be here, please contact support during business hours. Support cannot restore pages by electronic mail.`,
      `Petersham Valley Online. Error 404.`,
    ],
    footnote: `This page is served for any address that does not resolve. It does not mean the page never existed.`,
    drift: true,
  },

  {
    slug: 'drift-caption',
    title: 'lighthouse (34 of 61)',
    author: 'anon',
    hour: 20,
    layout: 'drift',
    tag: 'photo',
    updated: '08 Feb 1999',
    search: 'lighthouse photo caption gallery slow loading',
    teaser: 'One photograph and one line under it. There were sixty one of these.',
    paragraphs: [
      `[photograph, 148 KB, approximately 90 seconds at 14.4]`,
      `Number 34. Taken in November from the road, because the path was closed and I was not going to be the person who climbed the fence for a photograph.`,
      `Automated 1972. My grandfather worked this one for eleven years before that, which is the reason there are sixty one of these pages and not one.`,
      `Previous | Index | Next`,
    ],
    footnote: `Page 34 of 61. Sorry about the load time. I did try making them smaller and they looked like nothing.`,
    drift: true,
  },

  {
    slug: 'drift-broken',
    title: 'my page',
    author: 'anon',
    hour: 21,
    layout: 'drift',
    tag: 'broken',
    updated: '02 Jan 1999',
    search: 'broken page tags visible unclosed html',
    teaser: 'Somebody pasted their text into the editor with the tags showing and never came back to fix it.',
    paragraphs: [
      `<CENTER><FONT SIZE=+2>Welcome to my page</FONT>`,
      `<P>This is where I am going to put my stuff. I have a lot of stuff to put here. </P` ,
      `<TABLE BORDER=1><TR><TD>links</TD><TD>about me</TD><TD>my cat`,
      `Everything below this point renders inside a table cell that was never closed, which is why the rest of the page is in a box and the box has no bottom.`,
      `<!-- todd if you are reading this i cant work out why the box does nt close, i have been at this for two hours -->`,
    ],
    footnote: `Last modified 02 Jan 1999 03:41.`,
    drift: true,
  },

  {
    slug: 'drift-guestbook-stub',
    title: 'Sign my guestbook',
    author: 'anon',
    hour: 17,
    layout: 'drift',
    tag: 'guestbook',
    updated: '19 Aug 1998',
    search: 'guestbook empty no entries sign',
    teaser: 'A guestbook with the form still working and nothing in it.',
    paragraphs: [
      `Please sign my guestbook! It only takes a second and it lets me know somebody came by.`,
      `NAME: [____________] EMAIL (optional): [____________]`,
      `MESSAGE: [________________________________]`,
      `[ SIGN ]  [ CLEAR ]`,
      `There are currently 0 entries. Be the first!`,
    ],
    footnote: `Guestbook installed 19 Aug 1998. Still 0 entries.`,
    drift: true,
  },

  {
    slug: 'drift-away-message',
    title: 'away',
    author: 'anon',
    hour: 1,
    layout: 'drift',
    tag: 'note',
    updated: '23 Mar 1999',
    search: 'away message back later note short',
    teaser: 'Four words, left up for years.',
    paragraphs: [
      `away for a bit. back when i am back.`,
      `if you need me the number is the same and it has always been the same.`,
      `do not sign the guestbook asking where i went, sign it saying something else, i would rather read that.`,
    ],
    footnote: `posted 23 Mar 1999. still up.`,
    drift: true,
  },
];
