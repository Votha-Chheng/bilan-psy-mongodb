import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { deleteEcoleByIdAction } from '@/serverActions/ecoleActions'
import { useEcoleStore } from '@/stores/ecoleStore'
import { Loader2Icon, Trash2 } from 'lucide-react'
import React, { useActionState, useEffect, useState } from 'react'

const DeleteEcoleForm = () => {
  const [state, formAction, isPending] = useActionState(deleteEcoleByIdAction, {})  
  const {listeEcoles, updateListeEcoles} = useEcoleStore()
  const [idEcole, setIdEcole] = useState<string>("")

  useEffect(()=> {
    updateListeEcoles()
    setIdEcole("")
  }, [state])

  return (
    <div className='flex flex-nowrap gap-x-7 gap-y-10'>
      {
        listeEcoles && listeEcoles.length>0 &&
        listeEcoles.map((ecole)=> (
          <div className='relative flex items-center gap-x-1' key={ecole.id}>
            <Badge className='text-sm px-2'>
              {ecole.nom}
            </Badge>
            <form action={formAction}>
              <Input type="hidden" value={ecole.id} name='ecoleId'/>
              <button className='bg-transparent hover:bg-transparent px-0 mt-1 w-fit' type="submit" onClick={()=> setIdEcole(ecole.id)}>
                {isPending && idEcole === ecole.id ? <Loader2Icon className='animate-spin' /> :<Trash2 className='text-red-700 cursor-pointer' size={20} />} 
              </button>
            </form>
          </div>
        ))
      }
    </div>
  )
}

export default DeleteEcoleForm