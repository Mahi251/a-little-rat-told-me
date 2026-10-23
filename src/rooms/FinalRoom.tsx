import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Pip } from '../components/Pip'
import { personalization } from '../config/personalization'

const messages=[
 'Hey.',"I know things haven't been the easiest lately.","And I know a tiny website full of rats can't magically fix everything.",'But I wanted to make you something.','Something filled with little things that make you smile.','Pink hair. Vampire fangs. Your terrifying Moira skills.',"The fact that you somehow managed to teach me how to fly.",`And, of course, ${personalization.boyfriendName}.`,'You deserve good days, even when things feel difficult.',"And you don't have to pretend everything is okay.",personalization.finalMessage,"Also, the rats think you're pretty cool.",'Which is a very prestigious honor.'
]
export function FinalRoom({onComplete}:{onComplete:()=>void}){
 const [step,setStep]=useState(0)
 const advance=()=>setStep(s=>Math.min(messages.length-1,s+1))
 return <main className="room final-room" onClick={advance}><div className="night-sky">{Array.from({length:22},(_,i)=><i key={i} style={{left:`${(i*43)%97}%`,top:`${(i*29)%60}%`,animationDelay:`${i*.13}s`}}/>)}</div><div className="hill"><div className="rat-gathering"><Pip mood="sleepy" size={92}/><Pip mood="happy" size={112}/><Pip mood="vampire" size={82}/></div></div><div className="final-copy"><AnimatePresence mode="wait"><motion.p key={step} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>{messages[step]}</motion.p></AnimatePresence>{step<messages.length-1?<button className="text-button" onClick={e=>{e.stopPropagation();advance()}}>tap to continue</button>:<button className="primary" onClick={e=>{e.stopPropagation();onComplete()}}>One last surprise?</button>}</div></main>
}
