
import { anamneseKeysAndLabels } from '@/datas/anamneseConstantes'
import React, { useState } from 'react'
import ChooseThemesAlt from '@/components/sharedUI/ChoseThemesAlt'
import { AnamneseResults } from '@/@types/Anamnese'
import CardWrapper from '../CardWrapper'
import AnamneseThemeCard from '../AnamneseThemeCard'
import { usePatientInfoStore } from '@/stores/patientInfoStore'

const AntecedentsBody = () => {
  const antecedentsThemes = anamneseKeysAndLabels.filter(theme => theme.domaine === "Antécédents médicaux personnels et suivis médicaux" && theme.theme)
  
  const {anamneseResults} = usePatientInfoStore()
  const {maladiesEventuelles, handicap, accompagnementSuivi, autresAntecedents} = anamneseResults ?? {}
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [keyToDelete, setKeyToDelete] = useState<keyof AnamneseResults|null>(null)
  const [themeToDelete, setThemeToDelete] = useState<string|null>(null)

  return (
    <div className='mb-20'>
      <ChooseThemesAlt
        listeThemes={antecedentsThemes} 
        openDialog={openDeleteDialog}
        setOpenDialog={setOpenDeleteDialog}
        setKeyToDelete={setKeyToDelete}
        setThemeToDelete={setThemeToDelete}
        themeToDelete={themeToDelete}
        keyToDelete={keyToDelete}
      />

      <CardWrapper themeLabel="Maladies éventuelles" >
        <AnamneseThemeCard
          keyLabel='maladiesEventuelles'
          label={"Maladies éventuelles"}
          data={maladiesEventuelles}
        />
      </CardWrapper>

      <CardWrapper themeLabel="Handicap" >
        <AnamneseThemeCard
          keyLabel='handicap'
          label={"Handicap"}
          data={handicap}
        />
      </CardWrapper>

      <CardWrapper themeLabel="Accompagnements et suivis" >
        <AnamneseThemeCard
          keyLabel='accompagnementSuivi'
          label={"Accompagnements et suivis"}
          data={accompagnementSuivi}
        />
      </CardWrapper>

      <CardWrapper themeLabel="Autres (antécédents)" >
        <AnamneseThemeCard
          keyLabel='autresAntecedents'
          label={"Autres (antécédents)"}
          data={autresAntecedents}
        />
      </CardWrapper>
    </div>
  )
}

export default AntecedentsBody
