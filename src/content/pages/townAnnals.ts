import type { AuthoredPage } from '../types';

/**
 * town_annals, keeps the town record as a hobby. Cross-references the paper
 * archive against what the net remembers, and the two rarely agree.
 *
 * Rule for these: the claim, then the source in parentheses. Distinguish what
 * is recorded from what is merely repeated. Leave a question open rather than
 * close it wrong.
 */
export const ANNALS_PAGES: AuthoredPage[] = [
  {
    slug: 'annals-index',
    title: 'Petersham Valley: a working record',
    author: 'town_annals',
    hour: 10,
    layout: 'broadsheet',
    tag: 'homepage',
    updated: '07 Feb 1999',
    search: 'town history record archive petersham valley genealogy',
    teaser: 'One person keeping the town record straight, one cross-reference at a time. What is written down versus what is merely repeated.',
    paragraphs: [
      `This is a working record of Petersham Valley, kept by one person, corrected in public, and never finished. A town record is not a book you close. It is an argument you keep having with the past until you both get tired.`,
      `My method is dull and I will not apologise for it. Every claim gets a source in parentheses. If the source is a document I name the document. If the source is somebody's memory I say so, because a thing recorded and a thing remembered are two different kinds of true, and confusing them is how a town starts believing its own myths.`,
      `The net has been a gift and a headache. People post what they remember, which is wonderful, and then the memory hardens into fact by repetition, which is dangerous, and half my work now is gently checking the net against the paper before the net wins by sheer volume.`,
      `I keep it open. When I cannot tell what happened I write "unresolved" and leave it, because a clean wrong answer does more damage than an honest gap. The gaps are where the real history is still breathing.`,
    ],
    footnote: `Petersham Valley record. Claims cited or marked unresolved. (compiler: town_annals)`,
    related: [{ label: 'The founding, such as we know it', url: 'rn:n-annals-founding' }],
  },

  {
    slug: 'annals-founding',
    title: 'The founding, as far as the paper goes',
    author: 'town_annals',
    hour: 11,
    layout: 'broadsheet',
    tag: 'history',
    updated: '14 Feb 1999',
    search: 'town founding date records disagree history valley',
    teaser: 'Two founding dates, two sources, and an honest refusal to pick one just to be tidy.',
    paragraphs: [
      `The town has two founding dates and I am not going to resolve them for you, because the honest answer is that both are defensible and anyone who tells you otherwise is selling a plaque.`,
      `The county register lists the incorporation (county register, 1798), which is a real legal date and the one on the town seal. But the mill had been running and the first families settled a full nine years earlier (parish burial records, 1789), and a place is arguably founded when people start living and dying in it, not when a clerk gets around to the paperwork.`,
      `So the seal says one thing and the graves say another, and I have come to love this disagreement, because it is the whole problem of history in one small town. Do you date a thing from when it legally became itself, or from when it actually started being itself?`,
      `I write both dates, both sources, and let the reader carry the tension, because the tension is the truth and the single tidy date is the lie. The valley was lived in before it was official, like most things worth recording.`,
    ],
    quote: `a place is founded when people start living and dying in it, not when a clerk gets to the paperwork`,
    footnote: `Petersham Valley record. Two dates, both cited, unresolved on purpose.`,
  },

  {
    slug: 'annals-the-mill',
    title: 'The mill, and what the net got wrong',
    author: 'town_annals',
    hour: 12,
    layout: 'broadsheet',
    tag: 'history',
    updated: '28 Feb 1999',
    search: 'mill fire history net memory wrong correction valley',
    teaser: 'A widely repeated story about the old mill fire, checked against the paper, gently demolished.',
    paragraphs: [
      `The most repeated story on the net about this town is the mill fire, and the most repeated version of it is wrong in three particulars, which I say with regret because it is a good story and the truth is duller.`,
      `The net says the mill burned in a single night in a great blaze (posted and reposted, no source). The insurance filing tells a slower, sadder tale (county claims ledger, dated): it burned in stages over a bad winter, a boiler failure and then neglect and then a second smaller fire that finished a building nobody could afford to save.`,
      `The net says twelve men lost their livelihoods that night. The payroll book lists nine, and two of those had already left for the city (mill payroll, final pages). The number twelve appears nowhere in any document and everywhere on the net, which is exactly how a myth announces itself, by being rounder than the records.`,
      `I am not trying to spoil anyone's story. I am trying to make sure that in fifty years, when the last person who could correct it is gone, the record still says nine and still says winter, and not twelve and a single dramatic night. The drama is free to survive as legend. It just does not get to be the record.`,
    ],
    footnote: `Petersham Valley record. Mill fire: winter, in stages, nine men. (county claims ledger, mill payroll)`,
  },

  {
    slug: 'annals-the-missing-year',
    title: 'The year the paper record skips',
    author: 'town_annals',
    hour: 9,
    layout: 'broadsheet',
    tag: 'history',
    updated: '16 Mar 1999',
    search: 'missing records gap year archive fire lost history',
    teaser: 'There is a year the town simply has no paper for. She refuses to guess what filled it.',
    paragraphs: [
      `There is a year this town has almost no paper for, and I have learned to sit with that gap instead of filling it, which is the hardest discipline in this whole hobby.`,
      `The town clerk's records skip most of one year (town minutes, with the gap plainly visible). A courthouse damp problem took a shelf of documents sometime after, which is the likeliest dull explanation, and dull explanations are usually the right ones.`,
      `The temptation is to reconstruct the year from the years around it, to assume it was much like its neighbours, and that temptation is exactly the enemy. A reconstructed record looks identical to a real one and is worth nothing, because it tells you only what you already assumed.`,
      `So the year stays mostly blank in my record, marked "documents lost," and I would rather hand the future an honest hole than a confident invention. Someone may yet find a box in an attic that fills it. Until then the gap is the most truthful thing on the page.`,
    ],
    footnote: `Petersham Valley record. One year: documents lost, not reconstructed. (town minutes)`,
  },

  {
    slug: 'annals-the-archive-loss',
    title: 'On the archive, and losing things quietly',
    author: 'town_annals',
    hour: 8,
    layout: 'broadsheet',
    tag: 'history',
    updated: '24 Mar 1999',
    search: 'user archive loss march records disappear parallel history',
    teaser: 'A historian watches the net lose a chunk of its own record in March and recognizes the shape of it.',
    paragraphs: [
      `I want to note, for the record I keep, that this net lost a piece of its own history this spring, and that I recognised the shape of the loss immediately, because it is the shape I spend my hobby fighting.`,
      `A volunteer kept a user archive here, carefully, the way I keep the town, and one night in March a block of it went missing and she stopped posting (net archive, gap dated to 11 March). I never met her. I know her only by the quality of her work, which was the quality of someone who understood that lost is different from deleted.`,
      `Deleted is loud. Someone decides, someone acts, there is a before and an after you can point to. Lost is quiet. A thing is simply not there one morning and no one can say when it left, and the not-knowing is the whole injury, because you cannot even properly grieve a date you do not have.`,
      `I have added a single line to my town record about it, cross-referenced to her index, because a historian's job is to make sure that even the losses get recorded as losses. If you go looking, her own account is at rn:n-angel-index, and it is worth your time. She wrote about disappearance better than I ever will.`,
    ],
    footnote: `Petersham Valley record. The net archive loss of March 1999, noted as a loss. (net archive)`,
    related: [{ label: "The archivist's own index", url: 'rn:n-angel-index' }],
  },

  {
    slug: 'annals-genealogy-request',
    title: 'How to ask me to find your people',
    author: 'town_annals',
    hour: 13,
    layout: 'card',
    tag: 'genealogy',
    updated: '11 Mar 1999',
    search: 'genealogy family history request records help ancestors',
    teaser: 'Requests to trace a family, and the plain limits of what the paper can and cannot tell you.',
    paragraphs: [
      `People write to ask me to find their people in the valley, and I love these letters, and I want to set out what I can actually do before you get your hopes up, because hope is the thing I most hate to disappoint.`,
      `If your family owned land, married in the parish, or died here, I can very likely find them (deeds, parish register, burial records). Property, marriage, and death are the three things a town writes down reliably, because all three involve money or God and usually both.`,
      `If your family rented, moved through, or kept to themselves, the paper may hold nothing at all, and that absence is not a verdict on them. The record favours the settled and the propertied, and a whole honest life can pass through a town leaving no ink, which is a quiet injustice I can name but not fix.`,
      `So send me the name and the closest date you have, and I will tell you honestly what the paper holds, including when it holds nothing. A real "I could not find them" is worth more than a hopeful maybe, because you can build on the truth and you can only stumble on the maybe.`,
    ],
    footnote: `Petersham Valley record. Property, marriage, death: reliably written. The rest: send the name.`,
  },

  {
    slug: 'annals-why-bother',
    title: 'Why keep a record nobody assigned you',
    author: 'town_annals',
    hour: 21,
    layout: 'broadsheet',
    tag: 'notes',
    updated: '02 Apr 1999',
    search: 'why keep records history hobby purpose town memory',
    teaser: 'The quiet case for one person keeping a record no institution asked for.',
    paragraphs: [
      `Somebody asked me, not unkindly, why I bother, since no institution assigned me this and no one pays me and the town would go on turning if I stopped tomorrow. It is a fair question and I have thought about the answer for years.`,
      `Institutions keep the records they are required to keep, which are the records that serve the institution, which are property and money and law. Those matter and I use them daily. But they are not the town. The town is also the mill workers whose number got rounded up, the family the deeds never mention, the year the damp took.`,
      `A person keeps the other record. The one that notices what the required records leave out, and marks the gaps as gaps, and refuses to let repetition harden into fact. It is unglamorous and it is unpaid and it is, I have come to think, the actual work, the part no institution will ever do because no institution is embarrassed by a hole in its own story.`,
      `So I bother because someone has to be embarrassed on the town's behalf, has to feel the missing year as a wound and not a footnote. When I am gone I hope someone finds this dull and necessary and picks it up, and keeps citing sources, and keeps leaving the honest gaps open. That is the whole inheritance. A record, and the discipline to keep it true.`,
    ],
    quote: `someone has to be embarrassed on the town's behalf`,
    footnote: `Petersham Valley record. Kept because someone has to. (compiler: town_annals)`,
  },
];
