'use client';

import { SECTIONS, TYPES, TIERS, getSubsection, Entry } from '@/lib/constants';
import { useApp } from '@/lib/context';
import { QuestImage } from './QuestImages';

interface EntryDetailModalProps {
  entry: Entry;
  onClose: () => void;
}

export function EntryDetailModal({ entry, onClose }: EntryDetailModalProps) {
  const { deleteEntry } = useApp();

  if (!entry) return null;

  const section = SECTIONS.find(s => s.id === entry.section);
  const type = TYPES.find(t => t.id === entry.type);
  const tier = TIERS.find(t => t.id === entry.tier);
  const subsection = getSubsection(entry.section, entry.subsection);

  const handleDelete = () => {
    if (confirm('Remove?')) {
      deleteEntry(entry.id);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Quest Complete</span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="detail-hero">
            <div className="detail-image">
              <QuestImage imageId={entry.image || 'default'} />
            </div>
            <h2 className="detail-title">{entry.title}</h2>
            <div className="detail-badges">
              <span className="detail-badge">{tier?.name}</span>
              <span className="detail-badge">+{tier?.xp} XP</span>
              {subsection && (
                <span className="detail-badge">{subsection.icon} {subsection.name}</span>
              )}
              <span className="detail-badge">{section?.name}</span>
            </div>
          </div>
          <div className="detail-section">
            <div className="detail-label">Date Completed</div>
            <div className="detail-value">
              {new Date(entry.timestamp).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>
          {entry.responses?.some(r => r.trim()) && (
            <div className="detail-section">
              <div className="detail-label">Reflections</div>
              <div className="detail-responses">
                {type?.prompts.map((p, i) => (
                  entry.responses[i]?.trim() && (
                    <div key={i} className="detail-response">
                      <div className="detail-response-q">{p}</div>
                      <div className="detail-value">{entry.responses[i]}</div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
          {entry.evidence?.length > 0 && (
            <div className="detail-section">
              <div className="detail-label">Evidence</div>
              <div className="detail-evidence-grid">
                {entry.evidence.map((img, i) => (
                  <img key={i} src={img} alt="" className="detail-evidence-img" />
                ))}
              </div>
            </div>
          )}
          <div className="detail-actions">
            <button className="btn btn-danger btn-block" onClick={handleDelete}>
              Remove Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
