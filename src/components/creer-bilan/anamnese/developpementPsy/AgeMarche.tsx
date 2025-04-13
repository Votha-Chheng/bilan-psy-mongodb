import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { openSans } from '@/fonts/openSans'
import React, { useActionState, useEffect, useRef, useState } from 'react'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { useParams } from 'next/navigation'
import { useToast } from '@/customHooks/useToast'
import { Input } from '@/components/ui/input'
import AddElementToListForm from '@/components/forms/anamnese/AddElementToListForm'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { upsertListeAdjectifsAction } from '@/serverActions/listeActions'

const AgeMarche = () => {
  const {id: patientId} = useParams<{id: string}>()
  const [state, formAction, isPending] = useActionState(upsertAnamneseBySingleKeyValueWithFormDataAction, {})
  const {anamneseResults, updatePatientInfoFromDB} = usePatientInfoStore()
  const {ageMarche} = anamneseResults ?? {}
  const {adjectifs: raw} = useAnamneseSearchDBStore()
  const {id: listeId, adjectifs} = raw ?? {}

  const [ageMarcheLocal, setAgeMarcheLocal] = useState<string[]>(["", "undefined"])
  const [ageFocus, setAgeFocus] = useState<boolean>(false)

  const formRef = useRef<HTMLFormElement>(null)

  const handleChangeSemaines = (value: string)=> {
    let newState = [...ageMarcheLocal] 
    newState[0] = value
    setAgeMarcheLocal(newState)
  }

  const handleChangeAdjectif = (value: string)=> {
    let newState = [...ageMarcheLocal] 
    newState[1] = value
    setAgeMarcheLocal(newState)
  }

  useEffect(()=> {
    if(ageMarche) {
      setAgeMarcheLocal(ageMarche)
    }
  }, [ageMarche])

  useEffect(()=> {
    if(!ageMarche && ageMarcheLocal[0] === "" && ageMarcheLocal[1]==="undefined") return
    if(ageMarcheLocal[0] === "" && ageMarcheLocal[1]==="undefined") return
    if(ageMarche && ageMarcheLocal[0] === ageMarche[0] && ageMarcheLocal[1]===ageMarche[1]) return
    if(ageFocus) return
    formRef.current?.requestSubmit()
  }, [ageMarche, ageMarcheLocal, ageFocus])

  const updateFunction = ()=> {
    updatePatientInfoFromDB(patientId)
  }
  useToast({state, updateFunction})

  return (
    <Card className='px-7.5 pt-1.5 mb-4 gap-0'>
      <div className='flex gap-2.5 items-center'>
        <div>&bull; <span className='underline font-bold underline-offset-2'>Âge de la marche</span> : </div>
        <Input className="w-20" type="number" value={+ageMarcheLocal[0]} onChange={(event)=> handleChangeSemaines(event.currentTarget.value)} onBlur={()=> setAgeFocus(false)} onFocus={()=> setAgeFocus(true)} />
        <p className='font-bold'>mois chez un enfant décrit comme :</p>
        <Select disabled={isPending} value={ageMarcheLocal[1].toString()} onValueChange={(value: string)=> handleChangeAdjectif(value)}>
          <SelectTrigger className={`w-64 tracking-wide font-normal ${openSans.className}`} >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="undefined">Non pris en compte</SelectItem>
            {
              adjectifs && adjectifs.map((value, index)=> (
                <SelectItem className={`font-normal tracking-wide ${openSans.className}`} key={index} value={value}>{value}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
        |
        <AddElementToListForm
          listeElements={adjectifs} 
          listeId={listeId}
          elementToAddLabel="un adjectif"
          keyListe="adjectifs"
          actionFunction={upsertListeAdjectifsAction}
        />
      </div>

      <form action={formAction} ref={formRef} className='flex items-center gap-2.5'>
        <input type='hidden' name='key' value="ageMarche" />
        <input type='hidden' name='value' value={JSON.stringify(ageMarcheLocal)}/>
        <input type='hidden' name='patientId' value={patientId}/>
      </form>
    </Card>
  )
}

export default AgeMarche
