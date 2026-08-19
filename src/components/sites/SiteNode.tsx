import { useEffect, useState, type ReactNode } from 'react';
import { microNodePage } from '../../data/contentEngine';
import type { NodeLayout } from '../../data/nodes/handbuiltTypes';
import { useGame } from '../../game/GameContext';
import type { NodeNetUrl, NetUrl } from '../../types';

/** loose match: case, spaces and punctuation should never be the puzzle */
function answerMatches(given: string, want: string) {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '');
  const g = norm(given);
  return g.length > 0 && (g === norm(want) || g === 'the' + norm(want));
}

/**
 * The locked page. The answer is a word xerox_angel uses in plain sight on
 * three separate pages, so anybody who actually read the net already has it,
 * and nobody who skipped to the end can brute force it out of the prompt.
 */
function VaultLock({ page }: { page: NonNullable<ReturnType<typeof microNodePage>> }) {
  const { snapshot, recordDiscovery, addCredits, unlockAchievement, setToast } = useGame();
  const lock = page.lock!;
  const alreadyOpen = snapshot.discovered.includes(lock.discoveryId);
  const [open, setOpen] = useState(alreadyOpen);
  const [value, setValue] = useState('');
  const [missed, setMissed] = useState(false);

  useEffect(() => {
    if (alreadyOpen) setOpen(true);
  }, [alreadyOpen]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!answerMatches(value, lock.answer)) {
      setMissed(true);
      setToast('That is not the word.', 2600);
      return;
    }
    setOpen(true);
    // recordDiscovery returns false if this profile already had it, so a
    // reload cannot be farmed for the reward
    const isNew = recordDiscovery(lock.discoveryId);
    if (isNew) {
      addCredits(lock.reward);
      unlockAchievement('hollow_night', 'The Hollow Night');
      setToast(`Archive recovery open. +${lock.reward} RC`, 4200);
    }
  }

  if (open) {
    const u = page.unlocked;
    return (
      <div className='node-vault-open'>
        {u?.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {u?.quote ? <blockquote className='node-quote'>{u.quote}</blockquote> : null}
        {u?.footnote ? <p className='node-footnote'>{u.footnote}</p> : null}
      </div>
    );
  }

  return (
    <form className='node-vault-lock' onSubmit={submit}>
      <label htmlFor='vault-answer'>{lock.question}</label>
      <div className='node-vault-row'>
        <input
          id='vault-answer'
          className='field'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete='off'
          spellCheck={false}
        />
        <button type='submit' className='btn btn-primary'>
          Open
        </button>
      </div>
      {missed ? <p className='node-vault-nudge'>{lock.nudge}</p> : null}
    </form>
  );
}

type Props = {
  url: NodeNetUrl;
  onNavigate: (url: NetUrl) => void;
};

type NodePage = NonNullable<ReturnType<typeof microNodePage>>;

/*
 * Every layout used to be the same prose in a different coloured box, under a
 * fixed label that had nothing to do with the page: an equipment inventory
 * came out headed CARGO MANIFEST, a guestbook came out headed ADMIT ONE.
 *
 * Now the form actually shapes the document. A fax gets a routing block and a
 * page count, a BBS post gets a message header and a quoted body, a telegram
 * loses its lowercase, a manifest renders its bullets as a real table, a
 * blotter hangs its timestamps in the margin. The header text is built from
 * the page's own author, tag and date rather than a hardcoded string.
 */

function Byline({ page }: { page: NodePage }) {
  if (!page.author && !page.updated) return null;
  return (
    <p className='node-byline'>
      {page.author ? <span className='node-byline-who'>{page.author}</span> : null}
      {page.updated ? <span className='node-byline-when'>last updated {page.updated}</span> : null}
    </p>
  );
}

