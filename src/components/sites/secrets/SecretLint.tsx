import { useState } from 'react';
import type { NetUrl } from '../../../types';

type Props = {
  onNavigate: (url: NetUrl) => void;
};

const VERSES = [
  'Blessed are the trailing spaces, for they shall inherit the diff.',
  'Thou shalt not mix tabs and mercy in the same scrollback.',
  'The moderator sees your whitespace before your soul.',
  'Indent with love. Outdent with trembling.',
];

const ADS = [
  { head: 'FOR SALE', body: 'One pristine tab key. Never used. Serious offers only.' },
  { head: 'LOST', body: 'Semicolon found in production. Owner may collect at forum desk.' },
  { head: 'SERVICES', body: 'Confession booth for merge conflicts. No judgment before coffee.' },
];

export function SecretLint({ onNavigate }: Props) {
  const [tab, setTab] = useState<'spaces' | 'tabs'>('spaces');
  const [amen, setAmen] = useState(0);

  return (
    <div className='secret secret-lint'>
      <div className='lint-paper'>
        <header className='lint-masthead'>
          <p className='lint-masthead-kicker'>Rhino County · Vol. MMXXIV · Extra</p>
          <h1 className='lint-masthead-title'>The Lint Cathedral Gazette</h1>
          <p className='lint-masthead-sub'>All the whitespace fit to print</p>
        </header>
        <div className='lint-columns'>
          <div className='lint-col'>
            <h2>Editorial</h2>
            <p>
              Pilgrims still argue under stone headers. Today the dogma is{' '}
              <strong>{tab === 'spaces' ? 'two spaces' : 'hard tabs'}</strong>. File your amens below.
            </p>
            <div className='lint-dogma-btns'>
              <button
                type='button'
                className={tab === 'spaces' ? 'lint-dogma active' : 'lint-dogma'}
                onClick={() => setTab('spaces')}
              >
                Spaces
              </button>
              <button
                type='button'
                className={tab === 'tabs' ? 'lint-dogma active' : 'lint-dogma'}
                onClick={() => setTab('tabs')}
              >
                Tabs
              </button>
            </div>
            <button type='button' className='lint-amen-btn' onClick={() => setAmen((n) => n + 1)}>
              File amen ({amen})
            </button>
          </div>
          <div className='lint-col'>
            <h2>Sacred verses</h2>
            <ul className='lint-verse-list'>
              {VERSES.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
          <div className='lint-col'>
            <h2>Classified</h2>
            {ADS.map((a) => (
              <div className='lint-ad' key={a.head}>
                <strong>{a.head}</strong>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
        <footer className='lint-paper-foot'>
          <button type='button' onClick={() => onNavigate('rn:forum')}>
            Return to Forum
          </button>
          <button type='button' onClick={() => onNavigate('rn:hack')}>
            Cipher drill
          </button>
        </footer>
      </div>
    </div>
  );
}
