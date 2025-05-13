import { Loader2, MoveRight } from 'lucide-react'
import React, { FC, ReactNode } from 'react'

type AnamneseSubPartProps = {
  children: ReactNode
  isPending?: boolean
}

const AnamneseSubPart: FC<AnamneseSubPartProps> = ({children, isPending=false}) => {
  return (
    <div className='flex gap-x-2 font-bold mb-7.5 items-center'>
      <MoveRight/>
      {children}
      { isPending && <Loader2 className='animate-spin' />}
    </div>
  )
}

export default AnamneseSubPart
