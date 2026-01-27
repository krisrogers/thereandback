<script setup lang="ts">
defineProps<{
  currentView: string
}>()

const emit = defineEmits<{
  (e: 'update:view', view: string): void
  (e: 'reset-navigation'): void
}>()

function handleRealmClick() {
  emit('update:view', 'realms')
  emit('reset-navigation')
}
</script>

<template>
  <nav class="nav-tabs">
    <button
      :class="['nav-tab', { active: currentView === 'realms' }]"
      @click="handleRealmClick"
    >
      <span class="nav-tab-icon">🏰</span>Realms
    </button>
    <button
      :class="['nav-tab', { active: currentView === 'logbook' }]"
      @click="emit('update:view', 'logbook')"
    >
      <span class="nav-tab-icon">📖</span>Logbook
    </button>
    <button
      :class="['nav-tab', { active: currentView === 'progress' }]"
      @click="emit('update:view', 'progress')"
    >
      <span class="nav-tab-icon">⭐</span>Progress
    </button>
  </nav>
</template>
