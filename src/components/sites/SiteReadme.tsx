import { AUTHORED_PAGE_COUNT, CAST } from '../../content/index';

export function SiteReadme() {
  const voices = Object.keys(CAST).length;
  return (
    <div className="site site-readme">
      <article className="readme-man">
        <h1>POCKET-NET(7)</h1>
        <h2>NAME</h2>
        <p>pocket-net - a pocket internet you browse locally</p>
        <h2>SYNOPSIS</h2>
        <p>RhinoNet 0.9.0 · progress saves in your browser (rn_game_v2).</p>
        <h2>DESCRIPTION</h2>
        <ul>
          <li>Explore: named story threads with mail, wiki, and search</li>
          <li>Net Index: {AUTHORED_PAGE_COUNT} pages, every one written by a person, across {voices} voices</li>
          <li>Two mysteries with real answers: the Hollow Night, and the Lighthouse</li>
          <li>Programs: RhinoBrowser, Notepad, Terminal, Games, PocketPager, My Computer, PixelPaint</li>
          <li>Discovery Log: what you have stumbled across</li>
          <li>Daily and hourly drift in mail, wiki, forum, and search, from authored pools</li>
        </ul>
        <p>Big enough to keep opening tabs, small enough that every page was worth writing. No required order. No required session length.</p>
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
