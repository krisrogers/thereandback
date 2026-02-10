export const SECTIONS = [
  { id: 'workshop', name: 'The Workshop', subtitle: 'Tools & Making', icon: '⚒️', color: '#f59e0b', description: 'Forge, build, and craft with your hands' },
  { id: 'wilds', name: 'The Wilds', subtitle: 'Bush & Field', icon: '🌲', color: '#22c55e', description: 'Explore the untamed lands beyond' },
  { id: 'shire', name: 'The Shire', subtitle: 'Land Systems', icon: '🌾', color: '#eab308', description: 'Tend the gardens and growing things' },
  { id: 'hearth', name: 'The Hearth', subtitle: 'Home & Kitchen', icon: '🔥', color: '#ef4444', description: 'Master the arts of fire and food' },
  { id: 'library', name: 'The Library', subtitle: 'Words & Maps', icon: '📜', color: '#6366f1', description: 'Seek knowledge in ancient tomes' },
] as const

export const SUBSECTIONS: Record<string, readonly { id: string; name: string; icon: string; description: string }[]> = {
  workshop: [
    { id: 'woodworking', name: 'Woodworking', icon: '🪵', description: 'Shape timber into useful things' },
    { id: 'metalwork', name: 'Metalwork', icon: '⚙️', description: 'Forge and shape metal' },
    { id: 'leathercraft', name: 'Leathercraft', icon: '🧵', description: 'Work with hides and leather' },
    { id: 'electronics', name: 'Electronics', icon: '💡', description: 'Circuits, wires, and power' },
    { id: 'general-making', name: 'General Making', icon: '🔧', description: 'Other workshop crafts' },
  ],
  wilds: [
    { id: 'bushcraft', name: 'Bushcraft', icon: '🏕️', description: 'Survival skills in the wild' },
    { id: 'tracking', name: 'Tracking', icon: '🐾', description: 'Follow trails and signs' },
    { id: 'foraging', name: 'Foraging', icon: '🍄', description: 'Find food in nature' },
    { id: 'wildlife', name: 'Wildlife', icon: '🦊', description: 'Observe and understand animals' },
    { id: 'navigation', name: 'Navigation', icon: '🧭', description: 'Find your way in wild places' },
  ],
  shire: [
    { id: 'gardening', name: 'Gardening', icon: '🌱', description: 'Grow plants and vegetables' },
    { id: 'composting', name: 'Composting', icon: '🍂', description: 'Turn waste into soil' },
    { id: 'orcharding', name: 'Orcharding', icon: '🍎', description: 'Tend fruit trees and vines' },
    { id: 'beekeeping', name: 'Beekeeping', icon: '🐝', description: 'Keep bees and harvest honey' },
    { id: 'land-management', name: 'Land Management', icon: '🚜', description: 'Care for the broader land' },
  ],
  hearth: [
    { id: 'cooking', name: 'Cooking', icon: '🍳', description: 'Prepare meals and dishes' },
    { id: 'baking', name: 'Baking', icon: '🍞', description: 'Breads, pastries, and sweets' },
    { id: 'preserving', name: 'Preserving', icon: '🫙', description: 'Store food for later' },
    { id: 'fermentation', name: 'Fermentation', icon: '🧪', description: 'Pickles, drinks, and cultures' },
    { id: 'home-keeping', name: 'Home Keeping', icon: '🏠', description: 'Maintain and organize the home' },
  ],
  library: [
    { id: 'reading', name: 'Reading', icon: '📚', description: 'Books, articles, and texts' },
    { id: 'writing', name: 'Writing', icon: '✍️', description: 'Record thoughts and stories' },
    { id: 'cartography', name: 'Cartography', icon: '🗺️', description: 'Make and read maps' },
    { id: 'research', name: 'Research', icon: '🔍', description: 'Investigate and discover' },
    { id: 'languages', name: 'Languages', icon: '🗣️', description: 'Learn tongues old and new' },
  ],
} as const

