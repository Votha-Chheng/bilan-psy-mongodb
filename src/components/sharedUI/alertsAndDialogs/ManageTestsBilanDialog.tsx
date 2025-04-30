import { ServiceResponse } from '@/@types/ServiceResponse'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/customHooks/useToast'
import { testByNames } from '@/datas/listeTests'
import { upsertBilanByKeyValueAction, upsertTestsListeAction } from '@/serverActions/bilanActions'
import { setBHKResultsToNull } from '@/serverActions/testsActions/bhkActions'
import { setConnaissanceDroiteGaucheResultsToNull } from '@/serverActions/testsActions/connaissancesDroiteGaucheAction'
import { setEpreuveCubesNepsy2ResultsToNull } from '@/serverActions/testsActions/epreuveCubesNepsy2Action'
import { setFigureReyAResultsToNull } from '@/serverActions/testsActions/figureReyAActions'
import { setFigureReyBResultsToNull } from '@/serverActions/testsActions/figureReyBActions'
import { setFlechesNepsy2ResultsToNull } from '@/serverActions/testsActions/flechesNepsy2Actions'
import { setImitationNepsy2ResultsToNull } from '@/serverActions/testsActions/imitationNepsy2Actions'
import { setMABC2ResultsToNull } from '@/serverActions/testsActions/mabc2Actions'
import { setPraxiesGestuellesResultsToNull } from '@/serverActions/testsActions/praxiesGestuellesActions'
import { setVisuomotriceNepsy2ResultsToNull } from '@/serverActions/testsActions/visuomotriceNepsy2Actions'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { ArrowRight, Loader2, TriangleAlertIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'

type ManageTestsBilanDialogProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
  open: boolean
}

const ManageTestsBilanDialog: FC<ManageTestsBilanDialogProps> = ({setOpen, open}) => {
  const {id: patientId} = useParams<{id: string}>()
  const {
    tests, 
    updateBilanByPatientId, 
    mabc2, 
    connaissancedroitegauche,
    visuomotricenepsy2,
    imitationpositionsnepsy2,
    praxiesgestuelles,
    bhk,
    flechesnepsy2,
    figuresreya,
    figuresreyb,
    epreuvecubesnepsy2
  } = useBilanTestsStore()
  
  const [selectedTests, setSelectedTests] = useState<string[]>([])

  const [state, setState] = useState<ServiceResponse< any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)

  useEffect(()=> {
    if(!tests) return
    setSelectedTests(tests ?? [])

  }, [tests])

  const setTestToNull = async(testName: string): Promise<void>=> {
    let res: ServiceResponse<any> = {}
    if(testName === "M-ABC2" ){
      res = await setMABC2ResultsToNull(mabc2?.id ?? null)
    }
    if(testName === "Connaissance droite/gauche" ){
      res = await setConnaissanceDroiteGaucheResultsToNull(connaissancedroitegauche?.id ?? null)
    }
    if(testName === "Latéralité usuelle" ){
      res = await upsertBilanByKeyValueAction<null>("lateralite", null, patientId)
    }
    if(testName === "Tonus d'action" ){
      res = await upsertBilanByKeyValueAction<null>("tonus", null, patientId)
    }
    if(testName === "Epreuve visuomotrice de la Nepsy 2" ){
      res = await setVisuomotriceNepsy2ResultsToNull(visuomotricenepsy2?.id ?? null)
    }
    if(testName === "Imitation de positions de la Nepsy 2" ){
      res = await setImitationNepsy2ResultsToNull(imitationpositionsnepsy2?.id ?? null)
    }
    if(testName === "Praxies gestuelles" ){
      res = await setPraxiesGestuellesResultsToNull(praxiesgestuelles?.id ?? null)
    }
    if(testName === "BHK (épreuve d'écriture)" ){
      res = await setBHKResultsToNull(bhk?.id ?? null)
    }
    if(testName === "Epreuve visuo-spatiale des flèches (Nepsy 2)" ){
      res = await setFlechesNepsy2ResultsToNull(flechesnepsy2?.id ?? null)
    }
    if(testName === "Epreuve visuoconstructive en deux dimensions (Figure de Rey A)" ){
      res = await setFigureReyAResultsToNull(figuresreya?.id ?? null)
    }
    if(testName === "Epreuve visuoconstructive en deux dimensions (Figure de Rey B)" ){
      res = await setFigureReyBResultsToNull(figuresreyb?.id ?? null)
    }
    if(testName === "Epreuve des cubes (Nepsy 2)" ){
      res = await setEpreuveCubesNepsy2ResultsToNull(epreuvecubesnepsy2?.id ?? null)
    }
    
    if(!res.success) {
      setState(res)
      setIsPending(false)
      return
    }
  }

  const handleChangeListe = async(testName: string)=> {
    setIsPending(true)
    let newState: string[] = [] 
    if(selectedTests.includes(testName)){
      newState = selectedTests.filter(val => val !== testName)
      setTestToNull(testName)
    } else {
      newState = [...selectedTests, testName]
    }

    const res = await upsertTestsListeAction(patientId, newState.length === 0 ? null : newState)
    res.success && setSelectedTests(newState)
    res && setState(res)
    res && setIsPending(false)
  }

  const updateFunction = ()=> {
    updateBilanByPatientId(patientId)
  }
  useToast({state, updateFunction})

  return (
    <Dialog open={open} onOpenChange={(isOpen)=> setOpen(isOpen)} >
      <DialogContent className="max-w-[950px] min-w-[950px]">
        <DialogHeader>
          <DialogTitle className='uppercase text-center'>CHOISIR LES TESTS QUE VOUS UTILISEREZ</DialogTitle>
          <Separator/>
          <DialogDescription className='flex gap-2.5 items-center'>
            <ArrowRight/> <span className='italic'>Ajouter et supprimer les tests que vous voulez utiliser pour le bilan en cliquant dessus :</span>
          </DialogDescription>
        </DialogHeader>
        <Separator/>
        <div className='w-full h-8 flex justify-center'>
          {
          isPending 
          ? <Loader2 className='animate-spin' />
          :
          <p className='text-red-700 flex gap-2 font-bold'><TriangleAlertIcon/> Attention, si vous supprimez un test, vous supprimer toutes les données du tests !</p>
          } 
        </div>
        <article className='flex gap-3 flex-wrap justify-center'>
          {
            testByNames.map((testName, index)=> (
              <Badge 
                className= {`text-base cursor-pointer transition-all duration-100 ${isPending && "opacity-40"}`}
                variant={tests?.includes(testName) ? "default":"outline" } 
                key={index}
                onClick={()=>!isPending && handleChangeListe(testName)}
              >
                {testName}
              </Badge>
            ))
          }
        </article>
      </DialogContent>
    </Dialog>
  )
}

export default ManageTestsBilanDialog
