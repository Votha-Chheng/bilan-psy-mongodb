import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useMotifsConsultationStore } from '@/stores/motifsConsultationStore'
import MotifsListe from '@/components/motifConsultation/MotifsListe'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import SearchInput from '@/components/ui/SearchInput'


type MotifsListeDialogProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const MotifsListeDialog: FC<MotifsListeDialogProps> = ({open, setOpen}) => {
  const {fetchListeMotifs} = useMotifsConsultationStore()
  const [search, setSearch] = useState<string>("")

  useEffect(()=> {
    fetchListeMotifs()
    
    return ()=> {
      fetchListeMotifs()
    }
  }, [])

  useEffect(()=> {
    setSearch("")
  }, [open])

  return (
    <Dialog 
      onOpenChange={()=> setOpen(prev=>!prev)}
      open={open} 
    >
      <DialogContent aria-describedby="Fenêtre pour gérer la liste des médecins" className="min-w-[1080px] bg-white border-black border-4 min-h-[500px]">
        <DialogHeader>
          <DialogTitle className='text-center border-b-2 border-black text-xl mb-5 pb-2.5 tracking-wider'>
            Visualiser et copier/coller les motifs de consultation présents dans la base de données
          </DialogTitle>
        </DialogHeader>
        <SearchInput setSearch={setSearch} />
        <MotifsListe search={search}/>
      </DialogContent>
    </Dialog>
  )
}

export default MotifsListeDialog