export const TIERS = [
  { id: 'wanderer', name: 'Wanderer', rank: 1, description: 'Exploration with capture', xp: 10, stars: 1 },
  { id: 'traveller', name: 'Traveller', rank: 2, description: 'Reliable completion', xp: 25, stars: 2 },
  { id: 'wayfarer', name: 'Wayfarer', rank: 3, description: 'Multi-step competence', xp: 50, stars: 3 },
  { id: 'pathfinder', name: 'Pathfinder', rank: 4, description: 'Complex responsibility', xp: 100, stars: 4 },
  { id: 'guide', name: 'Guide', rank: 5, description: 'Generative leadership', xp: 200, stars: 5 },
] as const

export const TYPES = [
  { id: 'observation', name: 'Observation', icon: '👁️', prompts: ['What did you notice?', 'What pattern did you see?', 'What question do you have now?'] },
  { id: 'practice', name: 'Practice', icon: '🎯', prompts: ['What did you practice?', 'What improved?', 'What will you try next?'] },
  { id: 'experiment', name: 'Experiment', icon: '⚗️', prompts: ['What did you change?', 'What happened?', 'Why do you think?'] },
  { id: 'build', name: 'Build', icon: '🔨', prompts: ['What did you build?', 'What tools and materials?', 'What worked or failed?'] },
  { id: 'project', name: 'Project', icon: '📋', prompts: ['What was the goal?', 'What progress today?', 'What is the next step?'] },
  { id: 'expedition', name: 'Expedition', icon: '🧭', prompts: ['Where did you go?', 'What did you find?', 'What next time?'] },
  { id: 'service', name: 'Service', icon: '🤝', prompts: ['Who did you help?', 'What responsibility?', 'What standard did you aim for?'] },
  { id: 'teaching', name: 'Teaching', icon: '📖', prompts: ['What did you teach?', 'How did they understand it?', 'What would you improve?'] },
] as const

export const AVATAR_STAGES = [
  { minLevel: 1, name: 'Young Hobbit', description: 'Just beginning the journey' },
  { minLevel: 3, name: 'Eager Wanderer', description: 'Finding your feet on the road' },
  { minLevel: 5, name: 'Seasoned Traveller', description: 'The path becomes familiar' },
  { minLevel: 8, name: 'Bold Wayfarer', description: 'No trail is too long' },
  { minLevel: 12, name: 'Wise Pathfinder', description: 'Others follow your lead' },
  { minLevel: 18, name: 'Legendary Guide', description: 'Master of all realms' },
] as const

