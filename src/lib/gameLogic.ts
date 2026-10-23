export type TargetKind = 'heal' | 'damage'
export type OrbKind = 'heal' | 'damage'

export function scoreOrb(target: TargetKind, orb: OrbKind) {
  return target === orb ? 10 : 0
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function nextCheckpoint(current: number, ring: number) {
  return ring === current ? Math.min(5, current + 1) : current
}

export function deliveryBatch(total: number) {
  if (total < 10) return 1
  if (total < 25) return 3
  if (total < 50) return 5
  return 10
}

export function milestone(total: number) {
  if (total >= 100) return 'Congratulations. You now own the building.'
  if (total >= 50) return 'Cole has been asked to intervene.'
  if (total >= 25) return 'The authorities have been informed.'
  if (total >= 10) return 'Your rat delivery is getting out of hand.'
  return ''
}
