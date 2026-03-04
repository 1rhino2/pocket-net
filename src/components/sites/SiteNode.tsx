import { useEffect, type ReactNode } from 'react';
import { microNodePage } from '../../data/contentEngine';
import type { NodeLayout } from '../../data/nodes/handbuiltTypes';
import { useGame } from '../../game/GameContext';
import type { NodeNetUrl, NetUrl } from '../../types';

type Props = {
  url: NodeNetUrl;
  onNavigate: (url: NetUrl) => void;
};

type NodePage = NonNullable<ReturnType<typeof microNodePage>>;

function NodeExtras({ page }: { page: NodePage }) {
  return (
    <>
      {page.quote ? <blockquote className='node-quote'>{page.quote}</blockquote> : null}
      {page.bullets && page.bullets.length > 0 ? (
        <ul className='node-bullets'>
          {page.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      ) : null}
      {page.footnote ? <p className='node-footnote'>{page.footnote}</p> : null}
    </>
  );
}

function NodeCore({
  page,
  url,
  onNavigate,
}: {
  page: NodePage;
  url: NodeNetUrl;
  onNavigate: (url: NetUrl) => void;
}) {
  return (
    <>
      <span className='node-tag-pill'>{page.tag}</span>
      <h1>{page.title}</h1>
      <p className='node-url'>{url}</p>
      <div className='node-prose'>
        {page.paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <NodeExtras page={page} />
      <div className='row node-actions'>
        <button type='button' className='btn btn-primary' onClick={() => onNavigate('rn:shift')}>
          Net Index
        </button>
        <button type='button' className='btn' onClick={() => onNavigate('rn:search')}>
          Search
        </button>
        <button type='button' className='btn' onClick={() => onNavigate('rn:discover')}>
          Discovery Log
        </button>
      </div>
    </>
  );
}

function NodeShell({
  layout,
  page,
  url,
  onNavigate,
  chapterAttr,
}: {
  layout: NodeLayout;
  page: NodePage;
  url: NodeNetUrl;
  onNavigate: (url: NetUrl) => void;
  chapterAttr: Record<string, string>;
}) {
  const core = <NodeCore page={page} url={url} onNavigate={onNavigate} />;

  if (layout === 'drift') {
    return (
      <div className='site site-node' {...chapterAttr} data-drift='true' data-layout='drift'>
        <div className='node-drift-wrap'>
          <span className='node-drift-badge'>FIXED DRIFT SHELF</span>
          {core}
        </div>
      </div>
    );
  }

  const wrap = (className: string, extra?: ReactNode) => (
    <div className={className}>
      {extra}
      {core}
    </div>
  );

  let inner: ReactNode;
  switch (layout) {
    case 'fax':
      inner = wrap('node-fax-page');
      break;
    case 'bbs':
      inner = wrap('node-bbs-screen', <div className='node-bbs-bar'>RHINONET BBS · READ ONLY</div>);
      break;
    case 'telegram':
      inner = wrap('node-telegram-slip');
      break;
    case 'receipt':
      inner = wrap('node-receipt-slip', <div className='node-receipt-store'>RHINONET ROUTE CO.</div>);
      break;
    case 'report':
      inner = (
        <>
          <div className='node-report-head'>Field report · {page.tag}</div>
          <div className='node-report-body'>{core}</div>
        </>
      );
      break;
    case 'broadsheet':
      inner = wrap('node-broadsheet', <div className='node-broadsheet-mast'>RHINONET DISPATCH</div>);
      break;
    case 'warrant':
      inner = wrap('node-warrant', <div className='node-warrant-seal'>ROUTING WARRANT</div>);
      break;
    case 'label':
      inner = wrap('node-label', <div className='node-label-barcode'>||||| |||| |||||</div>);
      break;
    case 'ticket':
      inner = wrap('node-ticket', <div className='node-ticket-stub'>ADMIT ONE · ROUTE</div>);
      break;
    case 'manifest':
      inner = wrap('node-manifest', <div className='node-manifest-header'>CARGO MANIFEST</div>);
      break;
    case 'blotter':
      inner = wrap('node-blotter', <div className='node-blotter-header'>DESK BLOTTER</div>);
      break;
    case 'card':
    default:
      inner = wrap('node-sheet');
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
      <div className='site site-node' data-drift='true'>
        <div className='node-drift-wrap'>
          <h1>Unknown node</h1>
          <p className='lead'>This route is not in the net index.</p>
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
