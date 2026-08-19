import type { AuthoredPage } from '../types';

/**
 * fax_aurora. Everything is a scanned memo, even when it should not be.
 *
 * Rule for these: caps header block, colon fields, passive voice, and exactly
 * one sentence per page where a person gets through. Never two.
 */
export const AURORA_PAGES: AuthoredPage[] = [
  {
    slug: 'aurora-notice-board',
    title: 'MEMO: BUILDING NOTICES, WEEK COMMENCING 08 MARCH',
    author: 'fax_aurora',
    hour: 7,
    layout: 'fax',
    tag: 'memo',
    updated: '08 Mar 1999',
    search: 'building notices week memo parking kitchen',
    teaser: 'Six numbered notices about parking, the kitchen, and a door. Filed the Monday before.',
    paragraphs: [
      `TO: ALL STAFF, BOTH FLOORS. FROM: OFFICE ADMINISTRATION. RE: NOTICES FOR THE WEEK. PAGE 1 OF 2.`,
      `Notices are posted each Monday and are also affixed to the board by the kitchen. Staff are reminded that the board by the kitchen is the record copy and this transmission is a courtesy.`,
      `Item 6 is repeated from last week and from the week before it. It will continue to be repeated.`,
      `THIS TRANSMISSION IS CONFIRMED COMPLETE AT 2 PAGES. IF PAGE 2 IS NOT RECEIVED THE SENDING OFFICE SHOULD BE ADVISED BY TELEPHONE AND NOT BY RETURN FAX.`,
    ],
    bullets: [
      `1. THE VISITOR SPACES ARE FOR VISITORS. THIS HAS BEEN RAISED AT EVERY MEETING SINCE NOVEMBER.`,
      `2. THE KITCHEN REFRIGERATOR WILL BE EMPTIED FRIDAY AT 16:00 WITHOUT INSPECTION OF CONTENTS.`,
      `3. THE FLOOR 2 STAIR DOOR IS NOT TO BE PROPPED. IT IS A FIRE DOOR. IT IS PROPPED EVERY DAY.`,
      `4. TIMESHEETS ARE DUE THURSDAY, NOT FRIDAY. THIS HAS ALWAYS BEEN THE CASE.`,
      `5. OVERNIGHT STAFF ARE REMINDED THAT THE FRONT DESK IS UNSTAFFED AND DELIVERIES CANNOT BE ACCEPTED.`,
      `6. SOMEONE IS TAKING THE GOOD SCISSORS.`,
    ],
    footnote: `TRANSMITTED 08 MAR 1999 07:52. THE GOOD SCISSORS ARE THE ONLY SCISSORS. I HAVE STOPPED CALLING THEM THE GOOD SCISSORS AND IT HAS NOT HELPED.`,
  },

  {
    slug: 'aurora-routing-slip',
    title: 'ROUTING SLIP: CORRESPONDENCE HELD',
    author: 'fax_aurora',
    hour: 9,
    layout: 'receipt',
    tag: 'memo',
    updated: '18 Mar 1999',
    search: 'routing slip correspondence held undeliverable letter',
    teaser: 'A letter that could not be delivered internally, logged with the reason, which is a blank field.',
    paragraphs: [
      `ROUTING SLIP. ITEM RECEIVED BY OFFICE ADMINISTRATION FOR INTERNAL DELIVERY. PAGE 1 OF 1.`,
      `An item of internal correspondence was received on 12 March addressed to a named individual. The individual is no longer listed on the internal directory. The item has been held pending instruction.`,
      `Instruction was requested on 12 March, on 15 March, and on 18 March. No instruction has been received. The item remains held.`,
      `Standing procedure requires that held correspondence be returned to sender after fourteen days. The sender field on this item is the individual it is addressed to, which the procedure does not contemplate, and which this office has raised.`,
    ],
    bullets: [
      `ITEM: ONE SEALED ENVELOPE, INTERNAL, NO FRANKING.`,
      `ADDRESSEE: NOT ON DIRECTORY AS OF 12 MAR 1999.`,
      `SENDER AS WRITTEN: SAME AS ADDRESSEE.`,
      `WEIGHT: UNDER 20G. CONTENTS: NOT INSPECTED. THIS OFFICE DOES NOT INSPECT.`,
      `REASON FOR NON DELIVERY:`,
      `DISPOSITION: HELD. DRAWER 3.`,
    ],
    footnote: `TRANSMITTED 18 MAR 1999 09:11. IT IS STILL IN DRAWER 3. IT WILL BE IN DRAWER 3 FOR AS LONG AS I HAVE THE DRAWER.`,
    clue: 'memo',
  },
];
