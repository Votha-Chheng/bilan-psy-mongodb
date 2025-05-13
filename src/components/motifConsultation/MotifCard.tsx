import React, { FC } from 'react'
import { Card } from '../ui/card'
import CopyIconTooltip from '../sharedUI/tooltipComponents/CopyIconTooltip'
import { MotifConsultationDTO } from '@/@types/PatientTypes'

type MotifCardProps = {
  motifConsultation: MotifConsultationDTO
}

const MotifCard: FC<MotifCardProps> = ({motifConsultation}) => {
  
  return (
    <Card className='p-3 gap-y-1 my-2'>
      <div className='flex justify-end mr-5'>
        <CopyIconTooltip textToCopy={motifConsultation.motif} />
      </div>
      {motifConsultation.motif}
    </Card>
  )
}

export default MotifCard