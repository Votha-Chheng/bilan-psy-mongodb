import { useEffect } from 'react'
type UseAutoSaveProps = {
  preventAutoSave: boolean
  autosaveFunction: ()=> void
  dependenciesArray: any[]
  delay: number
}

const useAutoSave = ({preventAutoSave, delay, autosaveFunction = ()=> {}, dependenciesArray}: UseAutoSaveProps) => {
  useEffect(() => {
    if (preventAutoSave) return
    // Lancer un timer de 10 secondes à chaque changement de "text"
    const timer = setTimeout(() => {
      // Ici, on effectue l'action de sauvegarde
      autosaveFunction()
    }, delay*1000);

    // Nettoyage : si "text" change avant les 5 secondes, on annule le timer
    return () => clearTimeout(timer);
  }, [...dependenciesArray])
}

export default useAutoSave
