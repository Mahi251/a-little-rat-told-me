import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

export function RoomShell({ className, eyebrow, title, children, nextLabel, onNext, nextDisabled }: { className: string; eyebrow: string; title: string; children: ReactNode; nextLabel?: string; onNext?: () => void; nextDisabled?: boolean }) {
  return <main className={`room ${className}`}><header className="room-title"><span>{eyebrow}</span><h1>{title}</h1></header><div className="room-content">{children}</div>{onNext && <button className="primary next" disabled={nextDisabled} onClick={onNext}>{nextLabel || 'Next room'}<ChevronRight/></button>}</main>
}
