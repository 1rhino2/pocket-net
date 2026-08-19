/**
 * The ambient net: pulse lines, mail, wiki stubs, board digests, forum posts.
 *
 * This is the living layer. It rotates, which is worth keeping, but everything
 * in it was written whole. It replaces two separate adjective/noun/verb
 * modules that between them put "a sleepy relay archives" and "Live: nested
 * tower folds near rn:search" on the front page of the net.
 *
 * A pool of real lines is a much smaller number than 40 adjectives times 40
 * nouns times 19 verbs. That trade is the entire point: 30,400 combinations,
 * none of them written by anyone.
 */

export const WIRE_LINES = [
  `soup_judge has rated the coffee in the second floor break room. It is not food, so it gets no number.`,
  `Somebody signed the guestbook on a page whose owner has not logged in since March.`,
  `lint_monk is asking again whether anyone kept a copy of the board index from February.`,
  `The B side of the ring group dropped another call. Console 2 logged it, as it logs all of them.`,
  `Three sites in the webring stopped answering this week. The ring master is not removing them.`,
  `A subscriber wants to know if the net is closed on Sundays. It is not.`,
  `The fire door on floor 2 is propped open again. This has now been raised in six consecutive memos.`,
  `Someone is searching the archive for the same address every day at about the same time.`,
  `localhost_legend's hit counter went up by forty overnight and he would like everyone to know.`,
  `A wiki article was edited by an address with no other edits, and then edited back.`,
  `The good scissors are still missing. The office has stopped calling them the good scissors.`,
  `Night desk reports the room is quiet, which she notes is worth writing down while it is true.`,
] as const;

/** shorter, more immediate than WIRE_LINES. these sit in the pulse ticker. */
export const PULSE_LINES = [
  `Two subscribers on. Both idle. Both probably asleep with the modem up.`,
  `Guestbook signature received on a page last updated in March.`,
  `Ring group A side steady. B side dropped one.`,
  `Somebody is reading the correction notices back to front.`,
  `Webring next button pressed. Landed on a not found. Pressed again.`,
  `Search for an h- address returned nothing, for the ninth day.`,
  `Hit counter incremented. Somewhere a fifteen year old is delighted.`,
  `Board post about soup has outlasted every thread about modems.`,
  `The wall thermometer reads normal, which is the only reading it ever gives.`,
  `A page finished loading after ninety seconds. It was worth it, apparently.`,
  `Held envelope still in drawer 3. Fourteen days was a while ago.`,
  `Quiet. Writing it down while it is true.`,
] as const;

export const FORUM_POSTS = [
  { user: 'soup_judge', title: `salt pork, not bacon, final answer`, body: `i have been asked to justify this position eleven times and i am not going to, i am simply going to keep being right about it. bring it up friday if you must.` },
  { user: 'lint_monk', title: `Does anyone hold a copy of the board index from February`, body: `I am missing one week. I have every other week since March 1998. This is going to bother me until somebody fixes it, and I accept that this is my problem and not yours.` },
  { user: 'localhost_legend', title: `HOW DO YOU MAKE THE TEXT MOVE`, body: `i have seen it on other pages where the text goes across and i have tried everything. someone said its a marquee but when i type that it just says marquee on my page. please help!!!` },
  { user: 'modem_mary', title: `if your line drops after 40 minutes it is not your modem`, body: `stop buying modems. it is the B side of the ring group. i have the log. ring the console and i will move you across by hand and you can keep your money.` },
  { user: 'a_subscriber', title: `what actually is the h- range`, body: `signed up in 98 and got an h. my brother signed up two weeks later at the same desk and got an h too. is it just when you joined or is it something else. asking for the obvious reason.` },
  { user: 'todd_ring', title: `no i am not removing the dead sites from the ring`, body: `asked and answered. taking them out is the part you cannot undo. if you press next and get nothing, that was somebody's page. press it again.` },
  { user: 'fax_aurora', title: `TIMESHEETS ARE DUE THURSDAY`, body: `THIS BOARD HAS BEEN JOINED SOLELY TO RESTATE THAT TIMESHEETS ARE DUE THURSDAY. THE OFFICE WILL NOW OBSERVE QUIETLY. IT IS QUITE INTERESTING IN HERE.` },
  { user: 'a_subscriber', title: `best viewed at 800x600 is a threat`, body: `if your page needs my screen to be a specific size then it is not my screen that is the problem. i will die on this hill and several of you will be there with me.` },
  { user: 'soup_judge', title: `friday, the usual place, the sign is still broken`, body: `four of us last week which is fine. the seat at the end stays where it is. no you do not have to talk about march. you can talk about literally anything else.` },
  { user: 'lint_monk', title: `Notice 12 remains up and will remain up`, body: `Four people have now written asking me to remove the notice in which I am the one who was wrong. A corrections desk that deletes its own errors is an advertisement. It stays.` },
] as const;

