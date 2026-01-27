'use client';

interface NavigationProps {
  view: string;
  onViewChange: (view: string) => void;
  onResetNavigation: () => void;
}

export function Navigation({ view, onViewChange, onResetNavigation }: NavigationProps) {
  const handleRealmClick = () => {
    onViewChange('realms');
    onResetNavigation();
  };

  return (
    <nav className="nav-tabs">
      <button
        className={`nav-tab ${view === 'realms' ? 'active' : ''}`}
        onClick={handleRealmClick}
      >
        <span className="nav-tab-icon">🏰</span>Realms
      </button>
      <button
        className={`nav-tab ${view === 'logbook' ? 'active' : ''}`}
        onClick={() => onViewChange('logbook')}
      >
        <span className="nav-tab-icon">📖</span>Logbook
      </button>
      <button
        className={`nav-tab ${view === 'progress' ? 'active' : ''}`}
        onClick={() => onViewChange('progress')}
      >
        <span className="nav-tab-icon">⭐</span>Progress
      </button>
    </nav>
  );
}
