'use client';

import { useState, useRef } from 'react';
import { TYPES, TIERS, Section, Subsection, Entry } from '@/lib/constants';
import { useApp } from '@/lib/context';

interface CustomQuestModalProps {
  realm: Section | null;
  subsection: Subsection | null;
  onClose: () => void;
}

export function CustomQuestModal({ realm, subsection, onClose }: CustomQuestModalProps) {
  const { addEntry } = useApp();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: '',
    section: realm?.id || 'workshop',
    subsection: subsection?.id || '',
    type: 'build',
    tier: 'wanderer',
    image: 'default',
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

  const canSave = form.title.trim() && (form.evidence.length > 0 || form.responses.some(r => r.trim()));

  const handleComplete = () => {
    addEntry(form as Omit<Entry, 'id' | 'timestamp'>);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">
            {step === 1 ? 'Create Quest' : step === 2 ? 'Choose Tier' : 'Complete Quest'}
          </span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {step === 1 && (
            <>
              <div className="form-section">
                <label className="form-label">Quest Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="What will you accomplish?"
                  autoFocus
                />
              </div>
              <div className="form-section">
                <label className="form-label">Quest Type</label>
                <div className="type-grid">
                  {TYPES.map(t => (
                    <button
                      key={t.id}
                      className={`type-btn ${form.type === t.id ? 'selected' : ''}`}
                      onClick={() => setForm({ ...form, type: t.id })}
                    >
                      <span className="type-btn-icon">{t.icon}</span>
                      <span className="type-btn-label">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <button
                className="btn btn-primary btn-block"
                disabled={!form.title.trim()}
                onClick={() => setStep(2)}
              >
                Continue →
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <div className="form-section">
                <label className="form-label">
                  Quest Difficulty
                  <span className="form-hint">Based on complexity and stakes</span>
                </label>
                <div className="tier-list">
                  {TIERS.map(t => (
                    <button
                      key={t.id}
                      className={`tier-btn ${form.tier === t.id ? 'selected' : ''}`}
                      onClick={() => setForm({ ...form, tier: t.id })}
                    >
                      <div className="tier-rank">{t.rank}</div>
                      <div className="tier-info">
                        <div className="tier-name">{t.name}</div>
                        <div className="tier-desc">{t.description}</div>
                      </div>
                      <div className="tier-xp">+{t.xp}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="btn-row">
                <button className="btn btn-secondary" onClick={() => setStep(1)}>← Back</button>
                <button className="btn btn-primary" onClick={() => setStep(3)}>Continue →</button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className="quest-detail-stats" style={{ marginBottom: '1.5rem' }}>
                <div className="quest-detail-stat">
                  <div className="quest-detail-stat-value">{type?.icon}</div>
                  <div className="quest-detail-stat-label">{type?.name}</div>
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
              <div className="btn-row">
                <button className="btn btn-secondary" onClick={() => setStep(2)}>← Back</button>
                <button
                  className="btn btn-primary"
                  disabled={!canSave}
                  onClick={handleComplete}
                >
                  ⚔️ Complete (+{tier?.xp} XP)
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
