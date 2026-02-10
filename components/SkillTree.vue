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

// Progress calculation for visual effects
function getRealmProgress(sectionId: string) {
  const count = getRealmCount(sectionId)
  return Math.min(count / 10, 1)
}

function getSubsectionProgress(sectionId: string, subsectionId: string) {
  const count = getSubsectionCount(sectionId, subsectionId)
  return Math.min(count / 5, 1)
}

// Organize data for vertical layout
const realmData = computed(() => {
  return SECTIONS.map(section => ({
    section,
    count: getRealmCount(section.id),
    xp: getRealmXP(section.id),
    progress: getRealmProgress(section.id),
    subsections: (SUBSECTIONS[section.id] || []).map(sub => ({
      subsection: sub as Subsection,
      count: getSubsectionCount(section.id, sub.id),
      progress: getSubsectionProgress(section.id, sub.id)
    }))
  }))
})
</script>

<template>
  <div class="skill-tree">
    <div class="skill-tree-header">
      <div class="header-avatar">
        <div class="avatar-ring">
          <div class="avatar-inner">
            <div class="avatar-level">{{ level }}</div>
          </div>
        </div>
        <div class="avatar-label">Level {{ level }}</div>
      </div>
      <div class="header-stats">
        <div class="stat-item">
          <div class="stat-value">{{ totalXP }}</div>
          <div class="stat-label">Total XP</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-value">{{ entries.length }}</div>
          <div class="stat-label">Quests</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-value">{{ SECTIONS.filter(s => getRealmCount(s.id) > 0).length }}/5</div>
          <div class="stat-label">Realms</div>
        </div>
      </div>
    </div>

    <div class="realms-list">
      <div
        v-for="(realm, index) in realmData"
        :key="realm.section.id"
        class="realm-branch"
        :class="{ active: realm.count > 0 }"
        :style="{
          '--realm-color': realm.section.color,
          '--animation-delay': `${index * 0.1}s`
        }"
      >
        <!-- Realm Node -->
        <div
          class="realm-node"
          :class="{ active: realm.count > 0 }"
          @click="emit('select-realm', realm.section)"
        >
          <div class="node-glow"></div>
          <div class="node-border">
            <div class="node-inner">
              <div class="node-icon">{{ realm.section.icon }}</div>
            </div>
          </div>
          <div class="node-info">
            <div class="node-title">{{ realm.section.name }}</div>
            <div class="node-meta">
              <span v-if="realm.count > 0" class="node-count">{{ realm.count }} quests</span>
              <span v-else class="node-locked">Unexplored</span>
              <span v-if="realm.xp > 0" class="node-xp">{{ realm.xp }} XP</span>
            </div>
            <div class="node-progress">
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :style="{ width: `${realm.progress * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Subsection Nodes -->
        <div class="subsections-grid" v-if="realm.subsections.length > 0">
          <div
            v-for="sub in realm.subsections"
            :key="sub.subsection.id"
            class="subsection-node"
            :class="{
              active: sub.count > 0,
              unlocked: realm.count > 0
            }"
            @click="emit('select-subsection', realm.section, sub.subsection)"
          >
            <div class="sub-node-border">
              <div class="sub-node-inner">
                <div class="sub-node-icon">{{ sub.subsection.icon }}</div>
              </div>
            </div>
            <div class="sub-node-label">{{ sub.subsection.name }}</div>
            <div v-if="sub.count > 0" class="sub-node-badge">{{ sub.count }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skill-tree {
  animation: slide-up .5s ease;
}

/* Header */
.skill-tree-header {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, transparent 100%);
  border: 1px solid var(--border);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}

.skill-tree-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  opacity: 0.3;
}

.header-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.avatar-ring {
  position: relative;
  width: 80px;
  height: 80px;
  background: conic-gradient(from 0deg, var(--gold), #f59e0b, var(--gold));
  border-radius: 50%;
  padding: 3px;
  animation: rotate-slow 20s linear infinite;
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
}

.avatar-inner {
  width: 100%;
  height: 100%;
  background: var(--bg-dark);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--bg-card);
}

.avatar-level {
  font-family: 'Cinzel', serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--gold);
  text-shadow: 0 2px 8px rgba(251, 191, 36, 0.4);
}

.avatar-label {
  font-family: 'Cinzel', serif;
  font-size: 0.9rem;
  color: var(--text-bright);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.header-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-family: 'Cinzel', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gold);
  line-height: 1;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.7rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.stat-divider {
  width: 1px;
  height: 2rem;
  background: linear-gradient(to bottom, transparent, var(--border), transparent);
}

/* Realms List */
.realms-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.realm-branch {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: fade-in-up 0.5s ease backwards;
  animation-delay: var(--animation-delay);
}

/* Realm Nodes */
.realm-node {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--bg-card);
  border: 2px solid var(--border);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.realm-node::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--realm-color), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.realm-node.active::before {
  opacity: 0.05;
}

.realm-node:hover {
  transform: translateX(4px);
  border-color: var(--realm-color);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), 0 0 0 1px var(--realm-color);
}

.realm-node:active {
  transform: translateX(2px) scale(0.98);
}

.node-glow {
  position: absolute;
  top: 50%;
  left: 4rem;
  transform: translateY(-50%);
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, var(--realm-color) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.realm-node.active .node-glow {
  opacity: 0.15;
}

.node-border {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--border), transparent);
  border-radius: 12px;
  padding: 2px;
  position: relative;
  transition: all 0.3s ease;
}

.realm-node.active .node-border {
  background: linear-gradient(135deg, var(--realm-color), rgba(255, 255, 255, 0.1));
  box-shadow: 0 0 20px var(--realm-color);
}

.node-inner {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-card) 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.realm-node.active .node-inner {
  background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-dark) 100%);
  border-color: var(--realm-color);
}

.node-icon {
  font-size: 2rem;
  opacity: 0.4;
  transition: all 0.3s ease;
  filter: grayscale(100%);
}

.realm-node.active .node-icon {
  opacity: 1;
  filter: grayscale(0%) drop-shadow(0 0 8px var(--realm-color));
}

.node-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.node-title {
  font-family: 'Cinzel', serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-bright);
  letter-spacing: 0.02em;
}

.node-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.node-count {
  font-size: 0.85rem;
  color: var(--text-dim);
}

.node-locked {
  font-size: 0.85rem;
  color: var(--text-dim);
  opacity: 0.6;
  font-style: italic;
}

.node-xp {
  font-family: 'Cinzel', serif;
  font-size: 0.8rem;
  color: var(--gold);
  padding: 0.15rem 0.5rem;
  background: rgba(251, 191, 36, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(251, 191, 36, 0.2);
}

.node-progress {
  width: 100%;
}

.progress-bar {
  height: 4px;
  background: var(--bg-dark);
  border-radius: 2px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--realm-color), var(--gold));
  border-radius: 2px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 8px var(--realm-color);
}

/* Subsections Grid */
.subsections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(85px, 1fr));
  gap: 1rem;
  padding-left: 80px;
  position: relative;
}

.subsections-grid::before {
  content: '';
  position: absolute;
  left: 32px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--realm-color), transparent);
  opacity: 0.3;
}

.subsection-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  opacity: 0.5;
}

.subsection-node.unlocked {
  opacity: 0.7;
}

.subsection-node.active {
  opacity: 1;
  border-color: var(--realm-color);
}

.subsection-node:hover {
  transform: translateY(-4px);
  border-color: var(--realm-color);
  background: var(--bg-card-hover);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px var(--realm-color);
}

.subsection-node:active {
  transform: translateY(-2px) scale(0.95);
}

.sub-node-border {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--border), transparent);
  border-radius: 10px;
  padding: 2px;
  transition: all 0.3s ease;
}

.subsection-node.active .sub-node-border {
  background: linear-gradient(135deg, var(--realm-color), rgba(255, 255, 255, 0.1));
  box-shadow: 0 0 12px var(--realm-color);
}

.sub-node-inner {
  width: 100%;
  height: 100%;
  background: var(--bg-dark);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.03);
}

.subsection-node.active .sub-node-inner {
  border-color: var(--realm-color);
}

.sub-node-icon {
  font-size: 1.5rem;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.subsection-node.active .sub-node-icon {
  opacity: 1;
  filter: drop-shadow(0 0 6px var(--realm-color));
}

.sub-node-label {
  font-size: 0.75rem;
  color: var(--text-dim);
  text-align: center;
  line-height: 1.2;
  transition: color 0.3s ease;
}

.subsection-node.active .sub-node-label {
  color: var(--text-bright);
}

.sub-node-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, var(--gold), #f59e0b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Cinzel', serif;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--bg-dark);
  border: 2px solid var(--bg-card);
  box-shadow: 0 2px 8px rgba(251, 191, 36, 0.4);
}

/* Animations */
@keyframes rotate-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
