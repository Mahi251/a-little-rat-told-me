import { motion } from 'motion/react'
import type { ReactNode } from 'react'

export function SpeechBubble({ children, tone = 'cream' }: { children: ReactNode; tone?: 'cream' | 'purple' | 'night' }) {
  return <motion.div className={`speech speech--${tone}`} initial={{ opacity: 0, scale: .92, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} role="status">{children}</motion.div>
}
