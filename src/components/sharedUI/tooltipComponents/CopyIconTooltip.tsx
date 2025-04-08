import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Check, CopyIcon } from 'lucide-react'
import React, { FC, useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

type CopyIconTooltipProps = {
  textToCopy: string
  tooltipText?: string
}

const CopyIconTooltip: FC<CopyIconTooltipProps> = ({textToCopy, tooltipText="Copier"}) => {
  const [copied, setCopied] = useState<boolean>(false)
  const [copiedText, setCopiedText] = useState<string>("")

  useEffect(()=> {
    if(copiedText !== textToCopy){
      setCopied(false)
    }
  }, [copiedText, textToCopy])
  
  return (
    <TooltipProvider delayDuration={0.25}>
      <Tooltip>
        <TooltipTrigger>
        <CopyToClipboard 
          text={textToCopy ?? ""}  
          onCopy={(text, result)=> {
            if(result) {
              setCopied(true)
              setCopiedText(text)
            }
          }}
        >
          {
            copied && copiedText === textToCopy
            ?
            <p className='flex items-center'>
              <Check size={20} className='text-green-700'/> <span className='text-xs'>Copié !</span>
            </p>
            :
            <CopyIcon color='grey' size={20} className={`cursor-pointer hover:scale-110 transition-transform duration-100`}/>
          }
        </CopyToClipboard>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default CopyIconTooltip
