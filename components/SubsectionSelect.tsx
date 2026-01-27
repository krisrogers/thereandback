'use client';

import { SUBSECTIONS, Section, Subsection } from '@/lib/constants';
import { useApp } from '@/lib/context';

interface SubsectionSelectProps {
  realm: Section;
  onBack: () => void;
  onSelect: (subsection: Subsection) => void;
}

export function SubsectionSelect({ realm, onBack, onSelect }: SubsectionSelectProps) {
  const { entries } = useApp();
  const subsections = SUBSECTIONS[realm.id] || [];

  return (
    <>
      <div className="quest-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="quest-header-info">
          <h2>{realm.icon} {realm.name}</h2>
          <p>Choose your craft</p>
        </div>
      </div>
      <div className="realm-grid">
        {subsections.map(sub => {
          const count = entries.filter(e => e.section === realm.id && e.subsection === sub.id).length;
          return (
            <div
              key={sub.id}
              className="realm-card"
              onClick={() => onSelect(sub)}
              style={{ '--realm-color': realm.color } as React.CSSProperties}
            >
              {count > 0 && <span className="realm-count">{count} complete</span>}
              <div className="realm-header">
                <div className="realm-icon-wrap">
                  <div className="realm-icon-bg" />
                  <div className="realm-icon">{sub.icon}</div>
                </div>
                <div className="realm-info">
                  <div className="realm-name">{sub.name}</div>
                  <div className="realm-subtitle">{sub.description}</div>
                </div>
                <div className="realm-arrow">→</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
