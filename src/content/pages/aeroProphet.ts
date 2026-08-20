import type { AuthoredPage } from '../types';

// aero_prophet, convinced computers are about to get glossy, watery, alive.
// rn:aero is his homepage, these are his node pages: the manifesto and mockups
// he can only describe bc the tools dont exist yet.
// rule: everything glows, breathes or ripples. promise a feeling not a feature.
// sincere past embarrassment, thats the whole point.
export const AERO_PAGES: AuthoredPage[] = [
  {
    slug: 'aero-manifesto',
    title: 'The Glass Age is coming and I have seen it',
    author: 'aero_prophet',
    hour: 15,
    layout: 'card',
    tag: 'manifesto',
    updated: '19 Feb 1999',
    search: 'future computers glass water aero manifesto vision glossy',
    teaser: 'A man five years early, describing an aesthetic that does not have a name yet, with total sincerity.',
    paragraphs: [
      `Everyone reading this is looking at gray boxes with sharp corners, and everyone reading this thinks that is what a computer looks like, and everyone reading this is wrong, and I am going to tell you what is actually coming.`,
      `It is water. It is glass. The screen of the near future does not sit there like a filing cabinet, it breathes, softly, a slow shine that moves when you move. Buttons will look wet. They will look like a drop of water you could touch and it would give a little. The whole machine will feel alive in a way that gray plastic has spent a decade training you not to expect.`,
      `Green, too. Fields of it, and blue sky, and a single bright bubble drifting up the corner of your screen for no reason except that it makes you feel good, and feeling good will finally be considered a feature instead of a frivolity. Nature and machine, and no seam between them.`,
      `I know how this sounds. I know I am the man on the corner with the sign. But I have felt this thing coming the way you feel weather change, and when it arrives, and it will, remember that somebody described the wet button and the drifting bubble in 1999 on a gray screen with sharp corners, and meant every word.`,
    ],
    quote: `buttons will look wet, and feeling good will finally count as a feature`,
    footnote: `Filed from the present, addressed to about five years from now. Visit rn:aero for the real thing.`,
    related: [{ label: 'The homepage from the future', url: 'rn:aero' }],
  },

  {
    slug: 'aero-mockups',
    title: 'Mockups I can only describe',
    author: 'aero_prophet',
    hour: 16,
    layout: 'report',
    tag: 'manifesto',
    updated: '03 Mar 1999',
    search: 'interface mockups future design glossy glass describe words',
    teaser: 'He cannot build the interface yet, so he writes it out, screen by imaginary screen.',
    paragraphs: [
      `I cannot build these. The tools do not exist, the machines cannot draw them, and so I am reduced to describing paintings I can see perfectly and cannot make, which is its own special torture. Here they are anyway, in words, because a described future is still ahead of a forgotten one.`,
      `Screen one. A window with no hard edge. Its border is a band of light, thick as a finger, slightly curved, as if the whole panel were carved from a block of clear glass and lit from inside. When you drag it, the light shifts, because light does that, and your interface should honour how light actually behaves.`,
      `Screen two. The background is not a colour. It is a photograph of a hillside so green it looks fake, under a sky so blue it looks fake, and it is not fake, it is just more than gray ever let itself be. Your icons float over it like they are resting on the surface of a pond.`,
      `Screen three, my favourite, the one I would trade a year to actually see. Nothing is happening. The machine is idle. And instead of a blank gray void, a single bubble rises slowly from the bottom of the screen, wobbles, and is gone, and the whole point of it is that it has no point, and that the future will finally be rich enough to spend a bubble on nothing but your comfort.`,
    ],
    footnote: `Described because I cannot yet draw. rn:aero is as close as I can get with these tools.`,
    related: [{ label: 'See how close I got', url: 'rn:aero' }],
  },

  {
    slug: 'aero-they-laughed',
    title: 'They laughed, which is how I know',
    author: 'aero_prophet',
    hour: 18,
    layout: 'card',
    tag: 'manifesto',
    updated: '17 Mar 1999',
    search: 'ridicule future vision laughed conviction glass age belief',
    teaser: 'Ridicule as confirmation, which is either wisdom or the exact opposite, and he cannot tell either.',
    paragraphs: [
      `I posted the manifesto on three boards and two of them laughed and one deleted it, and I want to be honest with you and with myself about what that did to me, because it did two opposite things at once.`,
      `The small mean part of me took the laughter as proof. Every prophet is laughed at, so being laughed at must mean I am a prophet, which is a comforting little machine for turning every rejection into a medal, and I know it is a trap, and I climb into it gladly some nights anyway.`,
      `The honest part of me knows that most people who are laughed at are simply wrong, and that the laughter of the crowd is right far more often than the man with the sign, and that I cannot actually tell from the inside which one I am. Nobody can. That is the real terror of believing something early.`,
      `So I have stopped trying to prove it and started just recording it, dating it, so that whichever way it falls the record is clean. If the glass age comes, this page was here first. If it does not, this page is an honest account of a man who felt weather that was not there. Either way it gets to be true, and that is the most I can promise.`,
    ],
    footnote: `Dated so it can be checked. That is all a vision can ask for.`,
  },

  {
    slug: 'aero-the-signal-is-the-future',
    title: 'The signal is the future knocking early',
    author: 'aero_prophet',
    hour: 3,
    layout: 'card',
    tag: 'manifesto',
    updated: '21 Mar 1999',
    search: 'signal future arriving early transmission aero belief connection',
    teaser: 'He hears about the night signal and folds it straight into his cosmology, which is what he does with everything.',
    paragraphs: [
      `Somebody on the boards records a signal at night, timed to the second, and cannot say what it is, and everyone treats it as a puzzle, and I want to offer the only reading of it that makes me happy, which is that it is the future knocking early.`,
      `Think about it the way I think about everything. A thing arrives before its time, regular as a heartbeat, carrying information nobody yet has the tools to read. That is not a mystery. That is exactly what the glass age will feel like from here, a message from a place we are heading toward, clicking in the dark, patient, waiting for us to build the machine that can hear it.`,
      `I am not saying it is aliens and I am not saying it is a broken relay, though the honest men say it is probably the second one. I am saying that I choose, deliberately, to hear it as tomorrow testing the line, because that reading costs me nothing and gives me something, and at some point you get to pick the story that lets you keep building.`,
      `The man who records it is more careful than me and I respect that. His log is at rn:n-carrier-log1 and you should read his account and not mine, because he counts and I only dream. But when he finally decodes it, and he will, I have a small private bet with myself about what it will turn out to say, and my bet is: soon.`,
    ],
    footnote: `A hopeful reading of somebody else's careful work. His is at rn:n-carrier-log1.`,
    clue: 'future',
    arc: 'signal',
    related: [{ label: 'The careful version', url: 'rn:n-carrier-log1' }],
  },

  {
    slug: 'aero-what-i-do-for-work',
    title: 'What I actually do all day',
    author: 'aero_prophet',
    hour: 14,
    layout: 'report',
    tag: 'notes',
    updated: '09 Mar 1999',
    search: 'day job insurance forms prophet ordinary life future',
    teaser: 'The prophet has a day job processing forms, and the gap between the two is the most human page he wrote.',
    paragraphs: [
      `You have read my manifesto and you probably picture me in a lab or a loft, and I want to correct that, because the truth is funnier and more honest and I have decided I am done hiding it.`,
      `I process insurance forms. All day, in a gray room, on a gray machine with sharp corners, exactly the kind of machine I spend my nights insisting is about to be replaced by something that breathes. The irony is not lost on me. The irony is my whole life.`,
      `There is a specific feeling, around the four hundredth form of the day, when the gray gets into you, and I think the manifesto is what I built to survive that feeling. If the future is glass and water and a bubble drifting up for no reason, then this gray room is temporary, and a temporary thing is bearable in a way a permanent thing is not.`,
      `So maybe the whole vision is just a man in a gray room who needed the room to be temporary. I have considered that. I have considered it at length, over many forms. And I have decided it does not make the vision wrong, only human, and I would rather be a human who was early than a realist who was comfortable. Back to the forms tomorrow. The future can wait one more shift.`,
    ],
    footnote: `Written on a break, at the gray machine, about the machine that comes after it.`,
  },
];
