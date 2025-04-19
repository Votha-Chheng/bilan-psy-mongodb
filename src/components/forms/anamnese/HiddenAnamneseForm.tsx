import { Input } from '@/components/ui/input'
import { Anamnese } from '@prisma/client'
import { useParams } from 'next/navigation'
import React, { FC } from 'react'

type HiddenAnamneseFormProps = {
  value: string
  keyAnamnese: keyof Anamnese
}

const HiddenAnamneseForm: FC<HiddenAnamneseFormProps> = ({value, keyAnamnese}) => {
  const {id: patientId} = useParams<{id: string}>()
  return (
    <>
      <Input type='hidden' name="value" value={value}/>
      <Input type='hidden' name="key" value={keyAnamnese} />
      <Input type='hidden' name="patientId" value={patientId}/>
    </>
  )
}

export default HiddenAnamneseForm