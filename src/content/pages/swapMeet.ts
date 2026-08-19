import type { AuthoredPage } from '../types';

/**
 * swap_meet, the classifieds guy. Always selling, always buying.
 *
 * Rule for these: drop the verbs, keep the item in caps. Every ad tries to
 * become a story he did not mean to tell, and then he catches himself and
 * cuts it off. The cut-off is the joke.
 */
export const SWAP_PAGES: AuthoredPage[] = [
  {
    slug: 'swap-listings',
    title: 'SWAP MEET: this week',
    author: 'swap_meet',
    hour: 12,
    layout: 'label',
    tag: 'classifieds',
    updated: '03 Mar 1999',
    search: 'classifieds for sale wanted trade swap meet listings',
    teaser: 'For sale, wanted, and one thing he will not explain. No lowballers. Said with feeling.',
    paragraphs: [
      `SWAP MEET. If it is not nailed down I have probably tried to sell it, and a few things that were nailed down I got a screwdriver for.`,
      `Rules. Cash or trade. No lowballers, and I mean that, a lowball offer on a fair price is an insult with a number attached and I remember every one of you.`,
      `Everything works unless the ad says otherwise. If the ad says "works" it works. If the ad says "worked" you are buying a project and a story, and the story is free.`,
    ],
    bullets: [
      `FOR SALE: 14.4 modem, works, 20 or best offer, upgrading dont ask to what`,
      `FOR SALE: box of floppies, some blank some not, the not ones are a mystery and thats a feature`,
      `WANTED: the manual for a printer I already own, long story, dont have the printer anymore either`,
      `TRADE: two joysticks for one that works, math checks out if you owned these joysticks`,
      `FOR SALE: a chair, its a chair, 5 bucks, the chair is fine i just have four chairs`,
    ],
    footnote: `SWAP MEET. No lowballers. I mean it.`,
    related: [{ label: 'What I moved this month', url: 'rn:n-swap-ledger' }],
  },

  {
    slug: 'swap-ledger',
    title: 'SWAP MEET: what moved this month',
    author: 'swap_meet',
    hour: 14,
    layout: 'manifest',
    tag: 'classifieds',
    updated: '31 Mar 1999',
    search: 'sold traded ledger month running total swap',
    teaser: 'A running tally of his deals, which reveals more about him than he intends.',
    paragraphs: [
      `Keeping a ledger this year because my wife said I was not actually making money, just moving objects around the valley, and I said I would prove her wrong, and the ledger is proving her right.`,
      `Format is what left, what came in, and whether I am ahead. Spoiler on the ahead column. It is not looking good and I am somehow fine with it.`,
    ],
    bullets: [
      `OUT: the 14.4 modem, 20 bucks, felt great`,
      `IN: a 28.8 modem, 45 bucks, needed it, so minus 25 and a lie to myself`,
      `OUT: one joystick, traded for two, genius`,
      `IN: had to buy a cable for the two joysticks, minus 8, less genius`,
      `NET FOR MARCH: down 31 dollars and up a lot of stuff, which my wife calls "down 31 dollars"`,
    ],
    footnote: `SWAP MEET. Ahead in objects, behind in dollars, exactly even in fun.`,
    quote: `moving objects around the valley`,
    related: [{ label: 'Back to the listings', url: 'rn:n-swap-listings' }],
  },

  {
    slug: 'swap-the-one-that-got-away',
    title: 'SWAP MEET: the one that got away',
    author: 'swap_meet',
    hour: 15,
    layout: 'card',
    tag: 'classifieds',
    updated: '18 Feb 1999',
    search: 'regret sold too cheap collectible swap meet story',
    teaser: 'Every trader has one. He sold his for eight dollars and thinks about it daily.',
    paragraphs: [
      `Every guy who buys and sells has a ghost, a thing he let go too cheap, and mine is a portable I sold for eight dollars in a hurry two summers back.`,
      `Eight dollars. It ran, the screen was clean, it had the little carry handle and everything, and a fellow offered me a ten and I said eight because I was tired and wanted the space and did not want to seem greedy in front of my own garage.`,
      `I have since learned what those go for to the right person and I am not going to type the number because typing it makes the eight dollars real again and I have a day to get through.`,
      `The lesson is one I give free to every new trader and follow myself exactly never. When you feel the itch to just be rid of a thing, that itch is the enemy, and the enemy is patient, and the enemy got my portable for eight dollars.`,
    ],
    footnote: `SWAP MEET. Eight dollars. Do not ask me the model.`,
  },

  {
    slug: 'swap-buyer-types',
    title: 'SWAP MEET: a field guide to buyers',
    author: 'swap_meet',
    hour: 16,
    layout: 'report',
    tag: 'classifieds',
    updated: '09 Mar 1999',
    search: 'buyer types lowballer tire kicker swap meet guide',
    teaser: 'Years of deals distilled into a taxonomy of the people who show up.',
    paragraphs: [
      `After enough deals you stop seeing objects and start seeing people, and the people who answer a classified ad come in a small number of well-worn types, so here is the field guide, offered as a public service.`,
      `The Lowballer opens at half and calls it "just being smart." He is not being smart. He is telling you that he thinks your time is worth less than the forty percent he is trying to save, and you may price accordingly or price him out the door.`,
      `The Tire Kicker has no intention of buying anything ever. He wants to hold the item, ask its history, and leave. He is lonely and I have made peace with him, because half of this hobby is lonely men holding objects and asking their history, and I am one of them.`,
      `The Real One knows what the thing is worth, offers close to it, and pays when he says he will. You get maybe one in five and you treat that one like weather, which is to say you enjoy him while he lasts and you do not expect him to come again soon.`,
    ],
    footnote: `SWAP MEET. Price the lowballer out, forgive the kicker, keep the real one.`,
  },

  {
    slug: 'swap-the-mystery-box',
    title: 'SWAP MEET: the box I cannot price',
    author: 'swap_meet',
    hour: 22,
    layout: 'label',
    tag: 'classifieds',
    updated: '20 Mar 1999',
    search: 'unlabeled box tapes wanted swap meet strange recordings',
    teaser: 'A box came to him in a trade with tapes in it that nobody will identify. He posts it as wanted, in reverse.',
    paragraphs: [
      `Got a box in a trade last month, the kind you take sight unseen because the rest of the deal was good, and this box is the reason I now open boxes before I agree to anything.`,
      `Inside are a dozen cassette tapes, hand labelled with just times. Not dates, not names, times, like 02:14 and 03:03, written small in pencil. I played one. It is not music and it is not somebody talking. It is a tone, and then a run of clicks, and then nothing, and then it starts again.`,
      `I am posting this in reverse, as a wanted ad for information instead of a for-sale for the box, because I genuinely do not know what I have or what it is worth and I am not too proud to ask the net.`,
      `Somebody on the boards is always going on about a signal he records at night, timed to the second, and the times penciled on these tapes are that kind of time. I do not believe in much but I believe in a coincidence being worth a look. If that is your thing, the times on the tapes are yours to have. No charge. Just tell me what they are.`,
    ],
    footnote: `SWAP MEET. Twelve tapes, labelled with times. Tell me what I have.`,
    clue: 'tapes',
    arc: 'signal',
    related: [{ label: 'The signal guy', url: 'rn:n-carrier-log1' }],
  },

  {
    slug: 'swap-etiquette',
    title: 'SWAP MEET: how to not be a pain',
    author: 'swap_meet',
    hour: 13,
    layout: 'bbs',
    tag: 'classifieds',
    updated: '25 Feb 1999',
    search: 'trading etiquette manners classified ads rules swap',
    teaser: 'The unwritten rules of the classifieds, written down, in the hope that one person reads them.',
    paragraphs: [
      `The classifieds run on manners more than money, and since nobody teaches the manners, they get relearned the hard way once a week by somebody new, so here they are in writing.`,
      `If you say you will show up, show up, or send one line saying you cannot. A no-show without a word is the cardinal sin, because I turned down two other people to hold the thing for you, and now it is dark and I have a chair nobody bought.`,
      `Do not haggle a price you already agreed to. We shook, in words, over the net, and the shake counts even if no hands were involved. Reopening a settled price at pickup is how you become a story other traders tell, and not a flattering one.`,
      `And if a deal goes well, say so somewhere public. A good word in the guestbook is the only currency this hobby mints, and it spends better than the cash, because the cash is gone by Friday and the good word is still up next year.`,
    ],
    footnote: `SWAP MEET. Show up, honour the shake, say thanks in public.`,
  },

  {
    slug: 'swap-parts-drawer',
    title: 'SWAP MEET: the drawer of last resort',
    author: 'swap_meet',
    hour: 17,
    layout: 'manifest',
    tag: 'classifieds',
    updated: '12 Mar 1999',
    search: 'spare parts drawer cables adapters free swap meet',
    teaser: 'The drawer every household has, itemized and offered free to whoever needs one weird cable.',
    paragraphs: [
      `Everybody has the drawer. The one with the cables you kept because throwing away a cable feels like throwing away money even though you will never use this cable, this specific cable, as long as you live.`,
      `I have decided to make my drawer a public utility. If you need one weird adapter, one obsolete plug, one cable with the wrong end on both sides, check my list before you buy new, because I promise you I have it and I promise you I will never use it.`,
      `Free. All of it. The catch, and there is always a catch, is you take what you come for and nothing else, because a drawer that empties randomly is chaos and a drawer that empties on request is a service.`,
    ],
    bullets: [
      `serial cables, four of them, at least one works, thats the game`,
      `power bricks, unlabeled, voltage is a surprise, bring a meter`,
      `one keyboard cable for a keyboard that does not exist anymore, its yours, godspeed`,
      `adapters, a bag of them, i have never once found the one i needed in here in an emergency`,
    ],
    footnote: `SWAP MEET. The drawer is open. Take what you came for.`,
  },
];
