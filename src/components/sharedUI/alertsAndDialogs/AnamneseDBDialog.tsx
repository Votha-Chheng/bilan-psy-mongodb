import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { AnamneseDTO } from '@/@types/Anamnese'
import { PatientInfosGenerales } from '@/@types/PatientTypes'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardTitle } from '@/components/ui/card'

type AnamneseDBDialogProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  dialogTitle: string
  searchKeys: (Exclude<keyof AnamneseDTO,"bilansMedicauxResults">)[]
}

const AnamneseDBDialog: FC<AnamneseDBDialogProps> = ({ open, setOpen, dialogTitle, searchKeys }) => {
  const {getAnamneseDBByKeys, resetAnamneseDB, anamneseInDBByDomaine} = useAnamneseSearchDBStore()
  const {allPatients} = usePatientInfoStore()

  useEffect(()=> {
    getAnamneseDBByKeys(searchKeys)

    return () => {
      resetAnamneseDB()
    }
  }, [open])

  const returnPatientName = (patientId: string|undefined, allPatients: PatientInfosGenerales[]|null): string=> {
    if(!patientId || !allPatients) return "Patient introuvable."
    const patient = allPatients?.filter(patient => patient.id === patientId) ?? []
    if(!patient) return "Patient introuvable."
    return `${patient[0].prenom} ${patient[0].nom?.toUpperCase()}`
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
            anamneseInDBByDomaine && anamneseInDBByDomaine.length>0 
            ?
            anamneseInDBByDomaine.map((anamnese, index)=> (
            <Card key={index} className='min-w-1/2 max-w-1/2 py-2 px-4'>
              <CardTitle className='text-sm flex flex-col'>
                <div><span className='font-normal underline underline-offset-2'>Patient</span> : {returnPatientName(anamnese.patientId, allPatients as PatientInfosGenerales[])}</div>
                <span className='font-bold'>{anamnese[searchKeys[0] as Exclude<keyof AnamneseDTO, "bilansMedicauxResults">]}</span>
              </CardTitle>
            </Card>

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
