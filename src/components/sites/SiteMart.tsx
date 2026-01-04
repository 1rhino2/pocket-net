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
    <div className="site site-mart">
      <div className="mart-ticker">CALL NOW · OPERATORS STANDING BY · COUPONS EXPIRE IN FOUR MINUTES</div>
      <div className="mart-stage">
        <h1>PixelMart</h1>
        <span className="mart-cart-badge">{total} in cart</span>
        <p>Inventory is vibes. Checkout is therapeutic fiction.</p>
        <div className="mart-grid">
          {ITEMS.map((it) => (
            <article key={it.id} className="mart-product">
              <span className="mart-starburst">HOT</span>
              <h2>{it.name}</h2>
              <p>{it.blurb}</p>
              <div className="mart-price">${it.price}</div>
              <div className="mart-product-btns">
                <button
                  type="button"
                  onClick={() => {
                    setCart((c) => ({ ...c, [it.id]: (c[it.id] ?? 0) + 1 }));
                    recordMartAdd();
                  }}
                >
                  Add
                </button>
                <button
                  type="button"
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
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
