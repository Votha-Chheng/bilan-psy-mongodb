import { ConnaissancesDroiteGaucheResultsDTO } from '@/@types/BilanTests'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { allTests } from '@/datas/listeTests'
import { upsertConnaisanceDroiteGaucheByKeyValueAction } from '@/serverActions/testsActions/connaissancesDroiteGaucheAction'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import React, { useState } from 'react'

const ConnaissanceDroiteGauche = () => {
  const {connaissancedroitegauche, updateConnaissancesDroiteGauche, bilanId} = useBilanTestsStore()
  const {surAutruiACote, surAutruiReversibilite, surSoi} = connaissancedroitegauche ?? {}
  const connaissancesDroiteGaucheTest = allTests.find(test => test.nom==="Connaissance droite/gauche")

  const [isPending, setIsPending] = useState<boolean>(false)
  // eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})

  const handleChangeConnaissanceDroiteGaucheAction = async(value: string, key: keyof ConnaissancesDroiteGaucheResultsDTO)=> {
    setIsPending(true)
    const res = await upsertConnaisanceDroiteGaucheByKeyValueAction<string>(key, value, bilanId ?? "")
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)
  }

  const updateFunction = ()=> {
    updateConnaissancesDroiteGauche(bilanId)
  }

  useToast({state, updateFunction})
  
  return (
    <Card className={`py-2 px-3.5 my-5 w-full`}>
      <p className='italic text-sm'>
        &#8227; <span className='font-bold'>{connaissancesDroiteGaucheTest?.nom?? ""}</span> : {connaissancesDroiteGaucheTest?.description ?? ` : ${connaissancesDroiteGaucheTest?.description}.`}
      </p>
      <article className='flex items-center'>
        <p className='text-sm flex items-center gap-x-2 mb-5 ml-5 border-r border-black pr-5'>
          &bull; <span className='underline underline-offset-4'>Sur soi</span> : 
          <Select value={surSoi ?? ""} onValueChange={(value)=> handleChangeConnaissanceDroiteGaucheAction(value, "surSoi")} disabled={isPending}>
            <SelectTrigger className="w-[150px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"acquise"}>acquise</SelectItem>
              <SelectItem value={"non-acquise"}>non-acquise</SelectItem>
            </SelectContent>
          </Select>
        </p>
        <p className='text-sm flex items-center gap-x-2 mb-5 ml-5 border-r border-black pr-5'>
          &bull; <span className='underline underline-offset-4'>Sur autrui à côté</span> : 
          <Select value={surAutruiACote ?? ""} onValueChange={(value)=> handleChangeConnaissanceDroiteGaucheAction(value, "surAutruiACote")} disabled={isPending}>
            <SelectTrigger className="w-[150px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"acquise"}>acquise</SelectItem>
              <SelectItem value={"non-acquise"}>non-acquise</SelectItem>
            </SelectContent>
          </Select>
        </p>
        <p className='text-sm flex items-center gap-x-2 mb-5 ml-5'>
          &bull; <span className='underline underline-offset-4'>Sur autrui en réversibilité </span> : 
          <Select value={surAutruiReversibilite ?? ""} onValueChange={(value)=> handleChangeConnaissanceDroiteGaucheAction(value, "surAutruiReversibilite")} disabled={isPending}>
            <SelectTrigger className="w-[150px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"acquise"}>acquise</SelectItem>
              <SelectItem value={"non-acquise"}>non-acquise</SelectItem>
            </SelectContent>
          </Select>
        </p>
      </article>
    </Card>
  )
}

export default ConnaissanceDroiteGauche
