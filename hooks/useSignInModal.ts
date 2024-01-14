import { create } from 'zustand'


interface SignInModalProps{
    isOpen:boolean,
    onOpen: () => void,
    onClose:() => void
}


export const useSignInModal = create<SignInModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen:true}),
  onClose: () => set({ isOpen: false }),
}))