export function SiteReadme() {
  return (
    <div className="site">
      <h1>Pocket Net · build notes</h1>
      <p className="lead">RhinoNet desktop and handset shell. Progress saves in your browser.</p>

      <div className="card">
        <h2>What this build adds</h2>
        <ul>
          <li>RhinoCoins economy tied to search, nav, posts, mart adds, terminal commands, arcade clears</li>
          <li>Integrity meter moved by boot bonus and smileware choices</li>
          <li>Achievement IDs toast when unlocked</li>
          <li>RhinoReflex at rn:arcade - five needle rounds, payouts at run end</li>
          <li>rn:status dashboard for your save</li>
          <li>Forum + cart persist in localStorage</li>
          <li>SVG chrome icons instead of emoji marks</li>
        </ul>
      </div>

      <div className="card">
        <h2>Run it</h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }}>
          npm install
          <br />
          npm run dev
        </p>
      </div>

      <div className="card">
        <h2>Next ideas</h2>
        <ul>
          <li>Mail with spam classifier mini-game</li>
          <li>Multiplayer mall with websocket tick</li>
          <li>Export save to JSON file</li>
        </ul>
      </div>
    </div>
  );
}