function Prose({ page }: { page: NodePage }) {
  return (
    <div className='node-prose'>
      {page.paragraphs.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
}

/** bullets as a plain list, the default for most forms */
function Bullets({ page }: { page: NodePage }) {
  if (!page.bullets || page.bullets.length === 0) return null;
  return (
    <ul className='node-bullets'>
      {page.bullets.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  );
}

/**
 * A manifest's bullets are records, not prose. Split on the first colon so the
 * label and the value land in their own columns and the numbers line up, which
 * is the entire reason a manifest is a table and not a list.
 */
function ManifestTable({ page }: { page: NodePage }) {
  if (!page.bullets || page.bullets.length === 0) return null;
  return (
    <table className='node-manifest-table'>
      <tbody>
        {page.bullets.map((b) => {
          const at = b.indexOf(':');
          const label = at > 0 ? b.slice(0, at) : b;
          const value = at > 0 ? b.slice(at + 1).trim() : '';
          return (
            <tr key={b}>
              <th scope='row'>{label}</th>
              <td>{value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function Tail({ page, url, onNavigate }: { page: NodePage; url: NodeNetUrl; onNavigate: (u: NetUrl) => void }) {
  return (
    <>
      {page.footnote ? <p className='node-footnote'>{page.footnote}</p> : null}
      <p className='node-url'>{url}</p>
      <div className='row node-actions'>
        <button type='button' className='btn' onClick={() => onNavigate('rn:shift')}>
          Net Index
        </button>
        <button type='button' className='btn' onClick={() => onNavigate('rn:search')}>
          Search
        </button>
      </div>
    </>
  );
}

function NodeShell({ layout, page, url, onNavigate, chapterAttr }: {
  layout: NodeLayout;
  page: NodePage;
  url: NodeNetUrl;
  onNavigate: (url: NetUrl) => void;
  chapterAttr: Record<string, string>;
}) {
  const who = page.author ?? 'unknown';
  const when = page.updated ?? '';
  const tail = <Tail page={page} url={url} onNavigate={onNavigate} />;
  const quote = page.quote ? <blockquote className='node-quote'>{page.quote}</blockquote> : null;

  let inner: ReactNode;

  switch (layout) {
    case 'fax':
      inner = (
        <div className='node-fax-page'>
          <div className='node-fax-rule' aria-hidden />
          <dl className='node-fax-head'>
            <div><dt>FROM</dt><dd>{who}</dd></div>
            <div><dt>DATE</dt><dd>{when}</dd></div>
            <div><dt>RE</dt><dd>{page.title}</dd></div>
          </dl>
          <Prose page={page} />
          <Bullets page={page} />
          {quote}
          {tail}
        </div>
      );
      break;

    case 'manifest':
      inner = (
        <div className='node-manifest'>
          <div className='node-manifest-header'>
            <strong>{page.title}</strong>
            <span>{when}</span>
          </div>
          <Prose page={page} />
          <ManifestTable page={page} />
          {quote}
          {tail}
        </div>
      );
      break;

    case 'bbs':
      inner = (
        <div className='node-bbs-screen'>
          <div className='node-bbs-bar'>
            <span>Msg from {who}</span>
            <span>{when}</span>
          </div>
          <h1 className='node-bbs-subject'>{page.title}</h1>
          <Prose page={page} />
          <Bullets page={page} />
          {quote}
          {tail}
        </div>
      );
      break;

    case 'telegram':
      /* caps and STOP live in the copy itself, the form just stops fighting it */
      inner = (
        <div className='node-telegram-slip'>
          <div className='node-telegram-head'>
            <span>RHINONET TELEGRAM</span>
            <span>{when}</span>
          </div>
          <h1>{page.title}</h1>
          <Prose page={page} />
          <Bullets page={page} />
          {tail}
        </div>
      );
      break;

    case 'blotter':
      inner = (
        <div className='node-blotter'>
          <div className='node-blotter-header'>
            <strong>{page.title}</strong>
            <span>{who} · {when}</span>
          </div>
          <Prose page={page} />
          <Bullets page={page} />
          {quote}
          {tail}
        </div>
      );
      break;

    case 'report':
      inner = (
        <div className='node-report'>
          <div className='node-report-head'>{page.tag}</div>
          <div className='node-report-body'>
            <h1>{page.title}</h1>
            <Byline page={page} />
            <Prose page={page} />
            <Bullets page={page} />
            {quote}
            {tail}
          </div>
        </div>
      );
      break;

    case 'broadsheet':
      inner = (
        <div className='node-broadsheet'>
          <div className='node-broadsheet-mast'>{page.title}</div>
          <Byline page={page} />
          <Prose page={page} />
          <Bullets page={page} />
          {quote}
          {tail}
        </div>
      );
      break;

    case 'warrant':
      inner = (
        <div className='node-warrant'>
          <div className='node-warrant-seal'>RESTRICTED</div>
          <h1>{page.title}</h1>
          <Byline page={page} />
          <Prose page={page} />
          {quote}
          <Bullets page={page} />
          {page.lock ? <VaultLock page={page} /> : null}
          {tail}
        </div>
      );
      break;

    case 'ticket':
      inner = (
        <div className='node-ticket'>
          <div className='node-ticket-stub'>{page.tag}</div>
          <h1>{page.title}</h1>
          <Byline page={page} />
          <Prose page={page} />
          <Bullets page={page} />
          {tail}
        </div>
      );
      break;

    case 'receipt':
      inner = (
        <div className='node-receipt-slip'>
          <div className='node-receipt-store'>{page.title}</div>
          <Prose page={page} />
          <Bullets page={page} />
          {tail}
        </div>
      );
      break;

    case 'label':
      inner = (
        <div className='node-label'>
          <div className='node-label-barcode' aria-hidden>||||| |||| ||| ||||| ||</div>
          <h1>{page.title}</h1>
          <Byline page={page} />
          <Prose page={page} />
          <Bullets page={page} />
          {quote}
          {tail}
        </div>
      );
      break;

    case 'drift':
      inner = (
        <div className='node-drift-wrap'>
          <h1>{page.title}</h1>
          <Byline page={page} />
          <Prose page={page} />
          <Bullets page={page} />
          {tail}
        </div>
      );
      break;

    case 'card':
    default:
      inner = (
        <div className='node-sheet'>
          <span className='node-tag-pill'>{page.tag}</span>
          <h1>{page.title}</h1>
          <Byline page={page} />
          <Prose page={page} />
          {quote}
          <Bullets page={page} />
          {tail}
        </div>
      );
      break;
  }

  return (
    <div className='site site-node' {...chapterAttr} data-layout={layout}>
      {inner}
    </div>
  );
}

export function SiteNode({ url, onNavigate }: Props) {
  const { recordNodeVisit } = useGame();
  const page = microNodePage(url);

  useEffect(() => {
    recordNodeVisit(url);
  }, [url, recordNodeVisit]);

  if (!page) {
    return (
      <div className='site site-node' data-layout='drift'>
        <div className='node-drift-wrap'>
          <h1>Not Found</h1>
          <p className='lead'>The requested address was not found on this server.</p>
          <button type='button' className='btn' onClick={() => onNavigate('rn:shift')}>
            Net Index
          </button>
        </div>
      </div>
    );
  }

  const chapterAttr: Record<string, string> =
    page.chapter !== undefined ? { 'data-chapter': String(page.chapter) } : {};

  return (
    <NodeShell layout={page.layout} page={page} url={url} onNavigate={onNavigate} chapterAttr={chapterAttr} />
  );
}
