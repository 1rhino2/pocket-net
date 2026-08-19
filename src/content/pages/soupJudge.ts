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
];
