import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import SearchInput from '@/components/ui/SearchInput'
import { Separator } from '@/components/ui/separator'
import { useConclusionStore } from '@/stores/conclusionStore'
import { Loader } from 'lucide-react'
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'

type ConclusionTextListDialogProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const ConclusionTextListDialog: FC<ConclusionTextListDialogProps> = ({open, setOpen}) => {
  const {loadingConclusionList, conclusionListe, getConclusionList} = useConclusionStore()

  useEffect(()=> {
    getConclusionList()
  }, [open])

  return (
    <Dialog 
      onOpenChange={()=> setOpen(prev=>!prev)}
      open={open} 
    >
      <DialogContent aria-describedby="Fenêtre pour gérer la liste des médecins" className="max-w-[1080px] min-w-[1000px] bg-white border-black border-4 max-h-[650px]">
        <DialogHeader>
          <DialogTitle className='text-center border-b-2 border-black text-xl mb-5 pb-2.5 tracking-wider'>
            Liste des conclusions précédemment enregistrées
          </DialogTitle>
        </DialogHeader>
        <div className='flex gap-y-2 maw-h-[600px] flex-wrap overflow-y-scroll'>
          {
            loadingConclusionList
            ?
            <Loader className='animate-spin'/>
            :
            !conclusionListe || conclusionListe?.length === 0
            ?
            <p className='w-fit mx-auto italic'>Aucun résultat trouvé.</p>
            :
            conclusionListe.map((conclusion, index)=>(
              <Card key={index} className='w-full py-2 px-4 gap-0'>
                <CardTitle className='text-sm flex flex-col'>
                  <div><span>Patient</span> : <span className='font-bold'>{conclusion.patientName}</span></div>
                </CardTitle>
                <Separator/>
                <CardContent className='px-0'>
                  <span>{conclusion.conclusionCommentaires}</span>
                </CardContent>
              </Card>
            ))
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ConclusionTextListDialog