import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import React, { FC } from 'react'

type NotesBrutesProps = {
  search: string
}

const NotesBrutes: FC<NotesBrutesProps> = ({search}) => {
  const {anamneseResults} = useAnamneseSearchDBStore()
  const notesBrutes = anamneseResults?.notesBrutes

  const convertToHtml = (text: string|null|undefined) => {
    if(!text) return ""
    const html = text.replace(/\n/g, '<br />')
    return html
  }

  return (
    <div className='max-h-[650px] overflow-y-scroll border border-slate-300 rounded-lg p-2'>
      <p dangerouslySetInnerHTML={{__html: convertToHtml(notesBrutes)}}/>
    </div>
  )
}

export default NotesBrutes
