import { ServiceResponse } from '@/@types/ServiceResponse'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

type UseToastProps = {
  state: ServiceResponse<any>;
  updateFunction?: () => void;
}

export const useToast = ({state, updateFunction = ()=> {}}: UseToastProps): void => {
  useEffect(()=> {
    if(!state) return 
    if(state.success === true){
      toast.success(state.message)
      updateFunction()
    }
    if(state.success === false){
      toast.error(state.message)
    }
  }, [state])
}

