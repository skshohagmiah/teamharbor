import { auth } from '@/auth'
import CreateBoard from '@/components/board/CreateBoard';
import Hero from '@/components/hero/Hero'
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/getCurrentUser';

import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();
  const user = await getCurrentUser()
  const boards = await prisma.board.findMany({
    where:{
      members:{
        some:{
          userId: user?.id
        }
      }
    },
    orderBy:{
      createdAt:'desc'
    }
  })

  if(!session){
    return <Hero />
  }
  if(boards.length >= 1){
   return redirect(`/board/${boards[0].id}`)
  }else{
    return <div className='bg-white h-full'>
      <CreateBoard />
    </div>
  }
}