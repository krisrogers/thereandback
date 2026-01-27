'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Entry, TIERS, getAvatarStage } from './constants';

interface AppState {
  entries: Entry[];
  addEntry: (entry: Omit<Entry, 'id' | 'timestamp'>) => void;
  deleteEntry: (id: string) => void;
  totalXP: number;
  level: number;
  xpInLevel: number;
  xpProgress: number;
  stage: ReturnType<typeof getAvatarStage>;
}

const AppContext = createContext<AppState | null>(null);

const STORAGE_KEY = 'thereAndBack_v5';

export function AppProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load entries from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setEntries(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored entries:', e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save entries to localStorage when they change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }
  }, [entries, isHydrated]);

  const addEntry = (entry: Omit<Entry, 'id' | 'timestamp'>) => {
    const newEntry: Entry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setEntries(prev => [newEntry, ...prev]);
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const totalXP = entries.reduce((sum, e) => {
    const tier = TIERS.find(t => t.id === e.tier);
    return sum + (tier?.xp || 0);
  }, 0);

  const level = Math.floor(totalXP / 100) + 1;
  const xpInLevel = totalXP % 100;
  const xpProgress = xpInLevel / 100;
  const stage = getAvatarStage(level);

  return (
    <AppContext.Provider value={{
      entries,
      addEntry,
      deleteEntry,
      totalXP,
      level,
      xpInLevel,
      xpProgress,
      stage,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
