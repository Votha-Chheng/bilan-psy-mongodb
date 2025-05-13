"use client"

import { generateDocx } from '@/serverActions/generateDocx'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import dayjs from 'dayjs'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { useParams } from 'next/navigation'

const ConvertToDocxButton = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {patientInfoGenerales} = usePatientInfoStore()

  const {nom, prenom} = patientInfoGenerales ?? {}
  
  const [loading, setLoading] = useState<boolean>(false)

  const [success, setSuccess] = useState<boolean>(false)
  const [messageDocx, setMessageDocx] = useState<string|null>(null)


  useEffect(()=> {
    if(messageDocx){
      toast(messageDocx)
      setMessageDocx(null)
    }
  }, [success, messageDocx])


  const handleGenerateDocx = async() => {
    setLoading(true)
    setMessageDocx("Document en cours de génération...")
    setSuccess(false)

    const res = await generateDocx(patientId); // Récupérer la chaîne Base64
    if(res.success){
      const binary = atob(res.data!); // Convertir Base64 en binaire
  
      // Transformer en Uint8Array
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
  
      // Créer un Blob et déclencher le téléchargement
      const blob = new Blob([bytes], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download =`Bilan psy de ${nom?.toUpperCase()}-${prenom ?? "Prénom absent"} du ${dayjs(new Date(Date.now())).format("DD/MM/YYYY")}.docx`
      document.body.appendChild(a);
      setMessageDocx("Document disponible.")
      setSuccess(true)
      a.click()
      a.remove()
    } else {
      setMessageDocx(res.message?? null)
    }
      
    setLoading(false);
  }

  return (
    <div className="p-4">
      <Button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={()=> handleGenerateDocx()}
        disabled={loading}
      >
      {
        loading
        ?
        <Loader2 className='animate-spin' />
        :
        "Générer en format .docx"
      }
      </Button>
    </div>
  )
}

export default ConvertToDocxButton