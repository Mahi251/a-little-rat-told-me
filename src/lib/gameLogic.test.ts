import { describe, expect, it } from 'vitest'
import { clamp, deliveryBatch, milestone, nextCheckpoint, scoreOrb } from './gameLogic'

describe('game logic', () => {
  it('scores matching Moira orbs only', () => {
    expect(scoreOrb('heal', 'heal')).toBe(10)
    expect(scoreOrb('damage', 'heal')).toBe(0)
  })
  it('advances flight checkpoints in order', () => {
    expect(nextCheckpoint(0, 0)).toBe(1)
    expect(nextCheckpoint(1, 3)).toBe(1)
    expect(nextCheckpoint(4, 4)).toBe(5)
  })
  it('clamps coordinates', () => expect(clamp(110, 0, 100)).toBe(100))
  it('scales deliveries and reports milestones', () => {
    expect(deliveryBatch(9)).toBe(1)
    expect(deliveryBatch(55)).toBe(10)
    expect(milestone(100)).toContain('building')
  })
})
