import Image from 'next/image'
import React from 'react'
import logo from '@/public/logo.svg'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='flex items-center justify-between flex-wrap p-2 max-w-7xl mx-auto'>
          <Link href={'/'} className='flex gap-2'>
            <Image src={logo} alt='logo' width={40} height={40} className=''/>
            <p className='font-bold text-lg'>TeamHarbor</p>
        </Link>
        <div>
            <p>&copy; All Right Are Reserverd By TeamHarbor</p>
        </div>
    </footer>
  )
}

export default Footer