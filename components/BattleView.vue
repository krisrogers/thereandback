<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ENEMIES, calculatePlayerStats, getAvailableEnemies, type Enemy } from '~/composables/constants'

const { battleState, startBattle, dealDamage, takeDamage } = useApp()

const selectedEnemy = ref<Enemy | null>(null)
const showPowerUps = ref(false)

let battleInterval: ReturnType<typeof setInterval> | null = null

const playerStats = computed(() => calculatePlayerStats(battleState.value.powerUps))

const availableEnemies = computed(() =>
  getAvailableEnemies(battleState.value.defeatedEnemies)
)

const playerHpPercent = computed(() =>
  (battleState.value.playerHp / battleState.value.playerMaxHp) * 100
)

const enemyHpPercent = computed(() => {
  if (!battleState.value.currentEnemy) return 0
  return ((battleState.value.currentEnemy.currentHp || 0) / battleState.value.currentEnemy.hp) * 100
})

function handleSelectEnemy(enemy: Enemy) {
  if (battleState.value.isInBattle) return
  selectedEnemy.value = enemy
}

function handleStartBattle() {
  if (!selectedEnemy.value || battleState.value.isInBattle) return
  startBattle(selectedEnemy.value)
  selectedEnemy.value = null
  startAutoBattle()
}

function startAutoBattle() {
  let playerTick = 0
  let enemyTick = 0

  battleInterval = setInterval(() => {
    if (!battleState.value.isInBattle || !battleState.value.currentEnemy) {
      stopAutoBattle()
      return
    }

    playerTick++
    enemyTick++

    // Player attacks every 2 seconds (20 ticks)
    if (playerTick >= 20) {
      playerTick = 0
      performPlayerAttack()
    }

    // Enemy attacks every 2.5 seconds (25 ticks)
    if (enemyTick >= 25) {
      enemyTick = 0
      performEnemyAttack()
    }
  }, 100) // 100ms tick
}

function stopAutoBattle() {
  if (battleInterval) {
    clearInterval(battleInterval)
    battleInterval = null
  }
}

function performPlayerAttack() {
  if (!battleState.value.currentEnemy) return

  const stats = playerStats.value
  const enemy = battleState.value.currentEnemy

  // Check accuracy
  const hitRoll = Math.random() * 100
  if (hitRoll > stats.accuracy) {
    return // Miss
  }

  // Check crit
  const critRoll = Math.random() * 100
  const isCrit = critRoll < stats.critChance

  // Calculate damage
  let damage = Math.max(1, stats.attack - enemy.defense)
  if (isCrit) {
    damage = Math.floor(damage * stats.critDamage)
  }

  dealDamage(damage, isCrit)
}

function performEnemyAttack() {
  if (!battleState.value.currentEnemy) return

  const stats = playerStats.value
  const enemy = battleState.value.currentEnemy

  // Check evasion
  const evadeRoll = Math.random() * 100
  if (evadeRoll < stats.evasion) {
    return // Evaded
  }

  // Calculate damage
  const damage = Math.max(1, enemy.attack - stats.defense)

  takeDamage(damage)
}

function handleRetreat() {
  stopAutoBattle()
  battleState.value.isInBattle = false
  battleState.value.currentEnemy = null
}

onUnmounted(() => {
  stopAutoBattle()
})
</script>

