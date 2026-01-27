<script setup lang="ts">
import { computed } from 'vue'
import { SUBSECTIONS, type Section, type Subsection } from '~/composables/constants'

const props = defineProps<{
  realm: Section
}>()

const emit = defineEmits<{
  (e: 'back'): void
  (e: 'select', subsection: Subsection): void
}>()

const { entries } = useApp()

const subsections = computed(() => SUBSECTIONS[props.realm.id] || [])

function getCount(subsectionId: string) {
  return entries.value.filter(e => e.section === props.realm.id && e.subsection === subsectionId).length
}
</script>

<template>
  <div>
    <div class="quest-header">
      <button class="back-btn" @click="emit('back')">←</button>
      <div class="quest-header-info">
        <h2>{{ realm.icon }} {{ realm.name }}</h2>
        <p>Choose your craft</p>
      </div>
    </div>
    <div class="realm-grid">
      <div
        v-for="sub in subsections"
        :key="sub.id"
        class="realm-card"
        :style="{ '--realm-color': realm.color }"
        @click="emit('select', sub)"
      >
        <span v-if="getCount(sub.id) > 0" class="realm-count">
          {{ getCount(sub.id) }} complete
        </span>
        <div class="realm-header">
          <div class="realm-icon-wrap">
            <div class="realm-icon-bg" />
            <div class="realm-icon">{{ sub.icon }}</div>
          </div>
          <div class="realm-info">
            <div class="realm-name">{{ sub.name }}</div>
            <div class="realm-subtitle">{{ sub.description }}</div>
          </div>
          <div class="realm-arrow">→</div>
        </div>
      </div>
    </div>
  </div>
</template>
