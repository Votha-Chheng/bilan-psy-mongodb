import React, { FC } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Cross, X } from 'lucide-react'

type TextInputProps = {
  label: string
  name: string
  placeholder?: string
  vertical?: boolean
  type?: string
  required?: boolean
  errorMessage?: string
  defaultValue?: string
  className?: string
  fontSize?: string
}

const TextInput: FC<TextInputProps> = ({name, placeholder, label, errorMessage, defaultValue, type="text", required=true, vertical=false, className="", fontSize="text-sm"}) => {
  return (
    <div className={`flex gap-2 mb-8 w-full relative ${vertical ? "flex-col":"flex-row"}`}>
      <Label className={`whitespace-nowrap text-lg ${fontSize}`} htmlFor={name}>{label} :</Label>
      <Input name={name} type={type} required={required} placeholder={placeholder} className={`bg-white ${className} ${fontSize}`} defaultValue={defaultValue ?? ""} />
      <p className='text-red-700 absolute -bottom-5 left-1 font-bold text-xs flex items-center'>{errorMessage && <><X size={17.5}/> {errorMessage}</>}</p>
    </div>
  )
}

export default TextInput
