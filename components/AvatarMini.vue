<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  level: number
  xpProgress: number
}>()

const ringStyle = computed(() => ({
  background: `conic-gradient(var(--gold) ${props.xpProgress * 360}deg, var(--border) 0deg)`
}))
</script>

<template>
  <div class="avatar-mini">
    <div class="avatar-mini-ring" :style="ringStyle">
      <div class="avatar-mini-inner">
        <Avatar :level="level" :size="52" :show-glow="false" />
      </div>
    </div>
    <div class="avatar-mini-level">{{ level }}</div>
  </div>
</template>
