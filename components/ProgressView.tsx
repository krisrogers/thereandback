'use client';

import { SECTIONS, TIERS, AVATAR_STAGES, getAvatarStage } from '@/lib/constants';
import { useApp } from '@/lib/context';
import { Avatar } from './Avatar';

export function ProgressView() {
  const { entries, totalXP, level, xpInLevel } = useApp();

  const stage = getAvatarStage(level);
  const nextStage = AVATAR_STAGES.find(s => s.minLevel > level);
  const tierCounts = TIERS.map(t => ({ ...t, count: entries.filter(e => e.tier === t.id).length }));
  const sectionCounts = SECTIONS.map(s => ({ ...s, count: entries.filter(e => e.section === s.id).length }));

  return (
    <>
      <div className="progress-section">
        <h3 className="progress-title">Your Avatar</h3>
        <div className="avatar-showcase">
          <div className="avatar-showcase-inner">
            <Avatar level={level} size={140} />
            <div className="avatar-stage-name">{stage.name}</div>
            <div className="avatar-stage-desc">{stage.description}</div>
          </div>
        </div>
        {nextStage && (
          <div className="next-avatar">
            <div className="next-avatar-label">Next Evolution</div>
            <div className="next-avatar-name">{nextStage.name}</div>
            <div className="next-avatar-xp">
              Reach Level {nextStage.minLevel} ({(nextStage.minLevel - 1) * 100 - totalXP} XP to go)
            </div>
          </div>
        )}
      </div>

      <div className="progress-section">
        <h3 className="progress-title">Level Progress</h3>
        <div className="level-display">
          <div className="level-number">{level}</div>
          <div className="level-label">Level</div>
          <div className="xp-bar-container">
            <div className="xp-bar-header">
              <span className="xp-bar-label">Progress to Level {level + 1}</span>
              <span className="xp-bar-value">{xpInLevel} / 100 XP</span>
            </div>
            <div className="xp-bar">
              <div className="xp-bar-fill" style={{ width: `${xpInLevel}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <h3 className="progress-title">Quests by Tier</h3>
        <div className="tier-list">
          {tierCounts.map(t => (
            <div key={t.id} className="tier-btn" style={{ cursor: 'default' }}>
              <div className="tier-rank">{t.count}</div>
              <div className="tier-info">
                <div className="tier-name">{t.name}</div>
                <div className="tier-desc">{t.description}</div>
              </div>
              <div className="tier-xp">{t.count * t.xp} XP</div>
            </div>
          ))}
        </div>
      </div>

      <div className="progress-section">
        <h3 className="progress-title">Realms Explored</h3>
        <div className="realm-progress">
          {sectionCounts.map(s => (
            <div key={s.id} className="realm-progress-row">
              <div className="realm-progress-icon">{s.icon}</div>
              <div className="realm-progress-info">
                <div className="realm-progress-name">{s.name}</div>
              </div>
              <div className="realm-progress-count">{s.count}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