export const QUESTS = [
  { id: 'shield', title: 'Forge a Shield', description: 'Craft a wooden shield with a proper grip', section: 'workshop', subsection: 'woodworking', type: 'build', tier: 'traveller', image: 'shield' },
  { id: 'sword', title: 'Forge a Sword', description: 'Shape a blade and wrap the grip with cord', section: 'workshop', subsection: 'woodworking', type: 'build', tier: 'traveller', image: 'sword' },
  { id: 'hookboard', title: 'The Hook Board', description: 'Build a board with hooks for your tools', section: 'workshop', subsection: 'woodworking', type: 'build', tier: 'wanderer', image: 'hookboard' },
  { id: 'joints', title: 'Test of Joints', description: 'Which is strongest—screw, nail, or glue?', section: 'workshop', subsection: 'woodworking', type: 'experiment', tier: 'wayfarer', image: 'joints' },
  { id: 'safety', title: 'The Rules of Steel', description: 'Learn and record the safety rules of tools', section: 'workshop', subsection: 'general-making', type: 'observation', tier: 'wanderer', image: 'safety' },
  { id: 'birdwatch', title: 'Bird Watch', description: 'Find and identify three different birds', section: 'wilds', subsection: 'wildlife', type: 'observation', tier: 'wanderer', image: 'birdwatch' },
  { id: 'firestart', title: 'Spark to Flame', description: 'Start a fire using natural materials', section: 'wilds', subsection: 'bushcraft', type: 'practice', tier: 'wayfarer', image: 'firestart' },
  { id: 'bread', title: 'The Daily Bread', description: 'Bake a loaf from scratch', section: 'hearth', subsection: 'baking', type: 'build', tier: 'traveller', image: 'bread' },
  { id: 'plant', title: 'Seed to Sprout', description: 'Plant seeds and record their growth', section: 'shire', subsection: 'gardening', type: 'project', tier: 'traveller', image: 'plant' },
  { id: 'map', title: 'Chart the Land', description: 'Draw a map of your surroundings', section: 'library', subsection: 'cartography', type: 'build', tier: 'wayfarer', image: 'map' },
  // Permaculture quests (child-friendly)
  { id: 'wormworld', title: 'The Worm\'s World', description: 'Dig up a patch of soil and observe the worms that live there', section: 'shire', subsection: 'composting', type: 'observation', tier: 'wanderer', image: 'wormworld' },
  { id: 'compost', title: 'Compost Treasure', description: 'Start a kitchen scrap compost and record what goes in', section: 'shire', subsection: 'composting', type: 'build', tier: 'wanderer', image: 'compost' },
  { id: 'mulch', title: 'The Mulch Blanket', description: 'Gather leaves and straw to mulch around your plants', section: 'shire', subsection: 'gardening', type: 'practice', tier: 'wanderer', image: 'mulch' },
  { id: 'threesisters', title: 'Three Sisters Garden', description: 'Plant corn, beans, and squash together and watch them help each other grow', section: 'shire', subsection: 'gardening', type: 'project', tier: 'traveller', image: 'threesisters' },
  { id: 'herbspiral', title: 'The Herb Spiral', description: 'Build a spiral-shaped herb garden with stones and soil', section: 'shire', subsection: 'gardening', type: 'build', tier: 'traveller', image: 'herbspiral' },
  { id: 'raincatch', title: 'Catch the Rain', description: 'Set up a simple rain collector and measure what you catch', section: 'shire', subsection: 'land-management', type: 'build', tier: 'traveller', image: 'raincatch' },
  { id: 'bugcensus', title: 'The Bug Census', description: 'Count and identify the insects living in your garden', section: 'wilds', subsection: 'wildlife', type: 'observation', tier: 'wanderer', image: 'bugcensus' },
  { id: 'patterns', title: 'Nature\'s Patterns', description: 'Find spirals, branches, and webs in the wild and sketch them', section: 'wilds', subsection: 'tracking', type: 'observation', tier: 'wanderer', image: 'patterns' },
  { id: 'forage', title: 'The Forage Basket', description: 'Find and identify three safe edible wild plants with a guide', section: 'wilds', subsection: 'foraging', type: 'expedition', tier: 'traveller', image: 'forage' },
  { id: 'gardentable', title: 'Garden to Table', description: 'Pick something you grew and cook a meal with it', section: 'hearth', subsection: 'cooking', type: 'practice', tier: 'traveller', image: 'gardentable' },
] as const

// Types
export type Section = typeof SECTIONS[number]
export type Subsection = { id: string; name: string; icon: string; description: string }
export type Tier = typeof TIERS[number]
export type QuestType = typeof TYPES[number]
export type Quest = typeof QUESTS[number]

export interface Entry {
  id: string
  timestamp: string
  title: string
  section: string
  subsection: string
  type: string
  tier: string
  questId?: string
  image: string
  responses: string[]
  evidence: string[]
  notes: string
}

// Helper functions
export function getAvatarStage(level: number) {
  for (let i = AVATAR_STAGES.length - 1; i >= 0; i--) {
    if (level >= AVATAR_STAGES[i].minLevel) return { ...AVATAR_STAGES[i], index: i }
  }
  return { ...AVATAR_STAGES[0], index: 0 }
}

