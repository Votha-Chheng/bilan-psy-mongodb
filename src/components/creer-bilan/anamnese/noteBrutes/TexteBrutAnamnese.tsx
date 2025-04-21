import { ServiceResponse } from '@/@types/ServiceResponse'
import RecueilProposForm from '@/components/forms/RecueilProposForm'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import useAutoSave from '@/customHooks/useAutoSave'
import { useToast } from '@/customHooks/useToast'
import { saveTextBrutAnamneseAction } from '@/serverActions/anamneseActions'
import { useParams } from 'next/navigation'
import React, { FC, useEffect, useMemo, useState } from 'react'
import AnamneseTitleItem from '../AnamneseTitleItem'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'


const TexteBrutAnamnese: FC = () => {
  const {id} = useParams<{id: string}>()
  const {anamneseResults, getAnamneseResultsByPatientId} = useAnamneseSearchDBStore()
  const {notesBrutes} = anamneseResults ?? {}
  const [state, setState] = useState<ServiceResponse<any>>({})

  const [text, setText] = useState<string>("")

  const savetext = async(text: string, id: string)=> {
    const res = await saveTextBrutAnamneseAction(text, id)
    res && setState(res)
  }

  const preventAutoSave: boolean = useMemo(()=> {
    return (text.trim() === "") || (text === notesBrutes)
  }, [text, notesBrutes])

  useEffect(()=> {
    if(anamneseResults?.notesBrutes ){
      setText(notesBrutes ?? "")
    }
  }, [notesBrutes])

  const updateFunction = ()=> {
    getAnamneseResultsByPatientId(id)
  }

  const autosaveFunction = ()=> {
    savetext(text, id)
  }

  useToast({ state, updateFunction })
  useAutoSave({preventAutoSave, delay:3, autosaveFunction, dependenciesArray: [text]})

  return (
    <article className="min-w-full max-w-full px-5">
      <AnamneseTitleItem/>
      <Separator className='my-5' />
      <RecueilProposForm />
      <h3 className='font-bold italic my-5'>
        Prenez des notes brutes de ce que vous dit le patient pour pouvoir l'organiser plus tard dans les différentes parties de l'anamnèse. Le texte est enregistré automatiquement 10 secondes après la dernière frappe de touche.
      </h3>
      <Textarea value={text} className='placeholder:italic min-h-96 max-h-[500px]' placeholder="Tapez votre brouillon d'anamnèse ici..." onChange={(event)=> setText(event.currentTarget.value)} />
    </article>
  )
}

export default TexteBrutAnamnese
