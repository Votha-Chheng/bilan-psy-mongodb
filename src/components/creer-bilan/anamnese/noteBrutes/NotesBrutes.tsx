import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { convertToHtml } from '@/utils/convertFunctions'
import React, { FC } from 'react'

type NotesBrutesProps = {
  search: string
}

const NotesBrutes: FC<NotesBrutesProps> = ({search}) => {
  const {anamneseResults} = useAnamneseSearchDBStore()
  const notesBrutes = anamneseResults?.notesBrutes

  return (
    <div className='max-h-[650px] overflow-y-scroll border border-slate-300 rounded-lg p-2'>
      <p dangerouslySetInnerHTML={{__html: convertToHtml(notesBrutes)}}/>
    </div>
  )
}

export default NotesBrutes
