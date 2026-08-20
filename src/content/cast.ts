import type { CastId } from './types';

// the people on this net. bar for every page: cover the byline and you should
// still know who wrote it. two voices you could swap and nobody notices means
// one isnt a character yet, just a name slot.
// voice is the note-to-self i write before drafting. stays in the bundle bc its
// tiny and its the actual spec.
export type CastMember = {
  id: CastId;
  handle: string;
  role: string;
  /** how they write, in the imperative, for me not the reader */
  voice: string;
  /** the shape their pages take */
  form: string;
  homeUrl?: string;
};

export const CAST: Record<CastId, CastMember> = {
  modem_mary: {
    id: 'modem_mary',
    handle: 'modem_mary',
    role: 'Overnight operator, Petersham Valley Online. Console 2, 22:00 to 06:00, four nights a week since 1996.',
    voice:
      'Timestamp first, then the fact. Present tense. Drop articles and pronouns when the meaning survives. Never explain a term. Dry, occasionally funny by accident. Complains about equipment, never about people by name. Does not sign off.',
    form: 'Shift log entries. Short lines. Times in 24 hour clock with a period after them.',
    homeUrl: 'rn:n-mary-console2',
  },

  xerox_angel: {
    id: 'xerox_angel',
    handle: 'xerox_angel',
    role: 'Ran the user archive on a volunteer basis. Stopped posting on 11 March 1999.',
    voice:
      'Long careful sentences that circle back to make sure they were fair. Apologises for the length and then keeps going. Terrified of things being lost quietly, which she will tell you is different from being deleted loudly. Warm. Signs everything "- c."',
    form: 'Archive notes and index pages. Numbered lists of what she saved and what she did not get to.',
    homeUrl: 'rn:n-angel-index',
  },

  lint_monk: {
    id: 'lint_monk',
    handle: 'lint_monk',
    role: 'Self-appointed corrections desk. Nobody asked him to do this.',
    voice:
      'Numbered items. Quotes the original text before correcting it, always, because the original is the point. Elaborately polite in a way that is worse than rudeness. Cites where he got it. Never speculates and will say so when he is refusing to.',
    form: 'Correction notices. "Item 1." through "Item n." with a source line under each.',
    homeUrl: 'rn:n-monk-corrections',
  },

  fax_aurora: {
    id: 'fax_aurora',
    handle: 'fax_aurora',
    role: 'Office manager. Communicates by scanned memo and has never once posted plain text.',
    voice:
      'Header block in caps. Form fields with colons. Passive voice. Numbers everything, including things that do not need numbering. Transmission artifacts and PAGE n OF m. Warmth leaks through exactly once per page and she would deny it.',
    form: 'Scanned interoffice memos, inventory manifests, routing slips.',
  },

  localhost_legend: {
    id: 'localhost_legend',
    handle: 'localhost_legend',
    role: 'Fifteen. Has a homepage. Would like you to sign the guestbook.',
    voice:
      'Run-on sentences joined by "and". Random Capitalisation for Emphasis. Exclamation marks in threes. Misspells words he has only ever read, never heard. Obsessed with his hit counter. Sincere in a way that is hard to read without wincing.',
    form: 'Personal homepage, webring stops, guestbook. Under construction where nothing is being constructed.',
    homeUrl: 'rn:n-legend-home',
  },

  soup_judge: {
    id: 'soup_judge',
    handle: 'soup_judge',
    role: 'Runs the food board. Has opinions about the vending machine on floor two.',
    voice:
      'All lowercase. Starts talking about one thing and finishes somewhere else. Genuinely kind. Rates things out of ten and the scale is not consistent. Long digression, then one sentence that turns out to matter.',
    form: 'Board posts, recipes with the amounts left out, vending machine reviews.',
    homeUrl: 'rn:n-soup-board',
  },

  pvo_operations: {
    id: 'pvo_operations',
    handle: 'operations@pvo',
    role: 'The company. Speaks when it has to.',
    voice:
      'Passive voice throughout, so nothing is ever done by anyone. Regret expressed without an apology in it. Reuses the same three sentences across unrelated notices. Edits pages after publishing them and does not say that it did.',
    form: 'Status notices, service bulletins, a memo that was not meant to leave the building.',
  },

  anon: {
    id: 'anon',
    handle: 'anonymous',
    role: 'Guestbook signers, forum lurkers, one wiki editor who did not log in.',
    voice: 'Whatever a stranger sounds like. Short, unedited, no cause to impress anyone.',
    form: 'Guestbook entries, one-line forum replies, a wiki revision.',
  },

  baro_hank: {
    id: 'baro_hank',
    handle: 'baro_hank',
    role: 'Runs an amateur weather station off his back porch. Reports to nobody. Has been right about one storm and will not let it go.',
    voice:
      'Readings first, always with units. Hedges every forecast twice and then commits to it anyway. Trusts the barometer over the radio and says so. Kind about other people being wrong. Ends on the next reading time, never on a conclusion.',
    form: 'Station logs, pressure tables, a standing forecast he revises hourly.',
    homeUrl: 'rn:n-hank-station',
  },

  disk_daemon: {
    id: 'disk_daemon',
    handle: 'disk_daemon',
    role: 'Sysop of a one-man shareware shelf. Uploads utilities he wrote or fixed, with install notes nobody reads.',
    voice:
      'README cadence. Version numbers on everything, including opinions. "Tested on my machine" is a complete thought to him. Lists requirements. Refuses to support anything he did not compile. Warmer in the changelog than anywhere else.',
    form: 'Download listings, install notes, changelogs, a file-of-the-week.',
    homeUrl: 'rn:n-daemon-shelf',
  },

  swap_meet: {
    id: 'swap_meet',
    handle: 'swap_meet',
    role: 'Always selling something, always buying something else. Knows the price of everything on the net and half of it is wrong.',
    voice:
      'Telegraphic ad-speak. Drops verbs. OBO. Caps for the item, lowercase for the excuses. No lowballers, said with feeling. Every ad turns into a small story he did not mean to tell and then cuts himself off.',
    form: 'Classified ads, wanted posts, a running list of what he has moved this month.',
    homeUrl: 'rn:n-swap-listings',
  },

  town_annals: {
    id: 'town_annals',
    handle: 'town_annals',
    role: 'Keeps the town record as a hobby. Cross-references the paper archive against whatever the net remembers, and the two rarely agree.',
    voice:
      'Careful, cited, dated. Puts the source in parentheses after the claim. Distinguishes what is recorded from what is merely repeated. Will leave a question open rather than close it wrong. Never raises her voice, even when the record is plainly lying.',
    form: 'History notes, cross-reference tables, corrections to the town wiki with citations.',
    homeUrl: 'rn:n-annals-index',
  },

  carrier_wave: {
    id: 'carrier_wave',
    handle: 'carrier_wave',
    role: 'Sat up nights logging a repeating signal nobody else would admit hearing. Certain it means something. Stopped posting after the third week.',
    voice:
      'Starts calm and technical, drifts into certainty by the last paragraph. Times things to the second. Connects dots that might not touch. Asks the reader to check for themselves, then answers the question for them. Trails off mid-thought when the recording ends.',
    form: 'Watch logs, frequency notes, a decode attempt he keeps redoing.',
    homeUrl: 'rn:n-carrier-log1',
  },

  aero_prophet: {
    id: 'aero_prophet',
    handle: 'aero_prophet',
    role: 'Convinced computers are about to become glossy, watery, and alive. Built a homepage from the future five years early. Everyone thinks he is joking.',
    voice:
      'Breathless techno-optimism in a product-demo cadence. Everything glows, breathes, or ripples. Verbs things that are not verbs. Promises the reader a feeling, not a feature. Sincere past the point of embarrassment, which is the point.',
    form: 'A concept homepage, a manifesto, mockups described in words because the tools do not exist yet.',
    homeUrl: 'rn:aero',
  },
};

export function castMember(id: CastId): CastMember {
  return CAST[id];
}
