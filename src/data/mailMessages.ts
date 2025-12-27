export type MailMessage = {
  id: string;
  from: string;
  subject: string;
  preview: string;
  body: string;
  urgent?: boolean;
};

export const MAIL_INBOX: MailMessage[] = [
  {
    id: 'm1',
    from: 'admin@rn.local',
    subject: 'Welcome to RhinoMail',
    preview: 'Your inbox is ready.',
    body:
      'Greetings operator.\n\n' +
      'RhinoMail is your home base for contracts and alerts. ' +
      'Read messages for quest credit.\n\n- Sysadmin',
  },
  {
    id: 'm2',
    from: 'billing@pixelmart.rn',
    subject: 'Receipt #8842',
    preview: 'Thanks for your order.',
    body:
      'Thank you for purchasing Abstract Hat (quantity: 1).\n\n' +
      'Total: 12 RC. Shipping: instant.\n\n' +
      'Questions? Reply to this thread.',
  },
  {
    id: 'm3',
    from: 'security@rn.local',
    subject: 'FREE_SMILE audit',
    preview: 'Containment recommended.',
    body:
      'We flagged FREE_SMILE.EXE on your desktop.\n\n' +
      'Quarantine improves integrity. Ignoring it is faster but costly.\n\n' +
      'Your call, operator.',
  },
  {
    id: 'm4',
    from: 'jobs@startup.rn',
    subject: 'You have 12 new matches',
    preview: 'Chief Vibes Officer wants you.',
    body:
      'Our algorithm matched you with:\n' +
      '- Clipboard historian\n' +
      '- Senior tab wrangler\n' +
      '- Packet weather intern\n\n' +
      'Apply on rn:jobs.',
  },
  {
    id: 'm5',
    from: 'relay@chat.rn',
    subject: 'Missed messages',
    preview: 'The bot is still waiting.',
    body:
      'Relay Chat has new prompts since your last visit.\n\n' +
      'Try saying: help, quest, coin, smile, wiki, radio.',
  },
  {
    id: 'm6',
    from: 'arcade@rn.local',
    subject: 'Hall of fame ping',
    preview: 'New personal best.',
    body:
      'Your best RhinoReflex run is on rn:status.\n\n' +
      'Cipher Drill scores sit beside it. Worth another round.',
  },
];
