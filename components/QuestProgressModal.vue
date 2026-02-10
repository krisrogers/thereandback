<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ActiveQuest } from '~/composables/constants'

const props = defineProps<{
  quest: ActiveQuest
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { addQuestProgress } = useApp()

const note = ref('')
const evidence = ref<string[]>([])
const fileInput = ref<HTMLInputElement | null>(null)

const canSave = computed(() => {
  return note.value.trim() || evidence.value.length > 0
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

function handleSave() {
  addQuestProgress(props.quest.id, {
    note: note.value,
    evidence: evidence.value,
  })
  emit('close')
}
</script>

<template>
  <div class="modal-overlay" @click="emit('close')">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <span class="modal-title">Record Progress</span>
        <button class="modal-close" @click="emit('close')">×</button>
      </div>
      <div class="modal-body">
        <div class="quest-progress-quest">
          <span class="form-label">Quest:</span>
          <span>{{ quest.title }}</span>
        </div>

        <div class="form-section">
          <label class="form-label">Journal Entry</label>
          <textarea
            v-model="note"
            class="form-input form-textarea"
            placeholder="What progress did you make? What challenges did you face? What will you try next?"
            rows="5"
            autofocus
          />
        </div>

        <div class="form-section">
          <label class="form-label">
            Evidence
            <span class="form-hint">Optional: Add photos of your progress</span>
          </label>
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
          @click="handleSave"
        >
          Save Entry
        </button>
      </div>
    </div>
  </div>
</template>
