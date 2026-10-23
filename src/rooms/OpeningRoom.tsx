import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Pip } from '../components/Pip'
import { SpeechBubble } from '../components/SpeechBubble'
import { personalization } from '../config/personalization'

export function OpeningRoom({ onComplete, play }: { onComplete: () => void; play: (k?: 'click'|'sparkle'|'squeak') => void }) {
  const [step, setStep] = useState(0); const [open, setOpen] = useState(false); const [reply, setReply] = useState('')
  useEffect(() => { const timers = [700, 1600, 2900].map((t, i) => window.setTimeout(() => setStep(i + 1), t)); return () => timers.forEach(clearTimeout) }, [])
  const choose = (warm: boolean) => { setReply(warm ? 'Correct answer. You clearly have excellent rat judgment.' : 'A sensible and legally binding choice.'); play('squeak'); setTimeout(onComplete, 1300) }
  return <main className="room opening"><div className="opening-stars">✦　·　✧</div><motion.div className="tail-peek" initial={{ y: 60 }} animate={{ y: step ? 0 : 60 }}/>
    <AnimatePresence>{step >= 1 && <motion.div initial={{ y: 180 }} animate={{ y: 0 }} className="opening-pip"><Pip mood={step >= 3 ? 'excited' : 'confused'} size={210}/></motion.div>}</AnimatePresence>
    <div className="opening-copy">{step >= 1 && <SpeechBubble>{step === 1 ? 'Psst...' : step === 2 ? 'Hey. You. Yes, you.' : "I've been looking EVERYWHERE for you."}</SpeechBubble>}</div>
    {step >= 3 && !open && <motion.button className="envelope" onClick={() => { setOpen(true); play('sparkle') }} initial={{ rotate: -5, scale: 0 }} animate={{ rotate: 0, scale: 1 }}><span>For a very important human</span><b>♥</b></motion.button>}
    {open && <motion.section className="letter" initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }}>
      <p>{personalization.openingMessage}</p><p>So I gathered some very important things.</p><p><b>Mostly rats.</b> But also other things.</p><p>Would you like to see?</p>
      {!reply ? <div className="button-row"><button className="primary" onClick={() => choose(false)}>Yes, tiny rat.</button><button className="secondary" onClick={() => choose(true)}>Absolutely, tiny rat.</button></div> : <b>{reply}</b>}
    </motion.section>}
  </main>
}
