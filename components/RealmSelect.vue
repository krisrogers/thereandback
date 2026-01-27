<script setup lang="ts">
import { SECTIONS, type Section } from '~/composables/constants'

const { entries } = useApp()

const emit = defineEmits<{
  (e: 'select', realm: Section): void
}>()

function getCount(sectionId: string) {
  return entries.value.filter(e => e.section === sectionId).length
}
</script>

<template>
  <div class="realm-grid">
    <div
      v-for="section in SECTIONS"
      :key="section.id"
      class="realm-card"
      :style="{ '--realm-color': section.color }"
      @click="emit('select', section)"
    >
      <span v-if="getCount(section.id) > 0" class="realm-count">
        {{ getCount(section.id) }} complete
      </span>
      <div class="realm-header">
        <div class="realm-icon-wrap">
          <div class="realm-icon-bg" />
          <div class="realm-icon">{{ section.icon }}</div>
        </div>
        <div class="realm-info">
          <div class="realm-name">{{ section.name }}</div>
          <div class="realm-subtitle">{{ section.description }}</div>
        </div>
        <div class="realm-arrow">→</div>
      </div>
    </div>
  </div>
</template>
