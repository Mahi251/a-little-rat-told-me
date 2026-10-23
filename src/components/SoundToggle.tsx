import { Volume2, VolumeX } from 'lucide-react'

export function SoundToggle({ enabled, toggle }: { enabled: boolean; toggle: () => void }) {
  return <button className="icon-button sound" onClick={toggle} aria-label={enabled ? 'Mute sounds' : 'Enable sounds'}>{enabled ? <Volume2/> : <VolumeX/>}</button>
}
