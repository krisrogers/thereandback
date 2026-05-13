<script setup lang="ts">
import { ref, computed } from 'vue'
import { LOCATION_TYPES, getLocationType, type AtlasLocation, type Expedition } from '~/composables/constants'

const { locations, expeditions, entries } = useApp()

const tab = ref<'map' | 'locations' | 'expeditions'>('map')
const filter = ref<'all' | 'wishlist' | 'visited'>('all')

const showLocationModal = ref<AtlasLocation | null>(null)
const showAddLocation = ref(false)
const showExpeditionModal = ref<Expedition | null>(null)
const showAddExpedition = ref(false)
const pendingCoords = ref<{ lat: number; lon: number } | null>(null)

const filteredLocations = computed(() => {
  let list = locations.value
  if (filter.value !== 'all') {
    list = list.filter(l => l.status === filter.value)
  }
  return [...list].sort((a, b) => {
    if (a.status !== b.status) return a.status === 'wishlist' ? -1 : 1
    return a.name.localeCompare(b.name)
  })
})

const sortedExpeditions = computed(() => {
  return [...expeditions.value].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
})

const visitedCount = computed(() => locations.value.filter(l => l.status === 'visited').length)
const wishlistCount = computed(() => locations.value.filter(l => l.status === 'wishlist').length)

function handleMapAddLocation(coords: { lat: number; lon: number }) {
  pendingCoords.value = coords
  showAddLocation.value = true
}

function handleMapSelectLocation(loc: AtlasLocation) {
  showLocationModal.value = loc
}

function handleAddLocationClose() {
  showAddLocation.value = false
  pendingCoords.value = null
}

function expeditionLocations(exp: Expedition) {
  return exp.locationIds
    .map(id => locations.value.find(l => l.id === id))
    .filter((l): l is AtlasLocation => !!l)
}

