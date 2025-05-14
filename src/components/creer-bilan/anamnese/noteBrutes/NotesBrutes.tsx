import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { convertToHtml } from '@/utils/convertFunctions'
import React, { FC } from 'react'

type NotesBrutesProps = {
  search: string
}

const NotesBrutes: FC<NotesBrutesProps> = ({search}) => {
  const {anamneseResults} = useAnamneseSearchDBStore()
  const {notesBrutes} = anamneseResults ?? {}

  const escapeRegExp = (str: string): string => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

  const escaped = escapeRegExp(search);
  const regex = new RegExp(`(${escaped})`, "gi");

  // Découpage en conservant les matches
  const parts = notesBrutes?.split(regex);
  const lowerQuery = search.toLowerCase();

  if (!search || search === "") {
    return (
      <div className='max-h-[650px] overflow-y-scroll border border-slate-300 rounded-lg p-2'>
        <p dangerouslySetInnerHTML={{__html: convertToHtml(notesBrutes)}}/>
      </div>
    )  
  }

  return (
    <p className='max-h-[650px] overflow-y-scroll border border-slate-300 rounded-lg p-2' style={{ whiteSpace: "pre-wrap" }}>
      {parts && parts.map((part, idx) =>
        part.toLowerCase() === lowerQuery ? (
          <mark key={idx}>{part}</mark>
        ) : (
          <React.Fragment key={idx}>{part}</React.Fragment>
        )
      )}
    </p>
  )

}

export default NotesBrutes
