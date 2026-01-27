'use client';

import { SECTIONS, TIERS, getSubsection } from '@/lib/constants';
import { useApp } from '@/lib/context';
import { QuestImage } from './QuestImages';

interface LogbookProps {
  onSelectEntry: (id: string) => void;
}

export function Logbook({ onSelectEntry }: LogbookProps) {
  const { entries } = useApp();

  const sorted = [...entries].sort((a, b) => {
    const ta = TIERS.find(t => t.id === a.tier);
    const tb = TIERS.find(t => t.id === b.tier);
    if ((tb?.rank || 0) !== (ta?.rank || 0)) {
      return (tb?.rank || 0) - (ta?.rank || 0);
    }
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  if (!entries.length) {
    return (
      <div className="logbook-empty">
        <div className="logbook-empty-icon">📖</div>
        <h3>No Quests Completed Yet</h3>
        <p>Your adventures await in the Realms</p>
      </div>
    );
  }

  return (
    <div className="entry-list">
      {sorted.map((entry, i) => {
        const section = SECTIONS.find(s => s.id === entry.section);
        const tier = TIERS.find(t => t.id === entry.tier);
        const subsection = getSubsection(entry.section, entry.subsection);
        return (
          <div
            key={entry.id}
            className="entry-card"
            onClick={() => onSelectEntry(entry.id)}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="entry-image-wrap">
              <QuestImage imageId={entry.image || 'default'} />
            </div>
            <div className="entry-content">
              <div className="entry-header">
                <div className="entry-title">{entry.title}</div>
                <div className="entry-xp">+{tier?.xp} XP</div>
              </div>
              <div className="entry-meta">
                <span>{section?.icon} {subsection ? subsection.name : section?.name}</span>
                <span>{tier?.name}</span>
                <span>
                  {new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
