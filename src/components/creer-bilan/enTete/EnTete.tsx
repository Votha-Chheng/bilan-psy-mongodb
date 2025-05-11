import DateBilanForm from '@/components/forms/DateBilanForm'
import { Card, CardTitle } from '@/components/ui/card'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { getAge } from '@/utils/getAge'
import dayjs from 'dayjs'
import { EditIcon, Loader2, LoaderIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import MotifConsultation from './MotifConsultation'
import { useParams } from 'next/navigation'

const EnTete = () => {
  const {patientInfoGenerales, loadingPatientInfoFromDB} = usePatientInfoStore()
  const [changeDateBilan, setChangeDateBilan] = useState<boolean>(false)

  return (
    <article>
      <Card className={`bg-gray-300 min-h-20`} >
        {
          loadingPatientInfoFromDB
          ?
          <div className='flex justify-center items-center h-32'>
            <Loader2 className='animate-spin' />
          </div>
          :
          <CardTitle className={`font-bold p-2 text-center text-xl`}>
            <p className='uppercase'>Compte-rendu de bilan psychomoteur</p>
            <p>
              <span className='uppercase'>{patientInfoGenerales?.nom ?? ""}</span> <span>{patientInfoGenerales?.prenom ?? ""}, </span>
              <span>
                {patientInfoGenerales?.sexe === "f" ? "née" : "né"} le {dayjs(patientInfoGenerales?.dateNaissance).format("DD/MM/YYYY") } - ({getAge(dayjs(patientInfoGenerales?.dateNaissance).format("DD/MM/YYYY") )})
              </span> 
            </p>
            {
              !patientInfoGenerales?.adulte &&
              <p className='text-base'>
                &Eacute;cole/&Eacute;tablissement scolaire : {patientInfoGenerales?.ecole}
              </p>
            }
            <div className='flex justify-center mt-2 mx-auto'>
              {
                !patientInfoGenerales?.dateBilan || changeDateBilan
                ?
                <DateBilanForm defaultValue={patientInfoGenerales?.dateBilan} dateBilanExists={patientInfoGenerales?.dateBilan ? true : false} setChangeDateBilan={setChangeDateBilan} />     
                :
                <span className='relative font-normal text-base'>
                  Bilan effectué {patientInfoGenerales?.dateBilan}<EditIcon size={20} className='absolute -top-0.5 -right-7.5 cursor-pointer' onClick={()=> setChangeDateBilan(true)}/>
                </span>
              }
            </div>
          </CardTitle>
        }
      </Card>
      <small className='flex justify-end italic mt-2'>Document confidentiel, remis aux parents pour faire valoir ce que de droit.</small>
      <small className='flex justify-end mt-2'><span className='font-bold'>Médecin prescipteur</span>&nbsp;: {patientInfoGenerales?.medecin}</small>
      <MotifConsultation/>
    </article>
  )
}

export default EnTete
