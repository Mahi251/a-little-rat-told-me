import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Download, RotateCcw } from 'lucide-react'
import { toPng } from 'html-to-image'
import { Pip, type PipMood } from '../components/Pip'
import { personalization } from '../config/personalization'
import { deliveryBatch, milestone } from '../lib/gameLogic'

type Rat = {id:number;x:number;y:number;mood:PipMood;scale:number;label:string}
const variants:{mood:PipMood;label:string}[]=[{mood:'happy',label:'has cheese'},{mood:'vampire',label:'demands darkness'},{mood:'scientist',label:'is ethical-ish'},{mood:'flying',label:'has no license'},{mood:'proud',label:'wears sunglasses'},{mood:'sleepy',label:'needs a nap'},{mood:'excited',label:'brought flowers'}]
export function RatDeliveryRoom({onRestart,play}:{onRestart:()=>void;play:(k?:'click'|'squeak')=>void}){
 const [total,setTotal]=useState(0);const [rats,setRats]=useState<Rat[]>([]);const [bubble,setBubble]=useState('Emergency rat services standing by.');const cert=useRef<HTMLDivElement>(null)
 const send=()=>{const batch=deliveryBatch(total);const created=Array.from({length:batch},(_,i)=>{const v=variants[(total+i)%variants.length];return{id:Date.now()+i,x:2+Math.random()*88,y:48+Math.random()*36,mood:v.mood,scale:.58+Math.random()*.32,label:v.label}});const next=total+batch;setTotal(next);setRats(r=>[...r,...created].slice(-24));setBubble(milestone(next)||`${created[0].label}.`);play('squeak')}
 const download=async()=>{if(!cert.current)return;try{const data=await toPng(cert.current,{pixelRatio:2,backgroundColor:'#fff8ec'});const blob=await (await fetch(data)).blob();const url=URL.createObjectURL(blob);const a=document.createElement('a');a.download='queen-of-the-rats-certificate.png';a.href=url;document.body.appendChild(a);a.click();a.remove();window.setTimeout(()=>URL.revokeObjectURL(url),1000)}catch{setBubble('The certificate printer rat sneezed. Please try again.') }}
 return <main className="room delivery-room"><header className="delivery-header"><span>RATS DELIVERED</span><strong>{total}</strong><p>{bubble}</p></header><div className="rat-floor">{rats.map(r=><motion.button aria-label={`Tap rat who ${r.label}`} onClick={()=>{setBubble(`This one ${r.label}.`);play('squeak')}} key={r.id} className="delivered-rat" style={{left:`${r.x}%`,top:`${r.y}%`,scale:r.scale}} initial={{y:-700,rotate:-20}} animate={{y:0,rotate:[0,3,-2,0]}} transition={{type:'spring',damping:12}}><Pip mood={r.mood} size={100}/></motion.button>)}</div><div className="delivery-actions"><button className="mega-button" onClick={send}>SEND MORE RATS</button><button className="icon-button" onClick={onRestart} aria-label="Restart adventure"><RotateCcw/></button></div>
 {total>=100&&<section className="certificate-wrap"><div className="certificate" ref={cert}><span>By decree of Pip and the Tiny Council</span><h1>Official Queen<br/>of the Rats</h1><Pip mood="proud" size={120}/><p>This certifies that <b>{personalization.friendName === 'you' ? 'One Very Important Human' : personalization.friendName}</b> has received 100 rats and displayed exceptional courage, cuteness, and commitment to rodent chaos.</p><small>Signed with a tiny paw • Pip</small></div><button className="primary" onClick={download}><Download/> Download your certificate</button></section>}
 </main>
}
