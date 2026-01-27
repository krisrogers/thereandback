<script setup lang="ts">
import { computed } from 'vue'
import { SECTIONS, SUBSECTIONS, TIERS, type Section, type Subsection } from '~/composables/constants'

const { entries, level, totalXP } = useApp()

const emit = defineEmits<{
  (e: 'select-realm', realm: Section): void
  (e: 'select-subsection', realm: Section, subsection: Subsection): void
}>()

// Calculate completion counts
function getRealmCount(sectionId: string) {
  return entries.value.filter(e => e.section === sectionId).length
}

function getSubsectionCount(sectionId: string, subsectionId: string) {
  return entries.value.filter(e => e.section === sectionId && e.subsection === subsectionId).length
}

function getRealmXP(sectionId: string) {
  return entries.value
    .filter(e => e.section === sectionId)
    .reduce((sum, e) => {
      const tier = TIERS.find(t => t.id === e.tier)
      return sum + (tier?.xp || 0)
    }, 0)
}

// Tree layout calculations
// Center point
const centerX = 200
const centerY = 200

// Realm positions (arranged in a circle around center)
const realmRadius = 110
const realmNodeSize = 36

// Subsection positions (branch out from each realm)
const subsectionRadius = 70
const subsectionNodeSize = 22

// Calculate realm positions
const realmPositions = computed(() => {
  return SECTIONS.map((section, index) => {
    // Distribute realms evenly in a circle, starting from top
    const angle = (index * 2 * Math.PI / 5) - Math.PI / 2
    return {
      section,
      x: centerX + Math.cos(angle) * realmRadius,
      y: centerY + Math.sin(angle) * realmRadius,
      angle,
      count: getRealmCount(section.id),
      xp: getRealmXP(section.id)
    }
  })
})

// Calculate subsection positions
const subsectionPositions = computed(() => {
  const positions: Array<{
    section: typeof SECTIONS[number]
    subsection: Subsection
    x: number
    y: number
    parentX: number
    parentY: number
    count: number
  }> = []

  realmPositions.value.forEach((realm, realmIndex) => {
    const subs = SUBSECTIONS[realm.section.id]
    if (!subs) return

    subs.forEach((sub, subIndex) => {
      // Spread subsections in an arc around their parent realm
      const spreadAngle = Math.PI / 3 // 60 degree spread
      const startAngle = realm.angle - spreadAngle / 2
      const subAngle = startAngle + (subIndex * spreadAngle / (subs.length - 1 || 1))

      positions.push({
        section: realm.section,
        subsection: sub as Subsection,
        x: realm.x + Math.cos(subAngle) * subsectionRadius,
        y: realm.y + Math.sin(subAngle) * subsectionRadius,
        parentX: realm.x,
        parentY: realm.y,
        count: getSubsectionCount(realm.section.id, sub.id)
      })
    })
  })

  return positions
})

// Progress calculation for visual effects
function getRealmProgress(sectionId: string) {
  const count = getRealmCount(sectionId)
  // Max out visual at 10 completions
  return Math.min(count / 10, 1)
}

function getSubsectionProgress(sectionId: string, subsectionId: string) {
  const count = getSubsectionCount(sectionId, subsectionId)
  // Max out visual at 5 completions
  return Math.min(count / 5, 1)
}
</script>

