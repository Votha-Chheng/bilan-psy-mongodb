import { Button } from '@/components/ui/button'
import { List } from 'lucide-react'
import React, { Dispatch, FC, SetStateAction } from 'react'

type ManageListeButtonProps = {
  setOpenManagementDialog: Dispatch<SetStateAction<boolean>>|undefined
  labelButton: string
}

const ManageListeButton: FC<ManageListeButtonProps> = ({setOpenManagementDialog, labelButton}) => {
  return (
    <Button className='w-fit' onClick={()=> setOpenManagementDialog && setOpenManagementDialog(true)}>
      <List/> {labelButton}
    </Button>
  )
}

export default ManageListeButton
