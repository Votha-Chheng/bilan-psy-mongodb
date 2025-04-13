
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/customHooks/useToast'
import { upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { CornerUpLeft, EditIcon, Loader2, Trash2Icon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useActionState, useEffect, useState } from 'react'

const CommentaireAccouchement = () => {
  const {id: patientId} = useParams<{id:string}>()
  const [state, formAction, isPending] = useActionState(upsertAnamneseBySingleKeyValueWithFormDataAction, {})
  const [editData, setEditData] = useState<boolean>(false)

  const {anamneseResults, updatePatientInfoFromDB} = usePatientInfoStore()
  const {accouchementCommentaire} = anamneseResults ?? {}

  const updateFunction = ()=> {
    updatePatientInfoFromDB(patientId)
  }
  useToast({state, updateFunction})

  useEffect(()=> {
    if(state.success){
      setEditData(false)
    }
  }, [state.success])

  return (
    <div className='flex flex-col gap-2 my-2.5'>
      <div className={`flex gap-x-2 items-center border border-transparent hover:border-slate-500 w-fit py-2 rounded-md mb-1`}> 
        <span className=' whitespace-nowrap px-2'>&bull; <span className='font-bold underline underline-offset-2'>Commentaire sur l'accouchement</span> : </span> 
        <span className={`${editData && "opacity-30"}`}>{accouchementCommentaire ?? <span className='italic opacity-30'>Aucun commentaire enregistré.</span>}</span>
        {
          editData
          ?
          <CornerUpLeft 
            size={20} 
            className={`cursor-pointer text-red-700`}
            onClick={()=> setEditData(false)}
          />
          :
          <div className='flex gap-5 items-center'>
            <EditIcon 
              size={20}
              className='cursor-pointer text-slate-400 hover:scale-110 hover:text-orange-400 transition-colors duration-100' 
              onClick={()=> setEditData(true)}
            />
            <form action={formAction} className='mt-1.5'>
              {
                isPending
                ?
                <Loader2 className='animate-spin' />
                :
                accouchementCommentaire 
                ?
                <button type='submit'>
                  <Input type='hidden' name="key" value="accouchementCommentaire" />
                  <Input type='hidden' name="value" value="undefined" />
                  <Input type='hidden' name="patientId" value={patientId} />
                  <Trash2Icon size={20} className='text-red-600 hover:text-red-500 cursor-pointer'/>
                </button>
                : 
                null
              }
            </form>
          </div>
        }

      </div>
      { 
        editData &&  
        <form className='flex gap-2' action={formAction}>
          <Button type='submit' disabled={isPending} className='bg-blue-500 hover:bg-blue-400'>
            Enregistrer le commentaire
          </Button>
          <Input type="text" defaultValue={accouchementCommentaire || state?.fields?.accouchementCommentaire || ""} name='value' className='placeholder:italic' placeholder="Commentaire sur l'accouchement..." />
          <Input type='hidden' name="key" value="accouchementCommentaire" />
          <Input type='hidden' name="patientId" value={patientId} />
        </form>
      }
      
    </div>
  )

}

export default CommentaireAccouchement
