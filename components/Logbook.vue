<script setup lang="ts">
import { computed } from 'vue'
import { SECTIONS, TIERS, getSubsection } from '~/composables/constants'

const emit = defineEmits<{
  (e: 'select-entry', id: string): void
}>()

const { entries } = useApp()

const sortedEntries = computed(() => {
  return [...entries.value].sort((a, b) => {
    const ta = TIERS.find(t => t.id === a.tier)
    const tb = TIERS.find(t => t.id === b.tier)
    if ((tb?.rank || 0) !== (ta?.rank || 0)) {
      return (tb?.rank || 0) - (ta?.rank || 0)
    }
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })
})

function getSection(sectionId: string) {
  return SECTIONS.find(s => s.id === sectionId)
}

function getTier(tierId: string) {
  return TIERS.find(t => t.id === tierId)
}

function formatDate(timestamp: string) {
  return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>

<template>
  <div v-if="!entries.length" class="logbook-empty">
    <div class="logbook-empty-icon">📖</div>
    <h3>No Quests Completed Yet</h3>
    <p>Your adventures await in the Realms</p>
  </div>

  <div v-else class="entry-list">
    <div
      v-for="(entry, i) in sortedEntries"
      :key="entry.id"
      class="entry-card"
      :style="{ animationDelay: `${i * 0.05}s` }"
      @click="emit('select-entry', entry.id)"
    >
      <div class="entry-image-wrap">
        <QuestImage :image-id="entry.image || 'default'" />
      </div>
      <div class="entry-content">
        <div class="entry-header">
          <div class="entry-title">{{ entry.title }}</div>
          <div class="entry-xp">+{{ getTier(entry.tier)?.xp }} XP</div>
        </div>
        <div class="entry-meta">
          <span>
            {{ getSection(entry.section)?.icon }}
            {{ getSubsection(entry.section, entry.subsection)?.name || getSection(entry.section)?.name }}
          </span>
          <span>{{ getTier(entry.tier)?.name }}</span>
          <span>{{ formatDate(entry.timestamp) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
