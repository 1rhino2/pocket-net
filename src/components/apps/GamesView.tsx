import { useState } from 'react';
import { Minesweeper } from './Minesweeper';
import { Solitaire } from './Solitaire';

// the Games window is just a tab strip over the two real games
type Tab = 'minesweeper' | 'solitaire';

export function GamesView() {
  const [tab, setTab] = useState<Tab>('minesweeper');
  return (
    <div className='games-app'>
      <div className='games-tabs'>
        <button
          className={`games-tab ${tab === 'minesweeper' ? 'games-tab-on' : ''}`}
          onClick={() => setTab('minesweeper')}
        >
          Minesweeper
        </button>
        <button
          className={`games-tab ${tab === 'solitaire' ? 'games-tab-on' : ''}`}
          onClick={() => setTab('solitaire')}
        >
          Solitaire
        </button>
      </div>
      <div className='games-body'>{tab === 'minesweeper' ? <Minesweeper /> : <Solitaire />}</div>
    </div>
  );
}
