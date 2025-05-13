import { PraxiesGestuellesResultsDTO } from '@/@types/BilanTests'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/customHooks/useToast'
import { upsertPraxiesGestuellesByKeyValueAction } from '@/serverActions/testsActions/praxiesGestuellesActions'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { praxiesgestuelles } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'

type PrecisionPraxiesGestuellesProps = {
  precisionAvec: string
  stateLocal: string
  setStateLocal: Dispatch<SetStateAction<string>>
  keyPraxiesGestuelles: keyof PraxiesGestuellesResultsDTO
}

const PrecisionPraxiesGestuelles: FC<PrecisionPraxiesGestuellesProps> = ({precisionAvec, stateLocal, setStateLocal, keyPraxiesGestuelles}) => {
  const {bilanId, updatePraxiesGestuelles} = useBilanTestsStore()
  const [isPending, setIsPending] = useState<boolean>(false)
  // eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})
  
  const checkboxChoices = ["Les gestes sont adroits.", "Il y a une maladresse gestuelle.", "Une impulsivité motrice est présente."]
  
  const handleAddToState = async(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsPending(true)
    const [choice, precisionAvecElement] = event.currentTarget.id.split("~~")
    let newState = ""
    if(precisionAvecElement === precisionAvec){
      if(stateLocal.includes(choice)){
        newState = stateLocal.replace(choice.trim(), "").trim()
      } else {
        newState = stateLocal.trim() + " " + choice.trim()
      }
      const res = await upsertPraxiesGestuellesByKeyValueAction<string>(keyPraxiesGestuelles, newState, bilanId ?? "")
      // eslint-disable-next-line
      res.success && setStateLocal(newState)
      // eslint-disable-next-line
      res && setState(res)
      // eslint-disable-next-line
      res && setIsPending(false)
    }
  }

  const updateFunction = ()=> {
    updatePraxiesGestuelles(bilanId)
  }
  useToast({state, updateFunction})

  return (
    <div>
      <p className='flex items-center gap-x-2 text-sm mb-2'>
        &bull; <span className='underline underline-offset-4'>Précision du geste {precisionAvec}</span> :
        <span className='italic'>{stateLocal === "" ? "(cocher les cases)": stateLocal}</span>
        {isPending && <Loader2 className='animate-spin'/>}
      </p>
      <div className='flex gap-x-5 ml-5'>
        {
          checkboxChoices.map((choice, index) => (
            <div className='flex items-center mb-2' key={index}>
              <Checkbox
                id={`${choice}~~${precisionAvec}`}
                checked={stateLocal.includes(choice)}
                onClick={(event)=> handleAddToState(event)}
                disabled={isPending}
                className='cursor-pointer'
              />
              <label htmlFor={`${choice}~~${precisionAvec}`} className='text-sm ml-2 cursor-pointer italic'>
                {choice}
              </label>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PrecisionPraxiesGestuelles