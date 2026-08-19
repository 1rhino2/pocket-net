import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGame } from '../../game/GameContext';

// classic minesweeper. left click reveals, flood fill on zeros, flag with a
// long-ish second click. win = every safe cell open. first win pays once.

type Level = 'easy' | 'medium' | 'hard';
const LEVELS: Record<Level, { rows: number; cols: number; mines: number }> = {
  easy: { rows: 9, cols: 9, mines: 10 },
  medium: { rows: 12, cols: 12, mines: 24 },
  hard: { rows: 14, cols: 16, mines: 44 },
};

type Cell = {
  mine: boolean;
  near: number;
  open: boolean;
  flag: boolean;
};

function build(rows: number, cols: number, mines: number, safeR: number, safeC: number): Cell[][] {
  const grid: Cell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ mine: false, near: 0, open: false, flag: false })),
  );
  // dont put a mine on the first click or its neighbours, so the first click always opens something
  const banned = new Set<string>();
  for (let dr = -1; dr <= 1; dr++)
    for (let dc = -1; dc <= 1; dc++) banned.add(`${safeR + dr},${safeC + dc}`);

  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (grid[r][c].mine || banned.has(`${r},${c}`)) continue;
    grid[r][c].mine = true;
    placed++;
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c].mine) continue;
      let n = 0;
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
          if (grid[nr][nc].mine) n++;
        }
      grid[r][c].near = n;
    }
  }
  return grid;
}

export function Minesweeper() {
  const { recordDiscovery, addCredits, unlockAchievement, setToast } = useGame();
  const [level, setLevel] = useState<Level>('easy');
  const cfg = LEVELS[level];
  const [grid, setGrid] = useState<Cell[][] | null>(null);
  const [state, setState] = useState<'ready' | 'playing' | 'won' | 'lost'>('ready');
  const [flags, setFlags] = useState(0);

  const reset = useCallback(() => {
    setGrid(null);
    setState('ready');
    setFlags(0);
  }, []);

  useEffect(() => {
    reset();
  }, [level, reset]);

  const revealed = useMemo(() => {
    if (!grid) return 0;
    let n = 0;
    for (const row of grid) for (const c of row) if (c.open) n++;
    return n;
  }, [grid]);

  function floodOpen(g: Cell[][], r: number, c: number) {
    const stack: [number, number][] = [[r, c]];
    while (stack.length) {
      const [cr, cc] = stack.pop()!;
      const cell = g[cr][cc];
      if (cell.open || cell.flag) continue;
      cell.open = true;
      if (cell.near === 0 && !cell.mine) {
        for (let dr = -1; dr <= 1; dr++)
          for (let dc = -1; dc <= 1; dc++) {
            const nr = cr + dr;
            const nc = cc + dc;
            if (nr < 0 || nc < 0 || nr >= cfg.rows || nc >= cfg.cols) continue;
            if (!g[nr][nc].open) stack.push([nr, nc]);
          }
      }
    }
  }

  function checkWin(g: Cell[][]) {
    for (const row of g) for (const c of row) if (!c.mine && !c.open) return false;
    return true;
  }

  function onReveal(r: number, c: number) {
    if (state === 'won' || state === 'lost') return;
    let g = grid;
    if (!g) {
      g = build(cfg.rows, cfg.cols, cfg.mines, r, c);
      setState('playing');
    } else {
      g = g.map((row) => row.map((cell) => ({ ...cell })));
    }
    const cell = g[r][c];
    if (cell.flag || cell.open) {
      setGrid(g);
      return;
    }
    if (cell.mine) {
      for (const row of g) for (const cc of row) if (cc.mine) cc.open = true;
      setGrid(g);
      setState('lost');
      setToast('Boom. Try again.', 2200);
      return;
    }
    floodOpen(g, r, c);
    setGrid(g);
    if (checkWin(g)) {
      setState('won');
      const isNew = recordDiscovery('game_minesweeper_win');
      if (isNew) {
        addCredits(40);
        unlockAchievement('minesweeper', 'Field Cleared');
        setToast('Field cleared. +40 RC', 3600);
      } else {
        setToast('Field cleared.', 2200);
      }
    }
  }

  function onFlag(e: React.MouseEvent, r: number, c: number) {
    e.preventDefault();
    if (!grid || state === 'won' || state === 'lost') return;
    const g = grid.map((row) => row.map((cell) => ({ ...cell })));
    const cell = g[r][c];
    if (cell.open) return;
    cell.flag = !cell.flag;
    setFlags((f) => f + (cell.flag ? 1 : -1));
    setGrid(g);
  }

  const face = state === 'lost' ? ':(' : state === 'won' ? 'B)' : ':)';

  return (
    <div className='mine'>
      <div className='mine-bar'>
        <div className='mine-count'>{String(Math.max(0, cfg.mines - flags)).padStart(3, '0')}</div>
        <button className='mine-face' onClick={reset} title='New game'>
          {face}
        </button>
        <select
          className='mine-level'
          value={level}
          onChange={(e) => setLevel(e.target.value as Level)}
        >
          <option value='easy'>Easy 9x9</option>
          <option value='medium'>Medium 12x12</option>
          <option value='hard'>Hard 14x16</option>
        </select>
      </div>

      <div
        className='mine-grid'
        style={{ gridTemplateColumns: `repeat(${cfg.cols}, 1fr)` }}
        onContextMenu={(e) => e.preventDefault()}
      >
        {Array.from({ length: cfg.rows }).map((_, r) =>
          Array.from({ length: cfg.cols }).map((__, c) => {
            const cell = grid?.[r]?.[c];
            const open = cell?.open;
            const cls = ['mine-cell'];
            if (open) cls.push('mine-cell-open');
            if (open && cell?.mine) cls.push('mine-cell-boom');
            let label = '';
            if (open) {
              if (cell?.mine) label = '*';
              else if (cell && cell.near > 0) label = String(cell.near);
            } else if (cell?.flag) {
              label = 'P';
            }
            if (open && cell && !cell.mine && cell.near > 0) cls.push(`mine-n${cell.near}`);
            return (
              <button
                key={`${r}-${c}`}
                className={cls.join(' ')}
                onClick={() => onReveal(r, c)}
                onContextMenu={(e) => onFlag(e, r, c)}
              >
                {label}
              </button>
            );
          }),
        )}
      </div>

      <p className='mine-hint'>
        Left click opens. Right click flags. {revealed > 0 ? `${revealed} open.` : 'First click is always safe.'}
      </p>
    </div>
  );
}
