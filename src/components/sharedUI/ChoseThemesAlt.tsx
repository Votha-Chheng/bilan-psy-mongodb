import { AnamneseResults, AnamneseResultsDomaineKeyLabel } from "@/@types/Anamnese"
import { useAnamneseSearchDBStore } from "@/stores/anamneseSearchDBStore"
import { Dispatch, FC, SetStateAction } from "react"
import { Badge } from "../ui/badge"
import DeleteAnamneseThemeAlert from "./alertsAndDialogs/DeleteAnamneseThemeAlert"

type ChooseThemesAltProps = {
  listeThemes: AnamneseResultsDomaineKeyLabel[]
  openDialog: boolean
  setOpenDialog: Dispatch<SetStateAction<boolean>>
  setKeyToDelete: Dispatch<SetStateAction<keyof AnamneseResults|null>>
  themeToDelete:string|null
  setThemeToDelete:  Dispatch<SetStateAction<string|null>>
  keyToDelete: keyof AnamneseResults|null
}

const ChooseThemesAlt: FC<ChooseThemesAltProps> = ({setOpenDialog, listeThemes, setKeyToDelete, setThemeToDelete, themeToDelete, openDialog, keyToDelete}) => {
  const {anamneseResults} = useAnamneseSearchDBStore()
  const {chosenThemes, setChosenThemes} = useAnamneseSearchDBStore()

  const handleChosenThemes = (theme: string, keyTheme: keyof AnamneseResults|null) => {
    if(!keyTheme) return
    if(chosenThemes.includes(theme)){
      if(anamneseResults && anamneseResults[keyTheme]){
        setThemeToDelete(theme)
        setKeyToDelete(keyTheme)
        setOpenDialog(true)
      } else {
        const newState = chosenThemes.filter(item => item !== theme)
        setChosenThemes(newState)
      }
    }else{
      setChosenThemes([...chosenThemes, theme])
    }
  }

  return (
    <div className='flex justify-center gap-x-3 mb-5 flex-wrap' >
      <DeleteAnamneseThemeAlert 
        openDialog={openDialog} 
        setOpenDialog={setOpenDialog} 
        themeToDelete={themeToDelete} 
        setThemeToDelete={setThemeToDelete}
        keyToDelete={keyToDelete}
        setKeyToDelete={setKeyToDelete}
      />
      {
        listeThemes.map((theme: AnamneseResultsDomaineKeyLabel, index: number) => (
          <Badge 
            key={index} 
            variant="outline" 
            className={`mb-2 cursor-pointer text-sm font-bold tracking-wider ${chosenThemes.includes(theme.label) && "bg-slate-300"}`} 
            onClick={()=>handleChosenThemes(theme.label, theme.key)}
          >
            {theme.label}
          </Badge>
        ))
      }
    </div>  
  )
}

export default ChooseThemesAlt