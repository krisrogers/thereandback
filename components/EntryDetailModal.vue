<script setup lang="ts">
import { computed } from 'vue'
import { SECTIONS, TYPES, TIERS, getSubsection, type Entry } from '~/composables/constants'

const props = defineProps<{
  entry: Entry
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { deleteEntry } = useApp()

const section = computed(() => SECTIONS.find(s => s.id === props.entry.section))
const type = computed(() => TYPES.find(t => t.id === props.entry.type))
const tier = computed(() => TIERS.find(t => t.id === props.entry.tier))
const subsection = computed(() => getSubsection(props.entry.section, props.entry.subsection))

const formattedDate = computed(() => {
  return new Date(props.entry.timestamp).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
})

const hasResponses = computed(() => {
  return props.entry.responses?.some(r => r.trim())
})

function handleDelete() {
  if (confirm('Remove?')) {
    deleteEntry(props.entry.id)
    emit('close')
  }
}
</script>

<template>
  <div class="modal-overlay" @click="emit('close')">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <span class="modal-title">Quest Complete</span>
        <button class="modal-close" @click="emit('close')">×</button>
      </div>
      <div class="modal-body">
        <div class="detail-hero">
          <div class="detail-image">
            <QuestImage :image-id="entry.image || 'default'" />
          </div>
          <h2 class="detail-title">{{ entry.title }}</h2>
          <div class="detail-badges">
            <span class="detail-badge">{{ tier?.name }}</span>
            <span class="detail-badge">+{{ tier?.xp }} XP</span>
            <span v-if="subsection" class="detail-badge">
              {{ subsection.icon }} {{ subsection.name }}
            </span>
            <span class="detail-badge">{{ section?.name }}</span>
          </div>
        </div>
        <div class="detail-section">
          <div class="detail-label">Date Completed</div>
          <div class="detail-value">{{ formattedDate }}</div>
        </div>
        <div v-if="hasResponses" class="detail-section">
          <div class="detail-label">Reflections</div>
          <div class="detail-responses">
            <template v-for="(prompt, i) in type?.prompts" :key="i">
              <div v-if="entry.responses[i]?.trim()" class="detail-response">
                <div class="detail-response-q">{{ prompt }}</div>
                <div class="detail-value">{{ entry.responses[i] }}</div>
              </div>
            </template>
          </div>
        </div>
        <div v-if="entry.evidence?.length > 0" class="detail-section">
          <div class="detail-label">Evidence</div>
          <div class="detail-evidence-grid">
            <img
              v-for="(img, i) in entry.evidence"
              :key="i"
              :src="img"
              alt=""
              class="detail-evidence-img"
            />
          </div>
        </div>
        <div class="detail-actions">
          <button class="btn btn-danger btn-block" @click="handleDelete">
            Remove Entry
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
