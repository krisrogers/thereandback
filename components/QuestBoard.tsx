'use client';

import { QUESTS, TIERS, Section, Subsection, Quest } from '@/lib/constants';
import { useApp } from '@/lib/context';
import { QuestImage } from './QuestImages';

interface QuestBoardProps {
  realm: Section;
  subsection: Subsection;
  onBack: () => void;
  onSelectQuest: (quest: Quest) => void;
  onCustomQuest: () => void;
}

export function QuestBoard({ realm, subsection, onBack, onSelectQuest, onCustomQuest }: QuestBoardProps) {
  const { entries } = useApp();

  const quests = QUESTS
    .filter(q => q.section === realm.id && q.subsection === subsection.id)
    .sort((a, b) => {
      const tierA = TIERS.find(t => t.id === a.tier);
      const tierB = TIERS.find(t => t.id === b.tier);
      return (tierA?.rank || 0) - (tierB?.rank || 0);
    });

  const completed = entries.filter(e => e.questId).map(e => e.questId);

  return (
    <>
      <div className="quest-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="quest-header-info">
          <h2>{subsection.icon} {subsection.name}</h2>
          <p>{subsection.description}</p>
        </div>
      </div>
      <div className="quest-list">
        {quests.map(quest => {
          const tier = TIERS.find(t => t.id === quest.tier);
          const isCompleted = completed.includes(quest.id);
          return (
            <div
              key={quest.id}
              className={`quest-card ${isCompleted ? 'completed' : ''}`}
              onClick={() => onSelectQuest(quest)}
            >
              <div className="quest-image-wrap">
                <QuestImage imageId={quest.image} />
              </div>
              <div className="quest-content">
                <div className="quest-title">{quest.title}</div>
                <div className="quest-desc">{quest.description}</div>
                <div className="quest-meta">
                  <div className="quest-stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`quest-star ${i < (tier?.stars || 0) ? '' : 'empty'}`}>★</span>
                    ))}
                  </div>
                  <span className="quest-tier">{tier?.name}</span>
                  <span className="quest-xp">+{tier?.xp} XP</span>
                </div>
              </div>
            </div>
          );
        })}
        <button className="custom-quest-btn" onClick={onCustomQuest}>
          ✦ Create Your Own Quest ✦
        </button>
      </div>
    </>
  );
}
