import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Flower2, Heart, Moon, MousePointer2, Sandwich } from 'lucide-react'
import { Pip } from '../components/Pip'
import { RoomShell } from '../components/RoomShell'
import { SpeechBubble } from '../components/SpeechBubble'
import { personalization } from '../config/personalization'
import type { ColeProgress } from '../hooks/useProgress'

type HugPhase = 'idle' | 'approaching' | 'hugging'
type CoupleAction = 'paws' | 'flower' | 'cheese' | 'sleep' | null
const heartIds = ['rose', 'peach', 'berry', 'plum', 'blossom'] as const

export function ColeRoom({ onComplete, play, saved, onSave, easterEggSignal = 0 }: { onComplete: () => void; play: (k?: 'click'|'sparkle') => void; saved: ColeProgress; onSave: (value: ColeProgress) => void; easterEggSignal?: number }) {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<HugPhase>(saved.hugComplete ? 'hugging' : 'idle')
  const [collected, setCollected] = useState(() => new Set(saved.heartIds))
  const [action, setAction] = useState<CoupleAction>(null)
  const [coleReaction, setColeReaction] = useState(false)
  const [sparkleId, setSparkleId] = useState<string | null>(null)
  const collectedRef = useRef(collected)
  const actionTimer = useRef<number | undefined>(undefined)
  const hugTimer = useRef<number | undefined>(undefined)
  const easterTimer = useRef<number | undefined>(undefined)
  const sparkleTimer = useRef<number | undefined>(undefined)
  const collectedCount = collected.size
  const unlocked = phase === 'hugging' && collectedCount >= 3

  useEffect(() => () => { window.clearTimeout(actionTimer.current); window.clearTimeout(hugTimer.current); window.clearTimeout(easterTimer.current); window.clearTimeout(sparkleTimer.current) }, [])
  useEffect(() => {
    if (!easterEggSignal) return
    setColeReaction(true)
    window.clearTimeout(easterTimer.current)
    easterTimer.current = window.setTimeout(() => setColeReaction(false), reduceMotion ? 700 : 1800)
  }, [easterEggSignal, reduceMotion])

  const persist = (nextHug: boolean, nextCollected: Set<string>) => onSave({ hugComplete: nextHug, heartIds: [...nextCollected] })
  const startHug = () => {
    if (phase !== 'idle') return
    play('sparkle')
    if (reduceMotion) { setPhase('hugging'); persist(true, collectedRef.current); return }
    setPhase('approaching')
    hugTimer.current = window.setTimeout(() => { setPhase('hugging'); persist(true, collectedRef.current) }, 1150)
  }
  const collectHeart = (id: string) => {
    if (collectedRef.current.has(id)) return
    const next = new Set(collectedRef.current); next.add(id); collectedRef.current = next; setCollected(next); setSparkleId(id); persist(phase === 'hugging', next); play('sparkle')
    window.clearTimeout(sparkleTimer.current); sparkleTimer.current = window.setTimeout(() => setSparkleId(null), reduceMotion ? 150 : 650)
  }
  const runAction = (next: Exclude<CoupleAction, null>) => {
    if (phase !== 'hugging' || action) return
    setAction(next); play('sparkle'); window.clearTimeout(actionTimer.current)
    actionTimer.current = window.setTimeout(() => setAction(null), reduceMotion ? 700 : 2200)
  }

  const leftMotion = useMemo(() => {
    if (phase === 'idle') return { x: 0, rotate: 0, y: 0 }
    if (phase === 'approaching') return { x: [0, 15, 30], rotate: [0, 3, 7], y: 0 }
    if (action === 'sleep') return { x: 34, rotate: 11, y: 8 }
    if (action === 'flower' || action === 'cheese') return { x: 27, rotate: 4, y: 0 }
    return { x: 31, rotate: 7, y: 0 }
  }, [phase, action])
  const rightMotion = useMemo(() => {
    if (phase === 'idle') return { x: 0, rotate: 0, y: 0 }
    if (phase === 'approaching') return { x: [0, -15, -30], rotate: [0, -3, -7], y: 0 }
    if (action === 'sleep') return { x: -34, rotate: -11, y: 8 }
    if (action === 'flower' || action === 'cheese') return { x: -27, rotate: -4, y: 0 }
    return { x: -31, rotate: -7, y: 0 }
  }, [phase, action])
  const turned = phase !== 'idle'
  const cuddling = phase === 'hugging'
  const sleepy = action === 'sleep'
  const reaching = cuddling || action === 'paws'

  return <RoomShell className="cole-room" eyebrow="Room two" title={`${personalization.boyfriendName}'s Cozy Corner`} onNext={onComplete} nextDisabled={!unlocked} nextLabel={unlocked ? 'Collect the second heart' : 'Complete the hug and catch 3 hearts'}>
    <p className="cole-instruction"><b>Tap 3 floating hearts!</b> Then help the rats hug.</p>
    <div className="garden-scene">
      <div className="heart-tree"><span>♥</span></div>
      <div className="float-hearts" aria-label="Floating hearts">
        {heartIds.map((id, i) => !collected.has(id) && <motion.button key={id} aria-label={`Collect floating heart ${i + 1}`} onClick={() => collectHeart(id)} animate={{ y: reduceMotion ? 0 : [0,-12,0], rotate: reduceMotion ? 0 : [-5,7,-5] }} transition={{ delay:reduceMotion ? 0 : i*.12, repeat:reduceMotion ? 0 : Infinity, duration:2.3 }}><Heart fill="currentColor"/></motion.button>)}
        <AnimatePresence>{sparkleId && <motion.i aria-label="Heart collected sparkle" className={`heart-sparkle heart-sparkle-${heartIds.indexOf(sparkleId as typeof heartIds[number]) + 1}`} initial={{opacity:0,scale:.4}} animate={{opacity:1,scale:[.4,1.4,1],rotate:25}} exit={{opacity:0,scale:0}}>✦</motion.i>}</AnimatePresence>
      </div>
      <div className="rat-couple-center">
        <div className={`rat-couple-motion phase-${phase} action-${action || 'cuddle'}`} data-hug-phase={phase} data-couple-action={action || ''}>
          <motion.div className="couple-rat you-rat" animate={leftMotion} transition={{ duration: reduceMotion ? 0 : .9, ease:'easeInOut' }}>
            <Pip size={145} facing={turned ? 'right' : 'front'} pose={reaching ? 'reach-right' : 'normal'} eyesClosed={cuddling || sleepy} blush={cuddling}/><b>You-rat</b>
          </motion.div>
          <motion.div className="couple-rat cole-rat" animate={rightMotion} transition={{ duration: reduceMotion ? 0 : .9, ease:'easeInOut' }}>
            <Pip mood={turned ? 'happy' : 'proud'} size={145} facing={turned ? 'left' : 'front'} pose={reaching ? 'reach-left' : 'normal'} eyesClosed={cuddling || sleepy} blush={cuddling || coleReaction || action === 'flower'}/><b>{personalization.boyfriendName}-rat</b>
          </motion.div>
          <AnimatePresence>
            {(phase === 'approaching' || (phase === 'hugging' && !action)) && <motion.div className="cuddle-hearts" initial={{opacity:0,scale:.5,y:12}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0}}>♥ <span>♥</span> ♥</motion.div>}
            {(coleReaction || action === 'flower') && <motion.div aria-label="Cole blush reaction" className="couple-prop flower-prop" initial={{scale:0,rotate:-20}} animate={{scale:1,rotate:0}} exit={{scale:0}}><Flower2/><Heart fill="currentColor"/></motion.div>}
            {action === 'cheese' && <motion.div aria-label="Shared cheese pieces" className="couple-prop cheese-prop" initial={{scale:0}} animate={{scale:[0,1.2,1]}} exit={{opacity:0}}><span/><span/></motion.div>}
            {action === 'paws' && <motion.div aria-label="Connected paws" className="couple-prop paw-glow" initial={{scale:0}} animate={{scale:[0,1.3,1],opacity:[0,1,.8]}} exit={{opacity:0}}><Heart fill="currentColor"/></motion.div>}
            {action === 'sleep' && <motion.div aria-label="Sleeping marks" className="sleep-marks" initial={{opacity:0}} animate={{opacity:1,y:[4,-5,4]}}>z <b>z</b> <strong>z</strong></motion.div>}
          </AnimatePresence>
        </div>
      </div>
    </div>
    <SpeechBubble>{phase === 'idle' ? 'Two rats. One brain cell. Infinite affection.' : phase === 'approaching' ? 'Initiating extremely serious cuddle protocol…' : action === 'flower' ? 'A tiny flower for a very important rat.' : action === 'cheese' ? 'The emergency cheese has been divided equally.' : action === 'sleep' ? 'They have cancelled every responsibility.' : action === 'paws' ? 'Paws connected. Scientific result: adorable.' : 'Scientific evidence suggests these two are very cute together.'}</SpeechBubble>
    {personalization.coleMessage && <blockquote><b>A real note from {personalization.boyfriendName}:</b> {personalization.coleMessage}</blockquote>}
    <button className="primary hug-button" disabled={phase !== 'idle'} onClick={startHug}>{phase === 'idle' ? 'Make the rats hug' : phase === 'approaching' ? 'Cuddle in progress…' : "Aww, they're hugging!"}</button>
    <div className="couple-actions" aria-label="Couple activities">
      <button disabled={phase !== 'hugging' || !!action} onClick={() => runAction('paws')}><MousePointer2/>Hold paws</button>
      <button disabled={phase !== 'hugging' || !!action} onClick={() => runAction('flower')}><Flower2/>Exchange flower</button>
      <button disabled={phase !== 'hugging' || !!action} onClick={() => runAction('cheese')}><Sandwich/>Share cheese</button>
      <button disabled={phase !== 'hugging' || !!action} onClick={() => runAction('sleep')}><Moon/>Fall asleep</button>
    </div>
    <p className="task-note" aria-live="polite">Hug: {phase === 'hugging' ? 'complete' : 'not complete'} · Hearts: {Math.min(collectedCount,3)}/3</p>
  </RoomShell>
}
