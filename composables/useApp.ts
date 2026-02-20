import { ref, computed, watch } from 'vue'
import { TIERS, getAvatarStage, type Entry, type ActiveQuest, type QuestProgress } from './constants'

const STORAGE_KEY = 'thereAndBack_v5'
const ACTIVE_QUESTS_STORAGE_KEY = 'thereAndBack_activeQuests_v1'

// Global state
const entries = ref<Entry[]>([])
const isHydrated = ref(false)

// Active quests state
const activeQuests = ref<ActiveQuest[]>([])
const isActiveQuestsHydrated = ref(false)

export function useApp() {
  // Load entries from localStorage on first use (client-side only)
  if (import.meta.client && !isHydrated.value) {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        entries.value = JSON.parse(stored)
      } catch (e) {
        console.error('Failed to parse stored entries:', e)
      }
    }
    isHydrated.value = true
  }

  // Load active quests from localStorage
  if (import.meta.client && !isActiveQuestsHydrated.value) {
    const storedActiveQuests = localStorage.getItem(ACTIVE_QUESTS_STORAGE_KEY)
    if (storedActiveQuests) {
      try {
        activeQuests.value = JSON.parse(storedActiveQuests)
      } catch (e) {
        console.error('Failed to parse stored active quests:', e)
      }
    }
    isActiveQuestsHydrated.value = true
  }

  // Watch for changes and save to localStorage
  if (import.meta.client) {
    watch(entries, (newEntries) => {
      if (isHydrated.value) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries))
      }
    }, { deep: true })

    watch(activeQuests, (newActiveQuests) => {
      if (isActiveQuestsHydrated.value) {
        localStorage.setItem(ACTIVE_QUESTS_STORAGE_KEY, JSON.stringify(newActiveQuests))
      }
    }, { deep: true })
  }

  const addEntry = (entry: Omit<Entry, 'id' | 'timestamp'>) => {
    const newEntry: Entry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    }
    entries.value = [newEntry, ...entries.value]
  }

  const deleteEntry = (id: string) => {
    entries.value = entries.value.filter(e => e.id !== id)
  }

  const totalXP = computed(() => {
    return entries.value.reduce((sum, e) => {
      const tier = TIERS.find(t => t.id === e.tier)
      return sum + (tier?.xp || 0)
    }, 0)
  })

  const level = computed(() => Math.floor(totalXP.value / 100) + 1)
  const xpInLevel = computed(() => totalXP.value % 100)
  const xpProgress = computed(() => xpInLevel.value / 100)
  const stage = computed(() => getAvatarStage(level.value))

  // Active Quest functions
  const startQuest = (quest: Omit<ActiveQuest, 'id' | 'startedAt' | 'progressNotes'>) => {
    const newQuest: ActiveQuest = {
      ...quest,
      id: Date.now().toString(),
      startedAt: new Date().toISOString(),
      progressNotes: [],
    }
    activeQuests.value = [newQuest, ...activeQuests.value]
    return newQuest
  }

  const addQuestProgress = (questId: string, progress: Omit<QuestProgress, 'id' | 'timestamp'>) => {
    const quest = activeQuests.value.find(q => q.id === questId)
    if (quest) {
      const newProgress: QuestProgress = {
        ...progress,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      }
      quest.progressNotes.push(newProgress)
    }
  }

  const completeActiveQuest = (questId: string, completionData: { responses: string[], evidence: string[], notes: string }) => {
    const quest = activeQuests.value.find(q => q.id === questId)
    if (quest) {
      // Create entry from the active quest
      addEntry({
        title: quest.title,
        section: quest.section,
        subsection: quest.subsection,
        type: quest.type,
        tier: quest.tier,
        questId: quest.questId,
        image: quest.image,
        responses: completionData.responses,
        evidence: completionData.evidence,
        notes: completionData.notes,
      })
      // Remove from active quests
      activeQuests.value = activeQuests.value.filter(q => q.id !== questId)
    }
  }

  const abandonQuest = (questId: string) => {
    activeQuests.value = activeQuests.value.filter(q => q.id !== questId)
  }

  return {
    entries,
    addEntry,
    deleteEntry,
    totalXP,
    level,
    xpInLevel,
    xpProgress,
    stage,
    // Active Quests
    activeQuests,
    startQuest,
    addQuestProgress,
    completeActiveQuest,
    abandonQuest,
  }
}
