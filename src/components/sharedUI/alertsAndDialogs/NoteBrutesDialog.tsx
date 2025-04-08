import React, { Dispatch, FC, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import NotesBrutes from '@/components/creer-bilan/anamnese/noteBrutes/NotesBrutes'
import SearchInput from '@/components/ui/SearchInput'

type NoteBrutesDialogProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setSearch: Dispatch<SetStateAction<string>>
  search: string
}

const NoteBrutesDialog: FC<NoteBrutesDialogProps> = ({ open, setOpen, search, setSearch }) => {
  const {patientInfoGenerales} = usePatientInfoStore()
  return (
    <Dialog 
      onOpenChange={()=> setOpen(prev=>!prev)}
      open={open} 
    >
      <DialogContent aria-describedby="Fenêtre pour gérer la liste des médecins" className="min-w-[1080px] bg-white border-black border-4 min-h-[500px]">
        <DialogHeader>
          <DialogTitle className='text-center border-b-2 border-black text-xl mb-5 pb-2.5 tracking-wider'>
            Notes brutes concernant l'anamnèse du patient {patientInfoGenerales?.prenom} {patientInfoGenerales?.nom}
          </DialogTitle>
        </DialogHeader>
        <SearchInput setSearch={setSearch} />
        <NotesBrutes search={search}/>
      </DialogContent>
    </Dialog>
  )
}

export default NoteBrutesDialog