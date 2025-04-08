'use client'

import React, { useActionState, useEffect, useState } from 'react'
import { useMedecinStore } from '@/stores/medecinStore'
import { ChartNoAxesGantt, Eye, Mars, Venus, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import TextInput from '@/components/inputs/TextInput'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import AddOrdeleteMedecinDialog from '@/components/ui/alertsAndDialogs/AddOrdeleteMedecinDialog'
import { createPatientAction } from '@/serverActions/patientActions'
import { Ecole, Medecin } from '@prisma/client'
import { useEcoleStore } from '@/stores/ecoleStore'
import SubmitButton from '@/components/ui/SubmitButton'
import { Textarea } from '@/components/ui/textarea'
import AddorDeleteEcoleDialog from '@/components/ui/alertsAndDialogs/AddorDeleteEcoleDialog'
import MotifsListeDialog from '@/components/ui/alertsAndDialogs/MotifsListeDialog'
import { getIssueMessage } from '@/utils/captureIssue'
import { authClient } from '@/utils/auth-client'

const CreatePatientForm = () => {
  const [state, formAction, isPending] = useActionState(createPatientAction, {})

  const {data: session} = authClient.useSession()

  const {fetchListeMedecins, listeMedecins} = useMedecinStore()
  const {fetchListeEcoles, listeEcoles} = useEcoleStore()
  const [adulte, setAdulte] = useState<boolean>(false)
  const [sexe, setSexe] = useState<"m"|"f">("m")
  const [newDateNaissance, setNewDateNaissance] = useState<string>(state?.fields?.dateNaissance||"")
  const [chosenMedecin, setChosenMedecin] = useState<string|undefined>(state?.fields?.medecin||"")
  const [chosenEcole, setChosenEcole] = useState<string|undefined>(state?.fields?.ecole || "")
  const [openMedecinDialog, setOpenMedecinDialog] = useState<boolean>(false)
  const [openEcoleDialog, setOpenEcoleDialog] = useState<boolean>(false)
  const [openMotifDialog, setOpenMotifDialog] = useState<boolean>(false)

  useEffect(()=>{
    fetchListeMedecins()
    fetchListeEcoles()
    return () => {
      fetchListeMedecins()
      fetchListeEcoles()
    }
  }, [])

  return (
    <Card className='p-5'>
      <form className='flex flex-col gap-5' action={formAction}>
        <input type="hidden" name="userId" value={session?.user.id ?? ""} />
        <input type="hidden" name="sexe" value={sexe} />
        <input type="hidden" name="medecin" value={chosenMedecin} />
        <input type="hidden" name="ecole" value={chosenEcole} />
        <input type="hidden" name="adulte" value={JSON.stringify(adulte)} />
        <div className='flex w-full items-center text-sm justify-between mb-7'>
          <div className='flex gap-5 mb-2'>
            <span className={`font-bold ${!adulte && "opacity-20"}`}>
              Le patient est un adulte
            </span>
            <Switch 
              checked={adulte} 
              onClick={()=> {
                setAdulte(prev=> !prev)
                setChosenEcole("")
              }}
            />
          </div>
          <div className='flex gap-5 items-center relative'>
            <span className='font-bold'>Date de naissance :</span>
            <div className='relative'>
              <Input 
                type="date" 
                name='dateNaissance' 
                value={state?.fields?.dateNaissance||newDateNaissance} 
                onChange={(e)=> setNewDateNaissance(e.currentTarget.value)} 
                className='w-36 cursor-pointer' 
                required
              />
              {
                getIssueMessage("dateNaissance", state.issues) &&
                <p className='text-red-700 flex text-xs absolute left-0 -bottom-5 font-bold'><X className='text-red-700' size={17.5}/> {getIssueMessage("dateNaissance", state.issues)}</p>
              }
            </div>
          </div>
          <div className='pr-10'>
            <div className='flex gap-5 mb-2'>
              <span  className='font-bold'>Sexe :</span>
              <RadioGroup
                name='sexe' 
                value={state?.fields?.dateNaissance||sexe}
                className="flex gap-x-5"
              >
                <div className="flex items-center space-x-1 space-y-0">
                  <RadioGroupItem id='f' value="f" onClick={()=> setSexe("f")} />
                    <div>
                      <Label htmlFor='f' className={`font-normal cursor-pointer ${sexe ==="m" ? "opacity-30":"underline underline-offset-4"} `}>
                        Féminin <Venus/>
                      </Label>
                    </div>
                </div>
                <div className="flex items-center space-x-1 space-y-0">
                  <RadioGroupItem id='m' value="m" onClick={()=> setSexe("m")} />
                  <div>
                    <Label htmlFor='m' className={`font-normal cursor-pointer ${sexe ==="f" ? "opacity-30":"underline underline-offset-4"} `}>
                      Masculin <Mars/>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className='flex gap-5 w-full'>
          <TextInput errorMessage={getIssueMessage("prenom", state.issues)} defaultValue={state?.fields?.prenom } vertical={true} name='prenom' label="Prénom" />
          <TextInput errorMessage={getIssueMessage("nom", state.issues)} defaultValue={state?.fields?.nom } vertical={true} name='nom' label="Nom" />
        </div>
        <div className='flex gap-5 justify-between'>
          <div className='flex gap-3 items-center'>
            <Label>Médecin prescripteur : </Label>
            <div className='flex'>
              <Select onValueChange={(value)=> setChosenMedecin(value)} defaultValue={state?.fields?.medecin||chosenMedecin} required >
                <SelectTrigger className="w-[200px] relative">
                  <SelectValue placeholder="Choisir un médecin" />
                  {
                    getIssueMessage("medecin", state.issues) &&
                    <p className='text-red-700 flex text-xs absolute left-0 -bottom-5 font-bold'><X className='text-red-700' size={17.5}/>{getIssueMessage("medecin", state.issues)}</p>
                  }
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {                 
                      listeMedecins && listeMedecins.length>0 && listeMedecins.map((medecin: Medecin)=>(
                        <SelectItem key={medecin.id} value={medecin.nom}>{medecin.nom}</SelectItem>
                      ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='ml-2.5'>
              <Button type='button' onClick={()=> setOpenMedecinDialog(true)}>
                <ChartNoAxesGantt/> Gérer la liste des médecins
              </Button>
            </div>
          </div>
          <div className={`flex gap-3 items-center ${adulte && "opacity-20 user-select-none"}`}>
            <Label>&Eacute;cole/&Eacute;tablissement scolaire : </Label>
            <div className='flex'>
              <Select onValueChange={(value)=> setChosenEcole(value)} disabled={adulte} defaultValue={state?.fields?.ecole||chosenEcole} required >
                <SelectTrigger className="w-[250px] relative">
                  <SelectValue placeholder="Choisir un établissement" />
                  {
                    getIssueMessage("ecole", state.issues) &&
                    <p className='text-red-700 flex text-xs absolute left-0 -bottom-5 font-bold'><X className='text-red-700' size={17.5}/>{getIssueMessage("ecole", state.issues)}</p>
                  }
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {                 
                      listeEcoles && listeEcoles.length>0 && listeEcoles.map((ecole: Ecole)=>(
                        <SelectItem key={ecole.id} value={ecole.nom}>{ecole.nom}</SelectItem>
                      ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='ml-2.5'>
              <Button type='button' disabled={adulte} onClick={()=> setOpenEcoleDialog(true)}>
                <ChartNoAxesGantt/> Gérer la liste des établissements scolaires
              </Button>
            </div>
          </div>
        </div>
        <div className='mt-8 mb-5 relative'>
          <div className='flex items-center gap-x-2.5 mb-2.5'>
            <Label htmlFor='motif'>Motif de consultation :</Label>
            <Button type='button' onClick={()=> setOpenMotifDialog(true)}>
              <Eye/> Voir les motifs de consultation existants
            </Button>
          </div>
          <Textarea name='motif' id='motif' defaultValue={state?.fields?.motif} />
          {
            getIssueMessage("motif", state.issues) &&
            <p className='text-red-700 flex text-xs left-0 absolute -bottom-5 font-bold'><X className='text-red-700' size={17.5}/>{getIssueMessage("motif", state.issues)}</p>
          }
        </div>
        <SubmitButton isPending={isPending} label='Créer la fiche patient'/>
      </form>
      <AddOrdeleteMedecinDialog
        open={openMedecinDialog} 
        setOpen={setOpenMedecinDialog} 
      />
      <AddorDeleteEcoleDialog
        open={openEcoleDialog} 
        setOpen={setOpenEcoleDialog} 
      />
      <MotifsListeDialog
        open={openMotifDialog} 
        setOpen={setOpenMotifDialog} 
      />
    </Card>
  )
}

export default CreatePatientForm
