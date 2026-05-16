import { useEffect, useMemo, useState } from 'react';
import { useGame } from '../../game/GameContext';
import { CART_STORAGE_KEY } from '../../game/gameTypes';

type Item = { id: string; name: string; price: string; blurb: string };

const ITEMS: Item[] = [
  { id: 'i1', name: 'Cursor beret', price: '12.404', blurb: 'Makes you look like you compile with intent.' },
  { id: 'i2', name: 'Certificate of Authenticity', price: '0.01', blurb: 'Authenticates authenticity. Very meta. Very legal-ish.' },
  { id: 'i3', name: 'Lag insurance', price: '9.99', blurb: 'Covers up to 3 frames of emotional latency per decade.' },
  { id: 'i4', name: 'ASCII shark', price: '3.50', blurb: 'Looks harmless until you print it on dot matrix paper.' },
];

function readCart(): Record<string, number> {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return {};
    const o = JSON.parse(raw) as Record<string, number>;
    if (!o || typeof o !== 'object') return {};
    return o;
  } catch {
    return {};
  }
}

export function SiteMart() {
  const { recordMartAdd } = useGame();
  const [cart, setCart] = useState<Record<string, number>>(readCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const total = useMemo(() => {
    let items = 0;
    for (const v of Object.values(cart)) items += v;
    return items;
  }, [cart]);

  return (
    <div className="site">
      <h1>PixelMart</h1>
      <p className="lead">Coupons expire in four minutes. Inventory is vibes. Checkout is imagination.</p>

      <div className="card">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0 }}>Cart</h2>
          <span className="tag">{total} item(s)</span>
        </div>
        <p style={{ marginBottom: 0 }}>No payment processor. Add items anyway. It is therapeutic.</p>
      </div>

      <div style={{ display: 'grid', gap: '0.55rem' }}>
        {ITEMS.map((it) => (
          <div key={it.id} className="card">
            <div className="row" style={{ justifyContent: 'space-between', gap: '0.75rem' }}>
              <div style={{ minWidth: 0 }}>
                <h2 style={{ margin: 0 }}>{it.name}</h2>
                <div style={{ color: 'var(--muted)', marginTop: '0.25rem' }}>{it.blurb}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem' }}>${it.price}</div>
                <div className="row" style={{ marginTop: '0.45rem', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      setCart((c) => ({ ...c, [it.id]: (c[it.id] ?? 0) + 1 }));
                      recordMartAdd();
                    }}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() =>
                      setCart((c) => {
                        const next = { ...c };
                        const cur = next[it.id] ?? 0;
                        if (cur <= 1) delete next[it.id];
                        else next[it.id] = cur - 1;
                        return next;
                      })
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
