
import { anamneseKeysAndLabels } from '@/datas/anamneseConstantes'
import React, { useState } from 'react'
import ChooseThemesAlt from '@/components/sharedUI/ChoseThemesAlt'
import { AnamneseResults } from '@/@types/Anamnese'
import CardWrapper from '../CardWrapper'
import AnamneseThemeCard from '../AnamneseThemeCard'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { useParams } from 'next/navigation'

const AntecedentsBody = () => {
  const {id: patientId} = useParams<{id: string}>()
  const antecedentsThemes = anamneseKeysAndLabels.filter(theme => theme.domaine === "Antécédents médicaux personnels et suivis médicaux" && theme.theme)
  
  const {anamneseResults, updateAnamneseResultsByPatientId} = useAnamneseSearchDBStore()
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
          updateFunctionFromStore= {()=> updateAnamneseResultsByPatientId(patientId)}
        />
      </CardWrapper>

      <CardWrapper themeLabel="Accompagnements et suivis" >
        <AnamneseThemeCard
          keyLabel='accompagnementSuivi'
          label={"Accompagnements et suivis"}
          data={accompagnementSuivi}
          updateFunctionFromStore= {()=> updateAnamneseResultsByPatientId(patientId)}
        />
      </CardWrapper>

      <CardWrapper themeLabel="Handicap" >
        <AnamneseThemeCard
          keyLabel='handicap'
          label={"Handicap"}
          data={handicap}
          updateFunctionFromStore= {()=> updateAnamneseResultsByPatientId(patientId)}
        />
      </CardWrapper>

      <CardWrapper themeLabel="Autres (antécédents)" >
        <AnamneseThemeCard
          keyLabel='autresAntecedents'
          label={"Autres (antécédents)"}
          data={autresAntecedents}
          updateFunctionFromStore= {()=> updateAnamneseResultsByPatientId(patientId)}
        />
      </CardWrapper>
    </div>
  )
}

export default AntecedentsBody
