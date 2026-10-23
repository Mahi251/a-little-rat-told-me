import { motion } from 'motion/react'
import { Pip } from '../components/Pip'
import { SpeechBubble } from '../components/SpeechBubble'

export function WelcomeRoom({onNext}:{onNext:()=>void}){
 return <main className="room welcome-room"><div className="storybook-door"><motion.div className="paw-trail" initial={{width:0}} animate={{width:'78%'}} transition={{duration:1.5}}>•　•　•　•　•</motion.div><Pip mood="excited" size={230}/><div className="world-miniatures"><span>⋈</span><span>⚗</span><span>♡</span><span>✦</span></div></div><SpeechBubble>Welcome to my extremely small world. I made six rooms. The construction permits are… pending.</SpeechBubble><button className="primary" onClick={onNext}>Enter Pip's world</button></main>
}