<template>
  <div class="skill-tree">
    <div class="skill-tree-header">
      <h2 class="skill-tree-title">Skill Tree</h2>
      <p class="skill-tree-subtitle">Explore your journey across all realms</p>
    </div>

    <div class="tree-container">
      <svg
        viewBox="0 0 400 400"
        class="tree-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <!-- Glow filters for active nodes -->
          <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <!-- Gradient for connections -->
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#a78b4a;stop-opacity:0.3" />
            <stop offset="100%" style="stop-color:#a78b4a;stop-opacity:0.1" />
          </linearGradient>

          <!-- Radial gradients for each realm color -->
          <radialGradient v-for="section in SECTIONS" :key="`grad-${section.id}`" :id="`grad-${section.id}`">
            <stop offset="0%" :style="`stop-color:${section.color};stop-opacity:0.8`" />
            <stop offset="100%" :style="`stop-color:${section.color};stop-opacity:0.4`" />
          </radialGradient>
        </defs>

        <!-- Connection lines from center to realms -->
        <g class="connections-center">
          <line
            v-for="realm in realmPositions"
            :key="`center-line-${realm.section.id}`"
            :x1="centerX"
            :y1="centerY"
            :x2="realm.x"
            :y2="realm.y"
            class="connection-line center-line"
            :class="{ active: realm.count > 0 }"
            :style="{ '--realm-color': realm.section.color }"
          />
        </g>

        <!-- Connection lines from realms to subsections -->
        <g class="connections-subsections">
          <line
            v-for="sub in subsectionPositions"
            :key="`sub-line-${sub.section.id}-${sub.subsection.id}`"
            :x1="sub.parentX"
            :y1="sub.parentY"
            :x2="sub.x"
            :y2="sub.y"
            class="connection-line sub-line"
            :class="{ active: sub.count > 0 }"
            :style="{ '--realm-color': sub.section.color }"
          />
        </g>

        <!-- Center node (Avatar) -->
        <g class="center-node" :transform="`translate(${centerX}, ${centerY})`">
          <circle
            r="32"
            class="center-node-bg"
          />
          <circle
            r="30"
            class="center-node-inner"
          />
          <text
            y="6"
            class="center-node-level"
          >{{ level }}</text>
          <text
            y="18"
            class="center-node-label"
          >LVL</text>
        </g>

        <!-- Subsection nodes -->
        <g
          v-for="sub in subsectionPositions"
          :key="`sub-${sub.section.id}-${sub.subsection.id}`"
          class="subsection-node"
          :class="{ active: sub.count > 0, unlocked: getRealmCount(sub.section.id) > 0 }"
          :transform="`translate(${sub.x}, ${sub.y})`"
          :style="{ '--realm-color': sub.section.color, '--progress': getSubsectionProgress(sub.section.id, sub.subsection.id) }"
          @click="emit('select-subsection', sub.section, sub.subsection)"
        >
          <circle
            :r="subsectionNodeSize / 2"
            class="subsection-node-bg"
          />
          <circle
            :r="subsectionNodeSize / 2 - 2"
            class="subsection-node-inner"
          />
          <text
            y="5"
            class="subsection-node-icon"
          >{{ sub.subsection.icon }}</text>
          <text
            v-if="sub.count > 0"
            y="22"
            class="subsection-node-count"
          >{{ sub.count }}</text>
        </g>

        <!-- Realm nodes (on top of subsections) -->
        <g
          v-for="realm in realmPositions"
          :key="`realm-${realm.section.id}`"
          class="realm-node"
          :class="{ active: realm.count > 0 }"
          :transform="`translate(${realm.x}, ${realm.y})`"
          :style="{ '--realm-color': realm.section.color, '--progress': getRealmProgress(realm.section.id) }"
          @click="emit('select-realm', realm.section)"
        >
          <circle
            :r="realmNodeSize / 2 + 4"
            class="realm-node-glow"
          />
          <circle
            :r="realmNodeSize / 2"
            class="realm-node-bg"
          />
          <circle
            :r="realmNodeSize / 2 - 2"
            class="realm-node-inner"
          />
          <text
            y="6"
            class="realm-node-icon"
          >{{ realm.section.icon }}</text>
        </g>
      </svg>

      <!-- Legend / Stats below tree -->
      <div class="tree-stats">
        <div class="tree-stat">
          <span class="tree-stat-value">{{ totalXP }}</span>
          <span class="tree-stat-label">Total XP</span>
        </div>
        <div class="tree-stat">
          <span class="tree-stat-value">{{ entries.length }}</span>
          <span class="tree-stat-label">Quests</span>
        </div>
        <div class="tree-stat">
          <span class="tree-stat-value">{{ SECTIONS.filter(s => getRealmCount(s.id) > 0).length }}/5</span>
          <span class="tree-stat-label">Realms</span>
        </div>
      </div>
    </div>

    <!-- Realm cards below tree for detail -->
    <div class="tree-realms">
      <div
        v-for="realm in realmPositions"
        :key="`card-${realm.section.id}`"
        class="tree-realm-card"
        :class="{ active: realm.count > 0 }"
        :style="{ '--realm-color': realm.section.color }"
        @click="emit('select-realm', realm.section)"
      >
        <div class="tree-realm-icon">{{ realm.section.icon }}</div>
        <div class="tree-realm-info">
          <div class="tree-realm-name">{{ realm.section.name }}</div>
          <div class="tree-realm-progress">
            <div class="tree-realm-bar">
              <div
                class="tree-realm-bar-fill"
                :style="{ width: `${getRealmProgress(realm.section.id) * 100}%` }"
              />
            </div>
            <span class="tree-realm-count">{{ realm.count }}</span>
          </div>
        </div>
        <div class="tree-realm-xp" v-if="realm.xp > 0">+{{ realm.xp }} XP</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skill-tree {
  animation: slide-up .5s ease;
}

.skill-tree-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.skill-tree-title {
  font-family: 'Cinzel', serif;
  font-size: 1.5rem;
  color: var(--gold);
  margin-bottom: .25rem;
}

.skill-tree-subtitle {
  font-size: .85rem;
  color: var(--text-dim);
}

.tree-container {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
}

.tree-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(251, 191, 36, .03) 60deg, transparent 120deg);
  animation: rotate-slow 30s linear infinite;
}