export function getSubsection(sectionId: string, subsectionId: string) {
  const subs = SUBSECTIONS[sectionId]
  return subs?.find(s => s.id === subsectionId)
}

// Battle System Constants
export const POWER_UP_TYPES = {
  workshop: [
    { id: 'sharpened-blade', name: 'Sharpened Blade', description: 'Your crafted weapons strike true', stat: 'attack', bonus: 3, icon: '⚔️' },
    { id: 'forged-armor', name: 'Forged Armor', description: 'Armor you made protects well', stat: 'defense', bonus: 2, icon: '🛡️' },
    { id: 'master-craftwork', name: 'Master Craftwork', description: 'Quality tools aid in battle', stat: 'attack', bonus: 5, icon: '🔨' },
  ],
  wilds: [
    { id: 'wilderness-reflexes', name: 'Wilderness Reflexes', description: 'Survival instincts honed', stat: 'evasion', bonus: 10, icon: '🏃' },
    { id: 'predator-focus', name: 'Predator Focus', description: 'Strike like nature itself', stat: 'critChance', bonus: 8, icon: '🦅' },
    { id: 'natural-camouflage', name: 'Natural Camouflage', description: 'Blend and evade danger', stat: 'evasion', bonus: 15, icon: '🍃' },
  ],
  shire: [
    { id: 'hardy-constitution', name: 'Hardy Constitution', description: 'Strong from working the land', stat: 'maxHp', bonus: 20, icon: '💪' },
    { id: 'living-vigor', name: 'Living Vigor', description: 'Life energy flows through you', stat: 'hpRegen', bonus: 2, icon: '🌱' },
    { id: 'deep-roots', name: 'Deep Roots', description: 'Grounded and resilient', stat: 'maxHp', bonus: 30, icon: '🌳' },
  ],
  hearth: [
    { id: 'warm-resolve', name: 'Warm Resolve', description: 'Fire tempers your spirit', stat: 'defense', bonus: 3, icon: '🔥' },
    { id: 'nourishing-feast', name: 'Nourishing Feast', description: 'Good food heals the body', stat: 'healing', bonus: 5, icon: '🍲' },
    { id: 'hearthstone-ward', name: 'Hearthstone Ward', description: 'Protected by home and hearth', stat: 'defense', bonus: 5, icon: '🏠' },
  ],
  library: [
    { id: 'tactical-knowledge', name: 'Tactical Knowledge', description: 'Study reveals weaknesses', stat: 'accuracy', bonus: 10, icon: '📖' },
    { id: 'ancient-wisdom', name: 'Ancient Wisdom', description: 'Gain experience faster in battle', stat: 'battleXpMultiplier', bonus: 1.5, icon: '📜' },
    { id: 'critical-insight', name: 'Critical Insight', description: 'Knowledge of vital points', stat: 'critDamage', bonus: 1.5, icon: '💡' },
  ],
} as const

