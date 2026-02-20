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
  { id: 'shield', title: 'Forge a Shield', description: 'Craft a wooden shield with a proper grip', instructions: '1. Choose a flat piece of wood roughly 40cm across.\n2. Cut or sand it into a round or kite shape.\n3. Attach a handle on the back using screws or a wood strip.\n4. Sand the edges smooth so there are no splinters.\n5. Paint or decorate with a personal emblem.', section: 'workshop', subsection: 'woodworking', type: 'build', tier: 'traveller', image: 'shield' },
  { id: 'sword', title: 'Forge a Sword', description: 'Shape a blade and wrap the grip with cord', instructions: '1. Find a straight piece of timber about 60–70cm long.\n2. Mark out a blade shape and a handle section.\n3. Saw and sand the blade to a flat, tapered profile.\n4. Shape a cross-guard from a small block and attach it.\n5. Wrap the handle tightly with cord or leather strip.\n6. Sand everything smooth and apply oil or paint.', section: 'workshop', subsection: 'woodworking', type: 'build', tier: 'traveller', image: 'sword' },
  { id: 'hookboard', title: 'The Hook Board', description: 'Build a board with hooks for your tools', instructions: '1. Choose a sturdy board about 50cm wide.\n2. Sand it smooth and mark where each hook will go.\n3. Screw in hooks or pegs at even spacing.\n4. Attach mounting hardware to the back.\n5. Hang it on the workshop wall and organise your tools.', section: 'workshop', subsection: 'woodworking', type: 'build', tier: 'wanderer', image: 'hookboard' },
  { id: 'joints', title: 'Test of Joints', description: 'Which is strongest—screw, nail, or glue?', instructions: '1. Cut six identical pairs of small wood pieces.\n2. Join two pairs with screws, two with nails, and two with wood glue.\n3. Let any glue dry fully before testing.\n4. Test each joint by pulling, twisting, and bending.\n5. Record which held best and which failed first.\n6. Write down why you think the winner was strongest.', section: 'workshop', subsection: 'woodworking', type: 'experiment', tier: 'wayfarer', image: 'joints' },
  { id: 'safety', title: 'The Rules of Steel', description: 'Learn and record the safety rules of tools', instructions: '1. Pick three tools you use or want to learn (e.g. saw, drill, chisel).\n2. Research or ask an adult about the safety rules for each.\n3. Write or draw the rules clearly on a card or poster.\n4. Include what protective gear is needed for each tool.\n5. Display the rules in your workshop where you can see them.', section: 'workshop', subsection: 'general-making', type: 'observation', tier: 'wanderer', image: 'safety' },
  { id: 'birdwatch', title: 'Bird Watch', description: 'Find and identify three different birds', instructions: '1. Choose a spot outdoors where you can sit quietly.\n2. Bring a notebook and pencil (binoculars if you have them).\n3. Sit still for at least 15 minutes and watch for birds.\n4. Sketch or describe each different bird you see.\n5. Use a field guide or app to identify at least three species.\n6. Note their colours, size, call, and behaviour.', section: 'wilds', subsection: 'wildlife', type: 'observation', tier: 'wanderer', image: 'birdwatch' },
  { id: 'firestart', title: 'Spark to Flame', description: 'Start a fire using natural materials', instructions: '1. Gather tinder (dry grass, bark shavings), kindling (small sticks), and fuel (larger sticks).\n2. Clear a safe fire area on bare ground, away from anything flammable.\n3. Build a small tinder nest and arrange kindling above it.\n4. Use a ferro rod, flint and steel, or friction method to create a spark.\n5. Gently blow on the ember until it catches the tinder.\n6. Feed kindling slowly until you have a stable flame.\n7. Always have water nearby and fully extinguish when done.', section: 'wilds', subsection: 'bushcraft', type: 'practice', tier: 'wayfarer', image: 'firestart' },
  { id: 'bread', title: 'The Daily Bread', description: 'Bake a loaf from scratch', instructions: '1. Mix 500g flour, 7g yeast, 10g salt, and 325ml warm water.\n2. Knead the dough for about 10 minutes until smooth and elastic.\n3. Cover and let it rise in a warm spot for 1 hour (until doubled).\n4. Punch down, shape into a loaf, and place on a baking tray.\n5. Let it rise again for 30 minutes.\n6. Score the top with a knife and bake at 220°C for 25–30 minutes.\n7. It is done when it sounds hollow when you tap the bottom.', section: 'hearth', subsection: 'baking', type: 'build', tier: 'traveller', image: 'bread' },
  { id: 'plant', title: 'Seed to Sprout', description: 'Plant seeds and record their growth', instructions: '1. Choose fast-growing seeds (beans, sunflowers, or radishes work well).\n2. Fill small pots with damp potting soil.\n3. Plant seeds at the depth shown on the packet.\n4. Place in a sunny spot and water gently each day.\n5. Measure and sketch or photograph the growth every few days.\n6. Record the date each seedling breaks the surface.', section: 'shire', subsection: 'gardening', type: 'project', tier: 'traveller', image: 'plant' },
  { id: 'map', title: 'Chart the Land', description: 'Draw a map of your surroundings', instructions: '1. Walk around your area and note landmarks, paths, and features.\n2. Sketch a rough layout on scrap paper while exploring.\n3. Back inside, draw a clean map on good paper.\n4. Add a compass rose showing north.\n5. Include a simple scale and legend for symbols.\n6. Mark important places: home, water, big trees, paths.', section: 'library', subsection: 'cartography', type: 'build', tier: 'wayfarer', image: 'map' },
  // Permaculture quests (child-friendly)
  { id: 'wormworld', title: 'The Worm\'s World', description: 'Dig up a patch of soil and observe the worms that live there', instructions: '1. Choose a damp, shady patch of garden soil.\n2. Use a trowel to carefully dig up a 30cm square, about 15cm deep.\n3. Gently break apart the soil and look for worms.\n4. Count how many you find and note their sizes.\n5. Observe how they move and react to light.\n6. Carefully return all the worms and soil when done.', section: 'shire', subsection: 'composting', type: 'observation', tier: 'wanderer', image: 'wormworld' },
  { id: 'compost', title: 'Compost Treasure', description: 'Start a kitchen scrap compost and record what goes in', instructions: '1. Find or make a small compost container (a bucket with holes, or a corner of the garden).\n2. Start with a layer of dry leaves, straw, or cardboard.\n3. Add kitchen scraps: fruit peels, veggie ends, eggshells, tea bags.\n4. Avoid meat, dairy, and oily food.\n5. Add a handful of dry material on top each time you add scraps.\n6. Keep a log of what you add and the date.', section: 'shire', subsection: 'composting', type: 'build', tier: 'wanderer', image: 'compost' },
  { id: 'mulch', title: 'The Mulch Blanket', description: 'Gather leaves and straw to mulch around your plants', instructions: '1. Collect fallen leaves, straw, grass clippings, or wood chips.\n2. Choose a garden bed or some plants that need mulching.\n3. Pull any weeds from around the base of the plants.\n4. Spread a layer of mulch 5–10cm thick around (not touching) the stems.\n5. Water the area after mulching.\n6. Check back in a week and note how the soil feels underneath.', section: 'shire', subsection: 'gardening', type: 'practice', tier: 'wanderer', image: 'mulch' },
  { id: 'threesisters', title: 'Three Sisters Garden', description: 'Plant corn, beans, and squash together and watch them help each other grow', instructions: '1. Prepare a mound of soil about 30cm high and 60cm across.\n2. Plant 4 corn seeds in the centre of the mound.\n3. When corn is 15cm tall, plant 4 bean seeds around it.\n4. At the same time, plant 2 squash seeds at the edge of the mound.\n5. Water regularly and watch: corn gives beans a pole, beans fix nitrogen, squash shades the soil.\n6. Journal how each plant grows and helps the others.', section: 'shire', subsection: 'gardening', type: 'project', tier: 'traveller', image: 'threesisters' },
  { id: 'herbspiral', title: 'The Herb Spiral', description: 'Build a spiral-shaped herb garden with stones and soil', instructions: '1. Mark a circle about 1.5m across on the ground.\n2. Lay stones in a spiral shape, building up height toward the centre.\n3. Fill the spiral with soil, higher in the middle.\n4. Plant herbs that like dry conditions near the top (rosemary, thyme).\n5. Plant herbs that like moisture near the bottom (parsley, mint).\n6. Water and label each herb.', section: 'shire', subsection: 'gardening', type: 'build', tier: 'traveller', image: 'herbspiral' },
  { id: 'raincatch', title: 'Catch the Rain', description: 'Set up a simple rain collector and measure what you catch', instructions: '1. Find a large clean container (bucket or barrel).\n2. Place it under a roof edge or downpipe where rain runs off.\n3. Mark measurement lines on the inside with a waterproof marker.\n4. After each rain, measure and record how much water you collected.\n5. Track rainfall over at least a week.\n6. Calculate how much water your roof catches per storm.', section: 'shire', subsection: 'land-management', type: 'build', tier: 'traveller', image: 'raincatch' },
  { id: 'bugcensus', title: 'The Bug Census', description: 'Count and identify the insects living in your garden', instructions: '1. Choose a 1m × 1m patch of garden to survey.\n2. Look carefully on leaves, under rocks, in the soil, and on stems.\n3. Catch insects gently in a clear jar to observe them.\n4. Count and sketch or photograph each type you find.\n5. Use a field guide or app to identify as many as you can.\n6. Release all insects where you found them and record your results.', section: 'wilds', subsection: 'wildlife', type: 'observation', tier: 'wanderer', image: 'bugcensus' },
  { id: 'patterns', title: 'Nature\'s Patterns', description: 'Find spirals, branches, and webs in the wild and sketch them', instructions: '1. Head outdoors with a sketchbook and pencil.\n2. Look for spiral patterns (snail shells, fern fronds, flower centres).\n3. Find branching patterns (trees, rivers, leaf veins, lightning).\n4. Search for web or net patterns (spider webs, honeycomb, cracked mud).\n5. Sketch at least one example of each pattern type.\n6. Label each sketch with where you found it.', section: 'wilds', subsection: 'tracking', type: 'observation', tier: 'wanderer', image: 'patterns' },
  { id: 'forage', title: 'The Forage Basket', description: 'Find and identify three safe edible wild plants with a guide', instructions: '1. Go with an experienced adult or use a trusted foraging guide.\n2. Walk slowly through a wild or semi-wild area.\n3. Identify at least three edible plants (e.g. dandelion, clover, wild garlic).\n4. Only pick plants you are 100% sure about — when in doubt, leave it.\n5. Collect a small amount of each into a basket.\n6. Note where each plant was growing and what it looked like.', section: 'wilds', subsection: 'foraging', type: 'expedition', tier: 'traveller', image: 'forage' },
  { id: 'gardentable', title: 'Garden to Table', description: 'Pick something you grew and cook a meal with it', instructions: '1. Harvest something from your garden (herbs, vegetables, or fruit).\n2. Wash everything thoroughly.\n3. Choose a simple recipe that features what you picked.\n4. Prepare and cook the meal (with help if needed).\n5. Serve it and note how it tastes compared to store-bought.\n6. Reflect on the journey from planting to plate.', section: 'hearth', subsection: 'cooking', type: 'practice', tier: 'traveller', image: 'gardentable' },
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

// Active Quest Types
export interface QuestProgress {
  id: string
  timestamp: string
  note: string
  evidence: string[]
}

export interface ActiveQuest {
  id: string
  questId?: string  // Reference to QUESTS array if it's a predefined quest
  title: string
  description: string
  instructions: string
  section: string
  subsection: string
  type: string
  tier: string
  image: string
  startedAt: string
  progressNotes: QuestProgress[]
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

