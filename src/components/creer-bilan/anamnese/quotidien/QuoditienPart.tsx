import { AnamneseResults } from '@/@types/Anamnese'
import AnamneseItemLayout from '@/components/layouts/AnamneseItemLayout'
import AnamneseDBDialog from '@/components/sharedUI/alertsAndDialogs/AnamneseDBDialog'
import ChooseThemesAlt from '@/components/sharedUI/ChoseThemesAlt'
import { Card } from '@/components/ui/card'
import { anamneseKeysAndLabels } from '@/datas/anamneseConstantes'
import { MoveRight } from 'lucide-react'
import React, { useState } from 'react'
import CardWrapper from '../CardWrapper'
import AutonomieCard from './AutonomieCard'
import AnamneseThemeCard from '../AnamneseThemeCard'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import DevoirsCard from './DevoirsCard'
import SelectAndCommentsCard from '../../SelectAndCommentsCard'
import TemperamentCard from './TemperamentCard'
import SommeilCard from './SommeilCard'
import DecritAuQuotidienCard from './DecritAuQuotidienCard'

const QuoditienPart = () => {
  const {anamneseResults} = usePatientInfoStore()
  const {ecouteConsignes, agitationMotrice, gestionTemps, gestionEmotions, alimentationQuotidien, autresQuotidien} = anamneseResults ?? {}
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [keyToDelete, setKeyToDelete] = useState<keyof AnamneseResults|null>(null)
  const [themeToDelete, setThemeToDelete] = useState<string|null>(null)

  const quotidienThemes = anamneseKeysAndLabels.filter(value=> value.domaine === "Quotidien")

  return (
    <AnamneseItemLayout>
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
        <AutonomieCard/>
      </CardWrapper>
      <CardWrapper themeLabel="Écoute des consignes" >
        <AnamneseThemeCard
          label="Écoute des consignes"
          keyLabel="ecouteConsignes"
          data={ecouteConsignes}
        />
      </CardWrapper>
      <CardWrapper themeLabel="Agitation motrice" >
        <AnamneseThemeCard
          label="Agitation motrice"
          keyLabel="agitationMotrice"
          data={agitationMotrice}
        />
      </CardWrapper>
      <CardWrapper themeLabel="Devoirs" >
        <DevoirsCard/>
      </CardWrapper>
      <CardWrapper themeLabel="Gestion des émotions" >
        <SelectAndCommentsCard stateFromDB={gestionEmotions} listeSelectItems={["Rien à signaler", "Des difficultés"]} keyAnamnese="gestionEmotions" themeLabel="Gestion des émotions" />
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
        />
      </CardWrapper>

      <CardWrapper themeLabel="Autres (quotidien)" >
        <AnamneseThemeCard
          label="Autres (quotidien)"
          keyLabel="autresQuotidien"
          data={autresQuotidien}
        />
      </CardWrapper>
    </AnamneseItemLayout>
  )
}

export default QuoditienPart
