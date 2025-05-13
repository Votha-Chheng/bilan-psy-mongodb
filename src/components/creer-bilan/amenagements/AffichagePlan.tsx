import LoadingDatas from '@/components/sharedUI/LoadingDatas'
import { openSans } from '@/fonts/openSans'
import { useAmenagementsStore } from '@/stores/amenagementsStore'
import { checkIfCategoryIsInAmenagementForPatient, getAmenagementsForPatientByCategory } from '@/utils/filterFunctions'
import React from 'react'

const AffichagePlan = () => {
  const {categoriesList, manyAmenagementsItems, loadingManyAmenagementsItems} = useAmenagementsStore()
  
  if(loadingManyAmenagementsItems) return <div className='w-2/5'><LoadingDatas/></div>
  if(!manyAmenagementsItems||manyAmenagementsItems.length===0) return <p className='w-2/5 italic text-red-700'>Aucun aménagement sélectionné...</p>
  return (
    <div className={`${openSans.className} w-2/5 pl-1 pr-5`}>
      {
        categoriesList && categoriesList.map((category, index)=> (
          <section key={index} className={`${!checkIfCategoryIsInAmenagementForPatient(manyAmenagementsItems, category) && "hidden"} mb-10 mt-5`}>
            <h2 className='font-bold text-center mb-2'>{category}</h2>
            <ul>
              {
                getAmenagementsForPatientByCategory(category, manyAmenagementsItems).map((amenagementItem, index)=> (
                  <li key={index} className='my-1'>
                    &#9654; {amenagementItem.amenagement}
                  </li>
                ))
              }
            </ul>
          </section>
        ))
      }
    </div>
  )
}

export default AffichagePlan