export const ENEMIES = [
  // Wanderer tier (10 XP)
  { id: 'goblin', name: 'Goblin Scout', tier: 'wanderer', hp: 30, attack: 3, defense: 1, xp: 10, gold: 5, icon: '👺', description: 'A small but crafty foe' },
  { id: 'wild-boar', name: 'Wild Boar', tier: 'wanderer', hp: 40, attack: 4, defense: 2, xp: 12, gold: 6, icon: '🐗', description: 'Tough hide and sharp tusks' },
  // Traveller tier (25 XP)
  { id: 'bandit', name: 'Highway Bandit', tier: 'traveller', hp: 60, attack: 6, defense: 3, xp: 25, gold: 12, icon: '🗡️', description: 'A seasoned cutthroat' },
  { id: 'dire-wolf', name: 'Dire Wolf', tier: 'traveller', hp: 70, attack: 7, defense: 2, xp: 28, gold: 14, icon: '🐺', description: 'Hungry and relentless' },
  // Wayfarer tier (50 XP)
  { id: 'orc-warrior', name: 'Orc Warrior', tier: 'wayfarer', hp: 100, attack: 10, defense: 5, xp: 50, gold: 25, icon: '⚔️', description: 'Battle-hardened and brutal' },
  { id: 'marsh-troll', name: 'Marsh Troll', tier: 'wayfarer', hp: 120, attack: 9, defense: 7, xp: 55, gold: 28, icon: '👹', description: 'Slow but incredibly tough' },
  // Pathfinder tier (100 XP)
  { id: 'dark-knight', name: 'Dark Knight', tier: 'pathfinder', hp: 150, attack: 15, defense: 10, xp: 100, gold: 50, icon: '⚔️', description: 'Clad in blackened steel' },
  { id: 'wyvern', name: 'Wyvern', tier: 'pathfinder', hp: 140, attack: 18, defense: 8, xp: 110, gold: 55, icon: '🐉', description: 'Swift and deadly from above' },
  // Guide tier (200 XP)
  { id: 'lich-lord', name: 'Lich Lord', tier: 'guide', hp: 200, attack: 22, defense: 15, xp: 200, gold: 100, icon: '💀', description: 'Ancient evil incarnate' },
  { id: 'dragon', name: 'Ancient Dragon', tier: 'guide', hp: 250, attack: 25, defense: 20, xp: 250, gold: 150, icon: '🐲', description: 'The ultimate challenge' },
] as const

// Battle types
export type PowerUp = {
  id: string
  name: string
  description: string
  stat: 'attack' | 'defense' | 'maxHp' | 'hpRegen' | 'evasion' | 'critChance' | 'critDamage' | 'accuracy' | 'healing' | 'battleXpMultiplier'
  bonus: number
  icon: string
  source?: string // section:subsection:tier
  timestamp?: string
}

export type Enemy = typeof ENEMIES[number] & {
  currentHp?: number
}

export interface BattleState {
  currentEnemy: Enemy | null
  playerHp: number
  playerMaxHp: number
  isInBattle: boolean
  battleLog: string[]
  defeatedEnemies: string[]
  gold: number
  battleXP: number
  powerUps: PowerUp[]
}

// Helper functions for battle
export function getPowerUpForCompletion(section: string, subsection: string, tier: string): PowerUp | null {
  const powerUpList = POWER_UP_TYPES[section as keyof typeof POWER_UP_TYPES]
  if (!powerUpList) return null

  // Choose power-up based on tier
  let index = 0
  if (tier === 'wanderer' || tier === 'traveller') index = 0
  else if (tier === 'wayfarer') index = 1
  else index = 2 // pathfinder or guide

  const template = powerUpList[index]
  if (!template) return null

  return {
    ...template,
    source: `${section}:${subsection}:${tier}`,
    timestamp: new Date().toISOString(),
  }
}

export function calculatePlayerStats(powerUps: PowerUp[]) {
  const baseStats = {
    attack: 10,
    defense: 5,
    maxHp: 100,
    hpRegen: 1,
    evasion: 5,
    critChance: 10,
    critDamage: 1.5,
    accuracy: 85,
    healing: 0,
    battleXpMultiplier: 1,
  }

  const stats = { ...baseStats }

  for (const powerUp of powerUps) {
    if (powerUp.stat === 'battleXpMultiplier' || powerUp.stat === 'critDamage') {
      stats[powerUp.stat] += powerUp.bonus
    } else {
      stats[powerUp.stat] += powerUp.bonus
    }
  }

  return stats
}

export function getAvailableEnemies(defeatedEnemies: string[]): Enemy[] {
  // Start with first enemy always available
  if (defeatedEnemies.length === 0) {
    return [ENEMIES[0]]
  }

  // Get all enemies up to the highest defeated + next one
  const highestDefeatedIndex = Math.max(
    ...defeatedEnemies.map(id => ENEMIES.findIndex(e => e.id === id))
  )

  return ENEMIES.slice(0, Math.min(highestDefeatedIndex + 2, ENEMIES.length))
}
