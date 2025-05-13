import { ServiceResponse } from '@/@types/ServiceResponse'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/customHooks/useToast'
import { openSans } from '@/fonts/openSans'
import { createAmenagementItemAction } from '@/serverActions/amenagementsAction'
import { useAmenagementsStore } from '@/stores/amenagementsStore'
import { Loader } from 'lucide-react'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'

type CreateAmenagementItemDialogProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
const CreateAmenagementItemDialog: FC<CreateAmenagementItemDialogProps> = ({open, setOpen}) => {
  const {categoriesList, getAllAmenagementItems} = useAmenagementsStore()
  const [chosenCategory, setChosenCategory] = useState<string>("")
  const [newcategory, setNewCategory] = useState<string>("")
  const [newAmenagement, setNewAmenagement] = useState<string>("")

  const [isPending, setIsPending] = useState<boolean>(false)
  // eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})

  const handleCreateAmenagementItemAction = async(category: string, newAmenagement: string)=> {
    setIsPending(true)
    const res = await createAmenagementItemAction(newAmenagement.trim(), category.toUpperCase())
    // eslint-disable-next-line
    res.success && setNewAmenagement("")
    // eslint-disable-next-line
    res.success && setNewCategory("")
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)
  }

  useToast({state, updateFunction: ()=> getAllAmenagementItems()})

  return (
    <Dialog 
      onOpenChange={()=> setOpen(prev=>!prev)}
      open={open} 
    >
      <DialogContent aria-describedby="Fenêtre pour gérer la liste des écoles" className="min-w-[1080px] bg-white border-black border-4">
        <DialogHeader>
          <DialogTitle className='text-center border-b-2 border-black text-xl mb-5 pb-2.5 tracking-wider'>
            Ajouter un aménagement dans la base de données.
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Créez ici un aménagement dans la base de données. Vous pourrez ensuite le sélectionner pour le mettre dans vos aménagements. Un aménagement doit contenir une catégorie et l’intitulé de l’aménagement.
        </DialogDescription>
        <Separator/>
        <div className='flex gap-2 items-center'>
          <div className='flex gap-2 items-center'>
            <Label className='whitespace-nowrap'>&#10230; Choisir une catégorie : </Label>
            <Select value={chosenCategory} onValueChange={(value: string)=> setChosenCategory(value)}>
              <SelectTrigger className={`w-80 tracking-wide font-normal ${openSans.className}`} >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="Nouvelle catégorie">Ajouter une nouvelle catégorie</SelectItem>
                {
                  categoriesList && categoriesList.length>0 && categoriesList.map((value, index)=> (
                    <SelectItem key={index} className={`font-normal tracking-wide ${openSans.className}`} value={value}>{value}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          {
            chosenCategory === "Nouvelle catégorie" &&
            <Input 
              type='text' 
              placeholder="Si la catégorie n'existe pas, écrivez là ici..."
              className='placeholder:italic' 
              value={newcategory} 
              onChange={(event)=> setNewCategory(event.currentTarget.value)} 
            />
          }
        </div>
        <div>
          <Label className='whitespace-nowrap my-2'>&#10230; Texte de l’aménagement :</Label>
          <Textarea 
            placeholder="Intitulé de l'aménagement... Pas de retour à la ligne possible. Pour valider, vous pouvez appuyer sur la touche Entrée."
            className='placeholder:italic' 
            value={newAmenagement} 
            onChange={(event)=> setNewAmenagement(event.currentTarget.value)}
            onKeyDown={(event)=> event.key === "Enter" && handleCreateAmenagementItemAction(chosenCategory === "Nouvelle catégorie" ? newcategory : chosenCategory, newAmenagement)}
          />
        </div>
        <DialogFooter>
          <Button 
            className='uppercase tracking-wide bg-blue-600 hover:bg-blue-400' 
            onClick={()=> handleCreateAmenagementItemAction(chosenCategory === "Nouvelle catégorie" ? newcategory : chosenCategory, newAmenagement)}
          >
            {isPending ? <Loader className='animate-spin' /> : "Créer l'aménagement"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateAmenagementItemDialog