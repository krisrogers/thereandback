<script setup lang="ts">
import { SECTIONS, SUBSECTIONS, TIERS, TYPES, AVATAR_STAGES } from '~/composables/constants'
</script>

<template>
  <div>
    <!-- Welcome -->
    <div class="guide-section">
      <div class="guide-welcome">
        <div class="guide-welcome-icon">&#x1F9ED;</div>
        <h2 class="guide-welcome-title">Welcome, Adventurer</h2>
        <p class="guide-welcome-desc">
          There &amp; Back is a quest-based tracker for real-world skills.
          Complete quests, earn XP, level up your avatar, and journal your journey
          across five realms of hands-on learning.
        </p>
      </div>
    </div>

    <!-- Getting Started -->
    <div class="guide-section">
      <h3 class="guide-heading">Getting Started</h3>
      <div class="guide-steps">
        <div class="guide-step">
          <div class="guide-step-number">1</div>
          <div class="guide-step-content">
            <div class="guide-step-title">Choose a Realm</div>
            <div class="guide-step-desc">Pick one of five themed areas from the Realms tab to explore.</div>
          </div>
        </div>
        <div class="guide-step">
          <div class="guide-step-number">2</div>
          <div class="guide-step-content">
            <div class="guide-step-title">Pick a Skill</div>
            <div class="guide-step-desc">Each realm has five skills. Choose one that interests you.</div>
          </div>
        </div>
        <div class="guide-step">
          <div class="guide-step-number">3</div>
          <div class="guide-step-content">
            <div class="guide-step-title">Complete a Quest</div>
            <div class="guide-step-desc">Select a pre-built quest or create your own, then record what you did.</div>
          </div>
        </div>
        <div class="guide-step">
          <div class="guide-step-number">4</div>
          <div class="guide-step-content">
            <div class="guide-step-title">Earn XP &amp; Level Up</div>
            <div class="guide-step-desc">Each quest earns XP based on its tier. Gain 100 XP per level.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- The Five Realms -->
    <div class="guide-section">
      <h3 class="guide-heading">The Five Realms</h3>
      <div class="guide-realm-list">
        <div
          v-for="section in SECTIONS"
          :key="section.id"
          class="guide-realm-row"
          :style="{ '--realm-color': section.color }"
        >
          <div class="guide-realm-icon">{{ section.icon }}</div>
          <div class="guide-realm-info">
            <div class="guide-realm-name">{{ section.name }}</div>
            <div class="guide-realm-desc">{{ section.description }}</div>
            <div class="guide-realm-skills">
              <span
                v-for="sub in SUBSECTIONS[section.id]"
                :key="sub.id"
                class="guide-skill-tag"
              >{{ sub.icon }} {{ sub.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quest Tiers -->
    <div class="guide-section">
      <h3 class="guide-heading">Quest Tiers</h3>
      <p class="guide-text">Quests come in five tiers of increasing challenge and reward.</p>
      <div class="guide-tier-list">
        <div v-for="tier in TIERS" :key="tier.id" class="guide-tier-row">
          <div class="guide-tier-stars">
            <span v-for="s in tier.stars" :key="s" class="guide-tier-star">&#9733;</span>
          </div>
          <div class="guide-tier-info">
            <div class="guide-tier-name">{{ tier.name }}</div>
            <div class="guide-tier-desc">{{ tier.description }}</div>
          </div>
          <div class="guide-tier-xp">{{ tier.xp }} XP</div>
        </div>
      </div>
    </div>

    <!-- Quest Types -->
    <div class="guide-section">
      <h3 class="guide-heading">Quest Types</h3>
      <p class="guide-text">There are eight kinds of activities you can do for a quest.</p>
      <div class="guide-type-grid">
        <div v-for="t in TYPES" :key="t.id" class="guide-type-card">
          <div class="guide-type-icon">{{ t.icon }}</div>
          <div class="guide-type-name">{{ t.name }}</div>
        </div>
      </div>
    </div>

    <!-- Avatar Progression -->
    <div class="guide-section">
      <h3 class="guide-heading">Avatar Progression</h3>
      <p class="guide-text">As you level up, your avatar evolves through six stages.</p>
      <div class="guide-avatar-list">
        <div v-for="stage in AVATAR_STAGES" :key="stage.minLevel" class="guide-avatar-row">
          <div class="guide-avatar-level">Lv {{ stage.minLevel }}</div>
          <div class="guide-avatar-info">
            <div class="guide-avatar-name">{{ stage.name }}</div>
            <div class="guide-avatar-desc">{{ stage.description }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tips -->
    <div class="guide-section">
      <h3 class="guide-heading">Tips for the Journey</h3>
      <div class="guide-tips">
        <div class="guide-tip">
          <span class="guide-tip-icon">&#128247;</span>
          <span>Add photos as evidence when completing quests to build a visual journal.</span>
        </div>
        <div class="guide-tip">
          <span class="guide-tip-icon">&#9997;&#65039;</span>
          <span>Use the notes field to reflect on what you learned.</span>
        </div>
        <div class="guide-tip">
          <span class="guide-tip-icon">&#127793;</span>
          <span>Start with Wanderer-tier quests and work your way up.</span>
        </div>
        <div class="guide-tip">
          <span class="guide-tip-icon">&#128220;</span>
          <span>Check the Logbook to review your completed quests anytime.</span>
        </div>
        <div class="guide-tip">
          <span class="guide-tip-icon">&#127795;</span>
          <span>Use the Skill Tree to see your progress across all realms at a glance.</span>
        </div>
        <div class="guide-tip">
          <span class="guide-tip-icon">&#9889;</span>
          <span>Create custom quests to track activities not covered by the built-in ones.</span>
        </div>
      </div>
    </div>
  </div>
</template>