export const WIRE_MAIL = [
  {
    from: 'soup_judge@pvo',
    subject: 'friday diner, still on',
    preview: 'no agenda, the place with the broken sign',
    body: `still on for friday. the place with the sign where the second o is out, 6ish.\n\nno agenda and nobody has to talk about computers. bring whoever.\n\n- sj`,
  },
  {
    from: 'lint_monk@pvo',
    subject: 'Correction notice, courtesy copy',
    preview: 'Sent to you before it is published, as always',
    body: `You have a date wrong on one of your pages. I have not published anything.\n\nI am sending this first because I always send it first, and if you fix it in the next week then nothing goes up and this exchange never happened.\n\nItem 1. The page reads 1997. The event was 1996. Source is your own earlier page, which is awkward for both of us.`,
  },
  {
    from: 'operations@pvo',
    subject: 'Scheduled maintenance notice',
    preview: 'Tuesday, 02:00 to 04:00, as usual',
    body: `Scheduled maintenance will be performed Tuesday between 02:00 and 04:00.\n\nService may be interrupted during this window. No action is required of subscribers.\n\nThis notice is sent to all subscribers and does not relate to your account specifically.`,
  },
  {
    from: 'modem_mary@pvo',
    subject: 'your line, from the console',
    preview: 'It is not your modem, before you buy a new one',
    body: `You rang about the drops. I looked.\n\nIt is the B side of the ring group and it is not your modem. Do not buy a new modem. I have logged it eleven times this month and the count is the only argument any of us have.\n\nIf it happens more than twice a night ring the console and I will move you to the A side by hand.`,
  },
  {
    from: 'todd@pvo',
    subject: 'webring: you are number 12',
    preview: 'Put the buttons at the bottom of your page',
    body: `You are in. Site number 12.\n\nPut the ring buttons at the bottom of your page where people can find them, and update the page sometimes. That second one is the rule everybody breaks.\n\nI do not remove sites that stop answering. People ask. The answer is no.`,
  },
  {
    from: 'fax_aurora@pvo',
    subject: 'MEMO: TIMESHEETS',
    preview: 'THURSDAY. NOT FRIDAY.',
    body: `TO: ALL STAFF. RE: TIMESHEET SUBMISSION.\n\nTIMESHEETS ARE DUE THURSDAY. THIS HAS ALWAYS BEEN THE CASE AND IS RESTATED WEEKLY WITHOUT EFFECT.\n\nSTAFF SUBMITTING ON FRIDAY WILL BE PAID. THE OFFICE SIMPLY WISHES IT ON RECORD THAT THURSDAY WAS ASKED FOR.`,
  },
  {
    from: 'localhost_legend@pvo',
    subject: 'PLEASE SIGN MY GUESTBOOK!!!',
    preview: 'it is at the bottom of my page',
    body: `hi!! i saw your page from the webring and it is really good.\n\nwill you sign my guestbook it is at the bottom of my page. you dont have to write a lot, one line is fine, i read all of them the same day.\n\nmy counter is at 3180 which is real and not faked!!!`,
  },
  {
    from: 'a.subscriber@pvo',
    subject: 'is there a copy of my page from before',
    preview: 'h- address, gone since March',
    body: `I am told you might know who keeps copies.\n\nMine is one of the h- ones. It went in March. Support say it was a disk fault and that I should have kept a copy, which I did not know I was supposed to do.\n\nIt is a recipe collection. Four years. If there is nothing then there is nothing, I would just like to know either way rather than keep asking.`,
  },
  {
    from: 'support@pvo',
    subject: 'Re: your enquiry (ref 4471)',
    preview: 'Your enquiry has been closed',
    body: `Thank you for contacting Petersham Valley Online.\n\nYour enquiry has been reviewed and closed. The cause has been recorded as a hardware fault. No further action is required of you.\n\nThis mailbox is not monitored. Please contact support during business hours if you require further assistance.`,
  },
  {
    from: 'todd@pvo',
    subject: 'ring stop 15 is still not answering',
    preview: 'The lighthouse one. Leaving it in.',
    body: `Number 15 has been dark since March and people keep writing to me about it.\n\nIt was the lighthouse pages. Sixty one of them, all photographed from the road, and it took nine minutes to load on a good night.\n\nIt stays in the ring. Press next twice.`,
  },
  {
    from: 'modem_mary@pvo',
    subject: 'the console line, for the new people',
    preview: 'Six rings, then I am in the loud room',
    body: `New subscribers keep being told there is no overnight support. There is. It is me.\n\nIf it rings more than six times I am in the room with the loud equipment and I will get there. Let it ring.\n\nI cannot restore a page and I cannot tell you why yours went. I can tell you whether your line is up, which is more than the daytime number will do at three in the morning.`,
  },
  {
    from: 'a.subscriber@pvo',
    subject: 'thank you (no reply needed)',
    preview: 'Got the recipes back',
    body: `Somebody sent me my page. The whole thing, as it was in March.\n\nI am told not to ask where it came from so I am not asking. Four years of my mother's handwriting typed up, and I had made my peace with it being gone.\n\nNo reply needed. I just wanted it written down somewhere that it came back.`,
  },
] as const;

