import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react'
import { Pip } from '../components/Pip'
import { RoomShell } from '../components/RoomShell'
import { SpeechBubble } from '../components/SpeechBubble'
import { clamp, nextCheckpoint } from '../lib/gameLogic'

const rings=[{x:18,y:68},{x:36,y:35},{x:55,y:62},{x:73,y:28},{x:88,y:52}]
export function MercyRoom({onComplete,play}:{onComplete:()=>void;play:(k?:'click'|'sparkle')=>void}){
 const [pos,setPos]=useState({x:8,y:74});const [checkpoint,setCheckpoint]=useState(0)
 const move=(dx:number,dy:number)=>setPos(p=>{const n={x:clamp(p.x+dx,3,94),y:clamp(p.y+dy,5,82)};const ring=rings[checkpoint];if(ring&&Math.hypot(n.x-ring.x,n.y-ring.y)<11){setCheckpoint(c=>nextCheckpoint(c,c));play('sparkle')}return n})
 useEffect(()=>{const key=(e:KeyboardEvent)=>{const k=e.key.toLowerCase();if(['arrowup','w'].includes(k))move(0,-7);if(['arrowdown','s'].includes(k))move(0,7);if(['arrowleft','a'].includes(k))move(-7,0);if(['arrowright','d'].includes(k))move(7,0)};addEventListener('keydown',key);return()=>removeEventListener('keydown',key)},[checkpoint])
 const assist=()=>{const r=rings[checkpoint];if(r){setPos({x:r.x,y:r.y});setCheckpoint(c=>nextCheckpoint(c,c));play('sparkle')}}
 return <RoomShell className="mercy-room" eyebrow="Room four" title="Mercy Flight School" onNext={checkpoint===5?onComplete:undefined} nextLabel="Collect the fourth heart"><div className="sky-game"><div className="sun"/>{rings.map((r,i)=><div key={i} className={`flight-ring ${i<checkpoint?'passed':i===checkpoint?'active':''}`} style={{left:`${r.x}%`,top:`${r.y}%`}}>{i+1}</div>)}<motion.div className="flying-pip" animate={{left:`${pos.x}%`,top:`${pos.y}%`}}><Pip mood="flying" size={86}/></motion.div></div>
 <div className="flight-progress">Checkpoint {checkpoint}/5</div>{checkpoint<5&&<><div className="dpad"><i/><button onClick={()=>move(0,-7)} aria-label="Fly up"><ArrowUp/></button><i/><button onClick={()=>move(-7,0)} aria-label="Fly left"><ArrowLeft/></button><button onClick={()=>move(0,7)} aria-label="Fly down"><ArrowDown/></button><button onClick={()=>move(7,0)} aria-label="Fly right"><ArrowRight/></button></div><button className="text-button" onClick={assist}>Gentle assist: fly to next ring</button></>}
 <SpeechBubble>{checkpoint===5?<><b>FLIGHT INSTRUCTOR CERTIFIED.</b><br/>You taught me how to fly. Which is impressive considering my natural talent for hitting walls.<br/><br/>Thank you for being patient with me.</>:"Apparently, you once taught a human how to fly. That seems medically questionable. But impressive."}</SpeechBubble>
 </RoomShell>
}
