import AnamneseItemLayout from '@/components/layouts/AnamneseItemLayout'
import { anamneseKeysAndLabels } from '@/datas/anamneseConstantes'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { MoveRight } from 'lucide-react'
import React, { FC, useState } from 'react'
import AnamneseThemeCard from '../AnamneseThemeCard'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import ChooseThemesAlt from '@/components/sharedUI/ChoseThemesAlt'
import { AnamneseResults } from '@/@types/Anamnese'
import CardWrapper from '../CardWrapper'

type FamillePartProps = {
  
}

const FamillePart: FC<FamillePartProps> = ({}) => {
  const familleThemes = anamneseKeysAndLabels.filter(theme => theme.domaine === "Famille")

  const {anamneseResults} = usePatientInfoStore()
  const {fratrie, compositionFamiliale} = anamneseResults ?? {}

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [keyToDelete, setKeyToDelete] = useState<keyof AnamneseResults|null>(null)
  const [themeToDelete, setThemeToDelete] = useState<string|null>(null)

  return (
    <AnamneseItemLayout >
      <div className='flex gap-x-2 font-bold mb-5'>
        <MoveRight/> Choisir les thèmes qui vous semblent pertinents pour décrire la famille du patient.
      </div>
      <div className='flex justify-center gap-x-3 mb-5' >
        <ChooseThemesAlt 
          listeThemes={familleThemes} 
          setOpenDialog={setOpenDeleteDialog} 
          setKeyToDelete={setKeyToDelete}
          openDialog={openDeleteDialog} 
          themeToDelete={themeToDelete}
          setThemeToDelete={setThemeToDelete} 
          keyToDelete={keyToDelete}
        />
      </div> 
      <CardWrapper themeLabel='Fratrie'>
        <AnamneseThemeCard
          label="Fratrie"
          keyLabel="fratrie"
          data={fratrie}
        />
      </CardWrapper>

      <CardWrapper themeLabel='Composition familiale'>
        <AnamneseThemeCard
          label="Composition familiale"
          keyLabel="compositionFamiliale"
          data={compositionFamiliale}
        />
      </CardWrapper>
    </AnamneseItemLayout>
  )
}

export default FamillePart