export const WIKI_FRAGMENTS = [
  {
    title: 'Ring group B side',
    paragraphs: [
      `The B side of the dial-up ring group has dropped approximately one call in forty since February 1999.`,
      `The overnight operator has logged each occurrence. The modems on the B side were swapped in March and the rate did not change, which is generally taken to rule out the equipment.`,
    ],
  },
  {
    title: 'The h- address range',
    paragraphs: [
      `Addresses beginning h- were issued to subscribers who signed up during 1998, which was the year of heaviest growth.`,
      `It is the largest range on the net. This is the reason usually given for why losing it mattered more than losing any other range would have.`,
    ],
  },
  {
    title: 'The Friday diner',
    paragraphs: [
      `An informal weekly gathering of food board members, running since October 1998 at a diner with a partially failed sign.`,
      `Attendance peaked at eleven in January 1999 and has since fallen. The organiser keeps one seat at the end of the table clear and has declined to explain why.`,
    ],
  },
  {
    title: 'Correction notices',
    paragraphs: [
      `A series of published corrections maintained by a subscriber posting as lint_monk, running to over fifty notices.`,
      `The practice is to write to the author privately first and publish only if the error stands after a week. Roughly two thirds of cases are resolved without publication.`,
    ],
  },
  {
    title: 'The New England Net webring',
    paragraphs: [
      `A ring of nineteen personal sites, joined by a linked footer, administered by a subscriber known as Todd.`,
      `Six member sites have not resolved since March 1999. The administrator has declined requests to remove them from the ring.`,
    ],
  },
  {
    title: 'The August air handler failure',
    paragraphs: [
      `On a night in August 1998 the exchange air handling unit failed and equipment was shut down by the operator on duty, by hand, in an order chosen at the time.`,
      `The mail spool was taken down later than was ideal and took longest to restore. Three procedural changes followed, including a wall thermometer visible from the console.`,
    ],
  },
  {
    title: 'The volunteer archive',
    paragraphs: [
      `A nightly copy of the subscriber net maintained privately from October 1997 to March 1999.`,
      `The effort was not sanctioned and ran on equipment at the exchange. The index stopped updating on 10 March 1999.`,
    ],
  },
  {
    title: 'Petersham Valley Online',
    paragraphs: [
      `A regional dial-up provider serving subscribers across three counties, in operation since 1995.`,
      `The service is notable locally for having run a subscriber-authored net alongside the dial-up service, rather than only providing access to the wider internet.`,
    ],
  },
  {
    title: 'Hit counters',
    paragraphs: [
      `A small image showing the number of visits to a page, near universal on personal sites of the period.`,
      `Counters were widely assumed to be inflated. At least one subscriber has stated repeatedly and in writing that his is not, which is not the sort of claim that can be settled.`,
    ],
  },
  {
    title: 'Under construction',
    paragraphs: [
      `A convention by which an unfinished page announces itself as unfinished, usually with an animated graphic of a road sign or a shovel.`,
      `The notice frequently outlives the intention. Several pages on this net have been under construction for longer than they were ever worked on.`,
    ],
  },
] as const;

