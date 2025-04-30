import LoadingDatas from '@/components/sharedUI/LoadingDatas'
import { Badge } from '@/components/ui/badge'
import { openSans } from '@/fonts/openSans'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import React from 'react'

const ListeTestsUtilises = () => {
  const {tests, loadingBilanResults} = useBilanTestsStore()
  
  if(loadingBilanResults) return <LoadingDatas/>
  return (
    <div className='mx-7.5 my-5 flex flex-wrap gap-3'>
      {
        tests && tests.length>0
        ?
        tests.map((test, index)=> (
          <Badge key={index} className={`${openSans.className} tracking-wider italic`}>{test}</Badge>
        ))
        :
        <p>Aucun test sélectionné</p>
      }
    </div>
  )
}

export default ListeTestsUtilises
