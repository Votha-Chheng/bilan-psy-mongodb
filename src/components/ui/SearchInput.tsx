import { Search, X } from 'lucide-react'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { Input } from './input'

type SearchInputProps = {
  setSearch: Dispatch<SetStateAction<string>>
}

const SearchInput: FC<SearchInputProps> = ({setSearch}) => {
  return (
    <div className="relative w-4/5 mx-auto">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Recherche contenant le mot..." className="pl-8 pr-10" onChange={(event)=> setSearch(event.currentTarget.value)} />
      <X className='text-muted-foreground absolute right-1 top-1.5 cursor-pointer'/>
    </div>
  )
}

export default SearchInput
