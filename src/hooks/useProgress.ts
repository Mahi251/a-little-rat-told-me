import { useCallback, useEffect, useState } from 'react'

const KEY = 'pip-progress-v1'
type Saved = { hearts: number[]; scene: number }

function read(): Saved {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) || '{}')
    return { hearts: Array.isArray(value.hearts) ? value.hearts : [], scene: Number(value.scene) || 0 }
  } catch { return { hearts: [], scene: 0 } }
}

export function useProgress() {
  const [saved, setSaved] = useState<Saved>(read)
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(saved)) }, [saved])
  const collect = useCallback((heart: number) => setSaved(s => ({ ...s, hearts: [...new Set([...s.hearts, heart])] })), [])
  const setScene = useCallback((scene: number) => setSaved(s => ({ ...s, scene })), [])
  const restart = useCallback(() => { localStorage.removeItem(KEY); setSaved({ hearts: [], scene: 0 }) }, [])
  return { ...saved, collect, setScene, restart }
}
