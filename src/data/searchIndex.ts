export type SearchDoc = {
  id: string;
  title: string;
  url: string;
  snippet: string;
  tags: string[];
  body: string;
};

export const SEARCH_DOCS: SearchDoc[] = [
  {
    id: 'd1',
    title: 'RhinoNet Directory - welcome packet',
    url: 'rn:directory',
    snippet: 'Official map of the pocket internet. Start here.',
    tags: ['official', 'map', 'guide'],
    body:
      'RhinoNet Directory lists every sanctioned site on this build. ' +
      'Bookmark rn:search for the only search engine that indexes fiction on purpose.',
  },
  {
    id: 'd2',
    title: 'PixelMart - coupons that expire in 4 minutes',
    url: 'rn:mart',
    snippet: 'Buy hats for your cursor. Prices are nonsense. Inventory is vibes.',
    tags: ['shop', 'hats', 'coupons'],
    body:
      'PixelMart sells digital goods that do not exist. ' +
      'The receipt is real enough to frame. Refunds are handled by a goldfish named Terry.',
  },
  {
    id: 'd3',
    title: 'The Forum - arguments about nothing',
    url: 'rn:forum',
    snippet: 'Hot takes on tabs vs spaces, tabs vs tabs, and soup.',
    tags: ['community', 'drama', 'soup'],
    body:
      'The Forum is moderated by a shell script that mostly prints try turning it off. ' +
      'Do not feed the regex goblins after midnight.',
  },
  {
    id: 'd4',
    title: 'rn:readme - meta layer',
    url: 'rn:readme',
    snippet: 'What this is, why it exists, and how v2 might eat the world.',
    tags: ['meta', 'readme', 'v1'],
    body:
      'Pocket Net v1 is a toy ISP desktop inside your browser. ' +
      'v2 could add mail, fake viruses with quests, multiplayer malls, and a crawler you host yourself.',
  },
  {
    id: 'd5',
    title: 'Dial-up sound as ASMR',
    url: 'rn:search',
    snippet: 'Whitepaper: why the handshake is basically jazz.',
    tags: ['audio', 'history', 'meme'],
    body:
      'This document proves nothing but feels correct. ' +
      'If your modem is offended, apologize twice and reboot your nostalgia.',
  },
  {
    id: 'd6',
    title: 'How to install a second internet',
    url: 'rn:directory',
    snippet: 'Step one: clone repo. Step two: run dev. Step three: tell nobody.',
    tags: ['tutorial', 'dev', 'secret'],
    body:
      'You already did it. The second internet is this one. ' +
      'The third internet is whatever you fork next.',
  },
  {
    id: 'd7',
    title: 'RhinoReflex - needle arcade',
    url: 'rn:arcade',
    snippet: 'Five rounds, stop the needle, farm RhinoCoins at the end of a clean run.',
    tags: ['game', 'skill', 'coins'],
    body:
      'RhinoReflex is a browser-native timing loop. No WebGL required. ' +
      'Your best total is tracked on rn:status next to arcade clears.',
  },
  {
    id: 'd8',
    title: 'System status - ledger',
    url: 'rn:status',
    snippet: 'Credits, integrity, stats, achievements. All local, all yours.',
    tags: ['system', 'save', 'stats'],
    body:
      'Nothing here phones home. Clear site data if you want a hard reset. ' +
      'The smileware icon on the desktop still pays out when you make a choice.',
  },
  {
    id: 'd9',
    title: 'RhinoMail inbox',
    url: 'rn:mail',
    snippet: 'Local mail that never leaves your profile.',
    tags: ['mail', 'inbox', 'messages'],
    body: 'Read messages for quest credit. Replies go to /dev/null.',
  },
  {
    id: 'd10',
    title: 'Packet Weather service',
    url: 'rn:weather',
    snippet: 'Forecast for 127.0.0.1 with imaginary wind.',
    tags: ['weather', 'forecast', 'live'],
    body: 'Check three days in one visit for a bonus stipend.',
  },
  {
    id: 'd11',
    title: 'RhinoFM radio',
    url: 'rn:radio',
    snippet: 'Lo-Fi Rhino, Packet Storm, Dial-Up Dreams.',
    tags: ['radio', 'audio', 'fm'],
    body: 'Tune a station. Audio is fictional. Achievement on first tune.',
  },
  {
    id: 'd12',
    title: 'PocketWiki',
    url: 'rn:wiki',
    snippet: 'Articles about RhinoNet, coins, smileware, quests.',
    tags: ['wiki', 'docs', 'lore'],
    body: 'Each article read pays RhinoCoins and counts toward scholar quest.',
  },
  {
    id: 'd13',
    title: 'Job Board startups',
    url: 'rn:jobs',
    snippet: 'Chief Vibes Officer and Tab Wrangler openings.',
    tags: ['jobs', 'work', 'apply'],
    body: 'Applications are instant. HR is a shell script.',
  },
  {
    id: 'd14',
    title: 'Relay Chat bot',
    url: 'rn:chat',
    snippet: 'Keyword bot: help, quest, coin, smile, wiki.',
    tags: ['chat', 'bot', 'relay'],
    body: 'Five messages unlock a quest. The bot cannot leave your tab.',
  },
  {
    id: 'd15',
    title: 'Cipher Drill typing',
    url: 'rn:hack',
    snippet: 'Type phrases before the timer bar empties.',
    tags: ['hack', 'cipher', 'typing', 'game'],
    body: 'Score 70+ for quest credit and cipher runner achievement.',
  },
  {
    id: 'd16',
    title: 'Net Map topology',
    url: 'rn:map',
    snippet: 'Visual map of every rn: destination.',
    tags: ['map', 'navigation', 'graph'],
    body: 'Tap nodes to route the browser instantly.',
  },
  {
    id: 'd17',
    title: 'Quest Board contracts',
    url: 'rn:quests',
    snippet: 'Daily stipend plus ten one-time contracts.',
    tags: ['quests', 'rewards', 'daily'],
    body: 'Quests read stats from your save. Turn in when ready.',
  },
];

export function searchDocs(q: string): SearchDoc[] {
  const terms = q
    .toLowerCase()
    .split(/\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (terms.length === 0) return SEARCH_DOCS;

  const score = (d: SearchDoc) => {
    const hay = `${d.title} ${d.snippet} ${d.tags.join(' ')} ${d.body}`.toLowerCase();
    let s = 0;
    for (const t of terms) {
      if (d.title.toLowerCase().includes(t)) s += 5;
      if (d.tags.some((tag) => tag.includes(t))) s += 3;
      if (hay.includes(t)) s += 1;
    }
    return s;
  };

  return SEARCH_DOCS.map((d) => ({ d, s: score(d) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.d);
}
