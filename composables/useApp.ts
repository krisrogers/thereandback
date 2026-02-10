import { ref, computed, watch } from 'vue'
import { TIERS, getAvatarStage, getPowerUpForCompletion, type Entry, type BattleState, type PowerUp, type ActiveQuest, type QuestProgress } from './constants'

const STORAGE_KEY = 'thereAndBack_v5'
const BATTLE_STORAGE_KEY = 'thereAndBack_battle_v1'
const ACTIVE_QUESTS_STORAGE_KEY = 'thereAndBack_activeQuests_v1'

// Global state
const entries = ref<Entry[]>([])
const isHydrated = ref(false)

// Active quests state
const activeQuests = ref<ActiveQuest[]>([])
const isActiveQuestsHydrated = ref(false)

// Battle state
const battleState = ref<BattleState>({
  currentEnemy: null,
  playerHp: 80,
  playerMaxHp: 80,
  isInBattle: false,
  battleLog: [],
  defeatedEnemies: [],
  gold: 0,
  battleXP: 0,
  powerUps: [],
})
const isBattleHydrated = ref(false)

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

  // Load battle state from localStorage
  if (import.meta.client && !isBattleHydrated.value) {
    const storedBattle = localStorage.getItem(BATTLE_STORAGE_KEY)
    if (storedBattle) {
      try {
        const parsed = JSON.parse(storedBattle)
        battleState.value = { ...battleState.value, ...parsed }
      } catch (e) {
        console.error('Failed to parse stored battle state:', e)
      }
    }
    isBattleHydrated.value = true
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

    watch(battleState, (newBattleState) => {
      if (isBattleHydrated.value) {
        localStorage.setItem(BATTLE_STORAGE_KEY, JSON.stringify(newBattleState))
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

    // Award power-up for completing a quest
    const powerUp = getPowerUpForCompletion(entry.section, entry.subsection, entry.tier)
    if (powerUp) {
      // Check if we already have this exact power-up (same source)
      const existingIndex = battleState.value.powerUps.findIndex(p => p.source === powerUp.source)
      if (existingIndex === -1) {
        battleState.value.powerUps.push(powerUp)
      }
    }
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

  // Battle functions
  const addBattleLog = (message: string) => {
    battleState.value.battleLog.push(`${new Date().toLocaleTimeString()}: ${message}`)
    if (battleState.value.battleLog.length > 20) {
      battleState.value.battleLog.shift()
    }
  }

  const startBattle = (enemy: any) => {
    battleState.value.currentEnemy = { ...enemy, currentHp: enemy.hp }
    battleState.value.isInBattle = true
    battleState.value.playerHp = battleState.value.playerMaxHp
    addBattleLog(`Battle started against ${enemy.name}!`)
  }

  const endBattle = (victory: boolean) => {
    if (victory && battleState.value.currentEnemy) {
      const enemy = battleState.value.currentEnemy
      battleState.value.gold += enemy.gold || 0
      battleState.value.battleXP += enemy.xp || 0
      if (!battleState.value.defeatedEnemies.includes(enemy.id)) {
        battleState.value.defeatedEnemies.push(enemy.id)
      }
      addBattleLog(`Victory! Earned ${enemy.gold} gold and ${enemy.xp} battle XP.`)
    } else {
      addBattleLog('Defeated... Retreat to recover.')
    }
    battleState.value.isInBattle = false
    battleState.value.currentEnemy = null
  }

  const dealDamage = (amount: number, isCrit: boolean = false) => {
    if (battleState.value.currentEnemy) {
      battleState.value.currentEnemy.currentHp = Math.max(
        0,
        (battleState.value.currentEnemy.currentHp || 0) - amount
      )
      const critText = isCrit ? ' (CRITICAL!)' : ''
      addBattleLog(`You deal ${amount} damage${critText}.`)

      if (battleState.value.currentEnemy.currentHp === 0) {
        endBattle(true)
      }
    }
  }

  const takeDamage = (amount: number) => {
    battleState.value.playerHp = Math.max(0, battleState.value.playerHp - amount)
    addBattleLog(`You take ${amount} damage.`)

    if (battleState.value.playerHp === 0) {
      endBattle(false)
    }
  }

  const addPowerUp = (powerUp: PowerUp) => {
    battleState.value.powerUps.push(powerUp)
  }

  const resetBattleState = () => {
    battleState.value = {
      currentEnemy: null,
      playerHp: 80,
      playerMaxHp: 80,
      isInBattle: false,
      battleLog: [],
      defeatedEnemies: [],
      gold: 0,
      battleXP: 0,
      powerUps: [],
    }
  }

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
    // Battle state
    battleState,
    startBattle,
    endBattle,
    dealDamage,
    takeDamage,
    addPowerUp,
    resetBattleState,
    // Active Quests
    activeQuests,
    startQuest,
    addQuestProgress,
    completeActiveQuest,
    abandonQuest,
  }
}
