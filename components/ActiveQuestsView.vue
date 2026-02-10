<script setup lang="ts">
import { ref } from 'vue'
import type { ActiveQuest } from '~/composables/constants'

const { activeQuests, abandonQuest } = useApp()

const selectedQuest = ref<ActiveQuest | null>(null)
const showProgressModal = ref(false)
const showCompleteModal = ref(false)

function openQuestDetail(quest: ActiveQuest) {
  selectedQuest.value = quest
}

function closeQuestDetail() {
  selectedQuest.value = null
  showProgressModal.value = false
  showCompleteModal.value = false
}

function handleAddProgress() {
  showProgressModal.value = true
}

function handleCompleteQuest() {
  showCompleteModal.value = true
}

function handleAbandon(questId: string) {
  if (confirm('Abandon this quest? All progress will be lost.')) {
    abandonQuest(questId)
    closeQuestDetail()
  }
}

function formatDate(timestamp: string) {
  const date = new Date(timestamp)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Started today'
  if (diffDays === 1) return 'Started yesterday'
  if (diffDays < 7) return `Started ${diffDays} days ago`
  return `Started ${date.toLocaleDateString()}`
}
</script>

<template>
  <div class="active-quests-view">
    <div class="view-header">
      <h2 class="view-title">Active Quests</h2>
    </div>

    <div v-if="activeQuests.length === 0" class="empty-state">
      <div class="empty-icon">⚔️</div>
      <h3 class="empty-title">No Active Quests</h3>
      <p class="empty-text">
        Visit the Realms and start a quest to track your progress with journal entries.
      </p>
    </div>

    <div v-else class="quest-cards">
      <div
        v-for="quest in activeQuests"
        :key="quest.id"
        class="active-quest-card"
        @click="openQuestDetail(quest)"
      >
        <div class="active-quest-header">
          <QuestImage :image-id="quest.image" class="active-quest-icon" />
          <div class="active-quest-info">
            <h3 class="active-quest-title">{{ quest.title }}</h3>
            <p class="active-quest-desc">{{ quest.description }}</p>
          </div>
        </div>
        <div class="active-quest-footer">
          <span class="active-quest-date">{{ formatDate(quest.startedAt) }}</span>
          <span class="active-quest-notes">
            📝 {{ quest.progressNotes.length }} {{ quest.progressNotes.length === 1 ? 'entry' : 'entries' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Quest Detail Modal -->
    <ActiveQuestDetail
      v-if="selectedQuest && !showProgressModal && !showCompleteModal"
      :quest="selectedQuest"
      @close="closeQuestDetail"
      @add-progress="handleAddProgress"
      @complete="handleCompleteQuest"
      @abandon="handleAbandon"
    />

    <!-- Progress Modal -->
    <QuestProgressModal
      v-if="showProgressModal && selectedQuest"
      :quest="selectedQuest"
      @close="showProgressModal = false"
    />

    <!-- Complete Modal -->
    <CompleteActiveQuestModal
      v-if="showCompleteModal && selectedQuest"
      :quest="selectedQuest"
      @close="closeQuestDetail"
    />
  </div>
</template>
