import { motion } from 'motion/react'

export type PipMood = 'happy' | 'excited' | 'confused' | 'mischievous' | 'proud' | 'sleepy' | 'shocked' | 'vampire' | 'scientist' | 'flying'
export type PipPose = 'normal' | 'reach-left' | 'reach-right' | 'cuddle-left' | 'cuddle-right'

export function Pip({ mood = 'happy', size = 190, className = '', onClick, pose = 'normal', eyesClosed = false, blush = false, facing = 'front' }: { mood?: PipMood; size?: number; className?: string; onClick?: () => void; pose?: PipPose; eyesClosed?: boolean; blush?: boolean; facing?: 'front' | 'left' | 'right' }) {
  const sleepy = mood === 'sleepy' || eyesClosed; const shocked = mood === 'shocked'; const vamp = mood === 'vampire'; const faceShift = facing === 'left' ? -3 : facing === 'right' ? 3 : 0
  const reachesLeft = pose === 'reach-left' || pose === 'cuddle-left'; const reachesRight = pose === 'reach-right' || pose === 'cuddle-right'
  return <motion.div role={onClick ? 'button' : 'img'} tabIndex={onClick ? 0 : undefined} aria-label={`Pip the rat looks ${mood}`} className={`pip ${className}`} style={{ width: size }} onClick={onClick}
    animate={{ y: [0, -3, 0], rotate: mood === 'excited' ? [0, -2, 2, 0] : 0 }} transition={{ repeat: Infinity, duration: mood === 'excited' ? 1.4 : 3.2 }}>
    <svg viewBox="0 0 220 210" role="img" aria-hidden="true">
      <motion.path d="M169 147 C221 144 215 192 180 184" fill="none" stroke="#e88baa" strokeWidth="9" strokeLinecap="round" animate={{ d: ["M169 147 C221 144 215 192 180 184", "M169 147 C213 126 225 173 189 184", "M169 147 C221 144 215 192 180 184"] }} transition={{ repeat: Infinity, duration: 2.8 }}/>
      <circle cx="58" cy="61" r="31" fill="#f8c8dc" stroke="#8b6655" strokeWidth="5"/><circle cx="162" cy="61" r="31" fill="#f8c8dc" stroke="#8b6655" strokeWidth="5"/>
      <circle cx="58" cy="61" r="18" fill="#ffe8f1"/><circle cx="162" cy="61" r="18" fill="#ffe8f1"/>
      <path d="M110 39c-53 0-78 34-71 92 6 49 37 68 71 68s65-19 71-68c7-58-18-92-71-92z" fill="#fff6dc" stroke="#8b6655" strokeWidth="6"/>
      <path d="M83 44c2-28 17-34 27-13 8-25 25-13 22 15-15-8-34-8-49-2z" fill="#ef78a1" stroke="#8b6655" strokeWidth="4" strokeLinejoin="round"/>
      <path d="M55 24c12 0 19 7 22 18-7-4-11-3-16 4-4-10-9-15-20-17 5-3 9-5 14-5zM165 24c-12 0-19 7-22 18 7-4 11-3 16 4 4-10 9-15 20-17-5-3-9-5-14-5z" fill="#e88baa" stroke="#8b6655" strokeWidth="3"/>
      {sleepy ? <><path d={`M${72 + faceShift} 108q13 10 26 0M${122 + faceShift} 108q13 10 26 0`} fill="none" stroke="#57434b" strokeWidth="6" strokeLinecap="round"/></> : <><motion.ellipse cx={85 + faceShift} cy="109" rx={shocked ? 8 : 6} ry={shocked ? 12 : 9} fill="#57434b" animate={{ scaleY: [1, 1, .1, 1] }} transition={{ repeat: Infinity, duration: 4.5 }}/><motion.ellipse cx={135 + faceShift} cy="109" rx={shocked ? 8 : 6} ry={shocked ? 12 : 9} fill="#57434b" animate={{ scaleY: [1, 1, .1, 1] }} transition={{ repeat: Infinity, duration: 4.5 }}/></>}
      <circle cx="65" cy="132" r={blush ? 14 : 10} fill={blush ? '#ef78a1' : '#f7b5cc'} opacity={blush ? '.9' : '.65'}/><circle cx="155" cy="132" r={blush ? 14 : 10} fill={blush ? '#ef78a1' : '#f7b5cc'} opacity={blush ? '.9' : '.65'}/>
      <path d="M101 128q9-8 18 0-3 9-9 9t-9-9z" fill="#e88baa" stroke="#8b6655" strokeWidth="3"/>
      <path d={shocked ? "M100 149q10-13 20 0q-10 13-20 0" : mood === 'confused' ? "M99 151q10-5 22 1" : "M95 145q15 16 30 0"} fill={shocked ? '#57434b' : 'none'} stroke="#57434b" strokeWidth="4" strokeLinecap="round"/>
      {vamp && <><path d="M98 147l7 18 6-16M122 147l-7 18-6-16" fill="#fff" stroke="#57434b" strokeWidth="2"/><path d="M56 154Q21 166 15 205l75-21zM164 154q35 12 41 51l-75-21z" fill="#593260" stroke="#8b6655" strokeWidth="4"/></>}
      {mood === 'scientist' && <><path d="M61 171l-13 36h124l-13-36-24 17-25-7-25 7z" fill="#f4effc" stroke="#67456e" strokeWidth="5"/><path d="M70 91h32M118 91h32M102 91h16" stroke="#7b5aad" strokeWidth="6"/><circle cx="86" cy="105" r="19" fill="#b89ee8" fillOpacity=".22" stroke="#7b5aad" strokeWidth="5"/><circle cx="134" cy="105" r="19" fill="#f3c44e" fillOpacity=".24" stroke="#b48215" strokeWidth="5"/></>}
      {mood === 'flying' && <><path d="M48 128Q0 94 20 169q24-21 49-9M172 128q48-34 28 41-24-21-49-9" fill="#fff" stroke="#bda6db" strokeWidth="5"/><ellipse cx="110" cy="46" rx="31" ry="10" fill="none" stroke="#f0c64d" strokeWidth="5"/></>}
      {mood === 'proud' && <path d="M70 92q15-13 29 0M121 92q15-13 29 0" fill="none" stroke="#57434b" strokeWidth="5" strokeLinecap="round"/>}
      {mood === 'proud' && <><path d="M67 99h37l-4 21H73zM116 99h37l-6 21h-27z" fill="#3e3140" stroke="#8b6655" strokeWidth="3"/><path d="M104 105h12" stroke="#8b6655" strokeWidth="4"/></>}
      <circle cx="76" cy="164" r="10" fill="#fff6dc" stroke="#8b6655" strokeWidth="4"/><circle cx="144" cy="164" r="10" fill="#fff6dc" stroke="#8b6655" strokeWidth="4"/>
      {reachesLeft && <><path d="M78 160Q52 151 25 162" fill="none" stroke="#8b6655" strokeWidth="15" strokeLinecap="round"/><path d="M78 160Q52 151 25 162" fill="none" stroke="#fff6dc" strokeWidth="9" strokeLinecap="round"/><circle cx="24" cy="162" r="8" fill="#fff6dc" stroke="#8b6655" strokeWidth="3"/></>}
      {reachesRight && <><path d="M142 160q26-9 53 2" fill="none" stroke="#8b6655" strokeWidth="15" strokeLinecap="round"/><path d="M142 160q26-9 53 2" fill="none" stroke="#fff6dc" strokeWidth="9" strokeLinecap="round"/><circle cx="196" cy="162" r="8" fill="#fff6dc" stroke="#8b6655" strokeWidth="3"/></>}
    </svg>
  </motion.div>
}
