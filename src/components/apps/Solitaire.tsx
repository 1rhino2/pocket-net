import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGame } from '../../game/GameContext';

// klondike solitaire, draw one, click to move. select a card (waste top or a
// face-up tableau card and everything on it), then click a destination. double
// click sends a card to a foundation if it fits. first win pays once.

type Suit = 'S' | 'H' | 'D' | 'C';
type Card = { suit: Suit; rank: number; up: boolean; id: string };

const SUITS: Suit[] = ['S', 'H', 'D', 'C'];
const RANKS = ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const isRed = (s: Suit) => s === 'H' || s === 'D';
const glyph: Record<Suit, string> = { S: '♠', H: '♥', D: '♦', C: '♣' };

type Sel = { pile: 'waste' | `t${number}`; idx: number } | null;

type Deal = {
  stock: Card[];
  waste: Card[];
  foundations: Card[][];
  tableau: Card[][];
};

function freshDeal(): Deal {
  const deck: Card[] = [];
  for (const s of SUITS)
    for (let r = 1; r <= 13; r++) deck.push({ suit: s, rank: r, up: false, id: `${s}${r}` });
  // shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  const tableau: Card[][] = [[], [], [], [], [], [], []];
  let k = 0;
  for (let col = 0; col < 7; col++) {
    for (let n = 0; n <= col; n++) {
      const card = deck[k++];
      card.up = n === col;
      tableau[col].push(card);
    }
  }
  const stock = deck.slice(k).map((c) => ({ ...c, up: false }));
  return { stock, waste: [], foundations: [[], [], [], []], tableau };
}

function clone(d: Deal): Deal {
  return {
    stock: d.stock.map((c) => ({ ...c })),
    waste: d.waste.map((c) => ({ ...c })),
    foundations: d.foundations.map((f) => f.map((c) => ({ ...c }))),
    tableau: d.tableau.map((t) => t.map((c) => ({ ...c }))),
  };
}

function canStackTableau(moving: Card, onto: Card | undefined) {
  if (!onto) return moving.rank === 13; // empty column takes a king
  return onto.up && isRed(onto.suit) !== isRed(moving.suit) && onto.rank === moving.rank + 1;
}

function canStackFoundation(moving: Card, top: Card | undefined) {
  if (!top) return moving.rank === 1;
  return top.suit === moving.suit && top.rank === moving.rank - 1;
}

