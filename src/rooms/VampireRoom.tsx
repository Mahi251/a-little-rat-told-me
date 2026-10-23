import { useState } from 'react'
import { motion } from 'motion/react'
import { Pip } from '../components/Pip'
import { RoomShell } from '../components/RoomShell'
import { SpeechBubble } from '../components/SpeechBubble'

const styles=['Tiny & pointy','Classic menace','Sparkly disaster']
export function VampireRoom({onComplete,play}:{onComplete:()=>void;play:(k?:'click'|'dramatic')=>void}){
 const [fangs,setFangs]=useState(false);const [drama,setDrama]=useState(0);const [style,setStyle]=useState(0)
 return <RoomShell className={`vampire-room drama-${Math.min(drama,4)}`} eyebrow="Room five" title="The Vampire Rat Incident" onNext={fangs&&drama>=2?onComplete:undefined} nextLabel="Escape with the fifth heart"><div className="gothic-room"><div className="fairy-lights">✦ · ✦ · ✦ · ✦</div>{drama>=2&&<motion.div className="bats" animate={{x:['-30vw','110vw'],y:[20,-30,10]}}>⌁　⌁　⌁</motion.div>}{drama>=3&&<div className="throne">♛</div>}<Pip mood={fangs?'vampire':'shocked'} size={220}/><div className="mirror-label">{fangs?styles[style]:'There has been an incident.'}</div></div>
 {!fangs?<button className="primary" onClick={()=>{setFangs(true);play('dramatic')}}>Equip the fangs</button>:<><SpeechBubble tone="purple"><b>FEAR ME, MORTAL.</b><br/>I am approximately 14 centimeters of danger.</SpeechBubble><div className="fang-options">{styles.map((s,i)=><button key={s} className={style===i?'selected':''} onClick={()=>setStyle(i)}>{s}</button>)}</div><button className="primary" onClick={()=>{setDrama(d=>d+1);play('dramatic')}}>Make Pip even more dramatic</button><p className="task-note">Drama level: {drama} {drama>=4?'— the crown has become self-aware':''}</p></>}
 </RoomShell>
}
