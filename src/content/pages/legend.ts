import type { AuthoredPage } from '../types';

/**
 * localhost_legend, fifteen.
 *
 * Rule for these: he is never joking on purpose. The moment he is being witty
 * about his own page it stops being a fifteen year old's page and starts being
 * an adult doing an impression of one.
 */
export const LEGEND_PAGES: AuthoredPage[] = [
  {
    slug: 'legend-home',
    title: "LOCALHOST LEGEND'S PAGE!!!",
    author: 'localhost_legend',
    hour: 19,
    layout: 'card',
    tag: 'homepage',
    updated: '11 May 1999',
    search: 'personal homepage hit counter under construction',
    teaser: 'Best viewed at 800x600. The counter is the point and he will tell you the number twice.',
    paragraphs: [
      `WELCOME TO MY PAGE!!! this page is Under Construction but most of it works so please look around and dont mind the parts that are broken they are on purpose mostly.`,
      `my name is not localhost legend obviously that is my handle. i am 15 and i live here and i got on the net in november when my dad got the second line put in which took FOUR MONTHS to happen because of the wiring in our house apparantly.`,
      `THE COUNTER. look at the counter at the bottom. it says 3,180. when i made this page in november it said 6 and four of those were me testing it. i have not touched it or reset it and i want that on the record because someone on the boards said everyones counter is faked and mine is NOT faked, it is a real counter and every one of those is a real person or possibly a person twice.`,
      `things on this page: my webring (i am in three), my links, my page about my dog, and the guestbook which has 31 signatures and i read all of them the same day they get put there.`,
      `i am learning how to do the thing where the text moves. i have almost got it. when i have got it this page is going to be UNBELIEVABLE so bookmark it and come back.`,
      `also thank you to whoever keeps signing the guestbook as "a friend", i do not know who you are but you have signed it nine times and it makes my day every time, whoever you are.`,
    ],
    footnote: `best viewed at 800x600. made in notepad. counter: 3180`,
    related: [
      { label: 'my webring', url: 'rn:n-legend-webring' },
      { label: 'my links page', url: 'rn:n-legend-links' },
    ],
  },

  {
    slug: 'legend-webring',
    title: 'THE NEW ENGLAND NET WEBRING',
    author: 'localhost_legend',
    hour: 20,
    layout: 'ticket',
    tag: 'webring',
    updated: '02 Mar 1999',
    search: 'webring ring next previous random member sites',
    teaser: 'Nineteen sites in the ring. Six of them stopped resolving in March and he has not taken them out.',
    paragraphs: [
      `THIS SITE IS A PROUD MEMBER OF THE NEW ENGLAND NET WEBRING! use the buttons to go to the next site or the previous site or a Random site which is my favorite one to press.`,
      `the ring has 19 sites in it. to join you have to email the ring master which is Todd, not me, i am just site number 12. you have to put the buttons at the bottom of your page and you have to actually update your page sometimes which is the rule people break.`,
      `so ok, 6 of the sites in the ring do not load anymore. they are all the h ones. if you press next and it does not go anywhere that is why, press it again and it skips to the one after.`,
      `i emailed Todd to ask if he was going to take them out of the ring and he said not yet. i asked why not yet and he said because taking them out is the part you cant undo. i thought that was a weird answer but i have thought about it a few times since and i think i get it now.`,
      `so they are staying in. if you press next and get nothing, that is somebodys page. it was there in february. i went to number 15 all the time, she had a whole thing about lighthouses with pictures of every single one in the state and it took nine minutes to load and it was worth it every time.`,
    ],
    bullets: [
      `12. LOCALHOST LEGENDS PAGE (this one!)`,
      `13. the tackle box, fishing spots, still up`,
      `14. DEB AND RONS PAGE, still up`,
      `15. lighthouses of the commonwealth, NOT LOADING since march`,
      `16. h-0142 recipes, NOT LOADING since march`,
      `17. Todds page (ring master), still up`,
    ],
    footnote: `[PREV] [NEXT] [RANDOM] [LIST ALL] - ring master is Todd not me, do not email me to join`,
  },

  {
    slug: 'legend-links',
    title: 'MY LINKS PAGE (COOL SITES)',
    author: 'localhost_legend',
    hour: 18,
    layout: 'label',
    tag: 'links',
    updated: '14 Apr 1999',
    search: 'links page cool sites recommendations',
    teaser: 'Sites he thinks you should see, annotated with the reason, which is usually a person rather than a site.',
    paragraphs: [
      `these are the good sites. i check all of them so if one is bad it is because it went bad recently and not because i put a bad one on here.`,
      `THE FOOD BOARD - it is about lunch. i am not even joking that is the whole board and it is the nicest place on the whole net. soup judge rated a vending machine and it was 6 paragraphs long. i have read it three times.`,
      `THE CORRECTIONS PAGE - this guy goes around telling everyone when they are wrong. i thought he was going to be mean but he is never mean he just really really cares about it. he corrected MY page once, i had a date wrong, and he sent it to me first before he put it up which he did not have to do.`,
      `CONSOLE 2 - the lady who runs the net at night writes down what happens. it is mostly nothing happening. i dont know why i like it so much but i check it more than anything else on here. she wrote once that you can hear when something is wrong before the computer knows and i think about that a LOT.`,
      `THE ARCHIVE - it is a page that keeps a copy of every other page. it stopped in march. i still have it on here because it is still a cool site, it is just a cool site that stopped, and taking it off is the part you cant undo (that is Todds line not mine but he is right).`,
    ],
    footnote: `if your site should be on here email me. i will probly say yes.`,
    related: [
      { label: 'the food board', url: 'rn:n-soup-board' },
      { label: 'console 2', url: 'rn:n-mary-console2' },
      { label: 'the archive', url: 'rn:n-angel-index' },
    ],
  },
];