.tree-svg {
  width: 100%;
  max-width: 400px;
  height: auto;
  display: block;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Connection lines */
.connection-line {
  stroke: var(--border);
  stroke-width: 2;
  transition: all .4s ease;
}

.connection-line.active {
  stroke: var(--realm-color, var(--gold-dim));
  stroke-opacity: 0.6;
}

.center-line {
  stroke-dasharray: 4 4;
}

.sub-line {
  stroke-width: 1.5;
  stroke-dasharray: 2 2;
}

/* Center node */
.center-node-bg {
  fill: var(--gold);
  filter: url(#glow-gold);
  animation: glow-pulse 3s ease-in-out infinite;
}

.center-node-inner {
  fill: var(--bg-dark);
}

.center-node-level {
  fill: var(--gold);
  font-family: 'Cinzel', serif;
  font-size: 16px;
  font-weight: 700;
  text-anchor: middle;
}

.center-node-label {
  fill: var(--text-dim);
  font-family: 'Cinzel', serif;
  font-size: 8px;
  text-anchor: middle;
  letter-spacing: .1em;
}

/* Realm nodes */
.realm-node {
  cursor: pointer;
  transition: transform .3s ease;
}

.realm-node:hover {
  transform: scale(1.15);
}

.realm-node-glow {
  fill: var(--realm-color);
  opacity: 0;
  transition: opacity .4s ease;
}

.realm-node.active .realm-node-glow {
  opacity: calc(0.2 + var(--progress, 0) * 0.3);
  animation: glow-pulse 2s ease-in-out infinite;
}

.realm-node-bg {
  fill: var(--border);
  transition: fill .4s ease;
}

.realm-node.active .realm-node-bg {
  fill: var(--realm-color);
}

.realm-node-inner {
  fill: var(--bg-card);
  transition: fill .4s ease;
}

.realm-node.active .realm-node-inner {
  fill: var(--bg-dark);
}

.realm-node-icon {
  font-size: 16px;
  text-anchor: middle;
  transition: opacity .4s ease;
}

.realm-node:not(.active) .realm-node-icon {
  opacity: 0.4;
}

/* Subsection nodes */
.subsection-node {
  cursor: pointer;
  transition: transform .3s ease;
  opacity: 0.3;
}

.subsection-node.unlocked {
  opacity: 0.6;
}

.subsection-node.active {
  opacity: 1;
}

.subsection-node:hover {
  transform: scale(1.2);
}

.subsection-node-bg {
  fill: var(--border);
  transition: fill .4s ease;
}

.subsection-node.active .subsection-node-bg {
  fill: var(--realm-color);
  opacity: calc(0.4 + var(--progress, 0) * 0.6);
}

.subsection-node-inner {
  fill: var(--bg-card);
}

.subsection-node.active .subsection-node-inner {
  fill: var(--bg-dark);
}

.subsection-node-icon {
  font-size: 10px;
  text-anchor: middle;
}

.subsection-node-count {
  fill: var(--gold);
  font-family: 'Cinzel', serif;
  font-size: 8px;
  text-anchor: middle;
}

/* Tree stats */
.tree-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  margin-top: 1rem;
  position: relative;
  z-index: 1;
}

.tree-stat {
  text-align: center;
}

.tree-stat-value {
  display: block;
  font-family: 'Cinzel', serif;
  font-size: 1.25rem;
  color: var(--gold);
}

.tree-stat-label {
  font-size: .7rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: .1em;
}

/* Realm cards */
.tree-realms {
  display: flex;
  flex-direction: column;
  gap: .75rem;
}

.tree-realm-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  transition: all .3s ease;
  opacity: 0.6;
  animation: card-appear .4s ease backwards;
}

.tree-realm-card:nth-child(1) { animation-delay: .1s; }
.tree-realm-card:nth-child(2) { animation-delay: .15s; }
.tree-realm-card:nth-child(3) { animation-delay: .2s; }
.tree-realm-card:nth-child(4) { animation-delay: .25s; }
.tree-realm-card:nth-child(5) { animation-delay: .3s; }

.tree-realm-card.active {
  opacity: 1;
  border-left: 3px solid var(--realm-color);
}

.tree-realm-card:hover {
  background: var(--bg-card-hover);
  transform: translateX(4px);
  border-color: var(--realm-color);
}

.tree-realm-icon {
  font-size: 1.5rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, .05);
  border-radius: 8px;
  transition: transform .3s ease;
}

.tree-realm-card:hover .tree-realm-icon {
  transform: scale(1.1);
}

.tree-realm-info {
  flex: 1;
  min-width: 0;
}

.tree-realm-name {
  font-family: 'Cinzel', serif;
  font-size: .9rem;
  color: var(--text-bright);
  margin-bottom: .35rem;
}

.tree-realm-progress {
  display: flex;
  align-items: center;
  gap: .5rem;
}

.tree-realm-bar {
  flex: 1;
  height: 4px;
  background: var(--bg-dark);
  border-radius: 2px;
  overflow: hidden;
}

.tree-realm-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--realm-color), var(--gold));
  border-radius: 2px;
  transition: width .5s ease;
}

.tree-realm-count {
  font-family: 'Cinzel', serif;
  font-size: .75rem;
  color: var(--text-dim);
  min-width: 1.5rem;
  text-align: right;
}

.tree-realm-xp {
  font-family: 'Cinzel', serif;
  font-size: .7rem;
  color: var(--gold);
  padding: .25rem .5rem;
  background: rgba(251, 191, 36, .1);
  border-radius: 10px;
}
</style>
