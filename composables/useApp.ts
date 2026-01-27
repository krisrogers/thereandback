import { ref, computed, watch } from 'vue'
import { TIERS, getAvatarStage, type Entry } from './constants'

const STORAGE_KEY = 'thereAndBack_v5'

// Global state
const entries = ref<Entry[]>([])
const isHydrated = ref(false)

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

  // Watch for changes and save to localStorage
  if (import.meta.client) {
    watch(entries, (newEntries) => {
      if (isHydrated.value) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries))
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

  return {
    entries,
    addEntry,
    deleteEntry,
    totalXP,
    level,
    xpInLevel,
    xpProgress,
    stage,
  }
}
