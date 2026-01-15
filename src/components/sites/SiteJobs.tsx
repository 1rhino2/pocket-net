import { useState } from 'react';
import { useGame } from '../../game/GameContext';

const JOBS = [
  { id: 'vibes', title: 'Chief Vibes Officer', pay: '12 RC signing bonus' },
  { id: 'tabs', title: 'Senior Tab Wrangler', pay: 'Integrity +1' },
  { id: 'packet', title: 'Packet Weather Intern', pay: '8 RC' },
  { id: 'smile', title: 'Smileware QA (volunteer)', pay: 'Mystery achievement' },
  { id: 'wiki', title: 'PocketWiki Editor', pay: '2 RC per article read' },
];

export function SiteJobs() {
  const { recordJobApply, setToast } = useGame();
  const [applied, setApplied] = useState<Set<string>>(() => new Set());

  return (
    <div className="site site-jobs">
      <header className="jobs-header">
        <h1>Help Wanted</h1>
        <p>RhinoNet classifieds · HR replies in seconds</p>
      </header>
      <div className="jobs-columns">
        {JOBS.map((job) => (
          <article key={job.id} className="jobs-ad">
            <h2>{job.title}</h2>
            <p className="jobs-pay">{job.pay}</p>
            <button
              type="button"
              disabled={applied.has(job.id)}
              onClick={() => {
                setApplied((s) => new Set(s).add(job.id));
                recordJobApply();
                setToast(`Applied: ${job.title}`, 2400);
              }}
            >
              {applied.has(job.id) ? 'Application filed' : 'Apply now'}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
