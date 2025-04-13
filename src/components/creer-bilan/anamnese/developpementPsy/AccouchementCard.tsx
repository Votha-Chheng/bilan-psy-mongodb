
import { Card } from '@/components/ui/card'
import React, { Dispatch, FC, SetStateAction } from 'react'
import Accouchement from './Accouchement'
import CommentaireAccouchement from './CommentaireAccouchement'
import DeleteAnamneseThemeAlert from '@/components/sharedUI/alertsAndDialogs/DeleteAnamneseThemeAlert'

type AccouchementCardProps = {

}

const AccouchementCard: FC<AccouchementCardProps> = () => {
  return (
    <Card className='px-5 pb-2 pt-3 mb-4 gap-0'>
      <Accouchement/>
      <CommentaireAccouchement/>
    </Card>

  )
}

export default AccouchementCard
