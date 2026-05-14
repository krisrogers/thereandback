<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { LOCATION_TYPES, getLocationType, type AtlasLocation } from '~/composables/constants'

const props = defineProps<{
  locations: AtlasLocation[]
}>()

const emit = defineEmits<{
  (e: 'add-at', coords: { lat: number; lon: number }): void
  (e: 'select-location', loc: AtlasLocation): void
}>()

const mapEl = ref<HTMLDivElement | null>(null)
const status = ref<string>('')
const isSearching = ref(false)

interface FoundPlace {
  name: string
  type: string
  lat: number
  lon: number
  osmRef: string
  distanceKm: number
  description?: string
  website?: string
  wikipedia?: string
  operator?: string
}

const foundNearby = ref<FoundPlace[]>([])
const showFound = ref(false)
const expandedFound = ref<string | null>(null)
const searchOrigin = ref<{ lat: number; lon: number } | null>(null)

let leafletMap: any = null
let L: any = null
let markerLayer: any = null
let userMarker: any = null
let userCircle: any = null

function buildDivIcon(loc: AtlasLocation) {
  const t = getLocationType(loc.type)
  const visited = loc.status === 'visited'
  const ring = visited ? '#fbbf24' : t.color
  const opacity = visited ? '1' : '0.85'
  const html = `
    <div class="atlas-pin" style="--pin-color:${t.color};--pin-ring:${ring};opacity:${opacity}">
      <div class="atlas-pin-inner">${t.icon}</div>
      ${visited ? '<div class="atlas-pin-check">✓</div>' : ''}
    </div>
  `
  return L.divIcon({
    html,
    className: 'atlas-pin-wrap',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -34],
  })
}

function renderMarkers() {
  if (!L || !leafletMap || !markerLayer) return
  markerLayer.clearLayers()
  props.locations.forEach(loc => {
    const m = L.marker([loc.lat, loc.lon], { icon: buildDivIcon(loc) })
    m.on('click', () => emit('select-location', loc))
    m.bindTooltip(loc.name, { direction: 'top', offset: [0, -32] })
    markerLayer.addLayer(m)
  })
}

async function initMap() {
  const leaflet = await import('leaflet')
  L = leaflet.default || leaflet
  if (!mapEl.value) return
  leafletMap = L.map(mapEl.value, {
    center: [-25.2744, 133.7751], // Australia centroid as a neutral default
    zoom: 4,
    zoomControl: true,
    attributionControl: true,
  })
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 19,
  }).addTo(leafletMap)
  markerLayer = L.layerGroup().addTo(leafletMap)

  // Click on the map to add a location at that point
  leafletMap.on('contextmenu', (e: any) => {
    emit('add-at', { lat: e.latlng.lat, lon: e.latlng.lng })
  })

  renderMarkers()

  // If there are existing locations, fit bounds to them
  if (props.locations.length > 0) {
    const bounds = L.latLngBounds(props.locations.map(l => [l.lat, l.lon]))
    leafletMap.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 })
  }
}

onMounted(() => {
  initMap()
})

onBeforeUnmount(() => {
  if (leafletMap) {
    leafletMap.remove()
    leafletMap = null
  }
})

watch(() => props.locations.length, () => renderMarkers())
watch(() => props.locations.map(l => l.status).join(','), () => renderMarkers())

function getPosition(options: PositionOptions): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}

async function tryGeolocation(): Promise<GeolocationPosition> {
  if (!navigator.geolocation) {
    throw new Error('Geolocation not supported by this browser')
  }
  // Stage 1: try GPS / high-accuracy with a short timeout
  try {
    status.value = 'Finding your location (GPS)…'
    return await getPosition({ enableHighAccuracy: true, timeout: 30000, maximumAge: 60_000 })
  } catch (_) {
    // Fall through to coarse
  }
  // Stage 2: coarse / network-based with a longer timeout
  status.value = 'GPS unavailable — trying network location…'
  return await getPosition({ enableHighAccuracy: false, timeout: 20000, maximumAge: 10 * 60_000 })
}

function placeUserMarker(lat: number, lon: number, accuracy: number) {
  if (!leafletMap) return
  if (userMarker) leafletMap.removeLayer(userMarker)
  if (userCircle) leafletMap.removeLayer(userCircle)
  userMarker = L.circleMarker([lat, lon], {
    radius: 7,
    color: '#fbbf24',
    fillColor: '#fbbf24',
    fillOpacity: 0.9,
    weight: 2,
  }).addTo(leafletMap)
  userCircle = L.circle([lat, lon], {
    radius: accuracy || 200,
    color: '#fbbf24',
    fillColor: '#fbbf24',
    fillOpacity: 0.08,
    weight: 1,
  }).addTo(leafletMap)
}

