<script setup lang="ts">
import { computed } from 'vue'
import { SECTIONS, SUBSECTIONS, TIERS, type ActiveQuest } from '~/composables/constants'

const props = defineProps<{
  quest: ActiveQuest
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'add-progress'): void
  (e: 'complete'): void
  (e: 'abandon', questId: string): void
}>()

const section = computed(() => SECTIONS.find(s => s.id === props.quest.section))
const subsection = computed(() => {
  const subs = SUBSECTIONS[props.quest.section]
  return subs?.find(s => s.id === props.quest.subsection)
})
const tier = computed(() => TIERS.find(t => t.id === props.quest.tier))

const sortedNotes = computed(() => {
  return [...props.quest.progressNotes].sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
})

function formatDate(timestamp: string) {
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}
</script>

<template>
  <div class="modal-overlay" @click="emit('close')">
    <div class="modal modal-wide" @click.stop>
      <div class="modal-header">
        <span class="modal-title">{{ quest.title }}</span>
        <button class="modal-close" @click="emit('close')">×</button>
      </div>
      <div class="modal-body">
        <div class="quest-detail-image">
          <QuestImage :image-id="quest.image" />
        </div>

        <p class="quest-detail-desc">{{ quest.description }}</p>

        <div class="quest-detail-stats">
          <div class="quest-detail-stat">
            <div class="quest-detail-stat-value">
              {{ '★'.repeat(tier?.stars || 1) }}
            </div>
            <div class="quest-detail-stat-label">Difficulty</div>
          </div>
          <div class="quest-detail-stat">
            <div class="quest-detail-stat-value">{{ tier?.name }}</div>
            <div class="quest-detail-stat-label">Tier</div>
          </div>
          <div class="quest-detail-stat">
            <div class="quest-detail-stat-value">+{{ tier?.xp }}</div>
            <div class="quest-detail-stat-label">XP Reward</div>
          </div>
        </div>

        <div class="form-section">
          <label class="form-label">Realm</label>
          <div class="quest-realm-badge">
            <span v-if="section">{{ section.icon }} {{ section.name }}</span>
            <span v-if="subsection"> › {{ subsection.icon }} {{ subsection.name }}</span>
          </div>
        </div>

        <div class="form-section">
          <div class="section-header-with-btn">
            <label class="form-label">Quest Journal ({{ quest.progressNotes.length }})</label>
            <button class="btn btn-primary btn-sm" @click="emit('add-progress')">
              + Add Entry
            </button>
          </div>

          <div v-if="sortedNotes.length === 0" class="empty-journal">
            No journal entries yet. Record your progress as you work on this quest!
          </div>

          <div v-else class="journal-entries">
            <div v-for="note in sortedNotes" :key="note.id" class="journal-entry">
              <div class="journal-entry-date">{{ formatDate(note.timestamp) }}</div>
              <div class="journal-entry-text">{{ note.note }}</div>
              <div v-if="note.evidence.length > 0" class="journal-entry-evidence">
                <img
                  v-for="(img, i) in note.evidence"
                  :key="i"
                  :src="img"
                  alt="Evidence"
                  class="journal-entry-img"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="btn-row">
          <button class="btn btn-danger" @click="emit('abandon', quest.id)">
            Abandon Quest
          </button>
          <button class="btn btn-primary" @click="emit('complete')">
            ⚔️ Complete Quest
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
