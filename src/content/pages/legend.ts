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

  {
    slug: 'legend-my-dog',
    title: 'MY DOG (HIS NAME IS BISCUIT)',
    author: 'localhost_legend',
    hour: 18,
    layout: 'card',
    tag: 'homepage',
    updated: '21 Feb 1999',
    search: 'dog page photos biscuit pet',
    teaser: 'Four photographs, three of which are the same photograph, and a very long paragraph about a tennis ball.',
    paragraphs: [
      `THIS IS MY DOG. his name is Biscuit and he is 7 which my mum says is 49 in dog years but i looked it up and thats not actually how it works for bigger dogs so he might be more like 55.`,
      `[photo of Biscuit, 82 KB] [photo of Biscuit, 79 KB] [photo of Biscuit, 81 KB, this is the same one i think, sorry] [photo of Biscuit in the snow, 94 KB, WORTH THE WAIT]`,
      `things Biscuit likes: the tennis ball, going in the car, the specific corner of the sofa that he is not allowed on, cheese, my dad (more than me which is fine and i am not bothered about it).`,
      `about the tennis ball. we have bought him nine tennis balls. he does not want the new ones. he wants THE tennis ball, which is grey now and has no fuzz on it at all and honestly smells quite bad, and if you throw a new one he will go and get it and bring it back and then drop it and go and find the old one and bring you that instead. every time. we have tried hiding the old one and he just sits by the cupboard.`,
      `i think that is actually kind of amazing when you think about it? like out of every ball in the house he knows exactly which one is his and none of the others count even though they are objectively better balls.`,
      `anyway thats my dog!!! sign the guestbook if you have a dog. or a cat. i am not going to be weird about it.`,
    ],
    footnote: `best viewed at 800x600. photos take a while sorry, my dad says i should make them smaller but then you cant see him properly.`,
  },

  {
    slug: 'legend-counter-broke',
    title: 'MY COUNTER BROKE!!!!',
    author: 'localhost_legend',
    hour: 20,
    layout: 'card',
    tag: 'homepage',
    updated: '09 Apr 1999',
    search: 'hit counter broke reset zero lost visitors',
    teaser: 'It went back to zero, and the thing that fixed it was not technical.',
    paragraphs: [
      `THE COUNTER WENT BACK TO ZERO. it said 3,214 on wednesday and today it says 4. FOUR. and three of those are me checking if it was still broken.`,
      `i emailed the counter people and they said the counter is a free counter and free counters do not have a garantee, which, fine, but i had that number for five months.`,
      `i know its just a number. my dad said its just a number. its just that it was the one bit of the page that was actually true? like i can say my page is good but the counter was the bit that wasnt me saying it.`,
      `ANYWAY. so i posted about it on the boards and Todd from the webring said something i keep thinking about which is that a counter counts visits but it doesnt count anybody twice, so the number was never really the people, it was just the visits, and the people are all still there.`,
      `and then eleven of you signed my guestbook in one day. ELEVEN. which is more signatures than i got in five months of having a counter that worked.`,
      `so the counter is at 4 and the guestbook is at 42 and honestly i think i came out ahead. still annoyed though!!!`,
    ],
    footnote: `counter: 4. guestbook: 42. i know which one i am telling people about.`,
    related: [{ label: 'my page', url: 'rn:n-legend-home' }],
  },

  {
    slug: 'legend-how-to-make-a-page',
    title: 'HOW TO MAKE A PAGE (BY ME)',
    author: 'localhost_legend',
    hour: 21,
    layout: 'card',
    tag: 'guide',
    updated: '30 Jun 1999',
    search: 'how to make a homepage html guide beginner',
    teaser: 'A tutorial written by somebody four months ahead of you, which he correctly identifies as the useful distance.',
    paragraphs: [
      `ok so three people have asked me how to make a page so i am writing it once and then just sending people here.`,
      `first thing. you do not need a program. i used notepad for everything on this site and notepad is already on your computer. the programs that make pages for you put loads of stuff in that you did not ask for and then you cant fix it when it goes wrong because you didnt write it.`,
      `second thing and this is the important one. VIEW SOURCE. if you see a page and you like how it looks, you can just LOOK at how they did it. its right there. thats not cheating, everybody does it, that is genuinely how i learnt every single thing i know.`,
      `third thing, close your tags. i had a box on my page for a month that had no bottom because i forgot one and i could not work out why. it was one character. it is always one character.`,
      `fourth thing, put a date on it. i did not do this for ages and now i cant remember what order i made anything in.`,
      `i am not good at this by the way!! i have been doing it for seven months. but i think that might actually make this more useful than asking someone whos been doing it for ten years, because i still remember what it was like when none of it made sense, and they dont.`,
    ],
    footnote: `if you make a page tell me and i will link it. that is how the webring got to 19.`,
  },
];
