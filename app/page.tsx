'use client';

import { useState } from 'react';
import { Section, Subsection, Quest } from '@/lib/constants';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { RealmSelect } from '@/components/RealmSelect';
import { SubsectionSelect } from '@/components/SubsectionSelect';
import { QuestBoard } from '@/components/QuestBoard';
import { QuestModal } from '@/components/QuestModal';
import { CustomQuestModal } from '@/components/CustomQuestModal';
import { Logbook } from '@/components/Logbook';
import { EntryDetailModal } from '@/components/EntryDetailModal';
import { ProgressView } from '@/components/ProgressView';
import { useApp } from '@/lib/context';

export default function Home() {
  const { entries } = useApp();
  const [view, setView] = useState('realms');
  const [selectedRealm, setSelectedRealm] = useState<Section | null>(null);
  const [selectedSubsection, setSelectedSubsection] = useState<Subsection | null>(null);
  const [showQuestModal, setShowQuestModal] = useState<Quest | null>(null);
  const [showCustomQuest, setShowCustomQuest] = useState(false);
  const [showEntryDetail, setShowEntryDetail] = useState<string | null>(null);

  const handleRealmSelect = (realm: Section) => {
    setSelectedRealm(realm);
    setSelectedSubsection(null);
  };

  const handleSubsectionSelect = (subsection: Subsection) => {
    setSelectedSubsection(subsection);
  };

  const handleBackFromSubsection = () => {
    setSelectedSubsection(null);
  };

  const handleBackFromRealm = () => {
    setSelectedRealm(null);
    setSelectedSubsection(null);
  };

  const handleResetNavigation = () => {
    setSelectedRealm(null);
    setSelectedSubsection(null);
  };

  const handleQuestComplete = () => {
    setShowQuestModal(null);
  };

  const handleCustomQuestComplete = () => {
    setShowCustomQuest(false);
  };

  const selectedEntry = showEntryDetail ? entries.find(e => e.id === showEntryDetail) : null;

  return (
    <div className="app">
      <ParticleBackground />
      <Header />
      <Navigation
        view={view}
        onViewChange={setView}
        onResetNavigation={handleResetNavigation}
      />
      <main className="main">
        {view === 'realms' && !selectedRealm && (
          <RealmSelect onSelect={handleRealmSelect} />
        )}
        {view === 'realms' && selectedRealm && !selectedSubsection && (
          <SubsectionSelect
            realm={selectedRealm}
            onBack={handleBackFromRealm}
            onSelect={handleSubsectionSelect}
          />
        )}
        {view === 'realms' && selectedRealm && selectedSubsection && (
          <QuestBoard
            realm={selectedRealm}
            subsection={selectedSubsection}
            onBack={handleBackFromSubsection}
            onSelectQuest={setShowQuestModal}
            onCustomQuest={() => setShowCustomQuest(true)}
          />
        )}
        {view === 'logbook' && (
          <Logbook onSelectEntry={setShowEntryDetail} />
        )}
        {view === 'progress' && (
          <ProgressView />
        )}
      </main>

      {showQuestModal && (
        <QuestModal
          quest={showQuestModal}
          onClose={handleQuestComplete}
        />
      )}
      {showCustomQuest && (
        <CustomQuestModal
          realm={selectedRealm}
          subsection={selectedSubsection}
          onClose={handleCustomQuestComplete}
        />
      )}
      {selectedEntry && (
        <EntryDetailModal
          entry={selectedEntry}
          onClose={() => setShowEntryDetail(null)}
        />
      )}
    </div>
  );
}
