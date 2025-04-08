import RecueilProposForm from '@/components/forms/RecueilProposForm'
import AnamneseItemLayout from '@/components/layouts/AnamneseItemLayout'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { saveTextBrutAnamneseAction } from '@/serverActions/anamneseActions'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { useTextBrutAnamneseStore } from '@/stores/textBrutAnamneseStore'
import { useParams } from 'next/navigation'
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { set } from 'zod'

type TexteBrutAnamneseProps = {
  setPartieAnamnese: Dispatch<SetStateAction<number>>
  partieAnamnese: number
}

const TexteBrutAnamnese: FC<TexteBrutAnamneseProps> = ({ partieAnamnese, setPartieAnamnese }) => {
  const {id} = useParams<{id: string}>()
  const {anamneseResults, updatePatientInfoFromDB} = usePatientInfoStore()

  const [text, setText] = useState<string>("")
  const [success, setSuccess] = useState<boolean|undefined>(undefined)
  const [message, setMessage] = useState<string>("")

  const savetext = async(text: string, id: string)=> {
    const res = await saveTextBrutAnamneseAction(text, id)
    setSuccess(res?.success)
    res && updatePatientInfoFromDB(id)
    res && setMessage(res?.message ?? "")
    res.success && setText(res?.data ?? "")
  }

  useEffect(()=> {
    if(anamneseResults?.notesBrutes ){
      setText(anamneseResults?.notesBrutes)
    }
  }, [anamneseResults?.notesBrutes])

  useEffect(() => {
    if (text.trim() === "") return
    if (text === anamneseResults?.notesBrutes) return
    // Lancer un timer de 10 secondes à chaque changement de "text"
    const timer = setTimeout(() => {
      // Ici, on effectue l'action de sauvegarde
      savetext(text, id)
    }, 2000);

    // Nettoyage : si "text" change avant les 5 secondes, on annule le timer
    return () => clearTimeout(timer);
  }, [text])

  useEffect(()=> {
    if(success===true){
      toast.success(message)
    }
    if(success===false){
      toast.error(message)
    }
  }, [anamneseResults])

  return (
    <AnamneseItemLayout setPartieAnamnese={setPartieAnamnese}  partieAnamnese={partieAnamnese} >
      <RecueilProposForm />
      <h3 className='font-bold italic my-5'>
        Prenez des notes brutes de ce que vous dit le patient pour pouvoir l'organiser plus tard dans les différentes parties de l'anamnèse. Le texte est enregistré automatiquement 10 secondes après la dernière frappe de touche.
      </h3>
      <Textarea value={text} className='placeholder:italic min-h-96 max-h-[500px]' placeholder="Tapez votre brouillon d'anamnèse ici..." onChange={(event)=> setText(event.currentTarget.value)} />
    </AnamneseItemLayout>
  )
}

export default TexteBrutAnamnese
