import React, { Dispatch, FC, SetStateAction, useActionState } from 'react'
import { Textarea } from '../ui/textarea'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import SubmitButton from '../ui/SubmitButton'
import { useParams } from 'next/navigation'
import ErrorMessage from '../ui/ErrorMessage'
import { getIssueMessage } from '@/utils/captureIssue'
import { updateMotifConsultation } from '@/serverActions/patientActions'
import { useToast } from '@/customHooks/useToast'

type MotifConsultationFormProps = {
  setChangeMotif: Dispatch<SetStateAction<boolean>>
}

const MotifConsultationForm: FC<MotifConsultationFormProps> = ({setChangeMotif}) => {
  const [state, formAction, isPending] = useActionState(updateMotifConsultation, {})
  const {id} = useParams<{id: string}>()
  const {patientInfoGenerales, updatePatientInfoFromDB} = usePatientInfoStore()

  const updateFunction = ()=> {
    updatePatientInfoFromDB(id)
    setChangeMotif(false)
  }

  useToast( {state, updateFunction} )
  
  return (
    <form action={formAction} className='relative'>
      <input type='hidden' name="patientId" value={id} />
      <Textarea className='mb-1.5' name="motif" defaultValue={patientInfoGenerales?.motif ?? ""} required />
      <SubmitButton full={false} label='Modifier le motif' className='bg-green-700' isPending={isPending} />
      <ErrorMessage display={Boolean(getIssueMessage("motif", state.issues))} message={(getIssueMessage("motif", state.issues))} />
    </form>
  )
}

export default MotifConsultationForm