export const ARCHIVE_ENTRIES = [
  { title: 'Board digest: the salt pork argument', body: `Forty one messages over nine days about whether bacon is acceptable in chowder. The board owner closed it by declaring himself right, which nobody appealed.` },
  { title: 'Board digest: modems, again', body: `The technical board relitigates the B side drop rate for the fourth month. One poster has the call log and everybody else has a theory.` },
  { title: 'Board digest: what a fault report looks like', body: `A night operator explains what you are normally told when hardware fails, and what it means when you are told nothing. Read more than any other post that month.` },
  { title: 'Board digest: the guestbook chain', body: `Members agree to sign one stalled guestbook a week so the pages do not go completely quiet. It ran for six weeks and then it ran without needing to be agreed.` },
  { title: 'Board digest: 800x600 or 640x480', body: `Nine posts of genuine hostility about a screen resolution. The best viewed at line stays on most pages regardless of the outcome.` },
  { title: 'Board digest: lighthouses', body: `A member posts photographs of every lighthouse in the commonwealth. The page takes nine minutes to load and is the most linked page on the net for a month.` },
  { title: 'Board digest: the vending machine coil', body: `Sustained investigation into which coil in the floor 2 machine is bent, conducted with more rigour than most of the technical board.` },
  { title: 'Board digest: keeping your own copy', body: `After March, a long thread on how to keep a copy of your own page. Nobody in it sounds like they are enjoying being right.` },
  { title: 'Board digest: the ring master will not remove them', body: `Members ask for six dead sites to be dropped from the webring. The administrator declines in one sentence and the thread ends there.` },
  { title: 'Board digest: timesheets are due Thursday', body: `Staff forward the office memo to the boards as a joke. The office joins the board to reply and stays, which nobody expected.` },
  { title: 'Board digest: is the net closed on Sundays', body: `One subscriber's question becomes a running joke and then a genuinely useful thread about what the service actually does at night.` },
  { title: 'Board digest: the January backup', body: `Subscribers compare which version of their page came back and establish between themselves that the backup was six weeks old.` },
  { title: 'Board digest: welcome to the new signups', body: `A thread that ran continuously through 1998 as the h- range filled up, ending with the last entry in December.` },
  { title: 'Board digest: nothing happened tonight', body: `The overnight operator posts a quiet week to the boards on request. It is the least eventful thing on the net and gets read anyway.` },
] as const;

export const GHOST_NODES = [
  { label: 'the stalled guestbook', blurb: `A page nobody has updated since March, still taking signatures.` },
  { label: 'the ninth signature', blurb: `Somebody has signed the same guestbook nine times as "a friend".` },
  { label: 'ring stop 15', blurb: `The lighthouse page. Nine minutes to load, when it loaded.` },
  { label: 'drawer 3', blurb: `One held envelope, addressed and sent by the same person.` },
  { label: 'the end seat', blurb: `Kept clear at the diner on Fridays. It faces the door.` },
  { label: 'the wall thermometer', blurb: `Installed after August so the console can see the room.` },
  { label: 'the middle bank', blurb: `Fourteen units on the tenth. None on the twelfth.` },
  { label: 'the second ring', blurb: `The on-call line, answered at four in the morning, once.` },
] as const;

/** codeword pool for the hack minigame. these are passwords, not prose. */
export const CODE_WORDS = [
  'trunk', 'splice', 'carrier', 'handset', 'exchange', 'ringer', 'pulse', 'tone',
  'spool', 'platter', 'sled', 'bank', 'rack', 'console', 'patch', 'jack',
] as const;
