import { ServiceResponse } from '@/@types/ServiceResponse'
import ConclusionTextListDialog from '@/components/sharedUI/alertsAndDialogs/ConclusionTextListDialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import useAutoSave from '@/customHooks/useAutoSave'
import { useToast } from '@/customHooks/useToast'
import { upsertConclusionByKeyValueAction } from '@/serverActions/conclusionActions'
import { useConclusionStore } from '@/stores/conclusionStore'
import { Eye, MoveRight } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useRef, useState } from 'react'

const ConclusionText = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {conclusion, updateConclusionByPatientId} = useConclusionStore()
  const {conclusionCommentaires} = conclusion ?? {}
// eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [textConclusion, setTextConclusion] = useState<string>("")
  const [textIsFocused, setTextIsFocused] = useState<boolean>(false)
  
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const savetext = async()=> {
    setIsPending(true)
    const res = await upsertConclusionByKeyValueAction<string>("conclusionCommentaires", textConclusion, patientId)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)
  }

  const preventAutoSave: boolean = useMemo(()=> {
    return (textConclusion.trim() === "") || (conclusionCommentaires === textConclusion)
  }, [conclusionCommentaires, textConclusion])

  useEffect(()=> {
    if(!conclusionCommentaires) return
    setTextConclusion(conclusionCommentaires ?? "")
    
  }, [conclusionCommentaires])

  useEffect(() => {
    if(state.success && textIsFocused){
      const input = inputRef.current;
      if (input) {
        input.focus();                              // donne le focus
        const len = input.value.length;             // longueur du texte
        // place la sélection (ici juste le curseur) en fin de texte
        input.setSelectionRange(len, len);
      }
    }
  }, [textConclusion, state])


  useToast({ state, updateFunction: ()=> updateConclusionByPatientId(patientId) })
  useAutoSave({preventAutoSave, delay:3, autosaveFunction: ()=> savetext(), dependenciesArray: [textConclusion]})

  return (
    <div className='px-5 my-5'>
      <ConclusionTextListDialog open={openDialog} setOpen={setOpenDialog} />
      <div className='flex items-center mb-2.5'>
        <MoveRight className='mr-2'/> <span className='underline underline-offset-2 font-bold mr-2'>Conclusion</span> :
        <Button className='ml-5' onClick={()=> setOpenDialog(true)}>
          <Eye/> Voir les anciennes conclusions enregistrées
        </Button>
      </div>
      <Textarea 
        onFocus={()=> setTextIsFocused(true)}
        onBlur={()=> setTextIsFocused(false)}
        ref={inputRef}
        disabled={isPending}
        value={textConclusion} 
        className='placeholder:italic h-64 w-full' 
        placeholder="Ecrivez le texte de votre conclusion ici. La sauvegarde est automatique..." 
        onChange={(event)=> setTextConclusion(event.currentTarget.value)} 
      />
    </div>
  )
}

export default ConclusionText