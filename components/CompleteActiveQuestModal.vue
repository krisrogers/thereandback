<script setup lang="ts">
import { ref, computed } from 'vue'
import { TYPES, TIERS, type ActiveQuest } from '~/composables/constants'

const props = defineProps<{
  quest: ActiveQuest
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { completeActiveQuest } = useApp()

const responses = ref(['', '', ''])
const evidence = ref<string[]>([])
const notes = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

const type = computed(() => TYPES.find(t => t.id === props.quest.type))
const tier = computed(() => TIERS.find(t => t.id === props.quest.tier))

const canSave = computed(() => {
  return evidence.value.length > 0 || responses.value.some(r => r.trim())
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
  completeActiveQuest(props.quest.id, {
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
        <span class="modal-title">Complete Quest</span>
        <button class="modal-close" @click="emit('close')">×</button>
      </div>
      <div class="modal-body">
        <div class="quest-detail-image">
          <QuestImage :image-id="quest.image" />
        </div>
        <h2 class="quest-detail-title">{{ quest.title }}</h2>

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

        <button
          class="btn btn-primary btn-block"
          :disabled="!canSave"
          @click="handleComplete"
        >
          ⚔️ Complete Quest (+{{ tier?.xp }} XP)
        </button>
      </div>
    </div>
  </div>
</template>
