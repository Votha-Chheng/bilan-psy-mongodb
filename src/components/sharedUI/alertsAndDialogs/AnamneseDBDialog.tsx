import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { AnamneseResults } from '@/@types/Anamnese'
import { PatientInfosGenerales } from '@/@types/PatientTypes'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

type AnamneseDBDialogProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  dialogTitle: string
  searchKeys: (keyof AnamneseResults)[]
  indexDataToRetrieve?: number
}

const AnamneseDBDialog: FC<AnamneseDBDialogProps> = ({ open, setOpen, dialogTitle, searchKeys, indexDataToRetrieve }) => {
  const {getAnamneseDBByKeys, resetAnamneseDB, anamneseInDBByDomaine, loadingData} = useAnamneseSearchDBStore()
  const {allPatients} = usePatientInfoStore()

  useEffect(()=> {
    if(open){
      getAnamneseDBByKeys(searchKeys as unknown as (keyof AnamneseResults)[])
    }

    return () => {
      resetAnamneseDB()
    }
  }, [open])

  const returnPatientName = (patientId: string|undefined, allPatients: PatientInfosGenerales[]|null): string=> {
    if(!patientId || !allPatients) return "Patient introuvable."
    const patient = allPatients?.filter(patient => patient.id === patientId)
    if(patient.length===0) return "Patient introuvable."
    return `${patient[0].prenom} ${patient[0].nom?.toUpperCase()}`
  }

  const returnDataWithIndex = (anamneseResults: AnamneseResults, index: number|undefined): string|null=> {
    if(!index) return null
    return anamneseResults[searchKeys[0]]?.[index] ?? null
  }

  return (
    <Dialog onOpenChange={()=> setOpen(prev=>!prev)} open={open} >
      <DialogContent className="min-w-[1080px] bg-white border-black border-4">
        <DialogHeader>
          <DialogTitle className='text-center border-b-2 border-black text-xl mb-5 pb-2.5 tracking-wider'>
            {dialogTitle}
          </DialogTitle>
        </DialogHeader>
        <div className='flex gap-y-2 maw-h-[600px] flex-wrap overflow-y-scroll'>
          {
            loadingData
            ?
            <div className='w-full flex justify-center h-24 items-center'>
              <Loader2 className='animate-spin' />
            </div>
            :
            anamneseInDBByDomaine && anamneseInDBByDomaine.length>0 
            ?
            anamneseInDBByDomaine.map((anamnese: AnamneseResults, index: number)=> (
              !indexDataToRetrieve
              ?
              <Card key={index} className='min-w-1/2 max-w-1/2 py-2 px-4'>
                <CardTitle className='text-sm flex flex-col'>
                  <div><span className='font-normal underline underline-offset-2'>Patient</span> : {returnPatientName(anamnese.patientId, allPatients)}</div>
                  <span className='font-bold'>{anamnese[searchKeys[0]] }</span>
                </CardTitle>
              </Card>
              :
              anamnese && anamnese[searchKeys[0]] && anamnese[searchKeys[0]]!.length>0 && anamnese[searchKeys[0]]![indexDataToRetrieve]!=="" && returnDataWithIndex(anamnese, indexDataToRetrieve)
              ?
              <Card key={index} className='min-w-1/2 max-w-1/2 py-2 px-4'>
                <CardTitle className='text-sm flex flex-col'>
                  <div><span className='font-normal underline underline-offset-2'>Patient</span> : {returnPatientName(anamnese.patientId, allPatients)}</div>
                  <span className='font-bold'>{ anamnese[searchKeys[0]]?.[indexDataToRetrieve]}</span>
                </CardTitle>
              </Card>
              :
              <p key={index} className='w-fit mx-auto italic'>Aucun résultat trouvé.</p>
            ))
            :
            <p className='w-fit mx-auto italic'>Aucun résultat trouvé.</p>
          }

        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AnamneseDBDialog
