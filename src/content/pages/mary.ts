import type { AuthoredPage } from '../types';

/**
 * modem_mary, console 2, 22:00 to 06:00.
 *
 * Rule for these: the timestamp carries the sentence. If a line reads fine
 * without the clock in front of it, it belongs to somebody else.
 */
export const MARY_PAGES: AuthoredPage[] = [
  {
    slug: 'mary-console2',
    title: 'Console 2',
    author: 'modem_mary',
    hour: 0,
    layout: 'blotter',
    tag: 'homepage',
    updated: '06 Feb 1999',
    search: 'console two night desk operator hours',
    teaser: 'Four nights a week since 1996. The page is mostly a list of things not to do to the equipment.',
    paragraphs: [
      `Console 2. Nights. Tuesday through Friday, 22:00 to 06:00, since October 1996.`,
      `This page exists because people kept asking me the same four questions in the guestbook and I would rather answer them once.`,
      `No, I cannot see what you are doing. I can see that you are on and I can see the port you came in on. That is the entire list.`,
      `No, I cannot put your page back. Different department and a different floor and, as of this year, a different company that we pay.`,
      `Yes, the line is answered all night. It is answered by me. If it rings more than six times I am in the room with the loud equipment and I will get there.`,
      `The logs are the interesting part of this page and they are one directory up. I write them for whoever has the console after me, so they read like notes, because they are notes.`,
    ],
    footnote: `Console 2. If the page looks broken it is not the page.`,
    related: [{ label: 'Logs', url: 'rn:n-mary-quiet-week' }],
  },

  {
    slug: 'mary-quiet-week',
    title: 'Console 2: a quiet week, for once',
    author: 'modem_mary',
    hour: 1,
    layout: 'blotter',
    tag: 'shift log',
    updated: '19 Feb 1999',
    search: 'quiet night logs nothing happened february',
    teaser: 'Nothing happened for five nights running, which she finds suspicious and says so.',
    paragraphs: [
      `22:00. On. Everything up. Suspicious.`,
      `23:40. Still everything up. I have now checked the same four things twice, which means I am the fault condition.`,
      `01:15. A subscriber rang to ask whether the internet was closed on Sundays. Told him no. He said thank you and hung up before I could ask.`,
      `02:00. Third night this week with no resets. The last time we had three in a row was August and then the air handler died, so I am not celebrating.`,
      `03:30. Read the manual for the new ring group because there is nothing else to do. Whoever wrote it has never sat at a console. Page 40 tells you to observe the indicator lamp. There is no lamp. There has never been a lamp.`,
      `05:00. Wrote a note to myself to ask about the lamp. Will not ask about the lamp.`,
      `06:00. Off. Five nights, no faults. Put that somewhere it can be found later, because the only use of a quiet week is proving what normal looked like before something stops being normal.`,
    ],
    footnote: `Console 2.`,
  },

  {
    slug: 'mary-air-handler',
    title: 'Console 2: the August thing, since people keep asking',
    author: 'modem_mary',
    hour: 5,
    layout: 'blotter',
    tag: 'shift log',
    updated: '12 Jan 1999',
    search: 'august outage air handler heat night',
    teaser: 'The one everybody remembers. Written down properly because the version going around is wrong.',
    paragraphs: [
      `Since this keeps coming up in the boards with details that are not true, here is what happened in August, from the console, at the time.`,
      `23:50. Room warm. Not hot. Warm enough that I noticed it through the door, which is the part that matters, because you notice that before any instrument does.`,
      `00:30. Warmer. Rang the building number. Building number rings a desk that is not staffed at night, which I did not know until 00:30 that night and which is now the first thing I tell anybody.`,
      `01:10. Started shutting things down myself in the order I thought would hurt least. I got that order wrong in one place and I have never been shy about which place, it was the mail spool, and mail was the thing that took longest to come back.`,
      `01:55. Air handler confirmed dead by a man who drove in from two towns over in a pickup and had it running by 04:00 with a part he had in the truck.`,
      `Three things came out of that night. The building number now rings a pager. There is a thermometer on the wall that I can see from the chair. And when a fault is real, you get the part number, you get the cause, and it goes in the log where the next person can find it. That is what a fault looks like when it is a fault.`,
    ],
    quote: `you notice heat through a door before any instrument does`,
    footnote: `Console 2. Filed Jan 1999, from the notebook, because the board version had me asleep for it.`,
  },

  {
    slug: 'mary-handover',
    title: 'Console 2: handover notes for whoever is next',
    author: 'modem_mary',
    hour: 6,
    layout: 'card',
    tag: 'shift log',
    updated: '30 Apr 1999',
    search: 'handover notes next operator advice console',
    teaser: 'Written on her last week. Practical, and then not.',
    paragraphs: [
      `Handing over. Six in the morning and I have about twenty minutes before I stop being the person who knows this, so here is the list.`,
      `The B side of the ring group drops one call in forty and has since February. It is not the modems. I swapped them. Log it every time even though nothing happens, because the count is the only argument you will ever have.`,
      `The chair goes down on its own. There is a pin. The pin is in the drawer under the manual nobody has opened.`,
      `Rack 4 was replaced in March. The new one is fine. If anybody tells you what was wrong with the old one, write it down and tell me, because I asked for six weeks and never got an answer and I would still like one.`,
      `If somebody from the office comes through at three in the morning with a cart, that is not normal, no matter how normal they act about it. Nights has a rhythm. You will know the rhythm inside a month. Trust it over anyone telling you it is nothing.`,
      `Coffee is in the cupboard, not the machine. The machine coffee is a punishment. Good luck.`,
    ],
    footnote: `Console 2, 1996 to 1999. Last shift 30 Apr 1999.`,
    related: [{ label: 'The March logs', url: 'rn:n-mary-0314' }],
  },
];
