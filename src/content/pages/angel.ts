import type { AuthoredPage } from '../types';

/**
 * xerox_angel's working pages, the ones that are not about the night.
 *
 * She has to exist as somebody with a hobby before the hobby turns into the
 * thing that ends her account, or the ending is just a plot. These are dull on
 * purpose: run times, what broke, what she decided not to keep.
 */
export const ANGEL_PAGES: AuthoredPage[] = [
  {
    slug: 'angel-what-i-do-not-keep',
    title: 'What I do not keep, and why',
    author: 'xerox_angel',
    hour: 21,
    layout: 'card',
    tag: 'archive',
    updated: '08 Nov 1998',
    search: 'not kept exclusions mail bodies privacy archive',
    teaser: 'The list of things she deliberately leaves out, which she considers the more important list.',
    paragraphs: [
      `Everybody asks what is in the archive. Almost nobody asks what is not, and I have come to think that is the more revealing list, so here it is.`,
      `I do not keep the bodies of mail. Headers only, and only so that a thread can be reassembled if somebody loses one. If you have written something to somebody on this net then that is between the two of you and a person with a hobby has no business being the third one in the room.`,
      `I do not keep anything a subscriber has asked me not to keep. Nine people have asked in two years. Nine people got it, same day, no questions, and I did not ask why and I am not going to.`,
      `I do not keep pages that were clearly put up by mistake. If something appears at four in the morning with somebody's home address in it and comes down before lunch, then it came down before lunch. The copy is meant to protect people from losing things, not to make it impossible to change your mind.`,
      `That last one is a judgement call and I get it wrong sometimes. There is no rule I can write that covers it. What I can tell you is which way I lean when I am not sure, and it is always towards the person, not the record.`,
      `I know an archive that makes exceptions is a worse archive. I have decided I would rather have a worse archive.`,
      `- c.`,
    ],
    quote: `An archive that makes exceptions is a worse archive. I would rather have a worse archive.`,
    footnote: `Exclusion requests: write to me. There is no form and there is not going to be one.`,
  },

  {
    slug: 'angel-the-run',
    title: 'How the run actually works',
    author: 'xerox_angel',
    hour: 1,
    layout: 'report',
    tag: 'archive',
    updated: '19 Feb 1999',
    search: 'nightly run how it works ordering forty minutes',
    teaser: 'Forty one minutes at one in the morning, and the February change that made it stop taking two hours.',
    paragraphs: [
      `Somebody asked me to write down how the run works, on the theory that if I am hit by a bus somebody else could keep it going. I have thought about that sentence a lot since and here is the page.`,
      `It starts at 01:00 because that is when the net is emptiest, and it takes about forty minutes now. It used to take just over two hours, and the difference is not a faster machine, it is that in February I changed the order.`,
      `It used to go alphabetically, which is the obvious way and the wrong one. Alphabetically means you walk the whole net every night including the four thousand pages that have not changed since 1997. Now it checks the modified date first and only copies what moved, and on a normal night about ninety pages move.`,
      `Two hours to forty one minutes, and I felt clever for a day and then slightly stupid, because that is the first thing anybody who does this professionally would have done and it took me sixteen months to think of it.`,
      `If you are reading this because you are the person keeping it going now: the ordering is the whole trick, everything else is patience. Start at one, check dates, copy what moved, write the index last so that the date at the top of the index is true.`,
      `Write the index last. That is the only part I would call advice.`,
      `- c.`,
    ],
    bullets: [
      `Starts 01:00. Typical duration 41 minutes.`,
      `Pages walked nightly: ~5,100. Pages actually copied: ~90.`,
      `Index written last, always, so its timestamp means something.`,
      `Failure mode so far: two, both power, both recovered by running it again at 04:00.`,
    ],
    footnote: `Written up 19 Feb 1999 because somebody said the words hit by a bus and I could not un-hear them.`,
    clue: 'pocket',
  },

  {
    slug: 'angel-the-recipes',
    title: 'The thing that started it',
    author: 'xerox_angel',
    hour: 20,
    layout: 'card',
    tag: 'archive',
    updated: '11 Oct 1998',
    search: 'why started recipes lost four years routine change',
    teaser: 'A year to the day after the page that made her start. Still no copy of it.',
    paragraphs: [
      `A year ago today, so I am allowed to be sentimental about it for one page and then I will go back to writing about run times.`,
      `In the autumn of 1997 a subscriber lost a recipe collection. Four years of it, her mother's handwriting typed up over four years, and it went during what I was told was a routine change. I asked what routine meant. I did not get an answer that I could repeat back to her, because there was not one, because nobody had thought it was the kind of thing that would need explaining afterwards.`,
      `I sat with her at the sign-up desk while she worked out that it was actually gone. It took about ten minutes for her to get there, and she kept asking the same question in slightly different words, and every version of it had the same real question underneath: is there a copy anywhere. And there was not. Not with them, not with her, not anywhere.`,
      `I do not think anybody did anything wrong that day. That is what has stayed with me. There was no villain in it, just a system that had never been asked to keep anything and so had not.`,
      `I started copying pages that week. Not because I thought I was the right person to do it, I obviously was not, but because the alternative was that nobody was doing it and I already knew exactly what that looked like.`,
      `I still do not have her recipes. That is the one gap I would trade the rest of it for.`,
      `- c.`,
    ],
    footnote: `Index started 11 Oct 1997. This page written 11 Oct 1998.`,
  },

  {
    slug: 'angel-borrowed-space',
    title: 'On borrowed space',
    author: 'xerox_angel',
    hour: 0,
    layout: 'card',
    tag: 'archive',
    updated: '01 Mar 1999',
    search: 'borrowed equipment rack space permission asking',
    teaser: 'Ten days before the night, she writes down exactly what is wrong with the arrangement.',
    paragraphs: [
      `I want to put something on the record before somebody else puts it on the record for me, which is a sentence I have been avoiding writing for about four months.`,
      `The copy lives on equipment that is not mine. A person who works at the exchange gave me the middle bank of a rack in 1997 and told me not to make it his problem. I have not made it his problem. Nobody has ever asked me about it and I have never volunteered it, and I have been calling that an arrangement.`,
      `It is not an arrangement. An arrangement is a thing two parties agree to. What this is, is one person doing a favour and one person being very careful not to create a moment where anybody has to decide about it.`,
      `I have told myself for two years that not being told to stop is the same as being allowed. It is not, and the tell is that I have never once put it in writing until right now, and I know exactly why, and it is not a flattering reason.`,
      `So I am going to write to them properly and offer the whole thing over, equipment and all, and ask them to run it. They should have been running it since 1997. If they say no then at least it will be a no with a date on it instead of this.`,
      `I would rather be told no than keep being not told anything. I think. Ask me in a month.`,
      `- c.`,
    ],
    quote: `Not being told to stop is not the same as being allowed.`,
    clue: 'pocket',
    footnote: `01 Mar 1999. The letter is drafted. It has been drafted since November.`,
    related: [{ label: 'The last entry', url: 'rn:n-angel-last-page' }],
  },

  {
    slug: 'pvo-acceptable-use',
    title: 'Subscriber agreement: acceptable use',
    author: 'pvo_operations',
    hour: 18,
    layout: 'report',
    tag: 'policy',
    updated: '01 Jan 1999',
    search: 'acceptable use policy subscriber agreement terms',
    teaser: 'Nine clauses. Clause 7 is about equipment, and it is the one that mattered.',
    paragraphs: [
      `This agreement governs use of the service and of the subscriber net. Continued use of the service constitutes acceptance. This document supersedes all previous versions.`,
      `Subscribers are reminded that the subscriber net is provided as a courtesy and does not form part of the metered service. No undertaking is given as to the availability or retention of subscriber-authored material.`,
      `The company reserves the right to amend this agreement without individual notice. Amendments take effect on publication.`,
    ],
    bullets: [
      `1. One account per household. Sharing of credentials is not permitted.`,
      `2. Automated dialling is not permitted.`,
      `3. Commercial use requires a business account.`,
      `4. Material must not breach any applicable law.`,
      `5. The company does not monitor subscriber pages and accepts no responsibility for their content.`,
      `6. Subscribers are responsible for retaining their own copies of material they wish to keep.`,
      `7. Equipment at company premises may be used only by authorised personnel and only for company purposes.`,
      `8. Accounts may be suspended without notice where clause 7 is engaged.`,
      `9. No undertaking is given as to backup, retention, or restoration of subscriber material.`,
    ],
    footnote: `Version 4.1, effective 01 Jan 1999. Clauses 6 and 9 were added in this version.`,
    clue: 'memo',
  },
];
