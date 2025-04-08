import { AnamneseDTO, AnamneseResults, AnamneseResultsDomaineKeyLabel, AnamneseTheme } from '@/@types/Anamnese'
import React, { FC } from 'react'
import { Badge } from '../ui/badge'

type ChooseThemesProps = {
  listeThemes: AnamneseResultsDomaineKeyLabel[]
  chosenThemes: string[]
  handleChosenThemes: (theme: string, keyTheme: keyof AnamneseResults)=> void
}

const ChooseThemes: FC<ChooseThemesProps> = ({listeThemes, chosenThemes, handleChosenThemes}) => {

  return (
    <div className='flex justify-center gap-x-3 mb-5' >
      {
        listeThemes.map((theme: AnamneseResultsDomaineKeyLabel, index: number) => (
          <Badge 
            key={index} 
            variant="outline" 
            className={`mb-2 cursor-pointer text-sm font-bold tracking-wider ${chosenThemes.includes(theme.label) && "bg-slate-300"}`} 
            onClick={()=> handleChosenThemes(theme.label, theme.key)}
          >
            {theme.label}
          </Badge>
        ))
      }
    </div>  
  )
}

export default ChooseThemes