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

  <!-- Permaculture quests -->
  <svg v-else-if="imageId === 'wormworld'" viewBox="0 0 64 64" fill="none">
    <rect x="4" y="32" width="56" height="28" rx="2" fill="#78350f" />
    <rect x="4" y="32" width="56" height="10" fill="#92400e" />
    <circle cx="12" cy="36" r="2" fill="#a16207" />
    <circle cx="48" cy="38" r="1.5" fill="#a16207" />
    <circle cx="30" cy="34" r="1" fill="#a16207" />
    <path d="M20 38C22 34 26 36 28 40C30 44 34 42 36 38C38 34 42 36 44 40" stroke="#f472b6" stroke-width="3" stroke-linecap="round" fill="none" />
    <circle cx="19" cy="38" r="2" fill="#f472b6" />
    <circle cx="18" cy="37" r="0.5" fill="#1f2937" />
    <path d="M16 12L20 8L24 14L28 10L32 16" stroke="#22c55e" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M36 14L40 10L44 16L48 12" stroke="#22c55e" stroke-width="2" stroke-linecap="round" fill="none" />
  </svg>

  <svg v-else-if="imageId === 'compost'" viewBox="0 0 64 64" fill="none">
    <path d="M12 20L8 56H56L52 20H12Z" fill="#78350f" stroke="#5c2d0e" stroke-width="2" />
    <rect x="10" y="16" width="44" height="6" rx="1" fill="#92400e" stroke="#5c2d0e" stroke-width="1" />
    <ellipse cx="24" cy="32" rx="4" ry="3" fill="#f59e0b" />
    <ellipse cx="36" cy="36" rx="3" ry="4" fill="#22c55e" />
    <path d="M28 40C30 38 34 42 36 44" stroke="#a16207" stroke-width="2" stroke-linecap="round" />
    <circle cx="40" cy="28" r="3" fill="#ef4444" />
    <circle cx="20" cy="42" r="2" fill="#eab308" />
    <path d="M30 24L32 20L34 24" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" fill="none" />
    <path d="M28 10C28 10 30 6 32 10C34 6 36 10 36 10" stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round" fill="none" />
  </svg>

  <svg v-else-if="imageId === 'mulch'" viewBox="0 0 64 64" fill="none">
    <rect x="4" y="44" width="56" height="16" rx="2" fill="#78350f" />
    <ellipse cx="12" cy="44" rx="6" ry="3" fill="#a16207" />
    <ellipse cx="28" cy="44" rx="8" ry="3" fill="#92400e" />
    <ellipse cx="46" cy="44" rx="7" ry="3" fill="#a16207" />
    <path d="M32 44V16" stroke="#22c55e" stroke-width="3" stroke-linecap="round" />
    <ellipse cx="24" cy="18" rx="8" ry="10" fill="#4ade80" transform="rotate(-20 24 18)" />
    <ellipse cx="40" cy="18" rx="8" ry="10" fill="#22c55e" transform="rotate(20 40 18)" />
    <ellipse cx="16" cy="44" rx="4" ry="1.5" fill="#eab308" />
    <ellipse cx="40" cy="46" rx="5" ry="1.5" fill="#ca8a04" />
    <ellipse cx="52" cy="44" rx="3" ry="1" fill="#eab308" />
  </svg>

  <svg v-else-if="imageId === 'threesisters'" viewBox="0 0 64 64" fill="none">
    <rect x="4" y="48" width="56" height="12" rx="2" fill="#78350f" />
    <path d="M20 48V20" stroke="#22c55e" stroke-width="3" stroke-linecap="round" />
    <path d="M16 24L20 20L24 24" stroke="#15803d" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M16 32L20 28L24 32" stroke="#15803d" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M32 48V30" stroke="#166534" stroke-width="2" stroke-linecap="round" />
    <path d="M32 30C28 28 26 32 28 36C24 34 22 38 26 40C30 38 32 34 32 30Z" fill="#4ade80" />
    <path d="M32 30C36 28 38 32 36 36C40 34 42 38 38 40C34 38 32 34 32 30Z" fill="#22c55e" />
    <path d="M44 48C44 48 42 40 44 36C46 32 50 36 48 40C50 38 54 40 52 44C50 48 44 48 44 48Z" fill="#f59e0b" />
    <ellipse cx="46" cy="44" rx="6" ry="4" fill="#eab308" />
  </svg>

  <svg v-else-if="imageId === 'herbspiral'" viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="40" rx="26" ry="16" fill="#78350f" />
    <ellipse cx="32" cy="38" rx="26" ry="16" fill="#92400e" />
    <path d="M32 14C44 14 52 22 52 30C52 38 44 42 36 42C28 42 22 38 22 32C22 26 28 24 32 24C36 24 38 26 38 30C38 34 36 36 32 36" stroke="#d4d4d4" stroke-width="3" stroke-linecap="round" fill="none" />
    <circle cx="46" cy="28" r="2" fill="#22c55e" />
    <circle cx="40" cy="22" r="2" fill="#4ade80" />
    <circle cx="28" cy="36" r="2" fill="#16a34a" />
    <circle cx="34" cy="30" r="2" fill="#22c55e" />
    <circle cx="50" cy="34" r="1.5" fill="#4ade80" />
    <circle cx="22" cy="28" r="1.5" fill="#15803d" />
  </svg>

  <svg v-else-if="imageId === 'raincatch'" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="rc1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#6b7280" />
        <stop offset="100%" stop-color="#4b5563" />
      </linearGradient>
      <linearGradient id="rc2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#60a5fa" />
        <stop offset="100%" stop-color="#3b82f6" />
      </linearGradient>
    </defs>
    <path d="M18 20L14 56H50L46 20H18Z" fill="url(#rc1)" stroke="#374151" stroke-width="2" />
    <rect x="16" y="16" width="32" height="6" rx="1" fill="#6b7280" stroke="#374151" stroke-width="1" />
    <rect x="16" y="36" width="32" height="20" rx="0" fill="url(#rc2)" opacity="0.6" />
    <path d="M8 8L10 14" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" />
    <path d="M24 4L25 10" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" />
    <path d="M40 6L41 12" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" />
    <path d="M54 4L55 10" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" />
    <path d="M52 10L53 14" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" />
  </svg>

  <svg v-else-if="imageId === 'bugcensus'" viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="36" rx="10" ry="14" fill="#ef4444" />
    <circle cx="32" cy="22" r="6" fill="#1f2937" />
    <path d="M28 22L24 16" stroke="#1f2937" stroke-width="2" stroke-linecap="round" />
    <path d="M36 22L40 16" stroke="#1f2937" stroke-width="2" stroke-linecap="round" />
    <circle cx="24" cy="15" r="1.5" fill="#1f2937" />
    <circle cx="40" cy="15" r="1.5" fill="#1f2937" />
    <line x1="22" y1="32" x2="16" y2="28" stroke="#1f2937" stroke-width="2" stroke-linecap="round" />
    <line x1="22" y1="38" x2="16" y2="40" stroke="#1f2937" stroke-width="2" stroke-linecap="round" />
    <line x1="22" y1="44" x2="16" y2="48" stroke="#1f2937" stroke-width="2" stroke-linecap="round" />
    <line x1="42" y1="32" x2="48" y2="28" stroke="#1f2937" stroke-width="2" stroke-linecap="round" />
    <line x1="42" y1="38" x2="48" y2="40" stroke="#1f2937" stroke-width="2" stroke-linecap="round" />
    <line x1="42" y1="44" x2="48" y2="48" stroke="#1f2937" stroke-width="2" stroke-linecap="round" />
    <circle cx="30" cy="30" r="1" fill="#1f2937" />
    <circle cx="34" cy="30" r="1" fill="#1f2937" />
    <circle cx="30" cy="36" r="1" fill="#1f2937" />
    <circle cx="34" cy="36" r="1" fill="#1f2937" />
    <line x1="32" y1="26" x2="32" y2="50" stroke="#1f2937" stroke-width="1" />
  </svg>

  <svg v-else-if="imageId === 'patterns'" viewBox="0 0 64 64" fill="none">
    <path d="M32 56C32 56 32 44 28 36C24 28 16 24 16 24" stroke="#22c55e" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M32 56C32 56 34 44 38 36C42 28 50 26 50 26" stroke="#22c55e" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M16 24C16 24 24 20 28 16C32 12 32 4 32 4" stroke="#4ade80" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M16 24C16 24 12 32 8 36" stroke="#4ade80" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M50 26C50 26 52 18 56 14" stroke="#4ade80" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M50 26C50 26 48 34 50 40" stroke="#4ade80" stroke-width="2" stroke-linecap="round" fill="none" />
    <circle cx="32" cy="4" r="2" fill="#fbbf24" />
    <circle cx="8" cy="36" r="2" fill="#fbbf24" />
    <circle cx="56" cy="14" r="2" fill="#fbbf24" />
    <circle cx="50" cy="40" r="2" fill="#fbbf24" />
    <circle cx="32" cy="56" r="3" fill="#78350f" />
  </svg>

  <svg v-else-if="imageId === 'forage'" viewBox="0 0 64 64" fill="none">
    <path d="M16 28C16 28 20 56 32 56C44 56 48 28 48 28" stroke="#a16207" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M12 28L52 28" stroke="#a16207" stroke-width="3" stroke-linecap="round" />
    <path d="M16 28C20 24 24 20 24 20" stroke="#a16207" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M48 28C44 24 40 20 40 20" stroke="#a16207" stroke-width="2" stroke-linecap="round" fill="none" />
    <ellipse cx="24" cy="22" rx="4" ry="6" fill="#22c55e" transform="rotate(-10 24 22)" />
    <ellipse cx="32" cy="18" rx="4" ry="7" fill="#4ade80" />
    <ellipse cx="40" cy="22" rx="4" ry="6" fill="#16a34a" transform="rotate(10 40 22)" />
    <circle cx="28" cy="14" r="2" fill="#a855f7" />
    <circle cx="36" cy="12" r="2" fill="#ec4899" />
    <circle cx="32" cy="8" r="1.5" fill="#fbbf24" />
  </svg>

  <svg v-else-if="imageId === 'gardentable'" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="gt1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#a16207" />
        <stop offset="100%" stop-color="#713f12" />
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="40" rx="22" ry="8" fill="url(#gt1)" />
    <ellipse cx="32" cy="38" rx="22" ry="8" fill="#ca8a04" stroke="#92400e" stroke-width="2" />
    <circle cx="26" cy="30" r="5" fill="#ef4444" />
    <circle cx="27" cy="28" r="1.5" fill="#fca5a5" />
    <circle cx="38" cy="28" r="4" fill="#f59e0b" />
    <path d="M36 24L38 20L40 24" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" fill="none" />
    <ellipse cx="32" cy="34" rx="3" ry="4" fill="#22c55e" />
    <path d="M32 30V26" stroke="#15803d" stroke-width="1.5" stroke-linecap="round" />
    <path d="M30 26L32 22L34 26" stroke="#22c55e" stroke-width="1" fill="none" />
  </svg>

  <svg v-else viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="24" fill="none" stroke="#fbbf24" stroke-width="3" />
    <path d="M32 16V32L42 42" stroke="#fbbf24" stroke-width="3" stroke-linecap="round" />
    <circle cx="32" cy="32" r="4" fill="#fbbf24" />
  </svg>
</template>
