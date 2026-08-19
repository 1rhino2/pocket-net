import { playHour } from '../lib/seed';

// small authored "events" layer so the net visibly changes over a session and
// across the calendar. bounded and hand written, never generated. an event can
// tint the status page and drop a line on the home wire. witnessing one records
// a discovery. nothing here gates content, it is atmosphere with a small reward.

export type NetEvent = {
  id: string;
  kind: 'outage' | 'holiday' | 'drama' | 'calm';
  headline: string;
  note: string;
  /** discovery id granted the first time this event is seen */
  discovery: string;
};

// the slow net-wide drama, one beat per play-hour, so a long session watches it
// unfold instead of repeating. reuses the two mysteries as background weather.
const DRAMA_BEATS: NetEvent[] = [
  {
    id: 'drama_0',
    kind: 'drama',
    headline: 'Quiet on the wire',
    note: 'Nothing is wrong tonight, which the night desk notes is worth writing down while it is true.',
    discovery: 'event_drama_0',
  },
  {
    id: 'drama_1',
    kind: 'drama',
    headline: 'Someone is reading the old pages',
    note: 'The archive is logging repeated hits on a handful of pages from March. Whoever it is, they are reading in order.',
    discovery: 'event_drama_1',
  },
  {
    id: 'drama_2',
    kind: 'drama',
    headline: 'The 02:14 carrier is up',
    note: 'A watcher posted a fresh timestamp to the second. Three groups, three times, same as every night.',
    discovery: 'event_drama_2',
  },
  {
    id: 'drama_3',
    kind: 'drama',
    headline: 'A lineman wrote in',
    note: 'A retired exchange man has offered to name the night carrier. The boards have gone quiet waiting for it.',
    discovery: 'event_drama_3',
  },
  {
    id: 'drama_4',
    kind: 'drama',
    headline: 'The word is confirmed, not posted',
    note: 'Two watchers say they have the word and are comparing privately. Nobody has printed it, which is the whole point.',
    discovery: 'event_drama_4',
  },
];

// an outage window: the net goes rough for a couple of play-hours, the way a
// real ISP night went when the air handler died.
const OUTAGE: NetEvent = {
  id: 'outage_night',
  kind: 'outage',
  headline: 'Service degraded: overnight',
  note: 'The room ran warm and the night desk started shutting things down in the order that hurts least. Some pages are slow. Mail is last to come back.',
  discovery: 'event_outage',
};

const CALM: NetEvent = {
  id: 'calm',
  kind: 'calm',
  headline: 'All systems nominal',
  note: 'Every rack answering, pressure flat, the squirrel elsewhere. A boring night, which is the best kind.',
  discovery: 'event_calm',
};

function holidayFor(date: Date): NetEvent | null {
  const m = date.getMonth();
  const d = date.getDate();
  if (m === 11 && d === 31) {
    return {
      id: 'holiday_nye',
      kind: 'holiday',
      headline: 'Happy new year from Console 2',
      note: 'Six subscribers on, on New Year\'s Eve. The night desk stood in the doorway with a cup of tea to watch the clock go over. Nothing happened, which is the job.',
      discovery: 'event_nye',
    };
  }
  if (m === 11 && d >= 24 && d <= 26) {
    return {
      id: 'holiday_dec',
      kind: 'holiday',
      headline: 'The net is quiet for the holiday',
      note: 'Most of the valley is offline with family. The webring still turns. The guestbook still takes signatures. Best viewed at 800x600, as ever.',
      discovery: 'event_holiday',
    };
  }
  return null;
}

// the current event, given tracked play time and the real date. holiday wins,
// then a scheduled outage window, then the rolling drama, then calm.
export function activeNetEvent(playMs: number, now: Date = new Date()): NetEvent {
  const holiday = holidayFor(now);
  if (holiday) return holiday;
  const ph = playHour(playMs);
  // one outage window a session, in the small hours of play time
  if (ph === 4 || ph === 5) return OUTAGE;
  if (ph >= 1 && ph <= 3) return CALM;
  const beat = DRAMA_BEATS[Math.min(DRAMA_BEATS.length - 1, Math.floor(ph / 4))];
  return beat ?? CALM;
}
