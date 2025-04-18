import React, { useEffect, useState } from 'react'
import AgeMarche from './AgeMarche'
import ChooseThemes from '@/components/sharedUI/ChooseThemes'
import { anamneseKeysAndLabels } from '@/datas/anamneseConstantes'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { AnamneseResults } from '@/@types/Anamnese'
import { MoveRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import AnamneseThemeCard from '../AnamneseThemeCard'
import AccouchementCard from './AccouchementCard'
import AcquisitionLangage from './AcquisitionLangage'
import Continence from './Continence'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import ChooseThemesAlt from '@/components/sharedUI/ChoseThemesAlt'
import CardWrapper from '../CardWrapper'

const DevPsyBody = () => {
  const {anamneseResults} = usePatientInfoStore()
  const {grossesse, stationAssise, quadrupedie, sommeil, alimentation, autresDevPsy} = anamneseResults ?? {}
  const {chosenThemes} = useAnamneseSearchDBStore()

  const [editData, setEditData] = useState<string[]>([])
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [keyToDelete, setKeyToDelete] = useState<keyof AnamneseResults|null>(null)
  const [themeToDelete, setThemeToDelete] = useState<string|null>(null)

  const devPsyListeThemes = anamneseKeysAndLabels.filter(theme => theme.domaine === "Développement psychomoteur" && theme.theme)
  
  return (
    <div>
      <div className='flex gap-x-2 font-bold mb-5'>
        <MoveRight/> Choisir les thèmes qui vous semblent pertinents pour décrire les antécédents médicaux du patient.
      </div>
      <Separator className='my-5'/>
      <div className='flex justify-center gap-x-3 mb-5' >
        <ChooseThemesAlt 
          listeThemes={devPsyListeThemes} 
          setOpenDialog={setOpenDeleteDialog} 
          setKeyToDelete={setKeyToDelete}
          openDialog={openDeleteDialog} 
          themeToDelete={themeToDelete}
          setThemeToDelete={setThemeToDelete} 
          keyToDelete={keyToDelete}
        />
      </div> 
      <Separator className='my-5'/>

      <CardWrapper themeLabel="Grossesse">
        <AnamneseThemeCard
          keyLabel='grossesse'
          label={"Grossesse"}
          data={grossesse}
        />
      </CardWrapper>

      <CardWrapper themeLabel="Accouchement">
        <AccouchementCard />
      </CardWrapper>

      <CardWrapper themeLabel="Age de la station assise">
        <AnamneseThemeCard
          keyLabel='stationAssise'
          label={"Age de la station assise"}
          data={stationAssise}
        />
      </CardWrapper>
      <CardWrapper themeLabel="Quadrupédie">
        <AnamneseThemeCard
          keyLabel='quadrupedie'
          label={"Quadrupédie"}
          data={quadrupedie}
        />
      </CardWrapper>

      <CardWrapper themeLabel="Âge de la marche">
        <AgeMarche/>
      </CardWrapper>

      <CardWrapper themeLabel="Acquisition du langage">
        <AcquisitionLangage/>
      </CardWrapper>

      <CardWrapper themeLabel="Continence">
        <Continence/>
      </CardWrapper>
      
      <CardWrapper themeLabel="Sommeil">
        <AnamneseThemeCard
          keyLabel='sommeil'
          label="Sommeil"
          data={sommeil}
        />
      </CardWrapper>

      <CardWrapper themeLabel="Alimentation">
        <AnamneseThemeCard
          keyLabel='alimentation'
          label={"Alimentation"}
          data={alimentation}
        />
      </CardWrapper>

      <CardWrapper themeLabel="Autres (développement psychomoteur)">
        <AnamneseThemeCard
          keyLabel='autresDevPsy'
          label="Autres (développement psychomoteur)"
          data={autresDevPsy}
        />
      </CardWrapper>

    </div>
  )
}

export default DevPsyBody
