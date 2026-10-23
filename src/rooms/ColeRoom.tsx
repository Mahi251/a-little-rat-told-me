import { useState } from 'react'
import { motion } from 'motion/react'
import { Heart } from 'lucide-react'
import { Pip } from '../components/Pip'
import { RoomShell } from '../components/RoomShell'
import { SpeechBubble } from '../components/SpeechBubble'
import { personalization } from '../config/personalization'

const lines = ['Two rats. One brain cell. Infinite affection.','Scientific evidence suggests these two are very cute together.','Even the rats know Cole is special.','They are now sharing the emergency cheese. This is serious.']
export function ColeRoom({ onComplete, play }: { onComplete: () => void; play: (k?: 'click'|'sparkle') => void }) {
  const [hugs,setHugs]=useState(0); const [hearts,setHearts]=useState(0)
  return <RoomShell className="cole-room" eyebrow="Room two" title={`${personalization.boyfriendName}'s Cozy Corner`} onNext={onComplete} nextDisabled={hugs < 1 || hearts < 3} nextLabel="Collect the second heart">
    <div className="garden-scene"><div className="heart-tree"><span>♥</span></div><div className="float-hearts">{[0,1,2,3,4].map(i=><motion.button key={i} aria-label="Catch a floating heart" onClick={()=>{setHearts(v=>Math.min(5,v+1));play('sparkle')}} animate={{y:[0,-12,0],rotate:[-5,7,-5]}} transition={{delay:i*.3,repeat:Infinity,duration:2.3}}><Heart fill="currentColor"/></motion.button>)}</div>
      <motion.div className="rat-couple" animate={hugs ? {gap:0,scale:[1,1.05,1]} : {gap:28}}><div><Pip size={145}/><b>You-rat</b></div><div className="cole-rat"><Pip mood="proud" size={145}/><b>{personalization.boyfriendName}-rat</b></div></motion.div>
    </div><SpeechBubble>{lines[hugs%lines.length]}</SpeechBubble>{personalization.coleMessage && <blockquote><b>A real note from {personalization.boyfriendName}:</b> {personalization.coleMessage}</blockquote>}
    <button className="primary" onClick={()=>{setHugs(v=>v+1);play('sparkle')}}>Make the rats hug</button><p className="task-note">{Math.min(hearts,3)}/3 floating hearts caught</p>
  </RoomShell>
}
