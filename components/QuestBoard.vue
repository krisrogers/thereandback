<script setup lang="ts">
import { computed } from 'vue'
import { QUESTS, TIERS, type Section, type Subsection, type Quest } from '~/composables/constants'

const props = defineProps<{
  realm: Section
  subsection: Subsection
}>()

const emit = defineEmits<{
  (e: 'back'): void
  (e: 'select-quest', quest: Quest): void
  (e: 'custom-quest'): void
}>()

const { entries } = useApp()

const quests = computed(() => {
  return QUESTS
    .filter(q => q.section === props.realm.id && q.subsection === props.subsection.id)
    .sort((a, b) => {
      const tierA = TIERS.find(t => t.id === a.tier)
      const tierB = TIERS.find(t => t.id === b.tier)
      return (tierA?.rank || 0) - (tierB?.rank || 0)
    })
})

const completedQuestIds = computed(() => {
  return entries.value.filter(e => e.questId).map(e => e.questId)
})

function getTier(tierId: string) {
  return TIERS.find(t => t.id === tierId)
}

function isCompleted(questId: string) {
  return completedQuestIds.value.includes(questId)
}
</script>

<template>
  <div>
    <div class="quest-header">
      <button class="back-btn" @click="emit('back')">←</button>
      <div class="quest-header-info">
        <h2>{{ subsection.icon }} {{ subsection.name }}</h2>
        <p>{{ subsection.description }}</p>
      </div>
    </div>
    <div class="quest-list">
      <div
        v-for="quest in quests"
        :key="quest.id"
        :class="['quest-card', { completed: isCompleted(quest.id) }]"
        @click="emit('select-quest', quest)"
      >
        <div class="quest-image-wrap">
          <QuestImage :image-id="quest.image" />
        </div>
        <div class="quest-content">
          <div class="quest-title">{{ quest.title }}</div>
          <div class="quest-desc">{{ quest.description }}</div>
          <div class="quest-meta">
            <div class="quest-stars">
              <span
                v-for="i in 5"
                :key="i"
                :class="['quest-star', { empty: i > (getTier(quest.tier)?.stars || 0) }]"
              >★</span>
            </div>
            <span class="quest-tier">{{ getTier(quest.tier)?.name }}</span>
            <span class="quest-xp">+{{ getTier(quest.tier)?.xp }} XP</span>
          </div>
        </div>
      </div>
      <button class="custom-quest-btn" @click="emit('custom-quest')">
        ✦ Create Your Own Quest ✦
      </button>
    </div>
  </div>
</template>
