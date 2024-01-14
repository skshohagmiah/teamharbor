import { create } from 'zustand'


interface boardModalProps{
    isOpen:boolean,
    onOpen: () => void,
    onClose:() => void
}


export const useCreateBoardModal = create<boardModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen:true}),
  onClose: () => set({ isOpen: false }),
}))