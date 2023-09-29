import { fetchUserPosts } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'

import React from 'react'
import ThreadCard from '../card/ThreadCard'
import { currentUser } from '@clerk/nextjs'
interface Props{
  currentUserId: string,
  accountId:string,
  accountType:string
}
const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  const result = await fetchUserPosts(accountId) 
  
  
  if(!result ) return redirect('/')
  return (
    <section className='flex flex-col mt-9 gap-10'>

      {result.threads.map((thread: any) => {
       
        return (
       
          <ThreadCard key={thread?._id} isComment={false} author={accountType == "User" ? { name: result.name, image: result.image, id: result.id,userId:result.userId } : { name: thread.author.name,image:thread.author.image,id:thread.author.id,userId:thread.author.userId }} id={thread?._id} currentUser={currentUserId} content={thread?.text} parentId={thread?.parentId} community={thread?.community} createdAt={thread?.createdAt} comments={thread?.children} />
      )})}
    </section>
  )
}

export default ThreadsTab