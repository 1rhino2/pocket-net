export type WikiArticle = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  body: string[];
};

export const WIKI_ARTICLES: WikiArticle[] = [
  {
    slug: 'rhinonet',
    title: 'RhinoNet',
    category: 'Infrastructure',
    summary: 'A pocket ISP that fits in localStorage.',
    body: [
      'RhinoNet is not connected to the public internet. It is a curated fiction layer inside your browser.',
      'Every rn: URL resolves locally. There is no DNS, only vibes.',
      'Version 0.3 adds mail, weather, radio, wiki, jobs, chat, cipher drill, quests, and a net map.',
    ],
  },
  {
    slug: 'rhinocoins',
    title: 'RhinoCoins',
    category: 'Economy',
    summary: 'Soft currency for soft achievements.',
    body: [
      'RhinoCoins (RC) are earned by browsing, posting, shopping, playing, and completing quests.',
      'They cannot be spent on anything real. PixelMart carts are performance art.',
      'Integrity is separate: it measures how responsibly you treat questionable EXE files.',
    ],
  },
  {
    slug: 'free-smile',
    title: 'FREE_SMILE.EXE',
    category: 'Security theater',
    summary: 'Friendly malware cosplay with real rewards.',
    body: [
      'FREE_SMILE is a multi-phase installer ritual. It cannot access your filesystem.',
      'Quarantine raises integrity. Accepting the smile lowers it but still pays RC.',
      'Quality score depends on cable yanks and breach patch accuracy.',
    ],
  },
  {
    slug: 'packet-weather',
    title: 'Packet Weather',
    category: 'Services',
    summary: 'Meteorology for localhost.',
    body: [
      'Forecasts are generated from Math.random() and confidence.',
      'Checking three days in one visit grants a small RC stipend.',
      'Do not plan agriculture around these readings.',
    ],
  },
  {
    slug: 'rhinofm',
    title: 'RhinoFM',
    category: 'Media',
    summary: 'Three stations, infinite pretend bitrate.',
    body: [
      'Lo-Fi Rhino plays study beats that do not exist.',
      'Packet Storm is white noise labeled as jazz.',
      'Dial-Up Dreams loops handshake nostalgia.',
    ],
  },
  {
    slug: 'cipher-drill',
    title: 'Cipher Drill',
    category: 'Games',
    summary: 'Typing sprint with a timer.',
    body: [
      'Type the phrase before the bar empties. Accuracy matters more than speed.',
      'Scores above 70 count as a win for quests and stats.',
      'Phrases rotate from a pool of security-flavored nonsense.',
    ],
  },
  {
    slug: 'relay-chat',
    title: 'Relay Chat',
    category: 'Social',
    summary: 'Bot with keyword memory.',
    body: [
      'The relay bot responds to keywords like quest, coin, smile, and help.',
      'Messages are not sent anywhere. The bot lives in your tab.',
      'Spamming still earns quest credit because effort is noted.',
    ],
  },
  {
    slug: 'quest-board',
    title: 'Quest Board',
    category: 'Progression',
    summary: 'Contracts tied to your stats.',
    body: [
      'Quests read live counters from your save file.',
      'Completed quests pay RC once and cannot be repeated.',
      'Daily stipend is separate: claim it from System status.',
    ],
  },
];