export function Solitaire() {
  const { recordDiscovery, addCredits, unlockAchievement, setToast } = useGame();
  const [deal, setDeal] = useState<Deal>(() => freshDeal());
  const [sel, setSel] = useState<Sel>(null);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const reset = useCallback(() => {
    setDeal(freshDeal());
    setSel(null);
    setMoves(0);
    setWon(false);
  }, []);

  const foundationCount = useMemo(
    () => deal.foundations.reduce((n, f) => n + f.length, 0),
    [deal],
  );

  useEffect(() => {
    if (!won && foundationCount === 52) {
      setWon(true);
      const isNew = recordDiscovery('game_solitaire_win');
      if (isNew) {
        addCredits(60);
        unlockAchievement('solitaire', 'Patience Rewarded');
        setToast('Solitaire solved. +60 RC', 3800);
      } else {
        setToast('Solitaire solved.', 2200);
      }
    }
  }, [foundationCount, won, recordDiscovery, addCredits, unlockAchievement, setToast]);

  function draw() {
    setSel(null);
    setDeal((d) => {
      const n = clone(d);
      if (n.stock.length === 0) {
        n.stock = n.waste.reverse().map((c) => ({ ...c, up: false }));
        n.waste = [];
      } else {
        const card = n.stock.pop()!;
        card.up = true;
        n.waste.push(card);
      }
      return n;
    });
    setMoves((m) => m + 1);
  }

  // the cards being carried given a selection
  function movingCards(d: Deal, s: NonNullable<Sel>): Card[] {
    if (s.pile === 'waste') return d.waste.slice(-1);
    const col = Number(s.pile.slice(1));
    return d.tableau[col].slice(s.idx);
  }

  function removeSelected(n: Deal, s: NonNullable<Sel>) {
    if (s.pile === 'waste') {
      n.waste.pop();
      return;
    }
    const col = Number(s.pile.slice(1));
    n.tableau[col] = n.tableau[col].slice(0, s.idx);
    const t = n.tableau[col];
    if (t.length && !t[t.length - 1].up) t[t.length - 1].up = true;
  }

  function tryMoveToTableau(col: number) {
    if (!sel) return false;
    let ok = false;
    setDeal((d) => {
      const carried = movingCards(d, sel);
      if (carried.length === 0) return d;
      const dest = d.tableau[col];
      if (!canStackTableau(carried[0], dest[dest.length - 1])) return d;
      const n = clone(d);
      removeSelected(n, sel);
      n.tableau[col] = [...n.tableau[col], ...carried.map((c) => ({ ...c, up: true }))];
      ok = true;
      return n;
    });
    if (ok) {
      setMoves((m) => m + 1);
      setSel(null);
    }
    return ok;
  }

  function tryMoveToFoundation(fi: number) {
    if (!sel) return false;
    let ok = false;
    setDeal((d) => {
      const carried = movingCards(d, sel);
      if (carried.length !== 1) return d; // only single cards to foundation
      const f = d.foundations[fi];
      if (!canStackFoundation(carried[0], f[f.length - 1])) return d;
      const n = clone(d);
      removeSelected(n, sel);
      n.foundations[fi] = [...n.foundations[fi], { ...carried[0], up: true }];
      ok = true;
      return n;
    });
    if (ok) {
      setMoves((m) => m + 1);
      setSel(null);
    }
    return ok;
  }

  // double click: auto send to any foundation that accepts it
  function autoFoundation(pile: 'waste' | `t${number}`, idx: number) {
    const card = pile === 'waste' ? deal.waste[deal.waste.length - 1] : deal.tableau[Number(pile.slice(1))][idx];
    if (!card) return;
    const isTop =
      pile === 'waste'
        ? true
        : idx === deal.tableau[Number(pile.slice(1))].length - 1;
    if (!isTop) return;
    for (let fi = 0; fi < 4; fi++) {
      const f = deal.foundations[fi];
      if (canStackFoundation(card, f[f.length - 1])) {
        let ok = false;
        setDeal((d) => {
          const cur = pile === 'waste' ? d.waste.slice(-1) : d.tableau[Number(pile.slice(1))].slice(idx);
          if (cur.length !== 1) return d;
          const ff = d.foundations[fi];
          if (!canStackFoundation(cur[0], ff[ff.length - 1])) return d;
          const n = clone(d);
          removeSelected(n, { pile, idx });
          n.foundations[fi] = [...n.foundations[fi], { ...cur[0], up: true }];
          ok = true;
          return n;
        });
        if (ok) {
          setMoves((m) => m + 1);
          setSel(null);
        }
        return;
      }
    }
  }

  function clickTableauCard(col: number, idx: number) {
    const card = deal.tableau[col][idx];
    if (!card.up) return;
    if (sel) {
      // clicking a card in a column targets that column as destination
      if (tryMoveToTableau(col)) return;
    }
    setSel({ pile: `t${col}`, idx });
  }

  function clickEmptyColumn(col: number) {
    if (sel) tryMoveToTableau(col);
  }

  function clickWaste() {
    const top = deal.waste.length - 1;
    if (top < 0) return;
    setSel({ pile: 'waste', idx: top });
  }

  function selMatches(pile: string, idx: number) {
    return sel && sel.pile === pile && sel.idx <= idx;
  }

  function cardFace(c: Card) {
    return (
      <span className={isRed(c.suit) ? 'sol-red' : 'sol-black'}>
        {RANKS[c.rank]}
        {glyph[c.suit]}
      </span>
    );
  }

  return (
    <div className='sol'>
      <div className='sol-bar'>
        <button className='sol-btn' onClick={reset}>
          New deal
        </button>
        <span className='sol-moves'>{moves} moves</span>
        <span className='sol-moves'>{foundationCount}/52 home</span>
      </div>

      <div className='sol-top'>
        <div className='sol-stockwaste'>
          <button className='sol-pile sol-stock' onClick={draw} title='Draw'>
            {deal.stock.length ? <span className='sol-back'>{deal.stock.length}</span> : <span className='sol-empty'>{'↻'}</span>}
          </button>
          <button
            className={`sol-pile sol-waste ${sel?.pile === 'waste' ? 'sol-selected' : ''}`}
            onClick={clickWaste}
            onDoubleClick={() => autoFoundation('waste', deal.waste.length - 1)}
          >
            {deal.waste.length ? cardFace(deal.waste[deal.waste.length - 1]) : <span className='sol-empty' />}
          </button>
        </div>

        <div className='sol-foundations'>
          {deal.foundations.map((f, fi) => (
            <button
              key={fi}
              className='sol-pile sol-foundation'
              onClick={() => tryMoveToFoundation(fi)}
            >
              {f.length ? cardFace(f[f.length - 1]) : <span className='sol-fsuit'>{glyph[SUITS[fi]]}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className='sol-tableau'>
        {deal.tableau.map((col, ci) => (
          <div key={ci} className='sol-col'>
            {col.length === 0 ? (
              <button className='sol-slot' onClick={() => clickEmptyColumn(ci)} />
            ) : (
              col.map((card, ri) => (
                <button
                  key={card.id}
                  className={`sol-card ${card.up ? 'sol-up' : 'sol-down'} ${selMatches(`t${ci}`, ri) ? 'sol-selected' : ''}`}
                  style={{ top: `${ri * 22}px` }}
                  onClick={() => clickTableauCard(ci, ri)}
                  onDoubleClick={() => autoFoundation(`t${ci}`, ri)}
                >
                  {card.up ? cardFace(card) : <span className='sol-back' />}
                </button>
              ))
            )}
          </div>
        ))}
      </div>

      {won ? <p className='sol-win'>Solved. Deal another?</p> : <p className='sol-hint'>Click a card, then where it goes. Double click sends it home.</p>}
    </div>
  );
}
