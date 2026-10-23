import { Heart } from 'lucide-react'

export function ProgressHearts({ hearts, onVisit }: { hearts: number[]; onVisit: (scene: number) => void }) {
  return <nav className="progress" aria-label="Collected hearts and completed rooms">
    {[1,2,3,4,5,6].map(n => <button key={n} disabled={!hearts.includes(n)} onClick={() => onVisit(n + 1)} aria-label={hearts.includes(n) ? `Revisit room ${n}` : `Room ${n} not completed`}><Heart fill={hearts.includes(n) ? 'currentColor' : 'none'} /></button>)}
  </nav>
}
