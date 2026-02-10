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
      :class="['nav-tab', { active: currentView === 'tree' }]"
      @click="emit('update:view', 'tree')"
    >
      <span class="nav-tab-icon">🌳</span>Tree
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
    <button
      :class="['nav-tab', { active: currentView === 'projects' }]"
      @click="emit('update:view', 'projects')"
    >
      <span class="nav-tab-icon">📋</span>Projects
    </button>
    <button
      :class="['nav-tab', { active: currentView === 'battle' }]"
      @click="emit('update:view', 'battle')"
    >
      <span class="nav-tab-icon">⚔️</span>Battle
    </button>
    <button
      :class="['nav-tab', { active: currentView === 'guide' }]"
      @click="emit('update:view', 'guide')"
    >
      <span class="nav-tab-icon">🗺️</span>Guide
    </button>
  </nav>
</template>
