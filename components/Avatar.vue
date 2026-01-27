<script setup lang="ts">
import { computed } from 'vue'
import { getAvatarStage } from '~/composables/constants'

const props = withDefaults(defineProps<{
  level: number
  size?: number
  showGlow?: boolean
}>(), {
  size: 120,
  showGlow: true
})

const stage = computed(() => getAvatarStage(props.level))
const idx = computed(() => stage.value.index)

const cloakColors = ['#6b7280', '#4b5563', '#065f46', '#1e40af', '#7c2d12', '#4c1d95']
const trimColors = ['transparent', '#a78b4a', '#fbbf24', '#fbbf24', '#fcd34d', '#fef3c7']

const cloakColor = computed(() => cloakColors[idx.value])
const trimColor = computed(() => trimColors[idx.value])

const filterStyle = computed(() => {
  if (!props.showGlow) return 'none'
  return `drop-shadow(0 0 ${10 + idx.value * 5}px rgba(251, 191, 36, ${0.2 + idx.value * 0.1}))`
})
</script>

<template>
  <svg
    viewBox="0 0 120 120"
    :width="size"
    :height="size"
    :style="{ filter: filterStyle }"
  >
    <defs>
      <linearGradient :id="`skin-${idx}`" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fcd9b6" />
        <stop offset="100%" stop-color="#e5b898" />
      </linearGradient>
      <linearGradient :id="`cloak-${idx}`" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" :stop-color="cloakColor" />
        <stop offset="100%" :stop-color="cloakColor" style="filter: brightness(0.7)" />
      </linearGradient>
      <linearGradient :id="`hair-${idx}`" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" :stop-color="idx >= 4 ? '#9ca3af' : '#92400e'" />
        <stop offset="100%" :stop-color="idx >= 4 ? '#6b7280' : '#78350f'" />
      </linearGradient>
      <radialGradient :id="`glow-${idx}`" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.3" />
        <stop offset="100%" stop-color="#fbbf24" stop-opacity="0" />
      </radialGradient>
    </defs>

    <circle v-if="idx >= 3" cx="60" cy="60" r="55" :fill="`url(#glow-${idx})`" />

    <ellipse cx="60" cy="95" :rx="28 + idx * 2" :ry="20 + idx" :fill="`url(#cloak-${idx})`" />

    <path
      v-if="idx >= 1"
      :d="`M${32 - idx * 2} 95 Q60 ${105 + idx * 2} ${88 + idx * 2} 95`"
      fill="none"
      :stroke="trimColor"
      :stroke-width="1 + idx * 0.5"
    />

    <path
      v-if="idx >= 2"
      :d="`M40 55 Q60 ${35 - idx * 2} 80 55 L75 70 Q60 65 45 70 Z`"
      :fill="`url(#cloak-${idx})`"
      opacity="0.9"
    />

    <rect x="52" y="62" width="16" height="12" rx="4" :fill="`url(#skin-${idx})`" />

    <ellipse cx="60" cy="45" rx="22" ry="24" :fill="`url(#skin-${idx})`" />

    <ellipse cx="60" cy="32" rx="20" ry="14" :fill="`url(#hair-${idx})`" />
    <ellipse cx="42" cy="40" rx="6" ry="10" :fill="`url(#hair-${idx})`" />
    <ellipse cx="78" cy="40" rx="6" ry="10" :fill="`url(#hair-${idx})`" />

    <ellipse cx="38" cy="45" rx="4" :ry="6 + idx" :fill="`url(#skin-${idx})`" :transform="`rotate(${-10 - idx * 3} 38 45)`" />
    <ellipse cx="82" cy="45" rx="4" :ry="6 + idx" :fill="`url(#skin-${idx})`" :transform="`rotate(${10 + idx * 3} 82 45)`" />

    <ellipse cx="52" cy="46" rx="4" ry="3" fill="#1f2937" />
    <ellipse cx="68" cy="46" rx="4" ry="3" fill="#1f2937" />
    <circle cx="53" cy="45" r="1.5" fill="white" />
    <circle cx="69" cy="45" r="1.5" fill="white" />

    <path :d="`M48 ${42 - idx * 0.5} Q52 ${40 - idx} 56 ${42 - idx * 0.5}`" :stroke="`url(#hair-${idx})`" :stroke-width="1 + idx * 0.2" fill="none" />
    <path :d="`M64 ${42 - idx * 0.5} Q68 ${40 - idx} 72 ${42 - idx * 0.5}`" :stroke="`url(#hair-${idx})`" :stroke-width="1 + idx * 0.2" fill="none" />

    <path d="M60 48 L58 54 L62 54 Z" fill="#ddb896" />

    <path :d="`M54 58 Q60 ${60 + idx} 66 58`" stroke="#c4967a" stroke-width="1.5" fill="none" />

    <template v-if="idx >= 3">
      <path :d="`M48 56 Q50 ${65 + idx * 2} 60 ${70 + idx * 3} Q70 ${65 + idx * 2} 72 56`" :fill="`url(#hair-${idx})`" />
      <path v-if="idx >= 4" :d="`M55 ${68 + idx * 2} Q60 ${75 + idx * 3} 65 ${68 + idx * 2}`" :stroke="`url(#hair-${idx})`" stroke-width="2" fill="none" />
    </template>

    <template v-if="idx >= 1">
      <rect :x="88 + idx" :y="45 - idx * 3" width="4" :height="55 + idx * 5" rx="2" fill="#78350f" />
      <circle v-if="idx >= 2" :cx="90 + idx" :cy="42 - idx * 3" :r="4 + idx" :fill="trimColor" />
      <circle v-if="idx >= 4" :cx="90 + idx" :cy="42 - idx * 3" :r="2 + idx * 0.5" fill="#fef3c7">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
      </circle>
    </template>

    <ellipse v-if="idx >= 1" :cx="35 - idx" :cy="80 + idx" :rx="6 + idx" :ry="8 + idx" fill="#92400e" stroke="#78350f" stroke-width="1" />

    <template v-if="idx >= 5">
      <path d="M42 28 L45 22 L50 26 L55 18 L60 24 L65 18 L70 26 L75 22 L78 28" fill="none" stroke="#fcd34d" stroke-width="2" />
      <circle cx="60" cy="20" r="3" fill="#fbbf24">
        <animate attributeName="r" values="3;4;3" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </template>

    <circle v-if="idx >= 2" :cx="42 - idx" :cy="72 + idx" :r="3 + idx * 0.5" :fill="trimColor" stroke="#92400e" stroke-width="1" />
  </svg>
</template>
