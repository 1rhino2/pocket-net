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
    <div className="site">
      <h1>Job Board</h1>
      <p className="lead">Open roles across the pocket net. HR replies in seconds.</p>

      <div className="job-list">
        {JOBS.map((job) => (
          <div key={job.id} className="card job-card">
            <h2>{job.title}</h2>
            <p className="lead">Comp: {job.pay}</p>
            <button
              type="button"
              className="btn btn-primary"
              disabled={applied.has(job.id)}
              onClick={() => {
                const next = new Set(applied);
                next.add(job.id);
                setApplied(next);
                recordJobApply();
                setToast(`Applied: ${job.title}. HR will be in touch.`, 3200);
              }}
            >
              {applied.has(job.id) ? 'Application sent' : 'Apply now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
