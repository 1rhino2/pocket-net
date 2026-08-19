import type { AuthoredPage } from '../types';

/**
 * soup_judge. All lowercase, starts on one subject and lands on another.
 *
 * Rule for these: every post has to wander at least once, and the wander has
 * to be the good part. If the digression is filler then it is just a shorter
 * post with padding in it.
 */
export const SOUP_PAGES: AuthoredPage[] = [
  {
    slug: 'soup-board',
    title: 'the food board',
    author: 'soup_judge',
    hour: 13,
    layout: 'bbs',
    tag: 'food board',
    updated: '20 Apr 1999',
    search: 'food board rules recipes rating scale',
    teaser: 'Board rules, a rating scale he admits is broken, and one line about why he started it.',
    paragraphs: [
      `welcome to the food board. it is a board about food. i have been running it since jan 98 and there are 41 of us now which is more than i expected for a board about lunch.`,
      `rules. one, no flaming. two, if you post a recipe you post the amounts, i am tired of "some" flour. three, that is it, there is no rule three, i just think two rules looks unfinished.`,
      `about the ratings. yes the scale is broken. a 6 from me on soup is not a 6 from me on a sandwich because sandwiches are easier and i grade them harder. several people have asked me to fix this and i am not going to, the scale is broken in a consistent direction which is basically the same as working.`,
      `i started this because i was eating lunch at my desk every day reading the technical boards and everyone on there was so angry about modems. and i thought, these are the same people who at some point today are going to eat a sandwich, and nobody is angry about that, so where do they talk about it. nowhere. so here.`,
      `anyway post about lunch. that is the whole thing.`,
    ],
    footnote: `board started 06 jan 1998. 41 members. no rule three.`,
    related: [{ label: 'vending machine review', url: 'rn:n-soup-vending-restock' }],
  },

  {
    slug: 'soup-chowder',
    title: 'clam chowder, and my grandmother, and thermodynamics',
    author: 'soup_judge',
    hour: 17,
    layout: 'bbs',
    tag: 'recipe',
    updated: '03 Feb 1999',
    search: 'chowder recipe grandmother potato thickening',
    teaser: 'A recipe with the amounts, eventually, after a long detour through why the amounts do not matter.',
    paragraphs: [
      `ok chowder. rule two says amounts so amounts are at the bottom, but i want to explain the potato thing first because the potato thing is the only part that is actually hard.`,
      `my grandmother made chowder every friday for about fifty years and never measured anything and it was the same every single time. i watched her do it for a whole winter trying to work out the trick and the trick is that there is no trick, she was adjusting the entire time and she did not know she was doing it. she would look at it and add a bit. that is not a recipe, that is fifty years.`,
      `so what i can give you instead is the thing she was adjusting toward. the starch out of the potato is what thickens it. that is it. if you cut them small and let them go a bit past done, the edges give up and you get body without flour. if you cut them big and pull them on time you get a thin chowder with nice potatoes in it, which is a fine soup but it is not chowder and you should call it something else.`,
      `so the potato is not an ingredient, the potato is the thickener, and once you know that you stop following the recipe and start looking at the pot, which is the part that took me a winter.`,
      `salt pork not bacon. i will not be arguing about this, i will simply be right.`,
    ],
    bullets: [
      `salt pork, quarter pound, diced small`,
      `one onion, diced, cooked slow in the fat until it goes clear not brown`,
      `two pounds potato, three quarter inch, waxy not floury`,
      `two cups clam liquor plus water to cover`,
      `one quart whole milk, warmed, added off the heat`,
      `pepper. no thyme. she never used thyme and neither will you`,
    ],
    footnote: `9 out of 10 and i am the judge so that is final`,
  },

  {
    slug: 'soup-diner-fridays',
    title: 'the diner thing, fridays',
    author: 'soup_judge',
    hour: 12,
    layout: 'card',
    tag: 'food board',
    updated: '30 Apr 1999',
    search: 'diner fridays meetup board members',
    teaser: 'A standing invitation that got quieter over the spring, and one seat he keeps mentioning.',
    paragraphs: [
      `so the friday diner thing has been going since october and i want to keep it going even though it has gotten smaller.`,
      `it is the place on the corner with the sign where the second o is out. 6pm ish. no plan, no agenda, nobody has to talk about computers and honestly the nights where nobody does are the better ones.`,
      `it was eleven people in january. it was four last week. i am not going to pretend that is not partly the march thing, because a bunch of people got quite tired of each other over the march thing and that is what happens.`,
      `so here is my one piece of board moderating for the year. you do not have to agree about what happened to come and eat a burger on a friday. i have people at that table who think the company lied and people at that table who work for the company and both of them are right that the other one is being a bit much about it.`,
      `also i keep the end seat clear which some of you have noticed and asked about. no story. it is a good seat, it faces the door, and if the person i am keeping it for turns up she is going to want to see the door.`,
    ],
    footnote: `fridays, 6ish, the place with the broken sign. no rsvp, just come.`,
  },

  {
    slug: 'soup-thermos',
    title: 'the thermos review nobody asked for',
    author: 'soup_judge',
    hour: 7,
    layout: 'bbs',
    tag: 'food board',
    updated: '11 Jan 1999',
    search: 'thermos review flask soup lunch temperature',
    teaser: 'Eight out of ten for the flask, and a genuinely useful discovery about preheating it.',
    paragraphs: [
      `bought a new thermos in november and i have been testing it, which is a sentence that tells you everything about how my winter is going.`,
      `8 out of 10. loses about four degrees an hour which is fine, the lid does not leak which is the whole ballgame, and it fits in the side of the bag without doing the thing where it falls out when you pick the bag up by one strap.`,
      `here is the actual tip and it is the only reason i am posting. fill it with boiling water first, put the lid on, leave it while you do something else, then tip that out and put the soup in. the flask is cold when you start and it steals the heat out of the first cup. preheating it is the difference between hot soup at one o'clock and warm soup at half eleven.`,
      `i know. i know. my grandmother did this and i thought it was superstition for about twenty years and it turns out it is just thermodynamics with a scarf on.`,
      `anyway. warm soup at a desk is a bad lunch and hot soup at a desk is a good one and the entire gap between them is ninety seconds of boiling water you were going to boil anyway.`,
    ],
    footnote: `8/10. would have been a 9 but the cup doubles as the lid and i have opinions about that.`,
  },

  {
    slug: 'soup-someone-brought-food',
    title: 'somebody left a tin in the break room',
    author: 'soup_judge',
    hour: 11,
    layout: 'bbs',
    tag: 'food board',
    updated: '26 Mar 1999',
    search: 'break room tin shortbread anonymous kindness',
    teaser: 'A tin of shortbread with no note, in the week after March, and what the board decided to do about it.',
    paragraphs: [
      `there is a tin in the floor 2 break room. shortbread. homemade, definitely homemade, the edges are wrong in the way that means a person did it.`,
      `no note. nobody has claimed it. it has been there since monday and it is going down steadily which means everybody is doing the thing where you take one and feel slightly criminal about it.`,
      `normally i would let this go but it has been a rough couple of weeks in this building and somebody made shortbread and did not put their name on it, and i think that deserves more than being quietly eaten by eleven people who all think they are getting away with something.`,
      `so: the tin gets refilled. i will do next week. after that whoever wants it. no names on it, that is the rule, that is clearly the format the original person chose and who am i to change the format.`,
      `9 out of 10 by the way. slightly too much salt which i think was on purpose and if it was on purpose then it is a 10 and i want to know who you are so i can stop rating your baking in public.`,
    ],
    footnote: `tin is on the shelf by the kettle. it is not anybody's. that is the point of it.`,
  },

  {
    slug: 'soup-the-canteen-closed',
    title: 'they closed the canteen',
    author: 'soup_judge',
    hour: 14,
    layout: 'bbs',
    tag: 'food board',
    updated: '08 Jul 1999',
    search: 'canteen closed vending machines cost saving lunch',
    teaser: 'A cost saving that moved eleven people onto the vending machine he has been reviewing for a year.',
    paragraphs: [
      `so the canteen shuts at the end of the month. it was two women and a hot plate and it did a jacket potato for a pound sixty and now it is going to be two more vending machines.`,
      `i am not going to pretend this is a tragedy on the scale of things. it is a canteen. but i have been reviewing that vending machine on floor 2 for a year as a joke and it is about to stop being a joke, and i want that on the record before it happens rather than after.`,
      `the jacket potato was a 7. it was a consistent 7 for four years, which is harder than being a 9 once. margaret knew i took it without butter and stopped asking in about week three.`,
      `the machines are going where the counter is. so you will queue in the same spot, for worse food, at a higher price, and nobody will know your order. that is the actual change. the food is almost beside the point.`,
      `friday is still on. obviously friday is still on. arguably friday is now load bearing.`,
    ],
    footnote: `margaret if somebody prints this out for you: the potato was a 7 and i am aware i never said so out loud.`,
  },
];
