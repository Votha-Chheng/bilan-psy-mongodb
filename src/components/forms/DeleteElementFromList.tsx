import { ServiceResponse } from '@/@types/ServiceResponse'
import { useToast } from '@/customHooks/useToast'
import { openSans } from '@/fonts/openSans'
import { Loader2, Trash2 } from 'lucide-react'
import React, { FC, useState } from 'react'

type DeleteElementFromListProps= {
  liste: string[]|null|undefined
  listeId: string|undefined|null
  updateFunction : ()=> void
  actionFunction: (listeId: string|undefined|null, value: string)=> Promise<ServiceResponse<any>>
}

const DeleteElementFromList: FC<DeleteElementFromListProps> = ({updateFunction, liste, listeId, actionFunction}) => {
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)

  const handleDeleteAction = async(listeId: string|undefined|null, value: string): Promise<void> => {
    setIsPending(true)
    const res = await actionFunction(listeId, value)
    res && setState(res)
    res && setIsPending(false)
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
        <p className='text-center'>Rien dans la liste</p>
      }
    </div>
  )
}

export default DeleteElementFromList
