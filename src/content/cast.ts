import type { CastId } from './types';

/**
 * The people on this net.
 *
 * The bar for every page: cover the byline and you should still know who wrote
 * it. If two of these voices could be swapped without anyone noticing, one of
 * them is not a character yet, it is a name slot.
 *
 * `voice` is the note I write to myself before drafting a page. It stays in the
 * shipped bundle because it is small and because it is the actual spec.
 */
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
};

export function castMember(id: CastId): CastMember {
  return CAST[id];
}
