import { ServiceResponse } from '@/@types/ServiceResponse'
import { useEffect } from 'react'
import { toast } from 'sonner'

type UseToastProps = {
  // eslint-disable-next-line
  state: ServiceResponse<any>;
  updateFunction?: () => void;
}

export const useToast = ({state, updateFunction = ()=> {}}: UseToastProps): void => {
  useEffect(()=> {
    if(!state) return 
    if(state.success === true){
      toast.success(state.message)
      if(updateFunction){
        updateFunction()
      }
    }
    if(state.success === false){
      toast.error(state.message)
    }
  }, [state])
}

