import { useToast } from '@/customHooks/useToast'
import { openSans } from '@/fonts/openSans'
import { upsertListeAdjectifsComportementAction } from '@/serverActions/listeActions'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { Trash2 } from 'lucide-react'
import { useActionState } from 'react'

const DeletAdjectifsComportementForm = () => {
  const [state, formAction, isPending] = useActionState(upsertListeAdjectifsComportementAction, {})
  const {adjectifsComportement, listeAdjectifsId, getListeAdjectifs} = useAnamneseSearchDBStore()

  const returnJSONValue = (array: string[]|null, adjToDelete: string): string|undefined=> {
    if(array){
      if(array.length>0) {
        return JSON.stringify(array.filter(val=> val !== adjToDelete))
      }
    } 
    return undefined
  }

  const updateFunction = ()=> {
    getListeAdjectifs()
  }
  useToast({state, updateFunction})

  return (
    <div className='flex gap-3.5 flex-wrap'>
      {
        adjectifsComportement && adjectifsComportement.length>0
        ?
        adjectifsComportement.map((adj, index)=> (
          <div className='p-2.5 flex gap-3 border justify-between items-center border-slate-400 rounded-xl' key={index}>
            <p className={`${openSans.className} font-bold text-sm`}>{adj}</p>
            <form action={formAction}>
              <input 
                type="hidden" 
                name='adjectifsComportement' 
                value={returnJSONValue(adjectifsComportement, adj)} 
              />
              <input type='hidden' name='listeId' value={listeAdjectifsId ?? undefined} />
              <button type='submit' className='flex items-center' disabled={isPending}>
                <Trash2 size={17.5} className='text-red-700 hover:text-red-500 cursor-pointer' id={adj} />
              </button>
            </form>
          </div>
        ))
        :
        <p className='text-center'>Pas d'adjectif dans la liste</p>
      }
    </div>
  )
}

export default DeletAdjectifsComportementForm
