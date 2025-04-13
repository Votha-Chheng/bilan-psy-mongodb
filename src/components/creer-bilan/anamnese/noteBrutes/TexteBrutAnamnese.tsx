import { ServiceResponse } from '@/@types/ServiceResponse'
import RecueilProposForm from '@/components/forms/RecueilProposForm'
import AnamneseItemLayout from '@/components/layouts/AnamneseItemLayout'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useAutoSave from '@/customHooks/useAutoSave'
import { useToast } from '@/customHooks/useToast'
import { saveTextBrutAnamneseAction } from '@/serverActions/anamneseActions'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { useTextBrutAnamneseStore } from '@/stores/textBrutAnamneseStore'
import { useParams } from 'next/navigation'
import React, { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { set } from 'zod'

type TexteBrutAnamneseProps = {
  
}

const TexteBrutAnamnese: FC<TexteBrutAnamneseProps> = ({ }) => {
  const {id} = useParams<{id: string}>()
  const {anamneseResults, updatePatientInfoFromDB} = usePatientInfoStore()
  const [state, setState] = useState<ServiceResponse<any>>({})

  const [text, setText] = useState<string>("")

  const savetext = async(text: string, id: string)=> {
    const res = await saveTextBrutAnamneseAction(text, id)
    res && setState(res)
    res && updatePatientInfoFromDB(id)
  }

  const preventAutoSave: boolean = useMemo(()=> {
    return (text.trim() === "") || (text === anamneseResults?.notesBrutes)
  }, [text, anamneseResults?.notesBrutes])

  useEffect(()=> {
    if(anamneseResults?.notesBrutes ){
      setText(anamneseResults?.notesBrutes)
    }
  }, [anamneseResults?.notesBrutes])

  const updateFunction = ()=> {
    updatePatientInfoFromDB(id)
  }

  const autosaveFunction = ()=> {
    savetext(text, id)
  }

  useToast({ state, updateFunction })
  useAutoSave({preventAutoSave, delay:3, autosaveFunction, dependenciesArray: [text]})

  return (
    <AnamneseItemLayout >
      <RecueilProposForm />
      <h3 className='font-bold italic my-5'>
        Prenez des notes brutes de ce que vous dit le patient pour pouvoir l'organiser plus tard dans les différentes parties de l'anamnèse. Le texte est enregistré automatiquement 10 secondes après la dernière frappe de touche.
      </h3>
      <Textarea value={text} className='placeholder:italic min-h-96 max-h-[500px]' placeholder="Tapez votre brouillon d'anamnèse ici..." onChange={(event)=> setText(event.currentTarget.value)} />
    </AnamneseItemLayout>
  )
}

export default TexteBrutAnamnese
