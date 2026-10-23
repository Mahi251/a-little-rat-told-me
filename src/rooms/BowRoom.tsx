import { useState } from 'react'
import { motion } from 'motion/react'
import { Pip } from '../components/Pip'
import { SpeechBubble } from '../components/SpeechBubble'
import { RoomShell } from '../components/RoomShell'

const objects = [
  ['mirror','◯','Warning: Extremely cute human detected.'],['plushie','ʕ•ᴥ•ʔ','This plushie has been waiting 400 years for a hug.'],['bow','⋈','Pip has acquired +100 cuteness.'],['window','☼','A beautiful day to commit absolutely zero crimes. Probably.'],['bed','▰','Certified cozy zone. No responsibilities allowed.'],['star','✦','This star is trying its best. Relatable.'],
]
export function BowRoom({ onComplete, play }: { onComplete: () => void; play: () => void }) {
  const [found, setFound] = useState<string[]>([]); const [line, setLine] = useState('Tap three things. Pip has prepared a very official inspection.')
  const inspect = (id:string, text:string) => { setFound(x => [...new Set([...x,id])]); setLine(text); play() }
  return <RoomShell className="bow-room" eyebrow="Room one" title="The Pink Bow Room" onNext={onComplete} nextDisabled={found.length < 3} nextLabel={found.length < 3 ? `${3-found.length} more things to inspect` : 'Accept your first heart'}>
    <div className="bedroom-scene"><div className="curtain left"/><div className="curtain right"/><div className="rug"/><Pip mood={found.length >= 3 ? 'proud' : 'happy'} size={190}/>
      <div className="object-grid">{objects.map(([id,icon,text]) => <motion.button whileTap={{ scale:.86, rotate:id==='bow'?12:0 }} className={`room-object ${found.includes(id)?'found':''}`} key={id} onClick={() => inspect(id,text)} aria-label={`Inspect ${id}`}><span>{icon}</span><small>{id}</small></motion.button>)}</div>
    </div><SpeechBubble>{found.length >= 3 ? 'Excellent. Your cuteness inspection is complete.' : line}</SpeechBubble>
  </RoomShell>
}
