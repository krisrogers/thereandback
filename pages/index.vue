<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Section, Subsection, Quest } from '~/composables/constants'

const { entries } = useApp()

const view = ref('realms')
const selectedRealm = ref<Section | null>(null)
const selectedSubsection = ref<Subsection | null>(null)
const showQuestModal = ref<Quest | null>(null)
const showCustomQuest = ref(false)
const showEntryDetail = ref<string | null>(null)

function handleRealmSelect(realm: Section) {
  selectedRealm.value = realm
  selectedSubsection.value = null
}

function handleSubsectionSelect(subsection: Subsection) {
  selectedSubsection.value = subsection
}

function handleBackFromSubsection() {
  selectedSubsection.value = null
}

function handleBackFromRealm() {
  selectedRealm.value = null
  selectedSubsection.value = null
}

function handleResetNavigation() {
  selectedRealm.value = null
  selectedSubsection.value = null
}

function handleQuestComplete() {
  showQuestModal.value = null
}

function handleCustomQuestComplete() {
  showCustomQuest.value = false
}

const selectedEntry = computed(() => {
  if (!showEntryDetail.value) return null
  return entries.value.find(e => e.id === showEntryDetail.value)
})
</script>

<template>
  <div class="app">
    <ParticleBackground />
    <AppHeader />
    <AppNavigation
      :current-view="view"
      @update:view="view = $event"
      @reset-navigation="handleResetNavigation"
    />
    <main class="main">
      <RealmSelect
        v-if="view === 'realms' && !selectedRealm"
        @select="handleRealmSelect"
      />
      <SubsectionSelect
        v-if="view === 'realms' && selectedRealm && !selectedSubsection"
        :realm="selectedRealm"
        @back="handleBackFromRealm"
        @select="handleSubsectionSelect"
      />
      <QuestBoard
        v-if="view === 'realms' && selectedRealm && selectedSubsection"
        :realm="selectedRealm"
        :subsection="selectedSubsection"
        @back="handleBackFromSubsection"
        @select-quest="showQuestModal = $event"
        @custom-quest="showCustomQuest = true"
      />
      <Logbook
        v-if="view === 'logbook'"
        @select-entry="showEntryDetail = $event"
      />
      <ProgressView v-if="view === 'progress'" />
    </main>

    <QuestModal
      v-if="showQuestModal"
      :quest="showQuestModal"
      @close="handleQuestComplete"
    />
    <CustomQuestModal
      v-if="showCustomQuest"
      :realm="selectedRealm"
      :subsection="selectedSubsection"
      @close="handleCustomQuestComplete"
    />
    <EntryDetailModal
      v-if="selectedEntry"
      :entry="selectedEntry"
      @close="showEntryDetail = null"
    />
  </div>
</template>
