import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { EasterEggs } from './components/EasterEggs'
import { ProgressHearts } from './components/ProgressHearts'
import { SoundToggle } from './components/SoundToggle'
import { useProgress } from './hooks/useProgress'
import { useSound } from './hooks/useSound'
import { BowRoom } from './rooms/BowRoom'
import { ColeRoom } from './rooms/ColeRoom'
import { FinalRoom } from './rooms/FinalRoom'
import { HairSalonRoom } from './rooms/HairSalonRoom'
import { MercyRoom } from './rooms/MercyRoom'
import { MoiraRoom } from './rooms/MoiraRoom'
import { OpeningRoom } from './rooms/OpeningRoom'
import { RatDeliveryRoom } from './rooms/RatDeliveryRoom'
import { VampireRoom } from './rooms/VampireRoom'
import { WelcomeRoom } from './rooms/WelcomeRoom'

export default function App(){
 const progress=useProgress();const sound=useSound();const [transitioning,setTransitioning]=useState(false);const [coleEgg,setColeEgg]=useState(0)
 const go=(scene:number,heart?:number)=>{if(transitioning)return;setTransitioning(true);if(heart)progress.collect(heart);setTimeout(()=>{progress.setScene(scene);setTransitioning(false);window.scrollTo({top:0,behavior:'smooth'})},320)}
 const rooms=[
  <OpeningRoom onComplete={()=>go(1)} play={sound.play}/>,<WelcomeRoom onNext={()=>go(2)}/>,<BowRoom onComplete={()=>go(3,1)} play={sound.play}/>,<ColeRoom onComplete={()=>go(4,2)} play={sound.play} saved={progress.cole} onSave={progress.updateCole} easterEggSignal={coleEgg}/>,<MoiraRoom onComplete={()=>go(5,3)} play={sound.play}/>,<MercyRoom onComplete={()=>go(6,4)} play={sound.play}/>,<VampireRoom onComplete={()=>go(7,5)} play={sound.play}/>,<HairSalonRoom onComplete={()=>go(8,6)} play={sound.play}/>,<FinalRoom onComplete={()=>go(9)}/>,<RatDeliveryRoom onRestart={progress.restart} play={sound.play}/>
 ]
 const scene=Math.min(progress.scene,rooms.length-1)
 return <div className={`app scene-${scene}`}><a href="#main-story" className="skip-link">Skip to story</a><SoundToggle enabled={sound.enabled} toggle={sound.toggle}/>{scene>=2&&scene<=8&&<ProgressHearts hearts={progress.hearts} onVisit={n=>go(n)}/>}<div id="main-story"><AnimatePresence mode="wait"><motion.div key={scene} initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} transition={{duration:.32}}>{rooms[scene]}</motion.div></AnimatePresence></div><EasterEggs scene={scene} onSecret={n=>{if(n===3)setColeEgg(v=>v+1)}}/>{transitioning&&<div className="transition-wipe"><span>·　·　·</span></div>}</div>
}
