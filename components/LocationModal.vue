<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { LOCATION_TYPES, getLocationType, type AtlasLocation } from '~/composables/constants'

const props = defineProps<{
  location: AtlasLocation | null
  initialCoords?: { lat: number; lon: number } | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { addLocation, updateLocation, deleteLocation, markLocationVisited } = useApp()

const isNew = computed(() => !props.location)
const isEditing = ref(isNew.value)

const name = ref(props.location?.name || '')
const type = ref<string>(props.location?.type || 'park')
const lat = ref<number>(props.location?.lat ?? props.initialCoords?.lat ?? 0)
const lon = ref<number>(props.location?.lon ?? props.initialCoords?.lon ?? 0)
const notes = ref(props.location?.notes || '')
const geocacheCode = ref(props.location?.geocacheCode || '')
const status = ref<'wishlist' | 'visited'>(props.location?.status || 'wishlist')
const osmRef = ref<string | undefined>(props.location?.osmRef)
const source = ref<'manual' | 'overpass'>(props.location?.source || 'manual')

onMounted(() => {
  if (!isNew.value) return
  // Pull pending data from the "Find Nearby" Overpass flow
  try {
    const pendingName = sessionStorage.getItem('atlas_pending_name')
    const pendingType = sessionStorage.getItem('atlas_pending_type')
    const pendingOsm = sessionStorage.getItem('atlas_pending_osmRef')
    if (pendingName) {
      name.value = pendingName
      sessionStorage.removeItem('atlas_pending_name')
    }
    if (pendingType) {
      type.value = pendingType
      sessionStorage.removeItem('atlas_pending_type')
    }
    if (pendingOsm) {
      osmRef.value = pendingOsm
      source.value = 'overpass'
      sessionStorage.removeItem('atlas_pending_osmRef')
    }
  } catch {
    // ignore
  }
})

const canSave = computed(() => name.value.trim().length > 0 && !Number.isNaN(lat.value) && !Number.isNaN(lon.value))

function handleSave() {
  if (!canSave.value) return
  if (isNew.value) {
    addLocation({
      name: name.value.trim(),
      type: type.value,
      lat: Number(lat.value),
      lon: Number(lon.value),
      notes: notes.value,
      status: status.value,
      source: source.value,
      osmRef: osmRef.value,
      geocacheCode: type.value === 'geocache' ? geocacheCode.value.trim() : undefined,
    })
  } else if (props.location) {
    updateLocation(props.location.id, {
      name: name.value.trim(),
      type: type.value,
      lat: Number(lat.value),
      lon: Number(lon.value),
      notes: notes.value,
      geocacheCode: type.value === 'geocache' ? geocacheCode.value.trim() : undefined,
    })
    isEditing.value = false
  }
  emit('close')
}

function handleToggleVisited() {
  if (!props.location) return
  markLocationVisited(props.location.id, props.location.status !== 'visited')
}

function handleDelete() {
  if (!props.location) return
  if (confirm(`Delete "${props.location.name}"? This cannot be undone.`)) {
    deleteLocation(props.location.id)
    emit('close')
  }
}

function formatCoords(latVal: number, lonVal: number) {
  return `${latVal.toFixed(5)}, ${lonVal.toFixed(5)}`
}
</script>

<template>
  <div class="modal-overlay" @click="emit('close')">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <span class="modal-title">
          {{ isNew ? 'Add Location' : isEditing ? 'Edit Location' : location?.name }}
        </span>
        <button class="modal-close" @click="emit('close')">×</button>
      </div>
      <div class="modal-body">
        <!-- View mode -->
        <template v-if="!isNew && !isEditing && location">
          <div class="location-detail-icon" :style="{ background: getLocationType(location.type).color + '22', borderColor: getLocationType(location.type).color }">
            {{ getLocationType(location.type).icon }}
          </div>
          <div class="location-detail-meta">
            <div class="location-detail-type">{{ getLocationType(location.type).name }}</div>
            <div class="location-detail-status" :class="location.status">
              {{ location.status === 'visited' ? '✓ Visited' : '✦ On the Wishlist' }}
            </div>
          </div>
          <div class="location-detail-coords">📍 {{ formatCoords(location.lat, location.lon) }}</div>
          <div v-if="location.geocacheCode" class="location-detail-cache">
            📦 Geocache: <strong>{{ location.geocacheCode }}</strong>
          </div>
          <p v-if="location.notes" class="location-detail-notes">{{ location.notes }}</p>
          <p v-else class="location-detail-notes location-detail-notes-empty">No notes yet.</p>

          <div class="btn-row">
            <button class="btn btn-secondary" @click="isEditing = true">✎ Edit</button>
            <button class="btn btn-primary" @click="handleToggleVisited">
              {{ location.status === 'visited' ? 'Move to Wishlist' : '✓ Mark Visited' }}
            </button>
          </div>
          <button class="btn btn-danger btn-block" style="margin-top: 1rem" @click="handleDelete">
            Delete Location
          </button>
        </template>

        <!-- Create / edit form -->
        <template v-else>
          <div class="form-section">
            <label class="form-label">Name</label>
            <input
              v-model="name"
              type="text"
              class="form-input"
              placeholder="e.g. Royal National Park"
              autofocus
            />
          </div>

          <div class="form-section">
            <label class="form-label">Type</label>
            <div class="loc-type-grid">
              <button
                v-for="t in LOCATION_TYPES"
                :key="t.id"
                :class="['loc-type-btn', { selected: type === t.id }]"
                :style="type === t.id ? { borderColor: t.color, background: t.color + '22' } : {}"
                @click="type = t.id"
              >
                <span class="loc-type-icon">{{ t.icon }}</span>
                <span class="loc-type-label">{{ t.name }}</span>
              </button>
            </div>
          </div>

          <div v-if="type === 'geocache'" class="form-section">
            <label class="form-label">Geocache Code</label>
            <input
              v-model="geocacheCode"
              type="text"
              class="form-input"
              placeholder="e.g. GC12345"
            />
          </div>

          <div v-if="isNew" class="form-section">
            <label class="form-label">Status</label>
            <div class="loc-status-row">
              <button
                :class="['loc-status-btn', { selected: status === 'wishlist' }]"
                @click="status = 'wishlist'"
              >✦ Wishlist</button>
              <button
                :class="['loc-status-btn', { selected: status === 'visited' }]"
                @click="status = 'visited'"
              >✓ Visited</button>
            </div>
          </div>

          <div class="form-section">
            <label class="form-label">Coordinates</label>
            <div class="loc-coord-row">
              <input
                v-model.number="lat"
                type="number"
                step="0.00001"
                class="form-input"
                placeholder="Latitude"
              />
              <input
                v-model.number="lon"
                type="number"
                step="0.00001"
                class="form-input"
                placeholder="Longitude"
              />
            </div>
            <p class="form-hint">Tip: long-press / right-click the map to capture coordinates.</p>
          </div>

          <div class="form-section">
            <label class="form-label">Notes</label>
            <textarea
              v-model="notes"
              class="form-input form-textarea"
              placeholder="What's here? Why is it interesting?"
            />
          </div>

          <div class="btn-row">
            <button
              v-if="!isNew"
              class="btn btn-secondary"
              @click="isEditing = false"
            >Cancel</button>
            <button
              class="btn btn-primary"
              :disabled="!canSave"
              @click="handleSave"
            >
              {{ isNew ? '+ Add Location' : 'Save Changes' }}
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
