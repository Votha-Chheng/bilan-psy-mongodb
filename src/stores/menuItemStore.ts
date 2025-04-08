import { create } from 'zustand'

type MenuItemState = {
  menuItem: string|null
  setMenuItem : (value: string|null)=>void
  
}

export const useMenuItemStore = create<MenuItemState>((set) => ({
  menuItem: null,
  setMenuItem: (menuItem: string|null) => set(()=> ({menuItem})),
}))