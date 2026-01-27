<script setup lang="ts">
import { ref, computed } from 'vue'
import { TYPES, TIERS, type Section, type Subsection } from '~/composables/constants'

const props = defineProps<{
  realm: Section | null
  subsection: Subsection | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { addEntry } = useApp()

const step = ref(1)
const title = ref('')
const selectedType = ref('build')
const selectedTier = ref('wanderer')
const responses = ref(['', '', ''])
const evidence = ref<string[]>([])
const notes = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

const type = computed(() => TYPES.find(t => t.id === selectedType.value))
const tier = computed(() => TIERS.find(t => t.id === selectedTier.value))

const canSave = computed(() => {
  return title.value.trim() && (evidence.value.length > 0 || responses.value.some(r => r.trim()))
})

function handleFile(e: Event) {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (!files) return

  Array.from(files).forEach(f => {
    const reader = new FileReader()
    reader.onload = (ev) => {
      const result = ev.target?.result as string
      evidence.value = [...evidence.value, result]
    }
    reader.readAsDataURL(f)
  })
}

function removeEvidence(index: number) {
  evidence.value = evidence.value.filter((_, i) => i !== index)
}

function handleComplete() {
  addEntry({
    title: title.value,
    section: props.realm?.id || 'workshop',
    subsection: props.subsection?.id || '',
    type: selectedType.value,
    tier: selectedTier.value,
    image: 'default',
    responses: responses.value,
    evidence: evidence.value,
    notes: notes.value,
  })
  emit('close')
}
</script>

<template>
  <div class="modal-overlay" @click="emit('close')">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <span class="modal-title">
          {{ step === 1 ? 'Create Quest' : step === 2 ? 'Choose Tier' : 'Complete Quest' }}
        </span>
        <button class="modal-close" @click="emit('close')">×</button>
      </div>
      <div class="modal-body">
        <!-- Step 1: Name and Type -->
        <template v-if="step === 1">
          <div class="form-section">
            <label class="form-label">Quest Name</label>
            <input
              v-model="title"
              type="text"
              class="form-input"
              placeholder="What will you accomplish?"
              autofocus
            />
          </div>
          <div class="form-section">
            <label class="form-label">Quest Type</label>
            <div class="type-grid">
              <button
                v-for="t in TYPES"
                :key="t.id"
                :class="['type-btn', { selected: selectedType === t.id }]"
                @click="selectedType = t.id"
              >
                <span class="type-btn-icon">{{ t.icon }}</span>
                <span class="type-btn-label">{{ t.name }}</span>
              </button>
            </div>
          </div>
          <button
            class="btn btn-primary btn-block"
            :disabled="!title.trim()"
            @click="step = 2"
          >
            Continue →
          </button>
        </template>

        <!-- Step 2: Tier Selection -->
        <template v-if="step === 2">
          <div class="form-section">
            <label class="form-label">
              Quest Difficulty
              <span class="form-hint">Based on complexity and stakes</span>
            </label>
            <div class="tier-list">
              <button
                v-for="t in TIERS"
                :key="t.id"
                :class="['tier-btn', { selected: selectedTier === t.id }]"
                @click="selectedTier = t.id"
              >
                <div class="tier-rank">{{ t.rank }}</div>
                <div class="tier-info">
                  <div class="tier-name">{{ t.name }}</div>
                  <div class="tier-desc">{{ t.description }}</div>
                </div>
                <div class="tier-xp">+{{ t.xp }}</div>
              </button>
            </div>
          </div>
          <div class="btn-row">
            <button class="btn btn-secondary" @click="step = 1">← Back</button>
            <button class="btn btn-primary" @click="step = 3">Continue →</button>
          </div>
        </template>

        <!-- Step 3: Completion -->
        <template v-if="step === 3">
          <div class="quest-detail-stats" style="margin-bottom: 1.5rem">
            <div class="quest-detail-stat">
              <div class="quest-detail-stat-value">{{ type?.icon }}</div>
              <div class="quest-detail-stat-label">{{ type?.name }}</div>
            </div>
            <div class="quest-detail-stat">
              <div class="quest-detail-stat-value">{{ tier?.name }}</div>
              <div class="quest-detail-stat-label">Tier</div>
            </div>
            <div class="quest-detail-stat">
              <div class="quest-detail-stat-value">+{{ tier?.xp }}</div>
              <div class="quest-detail-stat-label">XP</div>
            </div>
          </div>
          <div v-for="(prompt, i) in type?.prompts" :key="i" class="prompt-field">
            <p class="prompt-q">{{ prompt }}</p>
            <textarea
              v-model="responses[i]"
              class="form-input form-textarea"
              placeholder="Your answer..."
            />
          </div>
          <div class="form-section">
            <label class="form-label">Evidence</label>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              multiple
              style="display: none"
              @change="handleFile"
            />
            <div class="evidence-upload" @click="fileInput?.click()">
              <div class="evidence-upload-icon">📷</div>
              <div class="evidence-upload-text">Tap to add photos</div>
            </div>
            <div v-if="evidence.length > 0" class="evidence-preview">
              <div v-for="(img, i) in evidence" :key="i" class="evidence-thumb-wrap">
                <img :src="img" alt="" class="evidence-thumb" />
                <button class="evidence-remove" @click="removeEvidence(i)">×</button>
              </div>
            </div>
          </div>
          <div class="btn-row">
            <button class="btn btn-secondary" @click="step = 2">← Back</button>
            <button
              class="btn btn-primary"
              :disabled="!canSave"
              @click="handleComplete"
            >
              ⚔️ Complete (+{{ tier?.xp }} XP)
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
