import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { testByNames } from '@/datas/listeTests'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import React, { Dispatch, FC, SetStateAction } from 'react'

type ManageTestsBilanDialogProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
  open: boolean
}

const ManageTestsBilanDialog: FC<ManageTestsBilanDialogProps> = ({setOpen, open}) => {
  const {testsUtilises} = useBilanTestsStore()
  
  return (
    <Dialog open={open} onOpenChange={(isOpen)=> setOpen(isOpen)} >
      <DialogContent className="max-w-[950px] min-w-[950px]">
        <DialogHeader>
          <DialogTitle className='uppercase text-center'>CHOISIR LES TESTS QUE VOUS UTILISEREZ</DialogTitle>
          <DialogDescription>
            Ajouter les tests que vous voulez utiliser pour le bilan en cliquant dessus
          </DialogDescription>
        </DialogHeader>
        <article className='flex gap-3 flex-wrap justify-center'>
          {
            testByNames.map((testName, index)=> (
              <Badge className='text-base cursor-pointer' key={index}>
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
