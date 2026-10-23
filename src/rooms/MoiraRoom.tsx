import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Pip } from '../components/Pip'
import { RoomShell } from '../components/RoomShell'
import { SpeechBubble } from '../components/SpeechBubble'
import { scoreOrb, type OrbKind, type TargetKind } from '../lib/gameLogic'

type Target = { id:number; kind:TargetKind; x:number; y:number }
const makeTargets = (round:number):Target[] => Array.from({length:6},(_,i)=>({id:round*10+i,kind:(i+round)%2?'heal':'damage',x:10+(i*17+round*9)%78,y:9+(i*29+round*11)%66}))
export function MoiraRoom({ onComplete, play }: { onComplete:()=>void; play:(k?:'click'|'sparkle')=>void }) {
  const [orb,setOrb]=useState<OrbKind>('heal'); const [targets,setTargets]=useState(()=>makeTargets(0)); const [score,setScore]=useState(0); const [time,setTime]=useState(30); const [round,setRound]=useState(0); const [done,setDone]=useState(false); const timer=useRef<number | undefined>(undefined)
  useEffect(()=>{ if(done)return; timer.current=window.setInterval(()=>setTime(t=>{if(t<=1){clearInterval(timer.current);setDone(true);return 0}return t-1}),1000); return()=>clearInterval(timer.current)},[done,round])
  const hit=(target:Target)=>{const points=scoreOrb(target.kind,orb);setScore(s=>s+points);play(points?'sparkle':'click');setTargets(ts=>ts.filter(t=>t.id!==target.id));if(targets.length===1){const next=round+1;setRound(next);setTargets(makeTargets(next))}}
  const restart=()=>{setScore(0);setTime(30);setRound(r=>r+1);setTargets(makeTargets(round+1));setDone(false)}
  return <RoomShell className="moira-room" eyebrow="Room three" title="Moira's Extremely Ethical Rat Laboratory" onNext={done?onComplete:undefined} nextLabel="Accept menace certification">
    <p className="subtitle">Ethics committee currently unavailable.</p><div className="lab"><Pip mood="scientist" size={165}/><div className="game-hud"><b>{time}s</b><b>Score {score}</b></div>
      <div className="orb-arena" aria-label="Orb Chaos game area">{targets.map(t=><motion.button key={t.id} className={`target target--${t.kind}`} style={{left:`${t.x}%`,top:`${t.y}%`}} aria-label={`${t.kind==='heal'?'Injured friend':'Hostile dummy'}: use ${t.kind} orb`} onClick={()=>hit(t)} initial={{scale:0}} animate={{scale:[1,1.08,1]}} transition={{repeat:Infinity,duration:1.5}}>{t.kind==='heal'?'＋':'×'}</motion.button>)}</div>
      <div className="orb-controls"><button className={`orb heal ${orb==='heal'?'selected':''}`} onClick={()=>setOrb('heal')}>Yellow healing orb</button><button className={`orb damage ${orb==='damage'?'selected':''}`} onClick={()=>setOrb('damage')}>Purple damage orb</button></div>
    </div>{done ? <><SpeechBubble tone="purple"><b>CERTIFIED MOIRA MENACE.</b><br/>Your Moira skills are genuinely terrifying. Somewhere, an enemy support player is crying.</SpeechBubble><button className="secondary" onClick={restart}>Play again</button></> : <SpeechBubble>Choose yellow for hurt friends and purple for hostile dummies. Very ethical. Probably.</SpeechBubble>}
  </RoomShell>
}
