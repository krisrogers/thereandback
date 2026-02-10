<script setup lang="ts">
import { computed } from 'vue'
import { calculatePlayerStats, SECTIONS, type PowerUp } from '~/composables/constants'

const props = defineProps<{
  powerUps: PowerUp[]
}>()

const stats = computed(() => calculatePlayerStats(props.powerUps))

const powerUpsByRealm = computed(() => {
  const grouped: Record<string, PowerUp[]> = {}

  for (const powerUp of props.powerUps) {
    const source = powerUp.source || ''
    const realm = source.split(':')[0] || 'unknown'

    if (!grouped[realm]) {
      grouped[realm] = []
    }
    grouped[realm].push(powerUp)
  }

  return grouped
})

function getRealmInfo(realmId: string) {
  return SECTIONS.find(s => s.id === realmId)
}

function formatStatName(stat: string): string {
  const statNames: Record<string, string> = {
    attack: 'Attack',
    defense: 'Defense',
    maxHp: 'Max HP',
    hpRegen: 'HP Regen',
    evasion: 'Evasion',
    critChance: 'Crit Chance',
    critDamage: 'Crit Damage',
    accuracy: 'Accuracy',
    healing: 'Healing',
    battleXpMultiplier: 'XP Multiplier',
  }
  return statNames[stat] || stat
}
</script>

<template>
  <div class="powerup-display">
    <div class="powerup-header">
      <h3 class="powerup-title">Your Power-Ups</h3>
      <p class="powerup-subtitle">Gained from completing quests across the realms</p>
    </div>

    <!-- Total Stats Summary -->
    <div class="powerup-stats-summary">
      <div class="powerup-stat-card">
        <div class="powerup-stat-icon">⚔️</div>
        <div class="powerup-stat-label">Attack</div>
        <div class="powerup-stat-value">{{ stats.attack }}</div>
      </div>
      <div class="powerup-stat-card">
        <div class="powerup-stat-icon">🛡️</div>
        <div class="powerup-stat-label">Defense</div>
        <div class="powerup-stat-value">{{ stats.defense }}</div>
      </div>
      <div class="powerup-stat-card">
        <div class="powerup-stat-icon">❤️</div>
        <div class="powerup-stat-label">Max HP</div>
        <div class="powerup-stat-value">{{ stats.maxHp }}</div>
      </div>
      <div class="powerup-stat-card">
        <div class="powerup-stat-icon">💨</div>
        <div class="powerup-stat-label">Evasion</div>
        <div class="powerup-stat-value">{{ stats.evasion }}%</div>
      </div>
      <div class="powerup-stat-card">
        <div class="powerup-stat-icon">💥</div>
        <div class="powerup-stat-label">Crit Chance</div>
        <div class="powerup-stat-value">{{ stats.critChance }}%</div>
      </div>
      <div class="powerup-stat-card">
        <div class="powerup-stat-icon">🎯</div>
        <div class="powerup-stat-label">Accuracy</div>
        <div class="powerup-stat-value">{{ stats.accuracy }}%</div>
      </div>
    </div>

    <!-- Power-Ups by Realm -->
    <div class="powerup-realms">
      <div
        v-for="(powerUps, realmId) in powerUpsByRealm"
        :key="realmId"
        class="powerup-realm-section"
      >
        <div class="powerup-realm-header">
          <span class="powerup-realm-icon">{{ getRealmInfo(realmId)?.icon }}</span>
          <span class="powerup-realm-name">{{ getRealmInfo(realmId)?.name }}</span>
        </div>
        <div class="powerup-list">
          <div
            v-for="powerUp in powerUps"
            :key="powerUp.id"
            class="powerup-card"
          >
            <div class="powerup-card-icon">{{ powerUp.icon }}</div>
            <div class="powerup-card-content">
              <div class="powerup-card-name">{{ powerUp.name }}</div>
              <div class="powerup-card-desc">{{ powerUp.description }}</div>
              <div class="powerup-card-stat">
                +{{ powerUp.bonus }} {{ formatStatName(powerUp.stat) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="powerUps.length === 0" class="powerup-empty">
      <p>No power-ups yet!</p>
      <p>Complete quests to earn power-ups and grow stronger in battle.</p>
    </div>
  </div>
</template>
