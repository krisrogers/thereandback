<script setup lang="ts">
import { computed } from 'vue'
import { SECTIONS, SUBSECTIONS, type Project } from '~/composables/constants'

const props = defineProps<{
  project: Project
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

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

const statusLabel = computed(() => {
  switch (props.project.status) {
    case 'planning': return 'Planning'
    case 'in-progress': return 'In Progress'
    case 'completed': return 'Completed'
    case 'paused': return 'Paused'
    default: return props.project.status
  }
})

const noteCount = computed(() => props.project.progressNotes.length)
</script>

<template>
  <div class="project-card" @click="emit('click')">
    <div class="project-card-header">
      <h3 class="project-card-title">{{ project.title }}</h3>
      <div class="project-card-status">
        <span class="project-status-icon">{{ statusIcon }}</span>
        <span class="project-status-label">{{ statusLabel }}</span>
      </div>
    </div>
    <p class="project-card-goal">{{ project.goal }}</p>
    <div class="project-card-footer">
      <div v-if="section" class="project-card-realm">
        <span>{{ section.icon }}</span>
        <span>{{ section.name }}</span>
        <span v-if="subsection"> › {{ subsection.icon }} {{ subsection.name }}</span>
      </div>
      <div class="project-card-notes">
        📝 {{ noteCount }} {{ noteCount === 1 ? 'note' : 'notes' }}
      </div>
    </div>
  </div>
</template>
