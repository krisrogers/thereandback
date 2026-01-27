'use client';

import { AvatarMini } from './Avatar';
import { useApp } from '@/lib/context';

export function Header() {
  const { level, xpProgress, stage, totalXP, entries } = useApp();

  return (
    <header className="hero">
      <div className="hero-content">
        <div className="hero-avatar">
          <AvatarMini level={level} xpProgress={xpProgress} />
        </div>
        <div className="hero-info">
          <h1 className="hero-title">There &amp; Back</h1>
          <div className="hero-rank">{stage.name}</div>
          <div className="hero-subtitle">{totalXP} XP • {entries.length} Quests</div>
        </div>
      </div>
    </header>
  );
}
