import { X } from 'lucide-react'
import React, { FC } from 'react'

type ErrorMessageProps={
  message?: string
  display: boolean
  className?: string
}

const ErrorMessage: FC<ErrorMessageProps> = ({message, display, className="left-0 -bottom-5"}) => {

  if(!display) return null
  return (
    <p className={`text-red-700 flex text-xs absolute font-bold ${className}`}><X className='text-red-700' size={17.5}/>{message}</p>
  )
}

export default ErrorMessage
