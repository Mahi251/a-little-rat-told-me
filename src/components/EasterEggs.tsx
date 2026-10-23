import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { personalization } from '../config/personalization'

const secrets:Record<number,{symbol:string;message:string;label:string}>={
 1:{symbol:'◒',message:'A sleepy rat fell out of the moon. She would like five more minutes.',label:'the tiny moon'},
 2:{symbol:'⋈',message:'The forbidden bow is now enormous. Pip regrets nothing.',label:'a suspicious bow'},
 3:{symbol:'✿',message:"Cole-rat is blushing so hard he has become 40% more pink.",label:'a tiny flower'},
 4:{symbol:'⌁',message:'MOIRA MODE: purple science levels are now legally concerning.',label:'a glowing flask'},
 5:{symbol:'★',message:'A flying rat has earned a license printed in crayon.',label:'a gold star'},
 6:{symbol:'♜',message:'The cape whispers: add more drama.',label:'a tiny gothic tower'},
 7:{symbol:'◇',message:'Golden cheese found! A special rat has been dispatched.',label:'golden cheese'},
 9:{symbol:'·',message:'You booped the invisible rat. It booped back.',label:'something suspicious'},
}
export function EasterEggs({scene,onSecret}:{scene:number;onSecret?:(scene:number)=>void}){
 const [toast,setToast]=useState('');const [pipTaps,setPipTaps]=useState(0);const secret=secrets[scene]
 useEffect(()=>{if(!personalization.enableEasterEggs)return;const key=(e:KeyboardEvent)=>{if((keyBuffer+e.key.toUpperCase()).slice(-5)==='MOIRA')setToast('Secret purple effect unlocked. The ethics committee has resigned.');keyBuffer=(keyBuffer+e.key.toUpperCase()).slice(-5)};addEventListener('keydown',key);return()=>removeEventListener('keydown',key)},[])
 const capture=(e:React.MouseEvent)=>{const el=e.target as HTMLElement;if(el.closest('[aria-label^="Pip the rat"]'))setPipTaps(v=>{if(v===4){setToast('Pip: “Please stop poking me. I am unionizing.”');return 0}return v+1})}
 if(!personalization.enableEasterEggs)return null
 return <div className="easter-layer" onClickCapture={capture}>{secret&&<button className={`secret secret-${scene}`} onClick={()=>{setToast(secret.message);onSecret?.(scene)}} aria-label={`Inspect ${secret.label}`}>{secret.symbol}</button>}<AnimatePresence>{toast&&<motion.button className="toast" onClick={()=>setToast('')} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}}>{toast}</motion.button>}</AnimatePresence></div>
}
let keyBuffer=''
