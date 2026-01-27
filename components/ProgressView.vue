<script setup lang="ts">
import { computed } from 'vue'
import { SECTIONS, TIERS, AVATAR_STAGES, getAvatarStage } from '~/composables/constants'

const { entries, totalXP, level, xpInLevel } = useApp()

const stage = computed(() => getAvatarStage(level.value))
const nextStage = computed(() => AVATAR_STAGES.find(s => s.minLevel > level.value))

const tierCounts = computed(() => {
  return TIERS.map(t => ({
    ...t,
    count: entries.value.filter(e => e.tier === t.id).length
  }))
})

const sectionCounts = computed(() => {
  return SECTIONS.map(s => ({
    ...s,
    count: entries.value.filter(e => e.section === s.id).length
  }))
})

const xpToNextStage = computed(() => {
  if (!nextStage.value) return 0
  return (nextStage.value.minLevel - 1) * 100 - totalXP.value
})
</script>

<template>
  <div>
    <div class="progress-section">
      <h3 class="progress-title">Your Avatar</h3>
      <div class="avatar-showcase">
        <div class="avatar-showcase-inner">
          <Avatar :level="level" :size="140" />
          <div class="avatar-stage-name">{{ stage.name }}</div>
          <div class="avatar-stage-desc">{{ stage.description }}</div>
        </div>
      </div>
      <div v-if="nextStage" class="next-avatar">
        <div class="next-avatar-label">Next Evolution</div>
        <div class="next-avatar-name">{{ nextStage.name }}</div>
        <div class="next-avatar-xp">
          Reach Level {{ nextStage.minLevel }} ({{ xpToNextStage }} XP to go)
        </div>
      </div>
    </div>

    <div class="progress-section">
      <h3 class="progress-title">Level Progress</h3>
      <div class="level-display">
        <div class="level-number">{{ level }}</div>
        <div class="level-label">Level</div>
        <div class="xp-bar-container">
          <div class="xp-bar-header">
            <span class="xp-bar-label">Progress to Level {{ level + 1 }}</span>
            <span class="xp-bar-value">{{ xpInLevel }} / 100 XP</span>
          </div>
          <div class="xp-bar">
            <div class="xp-bar-fill" :style="{ width: `${xpInLevel}%` }" />
          </div>
        </div>
      </div>
    </div>

    <div class="progress-section">
      <h3 class="progress-title">Quests by Tier</h3>
      <div class="tier-list">
        <div v-for="t in tierCounts" :key="t.id" class="tier-btn" style="cursor: default">
          <div class="tier-rank">{{ t.count }}</div>
          <div class="tier-info">
            <div class="tier-name">{{ t.name }}</div>
            <div class="tier-desc">{{ t.description }}</div>
          </div>
          <div class="tier-xp">{{ t.count * t.xp }} XP</div>
        </div>
      </div>
    </div>

    <div class="progress-section">
      <h3 class="progress-title">Realms Explored</h3>
      <div class="realm-progress">
        <div v-for="s in sectionCounts" :key="s.id" class="realm-progress-row">
          <div class="realm-progress-icon">{{ s.icon }}</div>
          <div class="realm-progress-info">
            <div class="realm-progress-name">{{ s.name }}</div>
          </div>
          <div class="realm-progress-count">{{ s.count }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
