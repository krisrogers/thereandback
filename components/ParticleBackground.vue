<script setup lang="ts">
const particles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 8}s`,
  animationDuration: `${6 + Math.random() * 4}s`,
}))
</script>

<template>
  <div class="particles">
    <div
      v-for="particle in particles"
      :key="particle.id"
      class="particle"
      :style="{
        left: particle.left,
        animationDelay: particle.animationDelay,
        animationDuration: particle.animationDuration,
      }"
    />
  </div>
</template>
