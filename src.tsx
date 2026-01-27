import React, { useState, useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'workshop', name: 'The Workshop', subtitle: 'Tools & Making', icon: '⚒️', color: '#f59e0b', description: 'Forge, build, and craft with your hands' },
  { id: 'wilds', name: 'The Wilds', subtitle: 'Bush & Field', icon: '🌲', color: '#22c55e', description: 'Explore the untamed lands beyond' },
  { id: 'shire', name: 'The Shire', subtitle: 'Land Systems', icon: '🌾', color: '#eab308', description: 'Tend the gardens and growing things' },
  { id: 'hearth', name: 'The Hearth', subtitle: 'Home & Kitchen', icon: '🔥', color: '#ef4444', description: 'Master the arts of fire and food' },
  { id: 'library', name: 'The Library', subtitle: 'Words & Maps', icon: '📜', color: '#6366f1', description: 'Seek knowledge in ancient tomes' },
];

const SUBSECTIONS = {
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
};

const TIERS = [
  { id: 'wanderer', name: 'Wanderer', rank: 1, description: 'Exploration with capture', xp: 10, stars: 1 },
  { id: 'traveller', name: 'Traveller', rank: 2, description: 'Reliable completion', xp: 25, stars: 2 },
  { id: 'wayfarer', name: 'Wayfarer', rank: 3, description: 'Multi-step competence', xp: 50, stars: 3 },
  { id: 'pathfinder', name: 'Pathfinder', rank: 4, description: 'Complex responsibility', xp: 100, stars: 4 },
  { id: 'guide', name: 'Guide', rank: 5, description: 'Generative leadership', xp: 200, stars: 5 },
];

const TYPES = [
  { id: 'observation', name: 'Observation', icon: '👁️', prompts: ['What did you notice?', 'What pattern did you see?', 'What question do you have now?'] },
  { id: 'practice', name: 'Practice', icon: '🎯', prompts: ['What did you practice?', 'What improved?', 'What will you try next?'] },
  { id: 'experiment', name: 'Experiment', icon: '⚗️', prompts: ['What did you change?', 'What happened?', 'Why do you think?'] },
  { id: 'build', name: 'Build', icon: '🔨', prompts: ['What did you build?', 'What tools and materials?', 'What worked or failed?'] },
  { id: 'project', name: 'Project', icon: '📋', prompts: ['What was the goal?', 'What progress today?', 'What is the next step?'] },
  { id: 'expedition', name: 'Expedition', icon: '🧭', prompts: ['Where did you go?', 'What did you find?', 'What next time?'] },
  { id: 'service', name: 'Service', icon: '🤝', prompts: ['Who did you help?', 'What responsibility?', 'What standard did you aim for?'] },
  { id: 'teaching', name: 'Teaching', icon: '📖', prompts: ['What did you teach?', 'How did they understand it?', 'What would you improve?'] },
];

// Avatar stages based on level
const AVATAR_STAGES = [
  { minLevel: 1, name: 'Young Hobbit', description: 'Just beginning the journey' },
  { minLevel: 3, name: 'Eager Wanderer', description: 'Finding your feet on the road' },
  { minLevel: 5, name: 'Seasoned Traveller', description: 'The path becomes familiar' },
  { minLevel: 8, name: 'Bold Wayfarer', description: 'No trail is too long' },
  { minLevel: 12, name: 'Wise Pathfinder', description: 'Others follow your lead' },
  { minLevel: 18, name: 'Legendary Guide', description: 'Master of all realms' },
];

function getAvatarStage(level) {
  for (let i = AVATAR_STAGES.length - 1; i >= 0; i--) {
    if (level >= AVATAR_STAGES[i].minLevel) return { ...AVATAR_STAGES[i], index: i };
  }
  return { ...AVATAR_STAGES[0], index: 0 };
}

// Avatar SVG Component
function Avatar({ level, size = 120, showGlow = true }) {
  const stage = getAvatarStage(level);
  const idx = stage.index;
  
  // Colors progress from simple to elaborate
  const cloakColors = ['#6b7280', '#4b5563', '#065f46', '#1e40af', '#7c2d12', '#4c1d95'];
  const cloakColor = cloakColors[idx];
  
  const trimColors = ['transparent', '#a78b4a', '#fbbf24', '#fbbf24', '#fcd34d', '#fef3c7'];
  const trimColor = trimColors[idx];
  
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} style={{ filter: showGlow ? `drop-shadow(0 0 ${10 + idx * 5}px rgba(251, 191, 36, ${0.2 + idx * 0.1}))` : 'none' }}>
      <defs>
        <linearGradient id={`skin-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fcd9b6" />
          <stop offset="100%" stopColor="#e5b898" />
        </linearGradient>
        <linearGradient id={`cloak-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={cloakColor} />
          <stop offset="100%" stopColor={cloakColor} style={{ filter: 'brightness(0.7)' }} />
        </linearGradient>
        <linearGradient id={`hair-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={idx >= 4 ? '#9ca3af' : '#92400e'} />
          <stop offset="100%" stopColor={idx >= 4 ? '#6b7280' : '#78350f'} />
        </linearGradient>
        <radialGradient id={`glow-${idx}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Glow effect for higher levels */}
      {idx >= 3 && <circle cx="60" cy="60" r="55" fill={`url(#glow-${idx})`} />}
      
      {/* Body/Cloak */}
      <ellipse cx="60" cy="95" rx={28 + idx * 2} ry={20 + idx} fill={`url(#cloak-${idx})`} />
      
      {/* Cloak trim for level 2+ */}
      {idx >= 1 && (
        <path d={`M${32 - idx * 2} 95 Q60 ${105 + idx * 2} ${88 + idx * 2} 95`} fill="none" stroke={trimColor} strokeWidth={1 + idx * 0.5} />
      )}
      
      {/* Hood for level 3+ */}
      {idx >= 2 && (
        <path d={`M40 55 Q60 ${35 - idx * 2} 80 55 L75 70 Q60 65 45 70 Z`} fill={`url(#cloak-${idx})`} opacity="0.9" />
      )}
      
      {/* Neck */}
      <rect x="52" y="62" width="16" height="12" rx="4" fill={`url(#skin-${idx})`} />
      
      {/* Head */}
      <ellipse cx="60" cy="45" rx="22" ry="24" fill={`url(#skin-${idx})`} />
      
      {/* Hair */}
      <ellipse cx="60" cy="32" rx="20" ry="14" fill={`url(#hair-${idx})`} />
      <ellipse cx="42" cy="40" rx="6" ry="10" fill={`url(#hair-${idx})`} />
      <ellipse cx="78" cy="40" rx="6" ry="10" fill={`url(#hair-${idx})`} />
      
      {/* Ears (pointed for higher levels - more elven) */}
      <ellipse cx="38" cy="45" rx="4" ry={6 + idx} fill={`url(#skin-${idx})`} transform={`rotate(${-10 - idx * 3} 38 45)`} />
      <ellipse cx="82" cy="45" rx="4" ry={6 + idx} fill={`url(#skin-${idx})`} transform={`rotate(${10 + idx * 3} 82 45)`} />
      
      {/* Eyes */}
      <ellipse cx="52" cy="46" rx="4" ry="3" fill="#1f2937" />
      <ellipse cx="68" cy="46" rx="4" ry="3" fill="#1f2937" />
      <circle cx="53" cy="45" r="1.5" fill="white" />
      <circle cx="69" cy="45" r="1.5" fill="white" />
      
      {/* Eyebrows - more defined at higher levels */}
      <path d={`M48 ${42 - idx * 0.5} Q52 ${40 - idx} 56 ${42 - idx * 0.5}`} stroke={`url(#hair-${idx})`} strokeWidth={1 + idx * 0.2} fill="none" />
      <path d={`M64 ${42 - idx * 0.5} Q68 ${40 - idx} 72 ${42 - idx * 0.5}`} stroke={`url(#hair-${idx})`} strokeWidth={1 + idx * 0.2} fill="none" />
      
      {/* Nose */}
      <path d="M60 48 L58 54 L62 54 Z" fill="#ddb896" />
      
      {/* Mouth - smile grows with level */}
      <path d={`M54 58 Q60 ${60 + idx} 66 58`} stroke="#c4967a" strokeWidth="1.5" fill="none" />
      
      {/* Beard for level 4+ */}
      {idx >= 3 && (
        <>
          <path d={`M48 56 Q50 ${65 + idx * 2} 60 ${70 + idx * 3} Q70 ${65 + idx * 2} 72 56`} fill={`url(#hair-${idx})`} />
          {idx >= 4 && <path d={`M55 ${68 + idx * 2} Q60 ${75 + idx * 3} 65 ${68 + idx * 2}`} stroke={`url(#hair-${idx})`} strokeWidth="2" fill="none" />}
        </>
      )}
      
      {/* Staff for level 2+ */}
      {idx >= 1 && (
        <>
          <rect x={88 + idx} y={45 - idx * 3} width="4" height={55 + idx * 5} rx="2" fill="#78350f" />
          {idx >= 2 && <circle cx={90 + idx} cy={42 - idx * 3} r={4 + idx} fill={trimColor} />}
          {idx >= 4 && <circle cx={90 + idx} cy={42 - idx * 3} r={2 + idx * 0.5} fill="#fef3c7">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
          </circle>}
        </>
      )}
      
      {/* Pack/bag for level 1+ */}
      {idx >= 1 && (
        <ellipse cx={35 - idx} cy={80 + idx} rx={6 + idx} ry={8 + idx} fill="#92400e" stroke="#78350f" strokeWidth="1" />
      )}
      
      {/* Crown/circlet for level 5 */}
      {idx >= 5 && (
        <>
          <path d="M42 28 L45 22 L50 26 L55 18 L60 24 L65 18 L70 26 L75 22 L78 28" fill="none" stroke="#fcd34d" strokeWidth="2" />
          <circle cx="60" cy="20" r="3" fill="#fbbf24">
            <animate attributeName="r" values="3;4;3" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </>
      )}
      
      {/* Shoulder clasp for level 3+ */}
      {idx >= 2 && (
        <circle cx={42 - idx} cy={72 + idx} r={3 + idx * 0.5} fill={trimColor} stroke="#92400e" strokeWidth="1" />
      )}
    </svg>
  );
}

