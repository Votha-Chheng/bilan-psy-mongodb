import React, { FC } from 'react'
import { Button } from './button'
import { LoaderCircle } from 'lucide-react'

type SubmitButtonProps = {
  label?: string
  isPending?: boolean
  full?: boolean
  className?: string
}

const SubmitButton: FC<SubmitButtonProps> = ({label="Valider", isPending, className, full=true}) => {
  return (
    <Button type='submit' className={`text-white p-2 rounded-md ${full ? "w-full":"min-w-32"} ${className}`} >
      {
        isPending
        ?
        <LoaderCircle className='animate-spin' />
        :
        label.toUpperCase()
      }
    </Button >
  )
}

export default SubmitButton