function expeditionXP(exp: Expedition) {
  return exp.questEntryIds.reduce((sum, id) => {
    const entry = entries.value.find(e => e.id === id)
    if (!entry) return sum
    const tierXp: Record<string, number> = { wanderer: 10, traveller: 25, wayfarer: 50, pathfinder: 100, guide: 200 }
    return sum + (tierXp[entry.tier] || 0)
  }, 0)
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <div class="atlas">
    <div class="atlas-header">
      <h2 class="atlas-title">🗺️ The Atlas</h2>
      <p class="atlas-subtitle">Lands sought, lands found</p>
      <div class="atlas-stats">
        <div class="atlas-stat">
          <div class="atlas-stat-value">{{ visitedCount }}</div>
          <div class="atlas-stat-label">Visited</div>
        </div>
        <div class="atlas-stat">
          <div class="atlas-stat-value">{{ wishlistCount }}</div>
          <div class="atlas-stat-label">Wishlist</div>
        </div>
        <div class="atlas-stat">
          <div class="atlas-stat-value">{{ expeditions.length }}</div>
          <div class="atlas-stat-label">Expeditions</div>
        </div>
      </div>
    </div>

    <div class="atlas-tabs">
      <button
        :class="['atlas-tab', { active: tab === 'map' }]"
        @click="tab = 'map'"
      >🌍 Map</button>
      <button
        :class="['atlas-tab', { active: tab === 'locations' }]"
        @click="tab = 'locations'"
      >📍 Locations</button>
      <button
        :class="['atlas-tab', { active: tab === 'expeditions' }]"
        @click="tab = 'expeditions'"
      >🧭 Expeditions</button>
    </div>

    <!-- MAP TAB -->
    <div v-if="tab === 'map'" class="atlas-content">
      <ClientOnly>
        <AtlasMap
          :locations="locations"
          @add-at="handleMapAddLocation"
          @select-location="handleMapSelectLocation"
        />
        <template #fallback>
          <div class="atlas-map-loading">Loading map…</div>
        </template>
      </ClientOnly>
    </div>

    <!-- LOCATIONS TAB -->
    <div v-if="tab === 'locations'" class="atlas-content">
      <div class="atlas-toolbar">
        <div class="atlas-filter">
          <button
            v-for="f in (['all', 'wishlist', 'visited'] as const)"
            :key="f"
            :class="['atlas-filter-btn', { active: filter === f }]"
            @click="filter = f"
          >{{ f === 'all' ? 'All' : f === 'wishlist' ? 'Wishlist' : 'Visited' }}</button>
        </div>
        <button class="btn btn-primary btn-sm" @click="showAddLocation = true">
          + Add Location
        </button>
      </div>

      <div v-if="!filteredLocations.length" class="atlas-empty">
        <div class="atlas-empty-icon">📍</div>
        <h3>No Locations Yet</h3>
        <p>Add a place to visit, or use the map to find nearby parks and forests.</p>
      </div>

      <div v-else class="atlas-location-list">
        <div
          v-for="loc in filteredLocations"
          :key="loc.id"
          :class="['atlas-location-card', { visited: loc.status === 'visited' }]"
          @click="showLocationModal = loc"
        >
          <div class="atlas-location-icon" :style="{ background: getLocationType(loc.type).color + '33', borderColor: getLocationType(loc.type).color }">
            {{ getLocationType(loc.type).icon }}
          </div>
          <div class="atlas-location-info">
            <div class="atlas-location-name">{{ loc.name }}</div>
            <div class="atlas-location-meta">
              <span>{{ getLocationType(loc.type).name }}</span>
              <span class="atlas-location-status">
                {{ loc.status === 'visited' ? '✓ Visited' : '✦ Wishlist' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- EXPEDITIONS TAB -->
    <div v-if="tab === 'expeditions'" class="atlas-content">
      <div class="atlas-toolbar">
        <div class="atlas-toolbar-spacer" />
        <button class="btn btn-primary btn-sm" @click="showAddExpedition = true">
          + Log Expedition
        </button>
      </div>

      <div v-if="!sortedExpeditions.length" class="atlas-empty">
        <div class="atlas-empty-icon">🧭</div>
        <h3>No Expeditions Yet</h3>
        <p>An expedition is a day out — record where you went and what you did.</p>
      </div>

      <div v-else class="atlas-expedition-list">
        <div
          v-for="exp in sortedExpeditions"
          :key="exp.id"
          class="atlas-expedition-card"
          @click="showExpeditionModal = exp"
        >
          <div class="atlas-expedition-date">{{ formatDate(exp.date) }}</div>
          <div class="atlas-expedition-title">{{ exp.title }}</div>
          <div v-if="expeditionLocations(exp).length" class="atlas-expedition-places">
            <span
              v-for="loc in expeditionLocations(exp)"
              :key="loc.id"
              class="atlas-expedition-place"
            >
              {{ getLocationType(loc.type).icon }} {{ loc.name }}
            </span>
          </div>
          <div class="atlas-expedition-footer">
            <span v-if="exp.questEntryIds.length">
              📜 {{ exp.questEntryIds.length }} quest{{ exp.questEntryIds.length === 1 ? '' : 's' }}
            </span>
            <span v-if="expeditionXP(exp) > 0" class="atlas-expedition-xp">
              +{{ expeditionXP(exp) }} XP
            </span>
          </div>
        </div>
      </div>
    </div>

    <LocationModal
      v-if="showLocationModal"
      :location="showLocationModal"
      @close="showLocationModal = null"
    />
    <LocationModal
      v-if="showAddLocation"
      :location="null"
      :initial-coords="pendingCoords"
      @close="handleAddLocationClose"
    />
    <ExpeditionModal
      v-if="showAddExpedition"
      :expedition="null"
      @close="showAddExpedition = false"
    />
    <ExpeditionModal
      v-if="showExpeditionModal"
      :expedition="showExpeditionModal"
      @close="showExpeditionModal = null"
    />
  </div>
</template>
