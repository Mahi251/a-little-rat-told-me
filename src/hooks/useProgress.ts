import { useCallback, useEffect, useState } from 'react'

const KEY = 'pip-progress-v1'
export type ColeProgress = { hugComplete: boolean; heartIds: string[] }
type Saved = { hearts: number[]; scene: number; cole: ColeProgress }
const emptyCole: ColeProgress = { hugComplete: false, heartIds: [] }

function read(): Saved {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) || '{}')
    const cole = value.cole && typeof value.cole === 'object' ? value.cole : emptyCole
    return { hearts: Array.isArray(value.hearts) ? value.hearts : [], scene: Number(value.scene) || 0, cole: { hugComplete: cole.hugComplete === true, heartIds: Array.isArray(cole.heartIds) ? cole.heartIds.filter((id: unknown): id is string => typeof id === 'string') : [] } }
  } catch { return { hearts: [], scene: 0, cole: emptyCole } }
}

export function useProgress() {
  const [saved, setSaved] = useState<Saved>(read)
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(saved)) }, [saved])
  const collect = useCallback((heart: number) => setSaved(s => ({ ...s, hearts: [...new Set([...s.hearts, heart])] })), [])
  const setScene = useCallback((scene: number) => setSaved(s => ({ ...s, scene })), [])
  const updateCole = useCallback((cole: ColeProgress) => setSaved(s => ({ ...s, cole })), [])
  const restart = useCallback(() => { localStorage.removeItem(KEY); setSaved({ hearts: [], scene: 0, cole: emptyCole }) }, [])
  return { ...saved, collect, setScene, updateCole, restart }
}
