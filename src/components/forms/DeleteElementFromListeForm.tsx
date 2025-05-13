import { ServiceResponse } from '@/@types/ServiceResponse'
import { useToast } from '@/customHooks/useToast'
import { openSans } from '@/fonts/openSans'
import { deleteDescriptionAction } from '@/serverActions/listeActions'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { Loader2, Trash2 } from 'lucide-react'
import React, { FC, useState } from 'react'

type DeleteElementFromListeFormProps = {
  liste: string[]|null
  listeId?: string
}

const DeleteElementFromListeForm: FC<DeleteElementFromListeFormProps> = ({liste, listeId}) => {
  const { getAutonomieDescriptionsListe} = useAnamneseSearchDBStore()
  // eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)

  const handleDeleteAction = async(listeId: string|undefined, value: string): Promise<void> => {
    setIsPending(true)
    const res = await deleteDescriptionAction(listeId, value)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)
  }
  const updateFunction = ()=> {
    getAutonomieDescriptionsListe()
  }

  useToast({state, updateFunction})

  return (
    <div className='flex gap-3.5 flex-wrap'>
      {
        liste && liste.length>0
        ?
        liste.map((val, index)=> (
          <div className='p-2.5 flex gap-3 border justify-between items-center border-slate-400 rounded-xl' key={index}>
            <p className={`${openSans.className} font-bold text-sm`}>{val}</p>
            {
              isPending
              ?
              <Loader2 className='animate-spin' />
              :
              <Trash2 size={17.5} className='text-red-700 hover:text-red-500 cursor-pointer' id={val} onClick={()=> handleDeleteAction(listeId, val) } />
            }
          </div>
        ))
        :
        <p className='text-center'>Pas d’adjectif dans la liste</p>
      }
    </div>
  )
}

export default DeleteElementFromListeForm