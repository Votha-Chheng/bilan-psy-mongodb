import { AnamneseResults } from '@/@types/Anamnese'
import ChooseThemesAlt from '@/components/sharedUI/ChoseThemesAlt'
import { anamneseKeysAndLabels } from '@/datas/anamneseConstantes'
import { MoveRight } from 'lucide-react'
import React, { useState } from 'react'
import CardWrapper from '../CardWrapper'
import AnamneseThemeCard from '../AnamneseThemeCard'
import DevoirsCard from './DevoirsCard'
import SelectAndCommentsCard from '../../SelectAndCommentsCard'
import TemperamentCard from './TemperamentCard'
import SommeilCard from './SommeilCard'
import DecritAuQuotidienCard from './DecritAuQuotidienCard'
import AnamneseTitleItem from '../AnamneseTitleItem'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { useParams } from 'next/navigation'

const QuoditienPart = () => {
  const {id: patientId} = useParams<{id: string}>()

  const {anamneseResults, getAnamneseResultsByPatientId} = useAnamneseSearchDBStore()
  const {ecouteConsignes, agitationMotrice, gestionTemps, gestionEmotions, alimentationQuotidien, autresQuotidien, autonomie} = anamneseResults ?? {}

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [keyToDelete, setKeyToDelete] = useState<keyof AnamneseResults|null>(null)
  const [themeToDelete, setThemeToDelete] = useState<string|null>(null)

  const quotidienThemes = anamneseKeysAndLabels.filter(value=> value.domaine === "Quotidien")

  return (
    <article className="min-w-full px-5">
      <AnamneseTitleItem/>
      <div className='max-w-full min-w-full'>
        <div className='flex gap-x-2 font-bold mb-5'>
          <MoveRight/> Choisir les thèmes qui vous semblent pertinents pour décrire le quotidien du patient.
        </div>
        <div className='flex justify-center gap-x-3 mb-5' >
          <ChooseThemesAlt
            listeThemes={quotidienThemes}
            openDialog={openDeleteDialog}
            setOpenDialog={setOpenDeleteDialog} 
            setKeyToDelete={setKeyToDelete}
            themeToDelete={themeToDelete}
            setThemeToDelete={setThemeToDelete} 
            keyToDelete={keyToDelete}
          />
        </div> 
        <CardWrapper themeLabel="Caractère au quotidien" >
          <DecritAuQuotidienCard/>
        </CardWrapper>

        <CardWrapper themeLabel="Autonomie" >
          <AnamneseThemeCard
            label="Autonomie"
            keyLabel="autonomie"
            data={autonomie}
            updateFunctionFromStore={()=> getAnamneseResultsByPatientId(patientId)}
          />
        </CardWrapper>
        <CardWrapper themeLabel="Écoute des consignes" >
          <AnamneseThemeCard
            label="Écoute des consignes"
            keyLabel="ecouteConsignes"
            data={ecouteConsignes}
            updateFunctionFromStore={()=> getAnamneseResultsByPatientId(patientId)}
          />
        </CardWrapper>
        <CardWrapper themeLabel="Agitation motrice" >
          <AnamneseThemeCard
            label="Agitation motrice"
            keyLabel="agitationMotrice"
            data={agitationMotrice}
            updateFunctionFromStore={()=> getAnamneseResultsByPatientId(patientId)}
          />
        </CardWrapper>
        <CardWrapper themeLabel="Devoirs" >
          <DevoirsCard/>
        </CardWrapper>
        <CardWrapper themeLabel="Gestion des émotions" >
          <SelectAndCommentsCard stateFromDB={gestionEmotions} listeSelectItems={["rien à signaler", "des difficultés"]} keyAnamnese="gestionEmotions" themeLabel="Gestion des émotions" />
        </CardWrapper>
        <CardWrapper themeLabel="Gestion du temps" >
          <SelectAndCommentsCard stateFromDB={gestionTemps} listeSelectItems={["correcte", "difficile"]} keyAnamnese="gestionTemps" themeLabel="Gestion du temps" />
        </CardWrapper>
        <CardWrapper themeLabel="Tempérament et personnalité" >
          <TemperamentCard/>
        </CardWrapper>

        <CardWrapper themeLabel="Sommeil" >
          <SommeilCard/>
        </CardWrapper>

        <CardWrapper themeLabel="Alimentation au quotidien" >
          <AnamneseThemeCard
            label="Alimentation au quotidien"
            keyLabel="alimentationQuotidien"
            data={alimentationQuotidien}
            updateFunctionFromStore={()=> getAnamneseResultsByPatientId(patientId)}
          />
        </CardWrapper>

        <CardWrapper themeLabel="Autres (quotidien)" >
          <AnamneseThemeCard
            label="Autres (quotidien)"
            keyLabel="autresQuotidien"
            data={autresQuotidien}
            updateFunctionFromStore={()=> getAnamneseResultsByPatientId(patientId)}
          />
        </CardWrapper>

      </div>
    </article>
  )
}

export default QuoditienPart
