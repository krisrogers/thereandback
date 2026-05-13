<script setup lang="ts">
import { ref, computed } from 'vue'
import { SECTIONS, SUBSECTIONS, TYPES, TIERS, getLocationType, type Expedition, type Entry } from '~/composables/constants'

const props = defineProps<{
  expedition: Expedition | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const {
  locations,
  entries,
  expeditions,
  addExpedition,
  updateExpedition,
  deleteExpedition,
  addEntry,
  linkEntryToExpedition,
} = useApp()

const isNew = computed(() => !props.expedition)
const isEditing = ref(isNew.value)
const showQuestForm = ref(false)
const localExpeditionId = ref<string | null>(props.expedition?.id ?? null)

const title = ref(props.expedition?.title || '')
const date = ref(props.expedition?.date || new Date().toISOString().slice(0, 10))
const selectedLocationIds = ref<string[]>(props.expedition?.locationIds ? [...props.expedition.locationIds] : [])
const notes = ref(props.expedition?.notes || '')

// Quest-entry mini-form
const qSection = ref<string>('wilds')
const qSubsection = ref<string>('')
const qTitle = ref('')
const qType = ref<string>('expedition')
const qTier = ref<string>('wanderer')
const qNotes = ref('')

const currentExpedition = computed(() => {
  if (!localExpeditionId.value) return null
  // Look up live data from the store so a freshly created expedition is reactive
  return expeditions.value.find(e => e.id === localExpeditionId.value) || props.expedition
})

const linkedEntries = computed<Entry[]>(() => {
  const exp = currentExpedition.value
  if (!exp) return []
  return exp.questEntryIds
    .map(id => entries.value.find(e => e.id === id))
    .filter((e): e is Entry => !!e)
})

const linkedLocations = computed(() => {
  const exp = currentExpedition.value
  if (!exp) return []
  return exp.locationIds
    .map(id => locations.value.find(l => l.id === id))
    .filter((l): l is NonNullable<typeof l> => !!l)
})

const sortedLocationsForPicker = computed(() => {
  return [...locations.value].sort((a, b) => {
    if (a.status !== b.status) return a.status === 'wishlist' ? -1 : 1
    return a.name.localeCompare(b.name)
  })
})

const subsectionsForSection = computed(() => SUBSECTIONS[qSection.value] || [])

const canSave = computed(() => date.value && (title.value.trim() || selectedLocationIds.value.length > 0))

const canSaveQuest = computed(() => qSection.value && qSubsection.value && qTitle.value.trim().length > 0)

const totalXP = computed(() => {
  return linkedEntries.value.reduce((sum, e) => {
    const tier = TIERS.find(t => t.id === e.tier)
    return sum + (tier?.xp || 0)
  }, 0)
})

function toggleLocation(id: string) {
  const idx = selectedLocationIds.value.indexOf(id)
  if (idx >= 0) selectedLocationIds.value.splice(idx, 1)
  else selectedLocationIds.value.push(id)
}

function defaultTitleFromLocations() {
  if (title.value.trim()) return title.value.trim()
  if (selectedLocationIds.value.length === 0) return 'Untitled Expedition'
  const names = selectedLocationIds.value
    .map(id => locations.value.find(l => l.id === id)?.name)
    .filter(Boolean) as string[]
  if (names.length === 1) return names[0]
  if (names.length === 2) return `${names[0]} & ${names[1]}`
  return `${names[0]} & ${names.length - 1} more`
}

function handleSave() {
  if (!canSave.value) return
  if (isNew.value) {
    const exp = addExpedition({
      title: defaultTitleFromLocations(),
      date: date.value,
      locationIds: [...selectedLocationIds.value],
      notes: notes.value,
    })
    localExpeditionId.value = exp.id
    isEditing.value = false
  } else if (props.expedition) {
    updateExpedition(props.expedition.id, {
      title: defaultTitleFromLocations(),
      date: date.value,
      locationIds: [...selectedLocationIds.value],
      notes: notes.value,
    })
    isEditing.value = false
  }
}

function handleDelete() {
  if (!props.expedition) return
  if (confirm(`Delete this expedition? Linked quest entries will remain in your logbook.`)) {
    deleteExpedition(props.expedition.id)
    emit('close')
  }
}

function openQuestForm() {
  showQuestForm.value = true
  qSection.value = 'wilds'
  qSubsection.value = (SUBSECTIONS['wilds']?.[0]?.id) || ''
  qTitle.value = ''
  qType.value = 'expedition'
  qTier.value = 'wanderer'
  qNotes.value = ''
}

function saveQuestEntry() {
  if (!canSaveQuest.value) return
  const expId = localExpeditionId.value || props.expedition?.id
  if (!expId) return
  const entry = addEntry({
    title: qTitle.value.trim(),
    section: qSection.value,
    subsection: qSubsection.value,
    type: qType.value,
    tier: qTier.value,
    expeditionId: expId,
    image: 'default',
    responses: [],
    evidence: [],
    notes: qNotes.value,
  })
  linkEntryToExpedition(expId, entry.id)
  showQuestForm.value = false
}

function unlinkEntry(entryId: string) {
  if (confirm('Remove this quest from the expedition? The entry stays in your logbook.')) {
    const expId = localExpeditionId.value || props.expedition?.id
    if (!expId) return
    updateExpedition(expId, {
      questEntryIds: linkedEntries.value.filter(e => e.id !== entryId).map(e => e.id),
    })
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
}

function getSection(id: string) {
  return SECTIONS.find(s => s.id === id)
}
function getSubsection(secId: string, subId: string) {
  return SUBSECTIONS[secId]?.find(s => s.id === subId)
}
function getTier(id: string) {
  return TIERS.find(t => t.id === id)
}
</script>

<template>
  <div class="modal-overlay" @click="emit('close')">
    <div class="modal modal-wide" @click.stop>
      <div class="modal-header">
        <span class="modal-title">
          {{ isNew && isEditing ? 'Log Expedition' : isEditing ? 'Edit Expedition' : currentExpedition?.title }}
        </span>
        <button class="modal-close" @click="emit('close')">×</button>
      </div>
      <div class="modal-body">
        <!-- View mode -->
        <template v-if="!isEditing && currentExpedition">
          <div class="exp-detail-date">📅 {{ formatDate(currentExpedition.date) }}</div>

          <div v-if="linkedLocations.length" class="exp-detail-section">
            <h4 class="exp-detail-heading">Places</h4>
            <div class="exp-detail-places">
              <div
                v-for="loc in linkedLocations"
                :key="loc.id"
                class="exp-detail-place"
                :style="{ borderColor: getLocationType(loc.type).color }"
              >
                <span class="exp-detail-place-icon" :style="{ background: getLocationType(loc.type).color + '33' }">
                  {{ getLocationType(loc.type).icon }}
                </span>
                <div>
                  <div class="exp-detail-place-name">{{ loc.name }}</div>
                  <div class="exp-detail-place-type">{{ getLocationType(loc.type).name }}</div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="currentExpedition.notes" class="exp-detail-section">
            <h4 class="exp-detail-heading">Notes</h4>
            <p class="exp-detail-notes">{{ currentExpedition.notes }}</p>
          </div>

          <div class="exp-detail-section">
            <div class="exp-detail-section-header">
              <h4 class="exp-detail-heading">Quests Completed</h4>
              <span v-if="totalXP > 0" class="exp-detail-xp">+{{ totalXP }} XP</span>
            </div>
            <div v-if="!linkedEntries.length" class="exp-detail-empty">
              <p>No quests logged yet. Record what you did out there to earn XP.</p>
            </div>
            <div v-else class="exp-entry-list">
              <div
                v-for="entry in linkedEntries"
                :key="entry.id"
                class="exp-entry-card"
              >
                <div class="exp-entry-info">
                  <div class="exp-entry-title">{{ entry.title }}</div>
                  <div class="exp-entry-meta">
                    <span>{{ getSection(entry.section)?.icon }} {{ getSubsection(entry.section, entry.subsection)?.name }}</span>
                    <span>{{ getTier(entry.tier)?.name }}</span>
                    <span class="exp-entry-xp">+{{ getTier(entry.tier)?.xp }} XP</span>
                  </div>
                </div>
                <button class="exp-entry-remove" @click="unlinkEntry(entry.id)" title="Unlink from expedition">×</button>
              </div>
            </div>
            <button
              v-if="!showQuestForm"
              class="btn btn-secondary btn-block"
              style="margin-top: 0.75rem"
              @click="openQuestForm"
            >+ Log a Quest from this Expedition</button>
          </div>

          <!-- Inline quest entry form -->
          <div v-if="showQuestForm" class="exp-quest-form">
            <h4 class="exp-detail-heading">New Quest Entry</h4>
            <div class="form-section">
              <label class="form-label">Quest Name</label>
              <input v-model="qTitle" type="text" class="form-input" placeholder="e.g. Started a campfire" autofocus />
            </div>
            <div class="form-row">
              <div class="form-section">
                <label class="form-label">Realm</label>
                <select v-model="qSection" class="form-input" @change="qSubsection = SUBSECTIONS[qSection]?.[0]?.id || ''">
                  <option v-for="s in SECTIONS" :key="s.id" :value="s.id">
                    {{ s.icon }} {{ s.name }}
                  </option>
                </select>
              </div>
              <div class="form-section">
                <label class="form-label">Skill</label>
                <select v-model="qSubsection" class="form-input">
                  <option v-for="sub in subsectionsForSection" :key="sub.id" :value="sub.id">
                    {{ sub.icon }} {{ sub.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-section">
                <label class="form-label">Type</label>
                <select v-model="qType" class="form-input">
                  <option v-for="t in TYPES" :key="t.id" :value="t.id">{{ t.icon }} {{ t.name }}</option>
                </select>
              </div>
              <div class="form-section">
                <label class="form-label">Tier</label>
                <select v-model="qTier" class="form-input">
                  <option v-for="t in TIERS" :key="t.id" :value="t.id">
                    {{ t.name }} (+{{ t.xp }} XP)
                  </option>
                </select>
              </div>
            </div>
            <div class="form-section">
              <label class="form-label">Notes (optional)</label>
              <textarea v-model="qNotes" class="form-input form-textarea" placeholder="What happened?" />
            </div>
            <div class="btn-row">
              <button class="btn btn-secondary" @click="showQuestForm = false">Cancel</button>
              <button
                class="btn btn-primary"
                :disabled="!canSaveQuest"
                @click="saveQuestEntry"
              >+ Add Entry</button>
            </div>
          </div>

          <div class="btn-row" style="margin-top: 1.5rem">
            <button class="btn btn-secondary" @click="isEditing = true">✎ Edit</button>
            <button class="btn btn-danger" @click="handleDelete">Delete</button>
          </div>
        </template>

        <!-- Create / edit form -->
        <template v-else>
          <div class="form-section">
            <label class="form-label">Date</label>
            <input v-model="date" type="date" class="form-input" />
          </div>

          <div class="form-section">
            <label class="form-label">Title <span class="form-hint">(optional — derived from places if left blank)</span></label>
            <input
              v-model="title"
              type="text"
              class="form-input"
              placeholder="e.g. Autumn foraging walk"
            />
          </div>

          <div class="form-section">
            <label class="form-label">Places visited</label>
            <div v-if="!sortedLocationsForPicker.length" class="exp-detail-empty">
              <p>You haven't added any locations yet. Add a location first, or create the expedition without one.</p>
            </div>
            <div v-else class="exp-location-picker">
              <button
                v-for="loc in sortedLocationsForPicker"
                :key="loc.id"
                :class="['exp-location-pick', { selected: selectedLocationIds.includes(loc.id) }]"
                @click="toggleLocation(loc.id)"
              >
                <span class="exp-location-pick-icon">{{ getLocationType(loc.type).icon }}</span>
                <span class="exp-location-pick-name">{{ loc.name }}</span>
                <span v-if="selectedLocationIds.includes(loc.id)" class="exp-location-pick-check">✓</span>
              </button>
            </div>
          </div>

          <div class="form-section">
            <label class="form-label">Notes</label>
            <textarea
              v-model="notes"
              class="form-input form-textarea"
              placeholder="Who came, what was the weather, what stood out?"
            />
          </div>

          <div class="btn-row">
            <button v-if="!isNew" class="btn btn-secondary" @click="isEditing = false">Cancel</button>
            <button
              class="btn btn-primary"
              :disabled="!canSave"
              @click="handleSave"
            >{{ isNew ? '✦ Save Expedition' : 'Save Changes' }}</button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
