import { describe, it, expect } from 'vitest'
import {
  SECTIONS,
  SUBSECTIONS,
  TIERS,
  TYPES,
  QUESTS,
  AVATAR_STAGES,
  getAvatarStage,
  getSubsection,
} from '../composables/constants'

describe('constants', () => {
  describe('SECTIONS', () => {
    it('should have 5 sections', () => {
      expect(SECTIONS).toHaveLength(5)
    })

    it('should have unique section ids', () => {
      const ids = SECTIONS.map(s => s.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('should have required properties for each section', () => {
      SECTIONS.forEach(section => {
        expect(section).toHaveProperty('id')
        expect(section).toHaveProperty('name')
        expect(section).toHaveProperty('subtitle')
        expect(section).toHaveProperty('icon')
        expect(section).toHaveProperty('color')
        expect(section).toHaveProperty('description')
      })
    })
  })

  describe('SUBSECTIONS', () => {
    it('should have subsections for each section', () => {
      SECTIONS.forEach(section => {
        expect(SUBSECTIONS[section.id]).toBeDefined()
        expect(SUBSECTIONS[section.id].length).toBeGreaterThan(0)
      })
    })

    it('should have 5 subsections per section', () => {
      Object.values(SUBSECTIONS).forEach(subs => {
        expect(subs).toHaveLength(5)
      })
    })

    it('should have unique subsection ids within each section', () => {
      Object.values(SUBSECTIONS).forEach(subs => {
        const ids = subs.map(s => s.id)
        expect(new Set(ids).size).toBe(ids.length)
      })
    })
  })

  describe('TIERS', () => {
    it('should have 5 tiers', () => {
      expect(TIERS).toHaveLength(5)
    })

    it('should have increasing ranks', () => {
      for (let i = 1; i < TIERS.length; i++) {
        expect(TIERS[i].rank).toBeGreaterThan(TIERS[i - 1].rank)
      }
    })

    it('should have increasing XP rewards', () => {
      for (let i = 1; i < TIERS.length; i++) {
        expect(TIERS[i].xp).toBeGreaterThan(TIERS[i - 1].xp)
      }
    })

    it('should have correct XP values', () => {
      expect(TIERS.find(t => t.id === 'wanderer')?.xp).toBe(10)
      expect(TIERS.find(t => t.id === 'traveller')?.xp).toBe(25)
      expect(TIERS.find(t => t.id === 'wayfarer')?.xp).toBe(50)
      expect(TIERS.find(t => t.id === 'pathfinder')?.xp).toBe(100)
      expect(TIERS.find(t => t.id === 'guide')?.xp).toBe(200)
    })
  })

  describe('TYPES', () => {
    it('should have 8 quest types', () => {
      expect(TYPES).toHaveLength(8)
    })

    it('should have 3 prompts per type', () => {
      TYPES.forEach(type => {
        expect(type.prompts).toHaveLength(3)
      })
    })
  })

  describe('QUESTS', () => {
    it('should have 10 predefined quests', () => {
      expect(QUESTS).toHaveLength(10)
    })

    it('should reference valid sections', () => {
      const sectionIds = SECTIONS.map(s => s.id)
      QUESTS.forEach(quest => {
        expect(sectionIds).toContain(quest.section)
      })
    })

    it('should reference valid subsections', () => {
      QUESTS.forEach(quest => {
        const subsectionIds = SUBSECTIONS[quest.section].map(s => s.id)
        expect(subsectionIds).toContain(quest.subsection)
      })
    })

    it('should reference valid tiers', () => {
      const tierIds = TIERS.map(t => t.id)
      QUESTS.forEach(quest => {
        expect(tierIds).toContain(quest.tier)
      })
    })

    it('should reference valid types', () => {
      const typeIds = TYPES.map(t => t.id)
      QUESTS.forEach(quest => {
        expect(typeIds).toContain(quest.type)
      })
    })
  })

  describe('AVATAR_STAGES', () => {
    it('should have 6 stages', () => {
      expect(AVATAR_STAGES).toHaveLength(6)
    })

    it('should have increasing minLevel requirements', () => {
      for (let i = 1; i < AVATAR_STAGES.length; i++) {
        expect(AVATAR_STAGES[i].minLevel).toBeGreaterThan(AVATAR_STAGES[i - 1].minLevel)
      }
    })

    it('should start at level 1', () => {
      expect(AVATAR_STAGES[0].minLevel).toBe(1)
    })
  })
})

describe('getAvatarStage', () => {
  it('should return Young Hobbit for level 1', () => {
    const stage = getAvatarStage(1)
    expect(stage.name).toBe('Young Hobbit')
    expect(stage.index).toBe(0)
  })

  it('should return Young Hobbit for level 2', () => {
    const stage = getAvatarStage(2)
    expect(stage.name).toBe('Young Hobbit')
  })

  it('should return Eager Wanderer for level 3', () => {
    const stage = getAvatarStage(3)
    expect(stage.name).toBe('Eager Wanderer')
    expect(stage.index).toBe(1)
  })

  it('should return Seasoned Traveller for level 5', () => {
    const stage = getAvatarStage(5)
    expect(stage.name).toBe('Seasoned Traveller')
    expect(stage.index).toBe(2)
  })

  it('should return Bold Wayfarer for level 8', () => {
    const stage = getAvatarStage(8)
    expect(stage.name).toBe('Bold Wayfarer')
    expect(stage.index).toBe(3)
  })

  it('should return Wise Pathfinder for level 12', () => {
    const stage = getAvatarStage(12)
    expect(stage.name).toBe('Wise Pathfinder')
    expect(stage.index).toBe(4)
  })

  it('should return Legendary Guide for level 18+', () => {
    const stage = getAvatarStage(18)
    expect(stage.name).toBe('Legendary Guide')
    expect(stage.index).toBe(5)
  })

  it('should return Legendary Guide for very high levels', () => {
    const stage = getAvatarStage(100)
    expect(stage.name).toBe('Legendary Guide')
  })

  it('should return first stage for level 0 or below', () => {
    const stage = getAvatarStage(0)
    expect(stage.name).toBe('Young Hobbit')
    expect(stage.index).toBe(0)
  })
})

describe('getSubsection', () => {
  it('should return subsection for valid section and subsection', () => {
    const subsection = getSubsection('workshop', 'woodworking')
    expect(subsection).toBeDefined()
    expect(subsection?.name).toBe('Woodworking')
  })

  it('should return undefined for invalid section', () => {
    const subsection = getSubsection('invalid', 'woodworking')
    expect(subsection).toBeUndefined()
  })

  it('should return undefined for invalid subsection', () => {
    const subsection = getSubsection('workshop', 'invalid')
    expect(subsection).toBeUndefined()
  })

  it('should find subsections in all sections', () => {
    expect(getSubsection('workshop', 'metalwork')?.name).toBe('Metalwork')
    expect(getSubsection('wilds', 'bushcraft')?.name).toBe('Bushcraft')
    expect(getSubsection('shire', 'gardening')?.name).toBe('Gardening')
    expect(getSubsection('hearth', 'cooking')?.name).toBe('Cooking')
    expect(getSubsection('library', 'reading')?.name).toBe('Reading')
  })
})
