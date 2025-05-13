import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { deleteMedecinAction } from '@/serverActions/medecinActions'
import { useMedecinStore } from '@/stores/medecinStore'
import { Loader2Icon, Trash2 } from 'lucide-react'
import React, { useActionState, useEffect, useState } from 'react'

const DeleteMedecinForm = () => {
  const [state, formAction, isPending] = useActionState(deleteMedecinAction, {})  
  const {listeMedecins, updateListeMedecins} = useMedecinStore()
  const [idMedecin, setIdMedecin] = useState<string>("")

  useEffect(()=> {
    updateListeMedecins()
    setIdMedecin("")
  }, [state])

  return (
    <div className='flex flex-nowrap gap-x-7 gap-y-10'>
      {
        listeMedecins && listeMedecins.length>0 &&
        listeMedecins.map((medecin)=> (
          <div className='relative flex items-center gap-x-1' key={medecin.id}>
            <Badge className='text-sm px-2'>
              {medecin.nom}
            </Badge>
            <form action={formAction}>
              <Input type="hidden" value={medecin.id} name='medecinId'/>
              <button className='bg-transparent hover:bg-transparent px-0 mt-1 w-fit' type="submit" onClick={()=> setIdMedecin(medecin.id)}>
                {isPending && idMedecin === medecin.id ? <Loader2Icon className='animate-spin' /> :<Trash2 className='text-red-700 cursor-pointer' size={20} />} 
              </button>
            </form>
          </div>
        ))
      }
    </div>
  )
}

export default DeleteMedecinForm