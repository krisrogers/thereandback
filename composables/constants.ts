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