<template>
  <div class="battle-view">
    <div class="battle-header">
      <h2 class="battle-title">⚔️ The Arena</h2>
      <p class="battle-subtitle">Test your might against foes of the realm</p>
    </div>

    <!-- Player Stats Overview -->
    <div class="battle-stats-panel">
      <div class="battle-stat-row">
        <span class="battle-stat-label">Gold:</span>
        <span class="battle-stat-value">{{ battleState.gold }} 💰</span>
      </div>
      <div class="battle-stat-row">
        <span class="battle-stat-label">Battle XP:</span>
        <span class="battle-stat-value">{{ battleState.battleXP }}</span>
      </div>
      <div class="battle-stat-row">
        <span class="battle-stat-label">Power-Ups:</span>
        <span class="battle-stat-value">{{ battleState.powerUps.length }}</span>
        <button class="battle-stat-btn" @click="showPowerUps = !showPowerUps">
          {{ showPowerUps ? 'Hide' : 'View' }}
        </button>
      </div>
    </div>

    <!-- Power-Ups Display -->
    <PowerUpDisplay v-if="showPowerUps" :power-ups="battleState.powerUps" />

    <!-- Battle Arena -->
    <div v-if="battleState.isInBattle && battleState.currentEnemy" class="battle-arena">
      <div class="battle-combatant battle-player">
        <div class="battle-combatant-icon">🧙</div>
        <div class="battle-combatant-name">You</div>
        <div class="battle-hp-bar">
          <div class="battle-hp-fill" :style="{ width: playerHpPercent + '%' }"></div>
        </div>
        <div class="battle-hp-text">
          {{ battleState.playerHp }} / {{ battleState.playerMaxHp }}
        </div>
        <div class="battle-stats-compact">
          <span>⚔️ {{ playerStats.attack }}</span>
          <span>🛡️ {{ playerStats.defense }}</span>
        </div>
      </div>

      <div class="battle-vs">VS</div>

      <div class="battle-combatant battle-enemy">
        <div class="battle-combatant-icon">{{ battleState.currentEnemy.icon }}</div>
        <div class="battle-combatant-name">{{ battleState.currentEnemy.name }}</div>
        <div class="battle-hp-bar">
          <div class="battle-hp-fill battle-hp-enemy" :style="{ width: enemyHpPercent + '%' }"></div>
        </div>
        <div class="battle-hp-text">
          {{ battleState.currentEnemy.currentHp }} / {{ battleState.currentEnemy.hp }}
        </div>
        <div class="battle-stats-compact">
          <span>⚔️ {{ battleState.currentEnemy.attack }}</span>
          <span>🛡️ {{ battleState.currentEnemy.defense }}</span>
        </div>
      </div>

      <button class="battle-retreat-btn" @click="handleRetreat">
        Retreat
      </button>
    </div>

    <!-- Enemy Selection -->
    <div v-else class="battle-enemy-select">
      <h3 class="battle-section-title">Choose Your Opponent</h3>
      <p class="battle-help-text">
        Defeat enemies to unlock stronger foes. Complete quests to gain power-ups!
      </p>
      <div class="battle-enemy-list">
        <div
          v-for="enemy in availableEnemies"
          :key="enemy.id"
          :class="[
            'battle-enemy-card',
            { 'battle-enemy-selected': selectedEnemy?.id === enemy.id },
            { 'battle-enemy-defeated': battleState.defeatedEnemies.includes(enemy.id) }
          ]"
          @click="handleSelectEnemy(enemy)"
        >
          <div class="battle-enemy-icon">{{ enemy.icon }}</div>
          <div class="battle-enemy-info">
            <div class="battle-enemy-name">{{ enemy.name }}</div>
            <div class="battle-enemy-tier">{{ enemy.tier }}</div>
            <div class="battle-enemy-desc">{{ enemy.description }}</div>
            <div class="battle-enemy-stats">
              <span>❤️ {{ enemy.hp }}</span>
              <span>⚔️ {{ enemy.attack }}</span>
              <span>🛡️ {{ enemy.defense }}</span>
            </div>
            <div class="battle-enemy-rewards">
              <span>💰 {{ enemy.gold }}</span>
              <span>⭐ {{ enemy.xp }} XP</span>
            </div>
          </div>
          <div v-if="battleState.defeatedEnemies.includes(enemy.id)" class="battle-enemy-badge">
            ✓ Defeated
          </div>
        </div>
      </div>

      <button
        v-if="selectedEnemy"
        class="battle-start-btn"
        @click="handleStartBattle"
      >
        Battle {{ selectedEnemy.name }}
      </button>
    </div>

    <!-- Battle Log -->
    <div class="battle-log">
      <h3 class="battle-section-title">Battle Log</h3>
      <div class="battle-log-entries">
        <div
          v-for="(log, index) in battleState.battleLog.slice().reverse()"
          :key="index"
          class="battle-log-entry"
        >
          {{ log }}
        </div>
        <div v-if="battleState.battleLog.length === 0" class="battle-log-empty">
          No battles yet. Choose an enemy to begin!
        </div>
      </div>
    </div>
  </div>
</template>
