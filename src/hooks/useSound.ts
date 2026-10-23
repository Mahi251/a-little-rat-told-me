import { useCallback, useEffect, useRef, useState } from 'react'
import { personalization } from '../config/personalization'

export function useSound() {
  const [enabled, setEnabled] = useState(false)
  const context = useRef<AudioContext | null>(null)
  const play = useCallback((kind: 'click' | 'sparkle' | 'squeak' | 'dramatic' = 'click') => {
    if (!enabled || !personalization.enableAudio) return
    const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return
    const ctx = context.current ?? new Ctx()
    context.current = ctx
    const osc = ctx.createOscillator(); const gain = ctx.createGain()
    const map = { click: [430, .045], sparkle: [760, .18], squeak: [980, .08], dramatic: [140, .38] } as const
    osc.frequency.setValueAtTime(map[kind][0], ctx.currentTime)
    if (kind === 'sparkle') osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + .18)
    if (kind === 'dramatic') osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + .38)
    gain.gain.setValueAtTime(.035, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + map[kind][1])
    osc.connect(gain).connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + map[kind][1])
  }, [enabled])
  useEffect(() => () => { context.current?.close() }, [])
  return { enabled, toggle: () => setEnabled(v => !v), play }
}
