export function SiteReadme() {
  return (
    <div className="site site-readme">
      <article className="readme-man">
        <h1>POCKET-NET(7)</h1>
        <h2>NAME</h2>
        <p>pocket-net - a pocket internet you browse locally</p>
        <h2>SYNOPSIS</h2>
        <p>RhinoNet 0.8.0 · progress saves in your browser (rn_game_v2).</p>
        <h2>DESCRIPTION</h2>
        <ul>
          <li>Explore: named story threads with mail, wiki, and search</li>
          <li>Net Index: hundreds of permanent routes plus session drift pages</li>
          <li>Discovery Log: what you have stumbled across</li>
          <li>Daily drift in mail, wiki, forum, and search</li>
        </ul>
        <p>Big enough to keep opening tabs. No required order. No required session length.</p>
        <h2>RUN</h2>
        <div className="readme-cmd">
          npm install
          <br />
          npm run dev
        </div>
      </article>
    </div>
  );
}
