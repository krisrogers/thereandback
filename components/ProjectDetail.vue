<script setup lang="ts">
import { ref, computed } from 'vue'
import { SECTIONS, SUBSECTIONS, type Project } from '~/composables/constants'

const props = defineProps<{
  project: Project
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'add-note'): void
  (e: 'update-status', status: Project['status']): void
  (e: 'delete'): void
}>()

const showDeleteConfirm = ref(false)

const section = computed(() => {
  if (!props.project.section) return null
  return SECTIONS.find(s => s.id === props.project.section)
})

const subsection = computed(() => {
  if (!props.project.section || !props.project.subsection) return null
  const subs = SUBSECTIONS[props.project.section]
  return subs?.find(s => s.id === props.project.subsection)
})

const statusIcon = computed(() => {
  switch (props.project.status) {
    case 'planning': return '📝'
    case 'in-progress': return '🔨'
    case 'completed': return '✅'
    case 'paused': return '⏸️'
    default: return '📋'
  }
})

const sortedNotes = computed(() => {
  return [...props.project.progressNotes].sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
})

function formatDate(timestamp: string) {
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

function handleDelete() {
  emit('delete')
  emit('close')
}
</script>

<template>
  <div class="modal-overlay" @click="emit('close')">
    <div class="modal modal-wide" @click.stop>
      <div class="modal-header">
        <span class="modal-title">{{ project.title }}</span>
        <button class="modal-close" @click="emit('close')">×</button>
      </div>
      <div class="modal-body">
        <div class="project-detail-status">
          <span class="project-status-large">{{ statusIcon }}</span>
          <select
            :value="project.status"
            class="form-select"
            @change="emit('update-status', ($event.target as HTMLSelectElement).value as Project['status'])"
          >
            <option value="planning">📝 Planning</option>
            <option value="in-progress">🔨 In Progress</option>
            <option value="paused">⏸️ Paused</option>
            <option value="completed">✅ Completed</option>
          </select>
        </div>

        <div class="form-section">
          <label class="form-label">Goal</label>
          <div class="project-detail-text">{{ project.goal }}</div>
        </div>

        <div v-if="project.instructions" class="form-section">
          <label class="form-label">Instructions</label>
          <div class="project-detail-text project-detail-instructions">{{ project.instructions }}</div>
        </div>

        <div v-if="section" class="form-section">
          <label class="form-label">Linked Realm</label>
          <div class="project-detail-realm">
            <span>{{ section.icon }} {{ section.name }}</span>
            <span v-if="subsection"> › {{ subsection.icon }} {{ subsection.name }}</span>
          </div>
        </div>

        <div class="form-section">
          <div class="project-detail-notes-header">
            <label class="form-label">Progress Notes ({{ project.progressNotes.length }})</label>
            <button class="btn btn-primary btn-sm" @click="emit('add-note')">
              + Add Note
            </button>
          </div>

          <div v-if="sortedNotes.length === 0" class="project-detail-empty">
            No progress notes yet. Add your first note to track your journey!
          </div>

          <div v-else class="progress-notes-list">
            <div v-for="note in sortedNotes" :key="note.id" class="progress-note">
              <div class="progress-note-header">
                <span class="progress-note-date">{{ formatDate(note.timestamp) }}</span>
              </div>
              <div class="progress-note-text">{{ note.note }}</div>
              <div v-if="note.evidence.length > 0" class="progress-note-evidence">
                <img
                  v-for="(img, i) in note.evidence"
                  :key="i"
                  :src="img"
                  alt="Evidence"
                  class="progress-note-img"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="form-section">
          <div class="project-detail-meta">
            <div class="project-meta-item">
              <span class="project-meta-label">Started</span>
              <span class="project-meta-value">{{ formatDate(project.startedAt) }}</span>
            </div>
            <div v-if="project.completedAt" class="project-meta-item">
              <span class="project-meta-label">Completed</span>
              <span class="project-meta-value">{{ formatDate(project.completedAt) }}</span>
            </div>
          </div>
        </div>

        <div class="btn-row">
          <button
            v-if="!showDeleteConfirm"
            class="btn btn-danger"
            @click="showDeleteConfirm = true"
          >
            Delete Project
          </button>
          <template v-else>
            <button class="btn btn-secondary" @click="showDeleteConfirm = false">
              Cancel
            </button>
            <button class="btn btn-danger" @click="handleDelete">
              Confirm Delete
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
