import React, { useState } from 'react'
import AgeMarche from './AgeMarche'
import { anamneseKeysAndLabels } from '@/datas/anamneseConstantes'
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
import { useParams } from 'next/navigation'

const DevPsyBody = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {anamneseResults, updateAnamneseResultsByPatientId} = useAnamneseSearchDBStore()
  const {grossesse, stationAssise, quadrupedie, alimentation, autresDevPsy} = anamneseResults ?? {}
  
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [keyToDelete, setKeyToDelete] = useState<keyof AnamneseResults|null>(null)
  const [themeToDelete, setThemeToDelete] = useState<string|null>(null)

  const devPsyListeThemes = anamneseKeysAndLabels.filter(theme => theme.domaine === "Développement psychomoteur" && theme.theme)
  
  return (
    <div className='min-w-full'>
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
          updateFunctionFromStore= {()=> updateAnamneseResultsByPatientId(patientId)}
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
          updateFunctionFromStore= {()=> updateAnamneseResultsByPatientId(patientId)}
        />
      </CardWrapper>
      <CardWrapper themeLabel="Quadrupédie">
        <AnamneseThemeCard
          keyLabel='quadrupedie'
          label={"Quadrupédie"}
          data={quadrupedie}
          updateFunctionFromStore= {()=> updateAnamneseResultsByPatientId(patientId)}
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

      <CardWrapper themeLabel="Alimentation">
        <AnamneseThemeCard
          keyLabel='alimentation'
          label={"Alimentation"}
          data={alimentation}
          updateFunctionFromStore= {()=> updateAnamneseResultsByPatientId(patientId)}
        />
      </CardWrapper>

      <CardWrapper themeLabel="Autres (développement psychomoteur)">
        <AnamneseThemeCard
          keyLabel='autresDevPsy'
          label="Autres (développement psychomoteur)"
          data={autresDevPsy}
          updateFunctionFromStore= {()=> updateAnamneseResultsByPatientId(patientId)}
        />
      </CardWrapper>

    </div>
  )
}

export default DevPsyBody