async function locateMe() {
  isSearching.value = true
  try {
    const pos = await tryGeolocation()
    const { latitude, longitude, accuracy } = pos.coords
    if (leafletMap) leafletMap.setView([latitude, longitude], 12)
    placeUserMarker(latitude, longitude, accuracy)
    status.value = accuracy && accuracy > 1000
      ? `Found you (approximate, ±${Math.round(accuracy / 1000)}km)`
      : ''
  } catch (e: any) {
    const msg = e?.code === 1
      ? 'Location permission denied — check browser settings.'
      : e?.code === 3
        ? 'Location timed out. Pan the map to your area and use "Search Map Area" instead.'
        : `Could not find location: ${e?.message || 'unknown error'}`
    status.value = msg
  } finally {
    isSearching.value = false
  }
}

async function runOverpassAt(lat: number, lon: number) {
  status.value = 'Searching for parks, forests, and reserves…'
  searchOrigin.value = { lat, lon }
  expandedFound.value = null
  try {
    const results = await queryOverpass(lat, lon)
    foundNearby.value = results
    showFound.value = true
    status.value = results.length
      ? `Found ${results.length} place${results.length === 1 ? '' : 's'} nearby`
      : 'No places found in this area — try moving the map'
  } catch (e: any) {
    status.value = `Search failed: ${e.message || 'network error'}`
  }
}

function haversineKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const R = 6371
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLon = toRad(b.lon - a.lon)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`
  if (km < 10) return `${km.toFixed(1)} km`
  return `${Math.round(km)} km`
}

function wikipediaUrl(item: FoundPlace): string | null {
  if (!item.wikipedia) return null
  const m = item.wikipedia.match(/^([a-z-]+):(.+)$/)
  if (!m) return null
  const [, lang, article] = m
  return `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(article.replace(/ /g, '_'))}`
}

function googleMapsUrl(item: FoundPlace): string {
  return `https://www.google.com/maps/search/?api=1&query=${item.lat}%2C${item.lon}`
}

function osmUrl(item: FoundPlace): string {
  return `https://www.openstreetmap.org/${item.osmRef}`
}

function toggleExpanded(osmRef: string) {
  expandedFound.value = expandedFound.value === osmRef ? null : osmRef
}

function focusOnMap(item: FoundPlace) {
  if (!leafletMap) return
  leafletMap.setView([item.lat, item.lon], Math.max(leafletMap.getZoom(), 13))
}

async function findNearby() {
  isSearching.value = true
  try {
    const pos = await tryGeolocation()
    const { latitude, longitude } = pos.coords
    if (leafletMap) leafletMap.setView([latitude, longitude], 11)
    await runOverpassAt(latitude, longitude)
  } catch (e: any) {
    const msg = e?.code === 1
      ? 'Location permission denied. Pan the map and use "Search Map Area".'
      : e?.code === 3
        ? 'Location timed out. Pan the map and use "Search Map Area".'
        : `Could not find location: ${e?.message || 'unknown error'}`
    status.value = msg
  } finally {
    isSearching.value = false
  }
}

async function searchMapArea() {
  if (!leafletMap) return
  isSearching.value = true
  try {
    const c = leafletMap.getCenter()
    await runOverpassAt(c.lat, c.lng)
  } finally {
    isSearching.value = false
  }
}

async function queryOverpass(lat: number, lon: number) {
  const query = `
    [out:json][timeout:25];
    (
      way["leisure"="park"](around:8000,${lat},${lon});
      relation["leisure"="park"](around:8000,${lat},${lon});
      way["boundary"="national_park"](around:40000,${lat},${lon});
      relation["boundary"="national_park"](around:40000,${lat},${lon});
      way["boundary"="protected_area"](around:25000,${lat},${lon});
      relation["boundary"="protected_area"](around:25000,${lat},${lon});
      way["leisure"="nature_reserve"](around:20000,${lat},${lon});
      relation["leisure"="nature_reserve"](around:20000,${lat},${lon});
      way["landuse"="forest"](around:15000,${lat},${lon});
    );
    out center 60;
  `
  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'data=' + encodeURIComponent(query),
  })
  if (!res.ok) throw new Error(`Overpass ${res.status}`)
  const data = await res.json()
  const seen = new Set<string>()
  const out: FoundPlace[] = []
  for (const el of data.elements || []) {
    const tags = el.tags || {}
    const name = tags.name || tags['official_name'] || tags['short_name']
    if (!name) continue
    const osmRef = `${el.type}/${el.id}`
    if (seen.has(name)) continue
    seen.add(name)
    let type = 'park'
    if (tags.boundary === 'national_park') type = 'national-park'
    else if (tags.boundary === 'protected_area') type = 'nature-reserve'
    else if (tags.leisure === 'nature_reserve') type = 'nature-reserve'
    else if (tags.landuse === 'forest') type = 'state-forest'
    else if (tags.leisure === 'park') type = 'park'
    const latC = el.lat ?? el.center?.lat
    const lonC = el.lon ?? el.center?.lon
    if (latC == null || lonC == null) continue
    out.push({
      name,
      type,
      lat: latC,
      lon: lonC,
      osmRef,
      distanceKm: haversineKm({ lat, lon }, { lat: latC, lon: lonC }),
      description: tags.description || undefined,
      website: tags.website || tags['contact:website'] || undefined,
      wikipedia: tags.wikipedia || undefined,
      operator: tags.operator || undefined,
    })
  }
  out.sort((a, b) => a.distanceKm - b.distanceKm)
  return out.slice(0, 50)
}

