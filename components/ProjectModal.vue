<script setup lang="ts">
import { ref, computed } from 'vue'
import { SECTIONS, SUBSECTIONS, type Section } from '~/composables/constants'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { addProject } = useApp()

const title = ref('')
const goal = ref('')
const instructions = ref('')
const status = ref<'planning' | 'in-progress' | 'completed' | 'paused'>('planning')
const selectedSection = ref<string | undefined>(undefined)
const selectedSubsection = ref<string | undefined>(undefined)

const canSave = computed(() => {
  return title.value.trim() && goal.value.trim()
})

const subsectionOptions = computed(() => {
  if (!selectedSection.value) return []
  return SUBSECTIONS[selectedSection.value] || []
})

function handleSave() {
  addProject({
    title: title.value,
    goal: goal.value,
    instructions: instructions.value,
    status: status.value,
    section: selectedSection.value,
    subsection: selectedSubsection.value,
  })
  emit('close')
}
</script>

<template>
  <div class="modal-overlay" @click="emit('close')">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <span class="modal-title">Start New Project</span>
        <button class="modal-close" @click="emit('close')">×</button>
      </div>
      <div class="modal-body">
        <div class="form-section">
          <label class="form-label">Project Title</label>
          <input
            v-model="title"
            type="text"
            class="form-input"
            placeholder="What will you build or accomplish?"
            autofocus
          />
        </div>

        <div class="form-section">
          <label class="form-label">Goal</label>
          <textarea
            v-model="goal"
            class="form-input form-textarea"
            placeholder="What is the end goal of this project?"
            rows="3"
          />
        </div>

        <div class="form-section">
          <label class="form-label">
            Instructions
            <span class="form-hint">Optional: Step-by-step plan or notes</span>
          </label>
          <textarea
            v-model="instructions"
            class="form-input form-textarea"
            placeholder="Outline your approach, materials needed, or steps to follow..."
            rows="4"
          />
        </div>

        <div class="form-section">
          <label class="form-label">
            Link to Realm
            <span class="form-hint">Optional</span>
          </label>
          <select v-model="selectedSection" class="form-select">
            <option :value="undefined">No realm</option>
            <option v-for="section in SECTIONS" :key="section.id" :value="section.id">
              {{ section.icon }} {{ section.name }}
            </option>
          </select>
        </div>

        <div v-if="selectedSection" class="form-section">
          <label class="form-label">Link to Subsection</label>
          <select v-model="selectedSubsection" class="form-select">
            <option :value="undefined">No subsection</option>
            <option v-for="subsection in subsectionOptions" :key="subsection.id" :value="subsection.id">
              {{ subsection.icon }} {{ subsection.name }}
            </option>
          </select>
        </div>

        <div class="form-section">
          <label class="form-label">Initial Status</label>
          <div class="status-grid">
            <button
              :class="['status-btn', { selected: status === 'planning' }]"
              @click="status = 'planning'"
            >
              📝 Planning
            </button>
            <button
              :class="['status-btn', { selected: status === 'in-progress' }]"
              @click="status = 'in-progress'"
            >
              🔨 In Progress
            </button>
          </div>
        </div>

        <button
          class="btn btn-primary btn-block"
          :disabled="!canSave"
          @click="handleSave"
        >
          Start Project
        </button>
      </div>
    </div>
  </div>
</template>
