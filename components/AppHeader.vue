<script setup lang="ts">
const { level, xpProgress, stage, totalXP, entries } = useApp()
</script>

<template>
  <header class="hero">
    <div class="hero-content">
      <div class="hero-avatar">
        <AvatarMini :level="level" :xp-progress="xpProgress" />
      </div>
      <div class="hero-info">
        <h1 class="hero-title">There &amp; Back</h1>
        <div class="hero-rank">{{ stage.name }}</div>
        <div class="hero-subtitle">{{ totalXP }} XP • {{ entries.length }} Quests</div>
      </div>
    </div>
  </header>
</template>
