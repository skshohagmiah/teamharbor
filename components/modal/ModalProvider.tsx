'use client'
import React from 'react'
import SignInModal from './SignInModal'
import CreateBoardModal from './CreateBoardModal'

const ModalProvider = () => {
  return (
    <div className='max-w-7xl mx-auto'>
        <SignInModal />
        <CreateBoardModal />
    </div>
  )
}

export default ModalProvider