<script setup lang="ts">
defineProps<{
  imageId: string
}>()
</script>

<template>
  <svg v-if="imageId === 'shield'" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="sg1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fbbf24" />
        <stop offset="100%" stop-color="#92400e" />
      </linearGradient>
      <linearGradient id="sg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#78350f" />
        <stop offset="100%" stop-color="#451a03" />
      </linearGradient>
    </defs>
    <path d="M32 4L8 14V32C8 46 32 60 32 60C32 60 56 46 56 32V14L32 4Z" fill="url(#sg1)" stroke="#fcd34d" stroke-width="2" />
    <path d="M32 12L16 19V32C16 41 32 51 32 51C32 51 48 41 48 32V19L32 12Z" fill="url(#sg2)" />
    <path d="M32 20V44M24 32H40" stroke="#fbbf24" stroke-width="3" stroke-linecap="round" />
  </svg>

  <svg v-else-if="imageId === 'sword'" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="sw1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#e5e7eb" />
        <stop offset="50%" stop-color="#9ca3af" />
        <stop offset="100%" stop-color="#6b7280" />
      </linearGradient>
      <linearGradient id="sw2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#92400e" />
        <stop offset="100%" stop-color="#451a03" />
      </linearGradient>
    </defs>
    <path d="M32 4L36 40H28L32 4Z" fill="url(#sw1)" stroke="#d1d5db" stroke-width="1" />
    <rect x="24" y="40" width="16" height="4" rx="1" fill="#fbbf24" stroke="#b45309" stroke-width="1" />
    <rect x="28" y="44" width="8" height="16" rx="2" fill="url(#sw2)" />
    <circle cx="32" cy="42" r="2" fill="#fcd34d" />
  </svg>

  <svg v-else-if="imageId === 'hookboard'" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="hb1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#a16207" />
        <stop offset="100%" stop-color="#713f12" />
      </linearGradient>
    </defs>
    <rect x="8" y="16" width="48" height="32" rx="2" fill="url(#hb1)" stroke="#854d0e" stroke-width="2" />
    <path d="M20 32V28C20 26 22 24 24 24C26 24 28 26 28 28V32" stroke="#fbbf24" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M36 32V28C36 26 38 24 40 24C42 24 44 26 44 28V32" stroke="#fbbf24" stroke-width="3" stroke-linecap="round" fill="none" />
  </svg>

  <svg v-else-if="imageId === 'joints'" viewBox="0 0 64 64" fill="none">
    <rect x="8" y="24" width="28" height="16" rx="1" fill="#a16207" stroke="#78350f" stroke-width="1" />
    <rect x="28" y="16" width="28" height="16" rx="1" fill="#ca8a04" stroke="#78350f" stroke-width="1" />
    <rect x="28" y="32" width="28" height="16" rx="1" fill="#a16207" stroke="#78350f" stroke-width="1" />
    <circle cx="40" cy="24" r="2" fill="#6b7280" />
    <circle cx="48" cy="24" r="2" fill="#6b7280" />
    <text x="18" y="34" fill="#fbbf24" font-size="8">?</text>
  </svg>

  <svg v-else-if="imageId === 'safety'" viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="32" rx="24" ry="16" fill="none" stroke="#fbbf24" stroke-width="3" />
    <circle cx="32" cy="32" r="10" fill="#1f2937" stroke="#fbbf24" stroke-width="2" />
    <circle cx="32" cy="32" r="4" fill="#fbbf24" />
    <circle cx="34" cy="30" r="2" fill="#fcd34d" />
  </svg>

  <svg v-else-if="imageId === 'birdwatch'" viewBox="0 0 64 64" fill="none">
    <ellipse cx="28" cy="32" rx="14" ry="12" fill="#22c55e" />
    <circle cx="22" cy="28" r="8" fill="#22c55e" />
    <circle cx="20" cy="27" r="2" fill="#1f2937" />
    <path d="M14 28L10 26L14 30Z" fill="#fbbf24" />
    <path d="M42 32L56 28L56 36L42 32Z" fill="#15803d" />
    <path d="M24 44L22 52M28 44L28 52M32 44L34 52" stroke="#78350f" stroke-width="2" stroke-linecap="round" />
  </svg>

  <svg v-else-if="imageId === 'firestart'" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="fr1" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#dc2626" />
        <stop offset="50%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#fcd34d" />
      </linearGradient>
      <linearGradient id="fr2" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#fef3c7" />
      </linearGradient>
    </defs>
    <path d="M32 8C32 8 16 24 16 40C16 52 24 56 32 56C40 56 48 52 48 40C48 24 32 8 32 8Z" fill="url(#fr1)" />
    <path d="M32 24C32 24 24 34 24 42C24 48 28 52 32 52C36 52 40 48 40 42C40 34 32 24 32 24Z" fill="url(#fr2)" />
  </svg>

  <svg v-else-if="imageId === 'bread'" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="br1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#b45309" />
        <stop offset="100%" stop-color="#78350f" />
      </linearGradient>
      <linearGradient id="br2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#fcd34d" />
        <stop offset="100%" stop-color="#f59e0b" />
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="44" rx="24" ry="12" fill="url(#br1)" />
    <path d="M8 44C8 36 18 20 32 20C46 20 56 36 56 44" fill="url(#br2)" />
    <path d="M8 44C8 36 18 20 32 20C46 20 56 36 56 44" stroke="url(#br1)" stroke-width="3" fill="none" />
  </svg>

  <svg v-else-if="imageId === 'plant'" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="pl1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#a16207" />
        <stop offset="100%" stop-color="#713f12" />
      </linearGradient>
      <linearGradient id="pl2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4ade80" />
        <stop offset="100%" stop-color="#16a34a" />
      </linearGradient>
    </defs>
    <path d="M20 48L24 60H40L44 48H20Z" fill="url(#pl1)" stroke="#78350f" stroke-width="2" />
    <rect x="18" y="44" width="28" height="6" rx="1" fill="#92400e" />
    <path d="M32 44V28" stroke="#22c55e" stroke-width="3" stroke-linecap="round" />
    <ellipse cx="24" cy="24" rx="8" ry="12" fill="url(#pl2)" transform="rotate(-30 24 24)" />
    <ellipse cx="40" cy="24" rx="8" ry="12" fill="url(#pl2)" transform="rotate(30 40 24)" />
    <circle cx="32" cy="14" r="4" fill="#fbbf24" />
  </svg>

  <svg v-else-if="imageId === 'map'" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="mp1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fef3c7" />
        <stop offset="100%" stop-color="#fcd34d" />
      </linearGradient>
    </defs>
    <path d="M8 12L24 8V52L8 56V12Z" fill="url(#mp1)" stroke="#b45309" stroke-width="1" />
    <path d="M24 8L40 12V56L24 52V8Z" fill="#fef9c3" stroke="#b45309" stroke-width="1" />
    <path d="M40 12L56 8V52L40 56V12Z" fill="url(#mp1)" stroke="#b45309" stroke-width="1" />
    <circle cx="32" cy="28" r="4" fill="none" stroke="#dc2626" stroke-width="2" />
    <path d="M32 24V16" stroke="#dc2626" stroke-width="2" stroke-linecap="round" />
    <path d="M32 48L34 44L32 40L30 44Z" fill="#78350f" />
  </svg>

  <svg v-else viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="24" fill="none" stroke="#fbbf24" stroke-width="3" />
    <path d="M32 16V32L42 42" stroke="#fbbf24" stroke-width="3" stroke-linecap="round" />
    <circle cx="32" cy="32" r="4" fill="#fbbf24" />
  </svg>
</template>
