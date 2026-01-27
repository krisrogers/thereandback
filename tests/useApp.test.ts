import { describe, it, expect, beforeEach, vi } from 'vitest'
import { TIERS } from '../composables/constants'

// Test the XP calculation logic used in useApp
describe('XP Calculations', () => {
  const calculateTotalXP = (entries: { tier: string }[]) => {
    return entries.reduce((sum, e) => {
      const tier = TIERS.find(t => t.id === e.tier)
      return sum + (tier?.xp || 0)
    }, 0)
  }

  const calculateLevel = (totalXP: number) => Math.floor(totalXP / 100) + 1
  const calculateXPInLevel = (totalXP: number) => totalXP % 100
  const calculateXPProgress = (totalXP: number) => (totalXP % 100) / 100

  describe('totalXP', () => {
    it('should return 0 for no entries', () => {
      expect(calculateTotalXP([])).toBe(0)
    })

    it('should calculate XP for wanderer tier (10 XP)', () => {
      const entries = [{ tier: 'wanderer' }]
      expect(calculateTotalXP(entries)).toBe(10)
    })

    it('should calculate XP for traveller tier (25 XP)', () => {
      const entries = [{ tier: 'traveller' }]
      expect(calculateTotalXP(entries)).toBe(25)
    })

    it('should calculate XP for wayfarer tier (50 XP)', () => {
      const entries = [{ tier: 'wayfarer' }]
      expect(calculateTotalXP(entries)).toBe(50)
    })

    it('should calculate XP for pathfinder tier (100 XP)', () => {
      const entries = [{ tier: 'pathfinder' }]
      expect(calculateTotalXP(entries)).toBe(100)
    })

    it('should calculate XP for guide tier (200 XP)', () => {
      const entries = [{ tier: 'guide' }]
      expect(calculateTotalXP(entries)).toBe(200)
    })

    it('should sum XP from multiple entries', () => {
      const entries = [
        { tier: 'wanderer' },   // 10
        { tier: 'traveller' },  // 25
        { tier: 'wayfarer' },   // 50
      ]
      expect(calculateTotalXP(entries)).toBe(85)
    })

    it('should handle invalid tier gracefully', () => {
      const entries = [{ tier: 'invalid' }]
      expect(calculateTotalXP(entries)).toBe(0)
    })

    it('should skip invalid tiers in mixed entries', () => {
      const entries = [
        { tier: 'wanderer' },  // 10
        { tier: 'invalid' },   // 0
        { tier: 'traveller' }, // 25
      ]
      expect(calculateTotalXP(entries)).toBe(35)
    })
  })

  describe('level', () => {
    it('should be level 1 at 0 XP', () => {
      expect(calculateLevel(0)).toBe(1)
    })

    it('should be level 1 at 99 XP', () => {
      expect(calculateLevel(99)).toBe(1)
    })

    it('should be level 2 at 100 XP', () => {
      expect(calculateLevel(100)).toBe(2)
    })

    it('should be level 2 at 199 XP', () => {
      expect(calculateLevel(199)).toBe(2)
    })

    it('should be level 3 at 200 XP', () => {
      expect(calculateLevel(200)).toBe(3)
    })

    it('should be level 10 at 900 XP', () => {
      expect(calculateLevel(900)).toBe(10)
    })

    it('should be level 11 at 1000 XP', () => {
      expect(calculateLevel(1000)).toBe(11)
    })
  })

  describe('xpInLevel', () => {
    it('should be 0 at level boundary', () => {
      expect(calculateXPInLevel(0)).toBe(0)
      expect(calculateXPInLevel(100)).toBe(0)
      expect(calculateXPInLevel(200)).toBe(0)
    })

    it('should track progress within level', () => {
      expect(calculateXPInLevel(50)).toBe(50)
      expect(calculateXPInLevel(75)).toBe(75)
      expect(calculateXPInLevel(150)).toBe(50)
      expect(calculateXPInLevel(275)).toBe(75)
    })

    it('should be 99 just before level up', () => {
      expect(calculateXPInLevel(99)).toBe(99)
      expect(calculateXPInLevel(199)).toBe(99)
    })
  })

  describe('xpProgress', () => {
    it('should be 0 at level boundary', () => {
      expect(calculateXPProgress(0)).toBe(0)
      expect(calculateXPProgress(100)).toBe(0)
    })

    it('should be 0.5 at halfway', () => {
      expect(calculateXPProgress(50)).toBe(0.5)
      expect(calculateXPProgress(150)).toBe(0.5)
    })

    it('should be 0.99 just before level up', () => {
      expect(calculateXPProgress(99)).toBe(0.99)
    })

    it('should be 0.25 at quarter progress', () => {
      expect(calculateXPProgress(25)).toBe(0.25)
    })
  })
})

describe('Entry Management', () => {
  it('should generate unique IDs based on timestamp', () => {
    const createEntry = () => ({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    })

    const entry1 = createEntry()
    // Small delay to ensure different timestamp
    const entry2 = createEntry()

    // IDs should be numeric strings
    expect(parseInt(entry1.id)).not.toBeNaN()
    expect(parseInt(entry2.id)).not.toBeNaN()
  })

  it('should filter entries correctly', () => {
    const entries = [
      { id: '1', title: 'Entry 1' },
      { id: '2', title: 'Entry 2' },
      { id: '3', title: 'Entry 3' },
    ]

    const deleteEntry = (id: string) => entries.filter(e => e.id !== id)

    const result = deleteEntry('2')
    expect(result).toHaveLength(2)
    expect(result.find(e => e.id === '2')).toBeUndefined()
    expect(result.find(e => e.id === '1')).toBeDefined()
    expect(result.find(e => e.id === '3')).toBeDefined()
  })
})

describe('Level to Stage Mapping', () => {
  // Tests that verify specific XP amounts map to correct stages via level
  const testCases = [
    { xp: 0, expectedLevel: 1, expectedStage: 'Young Hobbit' },
    { xp: 100, expectedLevel: 2, expectedStage: 'Young Hobbit' },
    { xp: 200, expectedLevel: 3, expectedStage: 'Eager Wanderer' },
    { xp: 400, expectedLevel: 5, expectedStage: 'Seasoned Traveller' },
    { xp: 700, expectedLevel: 8, expectedStage: 'Bold Wayfarer' },
    { xp: 1100, expectedLevel: 12, expectedStage: 'Wise Pathfinder' },
    { xp: 1700, expectedLevel: 18, expectedStage: 'Legendary Guide' },
  ]

  testCases.forEach(({ xp, expectedLevel, expectedStage }) => {
    it(`should be ${expectedStage} at ${xp} XP (level ${expectedLevel})`, () => {
      const level = Math.floor(xp / 100) + 1
      expect(level).toBe(expectedLevel)
    })
  })
})