// Compact avatar for header
function AvatarMini({ level, xpProgress }) {
  return (
    <div className="avatar-mini">
      <div className="avatar-mini-ring" style={{ background: `conic-gradient(var(--gold) ${xpProgress * 360}deg, var(--border) 0deg)` }}>
        <div className="avatar-mini-inner">
          <Avatar level={level} size={52} showGlow={false} />
        </div>
      </div>
      <div className="avatar-mini-level">{level}</div>
    </div>
  );
}

const QuestImages = {
  shield: () => (<svg viewBox="0 0 64 64" fill="none"><defs><linearGradient id="sg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fbbf24"/><stop offset="100%" stopColor="#92400e"/></linearGradient><linearGradient id="sg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#78350f"/><stop offset="100%" stopColor="#451a03"/></linearGradient></defs><path d="M32 4L8 14V32C8 46 32 60 32 60C32 60 56 46 56 32V14L32 4Z" fill="url(#sg1)" stroke="#fcd34d" strokeWidth="2"/><path d="M32 12L16 19V32C16 41 32 51 32 51C32 51 48 41 48 32V19L32 12Z" fill="url(#sg2)"/><path d="M32 20V44M24 32H40" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/></svg>),
  sword: () => (<svg viewBox="0 0 64 64" fill="none"><defs><linearGradient id="sw1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#e5e7eb"/><stop offset="50%" stopColor="#9ca3af"/><stop offset="100%" stopColor="#6b7280"/></linearGradient><linearGradient id="sw2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#92400e"/><stop offset="100%" stopColor="#451a03"/></linearGradient></defs><path d="M32 4L36 40H28L32 4Z" fill="url(#sw1)" stroke="#d1d5db" strokeWidth="1"/><rect x="24" y="40" width="16" height="4" rx="1" fill="#fbbf24" stroke="#b45309" strokeWidth="1"/><rect x="28" y="44" width="8" height="16" rx="2" fill="url(#sw2)"/><circle cx="32" cy="42" r="2" fill="#fcd34d"/></svg>),
  hookboard: () => (<svg viewBox="0 0 64 64" fill="none"><defs><linearGradient id="hb1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#a16207"/><stop offset="100%" stopColor="#713f12"/></linearGradient></defs><rect x="8" y="16" width="48" height="32" rx="2" fill="url(#hb1)" stroke="#854d0e" strokeWidth="2"/><path d="M20 32V28C20 26 22 24 24 24C26 24 28 26 28 28V32" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M36 32V28C36 26 38 24 40 24C42 24 44 26 44 28V32" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" fill="none"/></svg>),
  joints: () => (<svg viewBox="0 0 64 64" fill="none"><rect x="8" y="24" width="28" height="16" rx="1" fill="#a16207" stroke="#78350f" strokeWidth="1"/><rect x="28" y="16" width="28" height="16" rx="1" fill="#ca8a04" stroke="#78350f" strokeWidth="1"/><rect x="28" y="32" width="28" height="16" rx="1" fill="#a16207" stroke="#78350f" strokeWidth="1"/><circle cx="40" cy="24" r="2" fill="#6b7280"/><circle cx="48" cy="24" r="2" fill="#6b7280"/><text x="18" y="34" fill="#fbbf24" fontSize="8">?</text></svg>),
  safety: () => (<svg viewBox="0 0 64 64" fill="none"><ellipse cx="32" cy="32" rx="24" ry="16" fill="none" stroke="#fbbf24" strokeWidth="3"/><circle cx="32" cy="32" r="10" fill="#1f2937" stroke="#fbbf24" strokeWidth="2"/><circle cx="32" cy="32" r="4" fill="#fbbf24"/><circle cx="34" cy="30" r="2" fill="#fcd34d"/></svg>),
  birdwatch: () => (<svg viewBox="0 0 64 64" fill="none"><ellipse cx="28" cy="32" rx="14" ry="12" fill="#22c55e"/><circle cx="22" cy="28" r="8" fill="#22c55e"/><circle cx="20" cy="27" r="2" fill="#1f2937"/><path d="M14 28L10 26L14 30Z" fill="#fbbf24"/><path d="M42 32L56 28L56 36L42 32Z" fill="#15803d"/><path d="M24 44L22 52M28 44L28 52M32 44L34 52" stroke="#78350f" strokeWidth="2" strokeLinecap="round"/></svg>),
  firestart: () => (<svg viewBox="0 0 64 64" fill="none"><defs><linearGradient id="fr1" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stopColor="#dc2626"/><stop offset="50%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#fcd34d"/></linearGradient><linearGradient id="fr2" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#fef3c7"/></linearGradient></defs><path d="M32 8C32 8 16 24 16 40C16 52 24 56 32 56C40 56 48 52 48 40C48 24 32 8 32 8Z" fill="url(#fr1)"/><path d="M32 24C32 24 24 34 24 42C24 48 28 52 32 52C36 52 40 48 40 42C40 34 32 24 32 24Z" fill="url(#fr2)"/></svg>),
  bread: () => (<svg viewBox="0 0 64 64" fill="none"><defs><linearGradient id="br1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#b45309"/><stop offset="100%" stopColor="#78350f"/></linearGradient><linearGradient id="br2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#fcd34d"/><stop offset="100%" stopColor="#f59e0b"/></linearGradient></defs><ellipse cx="32" cy="44" rx="24" ry="12" fill="url(#br1)"/><path d="M8 44C8 36 18 20 32 20C46 20 56 36 56 44" fill="url(#br2)"/><path d="M8 44C8 36 18 20 32 20C46 20 56 36 56 44" stroke="url(#br1)" strokeWidth="3" fill="none"/></svg>),
  plant: () => (<svg viewBox="0 0 64 64" fill="none"><defs><linearGradient id="pl1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#a16207"/><stop offset="100%" stopColor="#713f12"/></linearGradient><linearGradient id="pl2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#4ade80"/><stop offset="100%" stopColor="#16a34a"/></linearGradient></defs><path d="M20 48L24 60H40L44 48H20Z" fill="url(#pl1)" stroke="#78350f" strokeWidth="2"/><rect x="18" y="44" width="28" height="6" rx="1" fill="#92400e"/><path d="M32 44V28" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"/><ellipse cx="24" cy="24" rx="8" ry="12" fill="url(#pl2)" transform="rotate(-30 24 24)"/><ellipse cx="40" cy="24" rx="8" ry="12" fill="url(#pl2)" transform="rotate(30 40 24)"/><circle cx="32" cy="14" r="4" fill="#fbbf24"/></svg>),
  map: () => (<svg viewBox="0 0 64 64" fill="none"><defs><linearGradient id="mp1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fef3c7"/><stop offset="100%" stopColor="#fcd34d"/></linearGradient></defs><path d="M8 12L24 8V52L8 56V12Z" fill="url(#mp1)" stroke="#b45309" strokeWidth="1"/><path d="M24 8L40 12V56L24 52V8Z" fill="#fef9c3" stroke="#b45309" strokeWidth="1"/><path d="M40 12L56 8V52L40 56V12Z" fill="url(#mp1)" stroke="#b45309" strokeWidth="1"/><circle cx="32" cy="28" r="4" fill="none" stroke="#dc2626" strokeWidth="2"/><path d="M32 24V16" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/><path d="M32 48L34 44L32 40L30 44Z" fill="#78350f"/></svg>),
  default: () => (<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="24" fill="none" stroke="#fbbf24" strokeWidth="3"/><path d="M32 16V32L42 42" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/><circle cx="32" cy="32" r="4" fill="#fbbf24"/></svg>)
};

const QUESTS = [
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
];

const styles = `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');*{box-sizing:border-box;margin:0;padding:0}:root{--bg-dark:#0a0a0c;--bg-card:#14141a;--bg-card-hover:#1e1e28;--gold:#fbbf24;--gold-dim:#a78b4a;--gold-bright:#fcd34d;--text:#e8e4dc;--text-dim:#6b7280;--text-bright:#fff;--border:#2a2a35;--success:#4ade80;--danger:#ef4444}body{font-family:'Crimson Text',Georgia,serif;background:var(--bg-dark);color:var(--text);min-height:100vh;line-height:1.5}.app{max-width:480px;margin:0 auto;min-height:100vh;background:var(--bg-dark);position:relative;overflow-x:hidden}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}@keyframes slide-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes slide-in-right{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}@keyframes scale-in{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}@keyframes bounce-in{0%{transform:scale(.3);opacity:0}50%{transform:scale(1.05)}70%{transform:scale(.9)}100%{transform:scale(1);opacity:1}}@keyframes stars-twinkle{0%,100%{opacity:.3}50%{opacity:1}}@keyframes rotate-slow{from{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes card-appear{from{opacity:0;transform:translateY(20px) rotateX(-10deg)}to{opacity:1;transform:translateY(0) rotateX(0)}}@keyframes glow-pulse{0%,100%{filter:drop-shadow(0 0 8px var(--gold))}50%{filter:drop-shadow(0 0 16px var(--gold-bright))}}@keyframes icon-bounce{0%,100%{transform:scale(1) rotate(0)}25%{transform:scale(1.1) rotate(-5deg)}75%{transform:scale(1.1) rotate(5deg)}}@keyframes particle-float{0%{opacity:0;transform:translateY(100vh) scale(0)}10%{opacity:.6}90%{opacity:.6}100%{opacity:0;transform:translateY(-100px) scale(1)}}@keyframes fade-in{from{opacity:0}to{opacity:1}}@keyframes modal-slide-up{from{opacity:0;transform:translateY(100%)}to{opacity:1;transform:translateY(0)}}.particles{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:0}.particle{position:absolute;width:4px;height:4px;background:var(--gold);border-radius:50%;opacity:0;animation:particle-float 8s infinite}.hero{position:relative;padding:1.5rem 1.5rem 1.25rem;text-align:center;background:radial-gradient(ellipse at 50% 0%,rgba(251,191,36,.15) 0%,transparent 50%),radial-gradient(ellipse at 50% 100%,rgba(99,102,241,.1) 0%,transparent 50%),linear-gradient(180deg,#12121a 0%,var(--bg-dark) 100%);border-bottom:1px solid var(--border);overflow:hidden}.hero::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:conic-gradient(from 0deg at 50% 50%,transparent 0deg,rgba(251,191,36,.03) 60deg,transparent 120deg);animation:rotate-slow 30s linear infinite}.hero-content{display:flex;align-items:center;gap:1rem;position:relative;z-index:1}.hero-avatar{flex-shrink:0}.hero-info{flex:1;text-align:left}.hero-title{font-family:'Cinzel',serif;font-size:1.5rem;font-weight:700;background:linear-gradient(135deg,var(--gold-bright) 0%,var(--gold) 50%,var(--gold-dim) 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 3s linear infinite;letter-spacing:.05em;margin-bottom:.15rem}.hero-rank{font-family:'Cinzel',serif;font-size:.8rem;color:var(--gold);margin-bottom:.25rem}.hero-subtitle{font-size:.75rem;color:var(--text-dim);letter-spacing:.1em}.avatar-mini{position:relative;width:64px;height:64px}.avatar-mini-ring{width:64px;height:64px;border-radius:50%;padding:3px;animation:glow-pulse 3s ease-in-out infinite}.avatar-mini-inner{width:100%;height:100%;border-radius:50%;background:var(--bg-dark);display:flex;align-items:center;justify-content:center;overflow:hidden}.avatar-mini-level{position:absolute;bottom:-2px;right:-2px;width:22px;height:22px;background:linear-gradient(135deg,var(--gold) 0%,#b8860b 100%);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Cinzel',serif;font-size:.7rem;font-weight:700;color:var(--bg-dark);border:2px solid var(--bg-dark)}.stats-bar{display:flex;justify-content:center;gap:.5rem;padding:1rem;background:linear-gradient(180deg,var(--bg-card) 0%,var(--bg-dark) 100%);border-bottom:1px solid var(--border)}.stat{text-align:center;padding:.75rem 1.25rem;background:rgba(255,255,255,.02);border:1px solid var(--border);border-radius:12px;transition:all .3s ease;position:relative;overflow:hidden}.stat::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(251,191,36,.1),transparent);transition:left .5s ease}.stat:hover::before{left:100%}.stat:hover{border-color:var(--gold-dim);transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.3)}.stat-value{font-family:'Cinzel',serif;font-size:1.5rem;font-weight:700;color:var(--gold);text-shadow:0 0 20px rgba(251,191,36,.3)}.stat-label{font-size:.65rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:.15em;margin-top:.25rem}.nav-tabs{display:flex;background:var(--bg-card);border-bottom:1px solid var(--border)}.nav-tab{flex:1;padding:1rem .5rem;font-family:'Cinzel',serif;font-size:.75rem;text-transform:uppercase;letter-spacing:.15em;color:var(--text-dim);background:transparent;border:none;cursor:pointer;transition:all .3s ease;position:relative}.nav-tab::before{content:'';position:absolute;bottom:0;left:50%;width:0;height:2px;background:var(--gold);transition:all .3s ease;transform:translateX(-50%);box-shadow:0 0 10px var(--gold)}.nav-tab:hover{color:var(--text)}.nav-tab.active{color:var(--gold)}.nav-tab.active::before{width:60%}.nav-tab-icon{font-size:1.1rem;display:block;margin-bottom:.25rem;transition:transform .3s ease}.nav-tab:hover .nav-tab-icon{transform:scale(1.2)}.nav-tab.active .nav-tab-icon{animation:float 2s ease-in-out infinite}.main{padding:1.25rem;padding-bottom:2rem;position:relative;z-index:1}.realm-grid{display:flex;flex-direction:column;gap:1rem}.realm-card{position:relative;padding:1.25rem;background:var(--bg-card);border:1px solid var(--border);border-radius:16px;cursor:pointer;transition:all .4s cubic-bezier(.175,.885,.32,1.275);overflow:hidden;animation:card-appear .5s ease backwards}.realm-card:nth-child(1){animation-delay:.05s}.realm-card:nth-child(2){animation-delay:.1s}.realm-card:nth-child(3){animation-delay:.15s}.realm-card:nth-child(4){animation-delay:.2s}.realm-card:nth-child(5){animation-delay:.25s}.realm-card::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 0% 100%,var(--realm-color,var(--gold)) 0%,transparent 50%);opacity:.1;transition:opacity .4s ease}.realm-card::after{content:'';position:absolute;top:-2px;left:-2px;right:-2px;bottom:-2px;background:linear-gradient(135deg,var(--realm-color,var(--gold)),transparent 50%);border-radius:17px;z-index:-1;opacity:0;transition:opacity .4s ease}.realm-card:hover{transform:translateY(-4px) scale(1.02);border-color:transparent;box-shadow:0 20px 40px rgba(0,0,0,.4),0 0 30px rgba(251,191,36,.1)}.realm-card:hover::before{opacity:.2}.realm-card:hover::after{opacity:.3}.realm-card:active{transform:translateY(-2px) scale(.98)}.realm-header{display:flex;align-items:center;gap:1rem;position:relative;z-index:1}.realm-icon-wrap{position:relative;width:3.5rem;height:3.5rem}.realm-icon-bg{position:absolute;inset:0;background:rgba(255,255,255,.05);border-radius:12px;border:1px solid rgba(255,255,255,.1)}.realm-icon{position:relative;font-size:1.75rem;width:100%;height:100%;display:flex;align-items:center;justify-content:center;transition:transform .4s ease}.realm-card:hover .realm-icon{transform:scale(1.15) rotate(-5deg)}.realm-info{flex:1}.realm-name{font-family:'Cinzel',serif;font-size:1.15rem;font-weight:600;color:var(--text-bright);margin-bottom:.15rem;transition:color .3s ease}.realm-card:hover .realm-name{color:var(--gold)}.realm-subtitle{font-size:.8rem;color:var(--text-dim)}.realm-arrow{font-size:1.5rem;color:var(--text-dim);transition:all .4s ease;opacity:.5}.realm-card:hover .realm-arrow{transform:translateX(8px);color:var(--gold);opacity:1}.realm-count{position:absolute;top:1rem;right:1rem;font-family:'Cinzel',serif;font-size:.7rem;padding:.3rem .6rem;background:linear-gradient(135deg,rgba(251,191,36,.2) 0%,rgba(251,191,36,.1) 100%);color:var(--gold);border-radius:20px;border:1px solid rgba(251,191,36,.3)}.quest-header{display:flex;align-items:center;gap:1rem;padding:.5rem 0 1.5rem;animation:slide-up .4s ease}.back-btn{width:3rem;height:3rem;display:flex;align-items:center;justify-content:center;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;color:var(--text);font-size:1.25rem;cursor:pointer;transition:all .3s ease}.back-btn:hover{border-color:var(--gold-dim);color:var(--gold);transform:translateX(-4px);box-shadow:4px 0 16px rgba(251,191,36,.2)}.quest-header-info h2{font-family:'Cinzel',serif;font-size:1.35rem;color:var(--text-bright)}.quest-header-info p{font-size:.85rem;color:var(--text-dim);margin-top:.25rem}.quest-list{display:flex;flex-direction:column;gap:.75rem}.quest-card{position:relative;display:flex;gap:1rem;padding:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;cursor:pointer;transition:all .3s ease;overflow:hidden;animation:slide-in-right .4s ease backwards}.quest-card:nth-child(1){animation-delay:.05s}.quest-card:nth-child(2){animation-delay:.1s}.quest-card:nth-child(3){animation-delay:.15s}.quest-card:nth-child(4){animation-delay:.2s}.quest-card:nth-child(5){animation-delay:.25s}.quest-card:nth-child(6){animation-delay:.3s}.quest-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(180deg,var(--gold) 0%,var(--gold-dim) 100%);opacity:.5;transition:all .3s ease}.quest-card:hover{transform:translateX(8px);border-color:var(--gold-dim);background:var(--bg-card-hover);box-shadow:-8px 0 24px rgba(251,191,36,.1),0 8px 24px rgba(0,0,0,.3)}.quest-card:hover::before{opacity:1;width:6px;box-shadow:0 0 20px var(--gold)}.quest-card:active{transform:translateX(4px) scale(.99)}.quest-card.completed{opacity:.5}.quest-card.completed::before{background:var(--success)}.quest-card.completed .quest-image-wrap::after{content:'✓';position:absolute;inset:0;background:rgba(74,222,128,.8);display:flex;align-items:center;justify-content:center;font-size:1.5rem;color:#fff;border-radius:10px}.quest-image-wrap{position:relative;width:4.5rem;height:4.5rem;flex-shrink:0;background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:10px;display:flex;align-items:center;justify-content:center;transition:all .3s ease;overflow:hidden}.quest-card:hover .quest-image-wrap{border-color:var(--gold-dim);box-shadow:0 0 20px rgba(251,191,36,.2)}.quest-image-wrap svg{width:3.5rem;height:3.5rem;transition:transform .3s ease}.quest-card:hover .quest-image-wrap svg{transform:scale(1.1);animation:icon-bounce .5s ease}.quest-content{flex:1;min-width:0}.quest-title{font-family:'Cinzel',serif;font-size:1rem;font-weight:600;color:var(--text-bright);margin-bottom:.25rem}.quest-desc{font-size:.85rem;color:var(--text-dim);margin-bottom:.5rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.quest-meta{display:flex;align-items:center;gap:.75rem}.quest-stars{display:flex;gap:2px}.quest-star{color:var(--gold);font-size:.85rem;animation:stars-twinkle 1.5s ease-in-out infinite}.quest-star:nth-child(2){animation-delay:.2s}.quest-star:nth-child(3){animation-delay:.4s}.quest-star:nth-child(4){animation-delay:.6s}.quest-star:nth-child(5){animation-delay:.8s}.quest-star.empty{opacity:.2;animation:none}.quest-tier{font-size:.7rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:.05em}.quest-xp{font-family:'Cinzel',serif;font-size:.75rem;color:var(--gold);margin-left:auto;padding:.2rem .5rem;background:rgba(251,191,36,.1);border-radius:10px}.custom-quest-btn{width:100%;padding:1.25rem;margin-top:.5rem;background:transparent;border:2px dashed var(--border);border-radius:12px;color:var(--text-dim);font-family:'Cinzel',serif;font-size:.9rem;cursor:pointer;transition:all .3s ease;animation:slide-in-right .4s ease backwards;animation-delay:.35s}.custom-quest-btn:hover{border-color:var(--gold);color:var(--gold);background:rgba(251,191,36,.05)}.logbook-empty{text-align:center;padding:4rem 1rem;animation:scale-in .5s ease}.logbook-empty-icon{font-size:4rem;margin-bottom:1rem;opacity:.3;animation:float 4s ease-in-out infinite}.logbook-empty h3{font-family:'Cinzel',serif;font-size:1.25rem;color:var(--text);margin-bottom:.5rem}.logbook-empty p{color:var(--text-dim)}.entry-list{display:flex;flex-direction:column;gap:.75rem}.entry-card{display:flex;gap:1rem;padding:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;cursor:pointer;transition:all .3s ease;animation:card-appear .4s ease backwards}.entry-card:hover{background:var(--bg-card-hover);border-color:var(--gold-dim);transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.3)}.entry-image-wrap{width:3.5rem;height:3.5rem;flex-shrink:0;background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center}.entry-image-wrap svg{width:2.5rem;height:2.5rem}.entry-content{flex:1;min-width:0}.entry-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.35rem}.entry-title{font-family:'Cinzel',serif;font-size:.95rem;color:var(--text-bright)}.entry-xp{font-family:'Cinzel',serif;font-size:.75rem;padding:.15rem .5rem;background:linear-gradient(135deg,rgba(251,191,36,.2) 0%,rgba(251,191,36,.1) 100%);color:var(--gold);border-radius:20px;border:1px solid rgba(251,191,36,.3)}.entry-meta{display:flex;flex-wrap:wrap;gap:.5rem;font-size:.75rem;color:var(--text-dim)}.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:200;display:flex;align-items:flex-end;justify-content:center;backdrop-filter:blur(8px);animation:fade-in .3s ease}.modal{background:linear-gradient(180deg,#1a1a24 0%,var(--bg-dark) 100%);width:100%;max-width:480px;max-height:90vh;overflow-y:auto;border-radius:24px 24px 0 0;border:1px solid var(--border);border-bottom:none;animation:modal-slide-up .4s cubic-bezier(.175,.885,.32,1.275)}.modal-header{display:flex;justify-content:space-between;align-items:center;padding:1.5rem;border-bottom:1px solid var(--border);position:sticky;top:0;background:linear-gradient(180deg,#1a1a24 0%,#16161e 100%);z-index:10}.modal-title{font-family:'Cinzel',serif;font-size:1.1rem;color:var(--gold);letter-spacing:.05em}.modal-close{background:var(--bg-card);border:1px solid var(--border);width:2.5rem;height:2.5rem;border-radius:50%;font-size:1.25rem;color:var(--text-dim);cursor:pointer;transition:all .3s ease;display:flex;align-items:center;justify-content:center}.modal-close:hover{border-color:var(--danger);color:var(--danger);transform:rotate(90deg)}.modal-body{padding:1.5rem}.quest-detail-image{width:6rem;height:6rem;margin:0 auto 1rem;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.03);border:2px solid var(--border);border-radius:16px;animation:bounce-in .6s ease}.quest-detail-image svg{width:5rem;height:5rem;filter:drop-shadow(0 0 20px rgba(251,191,36,.3))}.quest-detail-title{font-family:'Cinzel',serif;font-size:1.5rem;text-align:center;color:var(--text-bright);margin-bottom:.5rem;animation:slide-up .5s ease .1s backwards}.quest-detail-desc{text-align:center;color:var(--text-dim);margin-bottom:1.5rem;animation:slide-up .5s ease .2s backwards}.quest-detail-stats{display:flex;justify-content:center;gap:1rem;padding:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:16px;margin-bottom:1.5rem;animation:scale-in .5s ease .3s backwards}.quest-detail-stat{text-align:center;padding:.5rem 1rem}.quest-detail-stat-value{font-family:'Cinzel',serif;font-size:1.1rem;color:var(--gold)}.quest-detail-stat-label{font-size:.65rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:.1em}.form-section{margin-bottom:1.5rem;animation:slide-up .4s ease backwards}.form-label{display:block;font-family:'Cinzel',serif;font-size:.85rem;color:var(--gold);margin-bottom:.75rem;text-transform:uppercase;letter-spacing:.1em}.form-hint{font-family:'Crimson Text',serif;font-size:.85rem;color:var(--text-dim);font-weight:400;text-transform:none;letter-spacing:0;display:block;margin-top:.25rem}.form-input{font-family:'Crimson Text',Georgia,serif;font-size:1rem;width:100%;padding:1rem;border:1px solid var(--border);background:var(--bg-card);color:var(--text);border-radius:12px;transition:all .3s ease}.form-input:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(251,191,36,.1),0 0 20px rgba(251,191,36,.1)}.form-input::placeholder{color:var(--text-dim)}.form-textarea{min-height:6rem;resize:vertical}.tier-list{display:flex;flex-direction:column;gap:.5rem}.tier-btn{display:flex;align-items:center;gap:1rem;padding:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;color:var(--text);cursor:pointer;transition:all .3s ease;text-align:left;animation:slide-in-right .4s ease backwards}.tier-btn:nth-child(1){animation-delay:.05s}.tier-btn:nth-child(2){animation-delay:.1s}.tier-btn:nth-child(3){animation-delay:.15s}.tier-btn:nth-child(4){animation-delay:.2s}.tier-btn:nth-child(5){animation-delay:.25s}.tier-btn:hover{border-color:var(--gold-dim);background:var(--bg-card-hover);transform:translateX(4px)}.tier-btn.selected{border-color:var(--gold);background:rgba(251,191,36,.1);box-shadow:0 0 20px rgba(251,191,36,.1)}.tier-rank{width:2.5rem;height:2.5rem;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--gold) 0%,var(--gold-dim) 100%);border-radius:50%;font-family:'Cinzel',serif;font-weight:700;color:var(--bg-dark);font-size:1rem}.tier-info{flex:1}.tier-name{font-family:'Cinzel',serif;font-weight:600;color:var(--text-bright)}.tier-desc{font-size:.8rem;color:var(--text-dim)}.tier-xp{font-family:'Cinzel',serif;font-size:.9rem;color:var(--gold);padding:.25rem .75rem;background:rgba(251,191,36,.1);border-radius:20px}.type-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:.5rem}.type-btn{padding:1rem .5rem;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;color:var(--text);cursor:pointer;transition:all .3s ease;text-align:center}.type-btn:hover{border-color:var(--gold-dim);transform:translateY(-2px)}.type-btn.selected{border-color:var(--gold);background:rgba(251,191,36,.1)}.type-btn-icon{font-size:1.5rem;display:block;margin-bottom:.25rem;transition:transform .3s ease}.type-btn:hover .type-btn-icon{transform:scale(1.2)}.type-btn.selected .type-btn-icon{animation:float 2s ease-in-out infinite}.type-btn-label{font-size:.65rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:.05em}.type-btn.selected .type-btn-label{color:var(--gold)}.evidence-upload{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2.5rem;border:2px dashed var(--border);border-radius:16px;cursor:pointer;transition:all .3s ease;background:var(--bg-card)}.evidence-upload:hover{border-color:var(--gold);background:rgba(251,191,36,.05)}.evidence-upload-icon{font-size:2.5rem;margin-bottom:.75rem;animation:float 3s ease-in-out infinite}.evidence-upload-text{color:var(--text-dim);font-size:.9rem}.evidence-preview{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1rem}.evidence-thumb-wrap{position:relative;animation:scale-in .3s ease}.evidence-thumb{width:5rem;height:5rem;object-fit:cover;border-radius:12px;border:2px solid var(--border)}.evidence-remove{position:absolute;top:-.5rem;right:-.5rem;width:1.5rem;height:1.5rem;border-radius:50%;background:var(--danger);color:#fff;border:none;cursor:pointer;font-size:.8rem;display:flex;align-items:center;justify-content:center;transition:transform .2s ease}.evidence-remove:hover{transform:scale(1.2)}.btn{font-family:'Cinzel',serif;font-size:.9rem;padding:1rem 1.5rem;border:none;border-radius:12px;cursor:pointer;transition:all .3s ease;display:inline-flex;align-items:center;justify-content:center;gap:.5rem;text-transform:uppercase;letter-spacing:.1em;position:relative;overflow:hidden}.btn::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);transition:left .5s ease}.btn:hover::before{left:100%}.btn-primary{background:linear-gradient(135deg,var(--gold) 0%,#b8860b 100%);color:#1a1a1f;font-weight:600;box-shadow:0 4px 20px rgba(251,191,36,.3)}.btn-primary:hover{box-shadow:0 8px 30px rgba(251,191,36,.4);transform:translateY(-2px)}.btn-primary:active{transform:translateY(0)}.btn-primary:disabled{background:var(--border);color:var(--text-dim);cursor:not-allowed;transform:none;box-shadow:none}.btn-secondary{background:var(--bg-card);color:var(--text);border:1px solid var(--border)}.btn-secondary:hover{border-color:var(--gold-dim);background:var(--bg-card-hover)}.btn-danger{background:transparent;color:var(--danger);border:1px solid rgba(239,68,68,.3)}.btn-danger:hover{background:var(--danger);color:#fff;border-color:var(--danger)}.btn-block{width:100%}.btn-row{display:flex;gap:.75rem;margin-top:1.5rem}.btn-row .btn{flex:1}.prompt-field{margin-bottom:1.25rem;padding-left:1rem;border-left:3px solid var(--gold-dim);animation:slide-up .4s ease backwards}.prompt-q{font-size:.95rem;color:var(--text);font-style:italic;margin-bottom:.75rem}.detail-hero{text-align:center;padding:1.5rem 0 2rem;border-bottom:1px solid var(--border);margin-bottom:1.5rem}.detail-image{width:5rem;height:5rem;margin:0 auto 1rem;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.03);border:2px solid var(--border);border-radius:12px;animation:bounce-in .6s ease}.detail-image svg{width:4rem;height:4rem;filter:drop-shadow(0 0 20px rgba(251,191,36,.3))}.detail-title{font-family:'Cinzel',serif;font-size:1.5rem;color:var(--text-bright);margin-bottom:.75rem}.detail-badges{display:flex;justify-content:center;gap:.5rem;flex-wrap:wrap}.detail-badge{font-family:'Cinzel',serif;font-size:.7rem;padding:.35rem .75rem;background:linear-gradient(135deg,rgba(251,191,36,.15) 0%,rgba(251,191,36,.05) 100%);color:var(--gold);border-radius:20px;border:1px solid rgba(251,191,36,.3);text-transform:uppercase;letter-spacing:.05em}.detail-section{margin-bottom:1.5rem}.detail-label{font-family:'Cinzel',serif;font-size:.75rem;text-transform:uppercase;letter-spacing:.15em;color:var(--gold-dim);margin-bottom:.5rem}.detail-value{color:var(--text);line-height:1.7}.detail-responses{display:flex;flex-direction:column;gap:1rem}.detail-response{padding-left:1rem;border-left:2px solid var(--gold-dim)}.detail-response-q{font-size:.85rem;color:var(--text-dim);font-style:italic;margin-bottom:.25rem}.detail-evidence-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:.75rem}.detail-evidence-img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:12px;border:1px solid var(--border);transition:transform .3s ease}.detail-evidence-img:hover{transform:scale(1.05)}.detail-actions{padding-top:1.5rem;border-top:1px solid var(--border)}.progress-section{margin-bottom:2rem;animation:slide-up .5s ease backwards}.progress-section:nth-child(2){animation-delay:.1s}.progress-section:nth-child(3){animation-delay:.2s}.progress-section:nth-child(4){animation-delay:.3s}.progress-title{font-family:'Cinzel',serif;font-size:.9rem;color:var(--gold);margin-bottom:1rem;text-transform:uppercase;letter-spacing:.15em}.avatar-showcase{text-align:center;padding:2rem;background:var(--bg-card);border:1px solid var(--border);border-radius:16px;margin-bottom:1.5rem;position:relative;overflow:hidden}.avatar-showcase::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:conic-gradient(from 0deg at 50% 50%,transparent 0deg,rgba(251,191,36,.05) 60deg,transparent 120deg);animation:rotate-slow 20s linear infinite}.avatar-showcase-inner{position:relative;z-index:1}.avatar-stage-name{font-family:'Cinzel',serif;font-size:1.25rem;color:var(--gold);margin-top:1rem}.avatar-stage-desc{font-size:.9rem;color:var(--text-dim);margin-top:.25rem}.level-display{text-align:center;padding:1.5rem;background:var(--bg-card);border:1px solid var(--border);border-radius:16px;margin-bottom:1.5rem}.level-number{font-family:'Cinzel',serif;font-size:3rem;font-weight:700;color:var(--gold);text-shadow:0 0 40px rgba(251,191,36,.5);animation:glow-pulse 2s ease-in-out infinite}.level-label{font-family:'Cinzel',serif;font-size:.85rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:.2em;margin-top:.25rem}.xp-bar-container{margin-top:1rem;position:relative}.xp-bar-header{display:flex;justify-content:space-between;margin-bottom:.5rem;font-size:.85rem}.xp-bar-label{color:var(--text-dim)}.xp-bar-value{font-family:'Cinzel',serif;color:var(--gold)}.xp-bar{height:.75rem;background:var(--bg-dark);border-radius:8px;overflow:hidden;border:1px solid var(--border);position:relative}.xp-bar::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent,transparent 10px,rgba(255,255,255,.03) 10px,rgba(255,255,255,.03) 20px)}.xp-bar-fill{height:100%;background:linear-gradient(90deg,var(--gold-dim) 0%,var(--gold) 50%,var(--gold-bright) 100%);border-radius:8px;transition:width 1s cubic-bezier(.4,0,.2,1);box-shadow:0 0 20px var(--gold);position:relative}.xp-bar-fill::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent);animation:shimmer 2s infinite}.realm-progress{display:flex;flex-direction:column;gap:.75rem}.realm-progress-row{display:flex;align-items:center;gap:1rem;padding:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;transition:all .3s ease}.realm-progress-row:hover{border-color:var(--gold-dim);transform:translateX(4px)}.realm-progress-icon{font-size:1.5rem}.realm-progress-info{flex:1}.realm-progress-name{font-size:.9rem;color:var(--text)}.realm-progress-count{font-family:'Cinzel',serif;font-size:1.25rem;color:var(--gold);min-width:2rem;text-align:right}.next-avatar{margin-top:1.5rem;padding:1rem;background:rgba(251,191,36,.05);border:1px dashed var(--gold-dim);border-radius:12px;text-align:center}.next-avatar-label{font-size:.75rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:.1em;margin-bottom:.5rem}.next-avatar-name{font-family:'Cinzel',serif;color:var(--gold);font-size:1rem}.next-avatar-xp{font-size:.85rem;color:var(--text-dim);margin-top:.25rem}`;

function ParticleBackground() {
  return (<div className="particles">{[...Array(15)].map((_, i) => (<div key={i} className="particle" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 8}s`, animationDuration: `${6 + Math.random() * 4}s` }} />))}</div>);
}

function QuestImage({ imageId }) {
  const Img = QuestImages[imageId] || QuestImages.default;
  return <Img />;
}

export default function ThereAndBack() {
  const [entries, setEntries] = useState([]);
  const [view, setView] = useState('realms');
  const [selectedRealm, setSelectedRealm] = useState(null);
  const [selectedSubsection, setSelectedSubsection] = useState(null);
  const [showQuestModal, setShowQuestModal] = useState(null);
  const [showCustomQuest, setShowCustomQuest] = useState(false);
  const [showEntryDetail, setShowEntryDetail] = useState(null);

  useEffect(() => { const s = localStorage.getItem('thereAndBack_v5'); if (s) setEntries(JSON.parse(s)); }, []);
  useEffect(() => { localStorage.setItem('thereAndBack_v5', JSON.stringify(entries)); }, [entries]);

  const totalXP = entries.reduce((s, e) => s + (TIERS.find(t => t.id === e.tier)?.xp || 0), 0);
  const level = Math.floor(totalXP / 100) + 1;
  const xpInLevel = totalXP % 100;
  const xpProgress = xpInLevel / 100;
  const stage = getAvatarStage(level);

  const addEntry = (entry) => { setEntries([{ ...entry, id: Date.now().toString(), timestamp: new Date().toISOString() }, ...entries]); setShowQuestModal(null); setShowCustomQuest(false); };
  const deleteEntry = (id) => { if (confirm('Remove?')) { setEntries(entries.filter(e => e.id !== id)); setShowEntryDetail(null); } };

  const handleRealmSelect = (realm) => { setSelectedRealm(realm); setSelectedSubsection(null); };
  const handleSubsectionSelect = (subsection) => { setSelectedSubsection(subsection); };
  const handleBackFromSubsection = () => { setSelectedSubsection(null); };
  const handleBackFromRealm = () => { setSelectedRealm(null); setSelectedSubsection(null); };

  return (
    <><style>{styles}</style>
    <div className="app">
      <ParticleBackground />
      <header className="hero">
        <div className="hero-content">
          <div className="hero-avatar">
            <AvatarMini level={level} xpProgress={xpProgress} />
          </div>
          <div className="hero-info">
            <h1 className="hero-title">There &amp; Back</h1>
            <div className="hero-rank">{stage.name}</div>
            <div className="hero-subtitle">{totalXP} XP • {entries.length} Quests</div>
          </div>
        </div>
      </header>

      <nav className="nav-tabs">
        <button className={`nav-tab ${view === 'realms' ? 'active' : ''}`} onClick={() => { setView('realms'); setSelectedRealm(null); setSelectedSubsection(null); }}><span className="nav-tab-icon">🏰</span>Realms</button>
        <button className={`nav-tab ${view === 'logbook' ? 'active' : ''}`} onClick={() => setView('logbook')}><span className="nav-tab-icon">📖</span>Logbook</button>
        <button className={`nav-tab ${view === 'progress' ? 'active' : ''}`} onClick={() => setView('progress')}><span className="nav-tab-icon">⭐</span>Progress</button>
      </nav>

      <main className="main">
        {view === 'realms' && !selectedRealm && <RealmSelect entries={entries} onSelect={handleRealmSelect} />}
        {view === 'realms' && selectedRealm && !selectedSubsection && <SubsectionSelect realm={selectedRealm} entries={entries} onBack={handleBackFromRealm} onSelect={handleSubsectionSelect} />}
        {view === 'realms' && selectedRealm && selectedSubsection && <QuestBoard realm={selectedRealm} subsection={selectedSubsection} entries={entries} onBack={handleBackFromSubsection} onSelectQuest={setShowQuestModal} onCustomQuest={() => setShowCustomQuest(true)} />}
        {view === 'logbook' && <Logbook entries={entries} onSelectEntry={setShowEntryDetail} />}
        {view === 'progress' && <ProgressView entries={entries} totalXP={totalXP} level={level} xpInLevel={xpInLevel} />}
      </main>

      {showQuestModal && <QuestModal quest={showQuestModal} onClose={() => setShowQuestModal(null)} onComplete={addEntry} />}
      {showCustomQuest && <CustomQuestModal realm={selectedRealm} subsection={selectedSubsection} onClose={() => setShowCustomQuest(false)} onComplete={addEntry} />}
      {showEntryDetail && <EntryDetailModal entry={entries.find(e => e.id === showEntryDetail)} onClose={() => setShowEntryDetail(null)} onDelete={() => deleteEntry(showEntryDetail)} />}
    </div></>
  );
}

function RealmSelect({ entries, onSelect }) {
  return (<div className="realm-grid">{SECTIONS.map(section => {
    const count = entries.filter(e => e.section === section.id).length;
    return (<div key={section.id} className="realm-card" onClick={() => onSelect(section)} style={{ '--realm-color': section.color }}>
      {count > 0 && <span className="realm-count">{count} complete</span>}
      <div className="realm-header"><div className="realm-icon-wrap"><div className="realm-icon-bg" /><div className="realm-icon">{section.icon}</div></div><div className="realm-info"><div className="realm-name">{section.name}</div><div className="realm-subtitle">{section.description}</div></div><div className="realm-arrow">→</div></div>
    </div>);
  })}</div>);
}

function SubsectionSelect({ realm, entries, onBack, onSelect }) {
  const subsections = SUBSECTIONS[realm.id] || [];
  return (<>
    <div className="quest-header">
      <button className="back-btn" onClick={onBack}>←</button>
      <div className="quest-header-info">
        <h2>{realm.icon} {realm.name}</h2>
        <p>Choose your craft</p>
      </div>
    </div>
    <div className="realm-grid">
      {subsections.map(sub => {
        const count = entries.filter(e => e.section === realm.id && e.subsection === sub.id).length;
        return (<div key={sub.id} className="realm-card" onClick={() => onSelect(sub)} style={{ '--realm-color': realm.color }}>
          {count > 0 && <span className="realm-count">{count} complete</span>}
          <div className="realm-header">
            <div className="realm-icon-wrap"><div className="realm-icon-bg" /><div className="realm-icon">{sub.icon}</div></div>
            <div className="realm-info"><div className="realm-name">{sub.name}</div><div className="realm-subtitle">{sub.description}</div></div>
            <div className="realm-arrow">→</div>
          </div>
        </div>);
      })}
    </div>
  </>);
}

function QuestBoard({ realm, subsection, entries, onBack, onSelectQuest, onCustomQuest }) {
  const quests = QUESTS.filter(q => q.section === realm.id && q.subsection === subsection.id).sort((a, b) => TIERS.find(t => t.id === a.tier).rank - TIERS.find(t => t.id === b.tier).rank);
  const completed = entries.filter(e => e.questId).map(e => e.questId);
  return (<><div className="quest-header"><button className="back-btn" onClick={onBack}>←</button><div className="quest-header-info"><h2>{subsection.icon} {subsection.name}</h2><p>{subsection.description}</p></div></div>
    <div className="quest-list">{quests.map(quest => {
      const tier = TIERS.find(t => t.id === quest.tier);
      return (<div key={quest.id} className={`quest-card ${completed.includes(quest.id) ? 'completed' : ''}`} onClick={() => onSelectQuest(quest)}>
        <div className="quest-image-wrap"><QuestImage imageId={quest.image} /></div>
        <div className="quest-content"><div className="quest-title">{quest.title}</div><div className="quest-desc">{quest.description}</div>
          <div className="quest-meta"><div className="quest-stars">{[...Array(5)].map((_, i) => <span key={i} className={`quest-star ${i < tier.stars ? '' : 'empty'}`}>★</span>)}</div><span className="quest-tier">{tier.name}</span><span className="quest-xp">+{tier.xp} XP</span></div>
        </div></div>);
    })}<button className="custom-quest-btn" onClick={onCustomQuest}>✦ Create Your Own Quest ✦</button></div></>);
}

function QuestModal({ quest, onClose, onComplete }) {
  const [form, setForm] = useState({ title: quest.title, section: quest.section, subsection: quest.subsection, type: quest.type, tier: quest.tier, questId: quest.id, image: quest.image, responses: ['', '', ''], evidence: [], notes: '' });
  const fileRef = useRef(null);
  const type = TYPES.find(t => t.id === form.type);
  const tier = TIERS.find(t => t.id === form.tier);
  const handleFile = (e) => Array.from(e.target.files).forEach(f => { const r = new FileReader(); r.onload = ev => setForm(x => ({ ...x, evidence: [...x.evidence, ev.target.result] })); r.readAsDataURL(f); });
  const canSave = form.evidence.length > 0 || form.responses.some(r => r.trim());
  return (<div className="modal-overlay" onClick={onClose}><div className="modal" onClick={e => e.stopPropagation()}>
    <div className="modal-header"><span className="modal-title">Begin Quest</span><button className="modal-close" onClick={onClose}>×</button></div>
    <div className="modal-body">
      <div className="quest-detail-image"><QuestImage imageId={quest.image} /></div>
      <h2 className="quest-detail-title">{quest.title}</h2><p className="quest-detail-desc">{quest.description}</p>
      <div className="quest-detail-stats"><div className="quest-detail-stat"><div className="quest-detail-stat-value">{[...Array(tier?.stars || 1)].map(() => '★').join('')}</div><div className="quest-detail-stat-label">Difficulty</div></div><div className="quest-detail-stat"><div className="quest-detail-stat-value">{tier?.name}</div><div className="quest-detail-stat-label">Tier</div></div><div className="quest-detail-stat"><div className="quest-detail-stat-value">+{tier?.xp}</div><div className="quest-detail-stat-label">XP</div></div></div>
      {type?.prompts.map((p, i) => <div key={i} className="prompt-field"><p className="prompt-q">{p}</p><textarea className="form-input form-textarea" value={form.responses[i] || ''} onChange={e => { const r = [...form.responses]; r[i] = e.target.value; setForm({ ...form, responses: r }); }} placeholder="Your answer..." /></div>)}
      <div className="form-section"><label className="form-label">Evidence</label><input type="file" accept="image/*" multiple ref={fileRef} onChange={handleFile} style={{ display: 'none' }} /><div className="evidence-upload" onClick={() => fileRef.current?.click()}><div className="evidence-upload-icon">📷</div><div className="evidence-upload-text">Tap to add photos</div></div>
        {form.evidence.length > 0 && <div className="evidence-preview">{form.evidence.map((img, i) => <div key={i} className="evidence-thumb-wrap"><img src={img} alt="" className="evidence-thumb" /><button className="evidence-remove" onClick={() => setForm(x => ({ ...x, evidence: x.evidence.filter((_, j) => j !== i) }))}>×</button></div>)}</div>}
      </div>
      <button className="btn btn-primary btn-block" disabled={!canSave} onClick={() => onComplete(form)}>⚔️ Complete Quest (+{tier?.xp} XP)</button>
    </div></div></div>);
}

function CustomQuestModal({ realm, subsection, onClose, onComplete }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ title: '', section: realm?.id || 'workshop', subsection: subsection?.id || '', type: 'build', tier: 'wanderer', image: 'default', responses: ['', '', ''], evidence: [], notes: '' });
  const fileRef = useRef(null);
  const type = TYPES.find(t => t.id === form.type);
  const tier = TIERS.find(t => t.id === form.tier);
  const handleFile = (e) => Array.from(e.target.files).forEach(f => { const r = new FileReader(); r.onload = ev => setForm(x => ({ ...x, evidence: [...x.evidence, ev.target.result] })); r.readAsDataURL(f); });
  const canSave = form.title.trim() && (form.evidence.length > 0 || form.responses.some(r => r.trim()));
  return (<div className="modal-overlay" onClick={onClose}><div className="modal" onClick={e => e.stopPropagation()}>
    <div className="modal-header"><span className="modal-title">{step === 1 ? 'Create Quest' : step === 2 ? 'Choose Tier' : 'Complete Quest'}</span><button className="modal-close" onClick={onClose}>×</button></div>
    <div className="modal-body">
      {step === 1 && <><div className="form-section"><label className="form-label">Quest Name</label><input type="text" className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="What will you accomplish?" autoFocus /></div>
        <div className="form-section"><label className="form-label">Quest Type</label><div className="type-grid">{TYPES.map(t => <button key={t.id} className={`type-btn ${form.type === t.id ? 'selected' : ''}`} onClick={() => setForm({ ...form, type: t.id })}><span className="type-btn-icon">{t.icon}</span><span className="type-btn-label">{t.name}</span></button>)}</div></div>
        <button className="btn btn-primary btn-block" disabled={!form.title.trim()} onClick={() => setStep(2)}>Continue →</button></>}
      {step === 2 && <><div className="form-section"><label className="form-label">Quest Difficulty<span className="form-hint">Based on complexity and stakes</span></label><div className="tier-list">{TIERS.map(t => <button key={t.id} className={`tier-btn ${form.tier === t.id ? 'selected' : ''}`} onClick={() => setForm({ ...form, tier: t.id })}><div className="tier-rank">{t.rank}</div><div className="tier-info"><div className="tier-name">{t.name}</div><div className="tier-desc">{t.description}</div></div><div className="tier-xp">+{t.xp}</div></button>)}</div></div>
        <div className="btn-row"><button className="btn btn-secondary" onClick={() => setStep(1)}>← Back</button><button className="btn btn-primary" onClick={() => setStep(3)}>Continue →</button></div></>}
      {step === 3 && <><div className="quest-detail-stats" style={{ marginBottom: '1.5rem' }}><div className="quest-detail-stat"><div className="quest-detail-stat-value">{type?.icon}</div><div className="quest-detail-stat-label">{type?.name}</div></div><div className="quest-detail-stat"><div className="quest-detail-stat-value">{tier?.name}</div><div className="quest-detail-stat-label">Tier</div></div><div className="quest-detail-stat"><div className="quest-detail-stat-value">+{tier?.xp}</div><div className="quest-detail-stat-label">XP</div></div></div>
        {type?.prompts.map((p, i) => <div key={i} className="prompt-field"><p className="prompt-q">{p}</p><textarea className="form-input form-textarea" value={form.responses[i] || ''} onChange={e => { const r = [...form.responses]; r[i] = e.target.value; setForm({ ...form, responses: r }); }} placeholder="Your answer..." /></div>)}
        <div className="form-section"><label className="form-label">Evidence</label><input type="file" accept="image/*" multiple ref={fileRef} onChange={handleFile} style={{ display: 'none' }} /><div className="evidence-upload" onClick={() => fileRef.current?.click()}><div className="evidence-upload-icon">📷</div><div className="evidence-upload-text">Tap to add photos</div></div>
          {form.evidence.length > 0 && <div className="evidence-preview">{form.evidence.map((img, i) => <div key={i} className="evidence-thumb-wrap"><img src={img} alt="" className="evidence-thumb" /><button className="evidence-remove" onClick={() => setForm(x => ({ ...x, evidence: x.evidence.filter((_, j) => j !== i) }))}>×</button></div>)}</div>}
        </div>
        <div className="btn-row"><button className="btn btn-secondary" onClick={() => setStep(2)}>← Back</button><button className="btn btn-primary" disabled={!canSave} onClick={() => onComplete(form)}>⚔️ Complete (+{tier?.xp} XP)</button></div></>}
    </div></div></div>);
}

function getSubsection(sectionId, subsectionId) {
  const subs = SUBSECTIONS[sectionId];
  return subs?.find(s => s.id === subsectionId);
}

function Logbook({ entries, onSelectEntry }) {
  const sorted = [...entries].sort((a, b) => { const ta = TIERS.find(t => t.id === a.tier), tb = TIERS.find(t => t.id === b.tier); if (tb.rank !== ta.rank) return tb.rank - ta.rank; return new Date(b.timestamp) - new Date(a.timestamp); });
  if (!entries.length) return <div className="logbook-empty"><div className="logbook-empty-icon">📖</div><h3>No Quests Completed Yet</h3><p>Your adventures await in the Realms</p></div>;
  return (<div className="entry-list">{sorted.map((entry, i) => {
    const section = SECTIONS.find(s => s.id === entry.section), tier = TIERS.find(t => t.id === entry.tier), subsection = getSubsection(entry.section, entry.subsection);
    return (<div key={entry.id} className="entry-card" onClick={() => onSelectEntry(entry.id)} style={{ animationDelay: `${i * 0.05}s` }}>
      <div className="entry-image-wrap"><QuestImage imageId={entry.image || 'default'} /></div>
      <div className="entry-content"><div className="entry-header"><div className="entry-title">{entry.title}</div><div className="entry-xp">+{tier?.xp} XP</div></div><div className="entry-meta"><span>{section?.icon} {subsection ? subsection.name : section?.name}</span><span>{tier?.name}</span><span>{new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></div></div>
    </div>);
  })}</div>);
}

function EntryDetailModal({ entry, onClose, onDelete }) {
  if (!entry) return null;
  const section = SECTIONS.find(s => s.id === entry.section), type = TYPES.find(t => t.id === entry.type), tier = TIERS.find(t => t.id === entry.tier), subsection = getSubsection(entry.section, entry.subsection);
  return (<div className="modal-overlay" onClick={onClose}><div className="modal" onClick={e => e.stopPropagation()}>
    <div className="modal-header"><span className="modal-title">Quest Complete</span><button className="modal-close" onClick={onClose}>×</button></div>
    <div className="modal-body">
      <div className="detail-hero"><div className="detail-image"><QuestImage imageId={entry.image || 'default'} /></div><h2 className="detail-title">{entry.title}</h2><div className="detail-badges"><span className="detail-badge">{tier?.name}</span><span className="detail-badge">+{tier?.xp} XP</span>{subsection && <span className="detail-badge">{subsection.icon} {subsection.name}</span>}<span className="detail-badge">{section?.name}</span></div></div>
      <div className="detail-section"><div className="detail-label">Date Completed</div><div className="detail-value">{new Date(entry.timestamp).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div></div>
      {entry.responses?.some(r => r.trim()) && <div className="detail-section"><div className="detail-label">Reflections</div><div className="detail-responses">{type?.prompts.map((p, i) => entry.responses[i]?.trim() && <div key={i} className="detail-response"><div className="detail-response-q">{p}</div><div className="detail-value">{entry.responses[i]}</div></div>)}</div></div>}
      {entry.evidence?.length > 0 && <div className="detail-section"><div className="detail-label">Evidence</div><div className="detail-evidence-grid">{entry.evidence.map((img, i) => <img key={i} src={img} alt="" className="detail-evidence-img" />)}</div></div>}
      <div className="detail-actions"><button className="btn btn-danger btn-block" onClick={onDelete}>Remove Entry</button></div>
    </div></div></div>);
}

function ProgressView({ entries, totalXP, level, xpInLevel }) {
  const stage = getAvatarStage(level);
  const nextStage = AVATAR_STAGES.find(s => s.minLevel > level);
  const tierCounts = TIERS.map(t => ({ ...t, count: entries.filter(e => e.tier === t.id).length }));
  const sectionCounts = SECTIONS.map(s => ({ ...s, count: entries.filter(e => e.section === s.id).length }));

  return (<>
    <div className="progress-section">
      <h3 className="progress-title">Your Avatar</h3>
      <div className="avatar-showcase">
        <div className="avatar-showcase-inner">
          <Avatar level={level} size={140} />
          <div className="avatar-stage-name">{stage.name}</div>
          <div className="avatar-stage-desc">{stage.description}</div>
        </div>
      </div>
      {nextStage && (
        <div className="next-avatar">
          <div className="next-avatar-label">Next Evolution</div>
          <div className="next-avatar-name">{nextStage.name}</div>
          <div className="next-avatar-xp">Reach Level {nextStage.minLevel} ({(nextStage.minLevel - 1) * 100 - totalXP} XP to go)</div>
        </div>
      )}
    </div>

    <div className="progress-section">
      <h3 className="progress-title">Level Progress</h3>
      <div className="level-display">
        <div className="level-number">{level}</div>
        <div className="level-label">Level</div>
        <div className="xp-bar-container">
          <div className="xp-bar-header"><span className="xp-bar-label">Progress to Level {level + 1}</span><span className="xp-bar-value">{xpInLevel} / 100 XP</span></div>
          <div className="xp-bar"><div className="xp-bar-fill" style={{ width: `${xpInLevel}%` }} /></div>
        </div>
      </div>
    </div>

    <div className="progress-section">
      <h3 className="progress-title">Quests by Tier</h3>
      <div className="tier-list">{tierCounts.map(t => <div key={t.id} className="tier-btn" style={{ cursor: 'default' }}><div className="tier-rank">{t.count}</div><div className="tier-info"><div className="tier-name">{t.name}</div><div className="tier-desc">{t.description}</div></div><div className="tier-xp">{t.count * t.xp} XP</div></div>)}</div>
    </div>

    <div className="progress-section">
      <h3 className="progress-title">Realms Explored</h3>
      <div className="realm-progress">{sectionCounts.map(s => <div key={s.id} className="realm-progress-row"><div className="realm-progress-icon">{s.icon}</div><div className="realm-progress-info"><div className="realm-progress-name">{s.name}</div></div><div className="realm-progress-count">{s.count}</div></div>)}</div>
    </div>
  </>);
}
