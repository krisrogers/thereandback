'use client';

import { SECTIONS, Section } from '@/lib/constants';
import { useApp } from '@/lib/context';

interface RealmSelectProps {
  onSelect: (realm: Section) => void;
}

export function RealmSelect({ onSelect }: RealmSelectProps) {
  const { entries } = useApp();

  return (
    <div className="realm-grid">
      {SECTIONS.map(section => {
        const count = entries.filter(e => e.section === section.id).length;
        return (
          <div
            key={section.id}
            className="realm-card"
            onClick={() => onSelect(section)}
            style={{ '--realm-color': section.color } as React.CSSProperties}
          >
            {count > 0 && <span className="realm-count">{count} complete</span>}
            <div className="realm-header">
              <div className="realm-icon-wrap">
                <div className="realm-icon-bg" />
                <div className="realm-icon">{section.icon}</div>
              </div>
              <div className="realm-info">
                <div className="realm-name">{section.name}</div>
                <div className="realm-subtitle">{section.description}</div>
              </div>
              <div className="realm-arrow">→</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
