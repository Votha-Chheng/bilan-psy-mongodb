import { bilanMedicalKeys, listeBilansMedicaux } from '@/@types/Anamnese'
import BilanMedicalCard from './BilanMedicalCard'

const BilansMedicaux = () => {

  return (
    <div className='mb-5 mx-5 mt-2 w-full'>
      {
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
