import type { NetUrl } from '../../types';

// aero_prophet's homepage. its 1999 on this net and this page is dressed as ~2007,
// glossy glass and water and green. thats the joke. bubbles are pure css, nothing
// loads from outside.
export function SiteAero({ onNavigate }: { onNavigate: (url: NetUrl) => void }) {
  return (
    <div className='site site-aero'>
      <div className='aero-sky'>
        <span className='aero-bubble aero-bubble-1' />
        <span className='aero-bubble aero-bubble-2' />
        <span className='aero-bubble aero-bubble-3' />
        <span className='aero-bubble aero-bubble-4' />
        <span className='aero-bubble aero-bubble-5' />
      </div>

      <header className='aero-hero'>
        <div className='aero-glass aero-hero-panel'>
          <p className='aero-eyebrow'>a homepage from about five years from now</p>
          <h1>The Glass Age</h1>
          <p className='aero-lede'>
            You are looking at gray boxes with sharp corners. I have seen what comes next,
            and it is water, and glass, and green, and a single bubble drifting up the corner
            for no reason but your comfort.
          </p>
          <div className='aero-actions'>
            <button className='aero-btn' onClick={() => onNavigate('rn:n-aero-manifesto')}>
              Read the manifesto
            </button>
            <button className='aero-btn aero-btn-ghost' onClick={() => onNavigate('rn:n-aero-mockups')}>
              See the mockups
            </button>
          </div>
        </div>
      </header>

      <section className='aero-cards'>
        <article className='aero-glass aero-card'>
          <div className='aero-orb aero-orb-water' />
          <h2>Wet buttons</h2>
          <p>
            A button should look like a drop of water you could touch and it would give a
            little. Press one on this page. That is the feeling I am promising the whole
            future.
          </p>
        </article>
        <article className='aero-glass aero-card'>
          <div className='aero-orb aero-orb-leaf' />
          <h2>Nature and machine</h2>
          <p>
            Green fields and blue sky behind your icons, and no seam between the living world
            and the one on the screen. Feeling good will finally count as a feature.
          </p>
        </article>
        <article className='aero-glass aero-card'>
          <div className='aero-orb aero-orb-sky' />
          <h2>Idle is not empty</h2>
          <p>
            When the machine has nothing to do, it will not sit there gray. A bubble will
            rise, wobble, and be gone, and the future will be rich enough to spend it on
            nothing but you.
          </p>
        </article>
      </section>

      <section className='aero-glass aero-note'>
        <p>
          Yes, I know what year it is. Everyone laughs, which is either how I know I am right
          or exactly how I know I am wrong, and I cannot tell from the inside. So I dated the
          page and let the future check my work.
        </p>
        <div className='aero-links'>
          <button className='aero-link' onClick={() => onNavigate('rn:n-aero-they-laughed')}>
            they laughed
          </button>
          <button className='aero-link' onClick={() => onNavigate('rn:n-aero-what-i-do-for-work')}>
            what i do all day
          </button>
          <button className='aero-link' onClick={() => onNavigate('rn:n-carrier-log1')}>
            the signal, which i think is the future knocking
          </button>
        </div>
      </section>

      <footer className='aero-foot'>
        <span className='aero-foot-mark'>aero_prophet</span>
        <span>best experienced in about 2007, on a machine that does not exist yet</span>
      </footer>
    </div>
  );
}