function addFound(item: FoundPlace) {
  emit('add-at', { lat: item.lat, lon: item.lon })
  foundNearby.value = foundNearby.value.filter(f => f.osmRef !== item.osmRef)
  if (expandedFound.value === item.osmRef) expandedFound.value = null
  try {
    sessionStorage.setItem('atlas_pending_name', item.name)
    sessionStorage.setItem('atlas_pending_type', item.type)
    sessionStorage.setItem('atlas_pending_osmRef', item.osmRef)
  } catch {
    // ignore
  }
}
</script>

<template>
  <div class="atlas-map-shell">
    <div class="atlas-map-controls">
      <button class="btn btn-secondary btn-sm" :disabled="isSearching" @click="locateMe">
        📍 My Location
      </button>
      <button class="btn btn-primary btn-sm" :disabled="isSearching" @click="findNearby">
        {{ isSearching ? '⏳ Searching…' : '🔍 Find Nearby' }}
      </button>
      <button class="btn btn-secondary btn-sm" :disabled="isSearching" @click="searchMapArea">
        🎯 Search Map Area
      </button>
    </div>
    <p v-if="status" class="atlas-map-status">{{ status }}</p>
    <p class="atlas-map-hint">
      Long-press / right-click the map to drop a pin. Pan to anywhere and tap "Search Map Area".
    </p>
    <div ref="mapEl" class="atlas-map" />

    <div v-if="showFound && foundNearby.length" class="atlas-found">
      <div class="atlas-found-header">
        <h4>Nearby Places ({{ foundNearby.length }})</h4>
        <button class="atlas-found-close" @click="showFound = false">×</button>
      </div>
      <div class="atlas-found-list">
        <div
          v-for="item in foundNearby"
          :key="item.osmRef"
          class="atlas-found-item"
          :class="{ expanded: expandedFound === item.osmRef }"
        >
          <div class="atlas-found-row" @click="toggleExpanded(item.osmRef)">
            <div class="atlas-found-icon" :style="{ background: getLocationType(item.type).color + '33' }">
              {{ getLocationType(item.type).icon }}
            </div>
            <div class="atlas-found-info">
              <div class="atlas-found-name">{{ item.name }}</div>
              <div class="atlas-found-type">
                <span>{{ getLocationType(item.type).name }}</span>
                <span class="atlas-found-distance">· {{ formatDistance(item.distanceKm) }}</span>
              </div>
            </div>
            <span class="atlas-found-chevron">{{ expandedFound === item.osmRef ? '▾' : '▸' }}</span>
          </div>
          <div v-if="expandedFound === item.osmRef" class="atlas-found-detail">
            <p v-if="item.description" class="atlas-found-desc">{{ item.description }}</p>
            <div v-if="item.operator" class="atlas-found-meta">
              <span class="atlas-found-meta-label">Managed by</span>
              <span>{{ item.operator }}</span>
            </div>
            <div class="atlas-found-links">
              <a v-if="item.website" :href="item.website" target="_blank" rel="noopener">🌐 Website</a>
              <a v-if="wikipediaUrl(item)" :href="wikipediaUrl(item)!" target="_blank" rel="noopener">📖 Wikipedia</a>
              <a :href="googleMapsUrl(item)" target="_blank" rel="noopener">⭐ Google Maps (reviews)</a>
              <a :href="osmUrl(item)" target="_blank" rel="noopener">🗺️ OpenStreetMap</a>
            </div>
            <div class="atlas-found-actions">
              <button class="btn btn-secondary btn-sm" @click.stop="focusOnMap(item)">🎯 Show on Map</button>
              <button class="btn btn-primary btn-sm" @click.stop="addFound(item)">+ Add to Atlas</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
