'use client';

import { useState, useRef } from 'react';
import { TYPES, TIERS, Quest, Entry } from '@/lib/constants';
import { useApp } from '@/lib/context';
import { QuestImage } from './QuestImages';

interface QuestModalProps {
  quest: Quest;
  onClose: () => void;
}

export function QuestModal({ quest, onClose }: QuestModalProps) {
  const { addEntry } = useApp();
  const [form, setForm] = useState({
    title: quest.title,
    section: quest.section,
    subsection: quest.subsection,
    type: quest.type,
    tier: quest.tier,
    questId: quest.id,
    image: quest.image,
    responses: ['', '', ''] as string[],
    evidence: [] as string[],
    notes: '',
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const type = TYPES.find(t => t.id === form.type);
  const tier = TIERS.find(t => t.id === form.tier);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(f => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        setForm(x => ({ ...x, evidence: [...x.evidence, result] }));
      };
      reader.readAsDataURL(f);
    });
  };

  const canSave = form.evidence.length > 0 || form.responses.some(r => r.trim());

  const handleComplete = () => {
    addEntry(form as Omit<Entry, 'id' | 'timestamp'>);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Begin Quest</span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="quest-detail-image">
            <QuestImage imageId={quest.image} />
          </div>
          <h2 className="quest-detail-title">{quest.title}</h2>
          <p className="quest-detail-desc">{quest.description}</p>
          <div className="quest-detail-stats">
            <div className="quest-detail-stat">
              <div className="quest-detail-stat-value">
                {[...Array(tier?.stars || 1)].map(() => '★').join('')}
              </div>
              <div className="quest-detail-stat-label">Difficulty</div>
            </div>
            <div className="quest-detail-stat">
              <div className="quest-detail-stat-value">{tier?.name}</div>
              <div className="quest-detail-stat-label">Tier</div>
            </div>
            <div className="quest-detail-stat">
              <div className="quest-detail-stat-value">+{tier?.xp}</div>
              <div className="quest-detail-stat-label">XP</div>
            </div>
          </div>
          {type?.prompts.map((p, i) => (
            <div key={i} className="prompt-field">
              <p className="prompt-q">{p}</p>
              <textarea
                className="form-input form-textarea"
                value={form.responses[i] || ''}
                onChange={e => {
                  const r = [...form.responses];
                  r[i] = e.target.value;
                  setForm({ ...form, responses: r });
                }}
                placeholder="Your answer..."
              />
            </div>
          ))}
          <div className="form-section">
            <label className="form-label">Evidence</label>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileRef}
              onChange={handleFile}
              style={{ display: 'none' }}
            />
            <div className="evidence-upload" onClick={() => fileRef.current?.click()}>
              <div className="evidence-upload-icon">📷</div>
              <div className="evidence-upload-text">Tap to add photos</div>
            </div>
            {form.evidence.length > 0 && (
              <div className="evidence-preview">
                {form.evidence.map((img, i) => (
                  <div key={i} className="evidence-thumb-wrap">
                    <img src={img} alt="" className="evidence-thumb" />
                    <button
                      className="evidence-remove"
                      onClick={() => setForm(x => ({ ...x, evidence: x.evidence.filter((_, j) => j !== i) }))}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            className="btn btn-primary btn-block"
            disabled={!canSave}
            onClick={handleComplete}
          >
            ⚔️ Complete Quest (+{tier?.xp} XP)
          </button>
        </div>
      </div>
    </div>
  );
}
