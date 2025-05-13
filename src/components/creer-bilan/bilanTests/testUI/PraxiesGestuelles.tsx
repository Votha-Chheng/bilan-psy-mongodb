import { Card } from '@/components/ui/card'
import { allTests } from '@/datas/listeTests'
import React, { useEffect, useState } from 'react'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import PraxiesGestuellesCard from '../PraxiesGestuellesCard'


const PraxiesGestuelles = () => {
  const {praxiesgestuelles} = useBilanTestsStore()
  const {
    precisionDecoupage, 
    tenueDecoupage, 
    gestionTonusDecoupage, 
    hyperHypoDecoupage, 
    precisionCompas, 
    tenueCompas,
    gestionTonusCompas, 
    hyperHypoCompas, 
    precisionEquerre, 
    tenueEquerre,
    gestionTonusEquerre, 
    hyperHypoEquerre
  } = praxiesgestuelles ?? {}

  const [precisionDecoupageLocal, setPrecisionDecoupageLocal] = useState<string>("")
  const [tenueDecoupageLocal, setTenueDecoupageLocal] = useState<string>("")
  const [tonusDecoupageLocal, setTonusDecoupageLocal] = useState<boolean>(false)
  const [gestionTonusDecoupageLocal, setGestionTonusDecoupageLocal] = useState<string>("")
  const [hyperHypoDecoupageLocal, setHyperHypoDecoupageLocal] = useState<string>("")

  const [precisionCompasLocal, setPrecisionCompasLocal] = useState<string>("")
  const [tenueCompasLocal, setTenueCompasLocal] = useState<string>( "")
  const [gestionTonusCompasLocal, setGestionTonusCompasLocal] = useState<string>( "")
  const [tonusCompasLocal, setTonusCompasLocal] = useState<boolean>(false)
  const [hyperHypoCompasLocal, setHyperHypoCompasLocal] = useState<string>("")

  const [precisionEquerreLocal, setPrecisionEquerreLocal] = useState<string>("")
  const [tenueEquerreLocal, setTenueEquerreLocal] = useState<string>("")
  const [gestionTonusEquerreLocal, setGestionTonusEquerreLocal] = useState<string>("")
  const [tonusEquerreLocal, setTonusEquerreLocal] = useState<boolean>(false)
  const [hyperHypoEquerreLocal, setHyperHypoEquerreLocal] = useState<string>("")

  const nameTest = "Praxies gestuelles"
  const praxiesGestuelles = allTests.find(test => test.nom === nameTest)

  useEffect(()=> {
    if(!praxiesgestuelles) return
    setPrecisionDecoupageLocal(precisionDecoupage ?? "")
    setTenueDecoupageLocal(tenueDecoupage ?? "")
    setGestionTonusDecoupageLocal(gestionTonusDecoupage ?? "")
    setTonusDecoupageLocal(Boolean(hyperHypoDecoupage))
    setHyperHypoDecoupageLocal(hyperHypoDecoupage ?? "")
    setPrecisionCompasLocal(precisionCompas ?? "")
    setTenueCompasLocal(tenueCompas ?? "")
    setGestionTonusCompasLocal(gestionTonusCompas ?? "")
    setTonusCompasLocal(Boolean(hyperHypoCompas))
    setHyperHypoCompasLocal(hyperHypoCompas ?? "")
    setPrecisionEquerreLocal(precisionEquerre ?? "")
    setTenueEquerreLocal(tenueEquerre ?? "")
    setGestionTonusEquerreLocal(gestionTonusEquerre ?? "")
    setTonusEquerreLocal(Boolean(hyperHypoEquerre))
    setHyperHypoEquerreLocal(hyperHypoEquerre ?? "")
  }, [praxiesgestuelles])


  return (
    <Card className={`py-2 px-3.5 my-5 w-full gap-y-1`}>
      <p className='italic text-sm'>
        &#8227; <span className='font-bold'>{praxiesGestuelles?.nom?? ""}</span> : {praxiesGestuelles?.description ?? ` : ${praxiesGestuelles?.description}.`}
      </p>
      <p className='text-sm italic mb-1 ml-2'>&ndash; Découpage :</p>   
      <PraxiesGestuellesCard
        keyPrecision='precisionDecoupage'
        keyTenue='tenueDecoupage'
        precisionAvec='en découpage'
        setStateLocal={setPrecisionDecoupageLocal} 
        stateLocal={precisionDecoupageLocal}
        keyGestionTonus="gestionTonusDecoupage"
        keyHyperHypo="hyperHypoDecoupage"
        tenueStateLocal={tenueDecoupageLocal}
        gestionTonusLocal={gestionTonusDecoupageLocal}
        tonusBoolean={tonusDecoupageLocal}
        setTonusBoolean={setTonusDecoupageLocal}
        hyperHypoLocal={hyperHypoDecoupageLocal}
        setHyperHypoLocal={setHyperHypoDecoupageLocal}
        labelTenue="Tenue des ciseaux"
      />
      <p className='text-sm italic mt-5 mb-1 ml-2'>&ndash; Utilisation du compas :</p>   
      <PraxiesGestuellesCard
        keyPrecision='precisionCompas'
        keyTenue='tenueCompas'
        precisionAvec='avec un compas'
        setStateLocal={setPrecisionCompasLocal} 
        stateLocal={precisionCompasLocal}
        keyGestionTonus="gestionTonusCompas"
        keyHyperHypo="hyperHypoCompas"
        tenueStateLocal={tenueCompasLocal}
        gestionTonusLocal={gestionTonusCompasLocal}
        tonusBoolean={tonusCompasLocal}
        setTonusBoolean={setTonusCompasLocal}
        hyperHypoLocal={hyperHypoCompasLocal}
        setHyperHypoLocal={setHyperHypoCompasLocal}
        labelTenue="Tenue du compas"
      />
      <p className='text-sm italic mt-5 mb-1 ml-2'>&ndash; Utilisation de l’équerre :</p>   
      <PraxiesGestuellesCard
        keyPrecision='precisionEquerre'
        keyTenue='tenueEquerre'
        precisionAvec='avec une équerre'
        setStateLocal={setPrecisionEquerreLocal} 
        stateLocal={precisionEquerreLocal}
        keyGestionTonus="gestionTonusEquerre"
        keyHyperHypo="hyperHypoEquerre"
        tenueStateLocal={tenueEquerreLocal}
        gestionTonusLocal={gestionTonusEquerreLocal}
        tonusBoolean={tonusEquerreLocal}
        setTonusBoolean={setTonusEquerreLocal}
        hyperHypoLocal={hyperHypoEquerreLocal}
        setHyperHypoLocal={setHyperHypoEquerreLocal}
        labelTenue="Tenue de l'équerre"
      />
    </Card>
  )
}

export default PraxiesGestuelles