import { useState } from 'react'
import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'
import { Pip } from '../components/Pip'
import { RoomShell } from '../components/RoomShell'
import { SpeechBubble } from '../components/SpeechBubble'

const rodents=['Rat','Mouse','Hamster','Guinea pig','Capybara']
const hair=['Pink bob','Pink curls','Pink bangs','Pink mohawk','Pink space buns','Ridiculous pink spiky hair']
const ratings=['11/10. The salon has peaked.','999/10. This rodent is now famous.','10/10. Scientists are confused by the beauty.','100/10. Cole has been notified of the slay.']
export function HairSalonRoom({onComplete,play}:{onComplete:()=>void;play:(k?:'click'|'sparkle')=>void}){
 const [rodent,setRodent]=useState(0);const [style,setStyle]=useState(0);const [rated,setRated]=useState('');const [show,setShow]=useState(false)
 const rate=()=>{setRated(ratings[(rodent*3+style)%ratings.length]);setShow(true);play('sparkle')}
 return <RoomShell className="salon-room" eyebrow="Room six" title="The Pink Hair Appreciation Society" onNext={show?onComplete:undefined} nextLabel="Collect the final heart"><div className="salon-sign">PIP'S TINY SALON</div><div className="salon-stage"><motion.div className={`salon-rodent rodent-${rodent} hair-${style}`} animate={show?{x:[0,40,-40,0],rotate:[0,4,-4,0],scale:[1,1.08,1]}:{}}><div className="salon-hair"><i/><i/><i/><i/><i/></div><Pip mood="proud" size={200}/><b>{rodents[rodent]}</b></motion.div><div className="mirror-sparkles"><Sparkles/></div></div>
 <div className="selectors"><label>Choose a client<select value={rodent} onChange={e=>{setRodent(+e.target.value);setShow(false)}}>{rodents.map((r,i)=><option value={i} key={r}>{r}</option>)}</select></label><label>Choose the masterpiece<select value={style} onChange={e=>{setStyle(+e.target.value);setShow(false)}}>{hair.map((h,i)=><option value={i} key={h}>{h}</option>)}</select></label></div>
 <button className="primary" onClick={rate}>Start the tiny fashion show</button>{rated&&<SpeechBubble><b>{rated}</b><br/>Pink hair is objectively an excellent decision. And yours looks especially good.</SpeechBubble>}
 </RoomShell>
}
