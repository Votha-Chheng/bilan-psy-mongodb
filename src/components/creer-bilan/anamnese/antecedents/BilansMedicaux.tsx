import { bilanMedicalKeys, listeBilansMedicaux } from '@/@types/Anamnese'
import BilanMedicalCard from './BilanMedicalCard'
import { useEffect } from 'react'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { Loader2 } from 'lucide-react'

const BilansMedicaux = () => {
  const {anamneseResults, initializeBilanMedicauxResults, loadingBilansMedicaux} = useAnamneseSearchDBStore()
  const {id} = anamneseResults ?? {}

  useEffect(()=> {
    if(!id) return
    initializeBilanMedicauxResults(id)
  }, [id])

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
