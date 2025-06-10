import { bilanMedicalKeys, listeBilansMedicaux } from '@/@types/Anamnese'
import BilanMedicalCard from './BilanMedicalCard'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

const BilansMedicaux = () => {
  const {loadingBilansMedicaux, bilanMedicauxResults} = useAnamneseSearchDBStore()
  const {selectedBilans} = bilanMedicauxResults ?? {}

  const [selectedBilansLocal, setSelectedBilanLocal] = useState<string[]>([])

  useEffect(()=> {
    if(!bilanMedicauxResults) return
    setSelectedBilanLocal(selectedBilans ?? [])
  }, [bilanMedicauxResults])

  return (
    <div className='mx-5 mt-2 w-full min-h-64'>
      {
        loadingBilansMedicaux
        ?
        <div className='w-full flex flex-col items-center justify-center'>
          <p>Chargement des données...</p>
          <Loader2 className='animate-spin' />
        </div>
        :
        listeBilansMedicaux.map((bilan, index)=> (
          <BilanMedicalCard
            setSelectedBilans={setSelectedBilanLocal}
            selectedBilans={selectedBilansLocal}
            key={index}
            keyBilan={bilanMedicalKeys[index]}
            bilanNom={bilan}
          />
        ))
      }
    </div>
  )
}

export default BilansMedicaux
