
"use server"
import ThreadCard from '@/components/card/ThreadCard'
import Comment from '@/components/forms/Comment'
import { fetchThreadById } from '@/lib/actions/thread.action'
import { fetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import { threadId } from 'worker_threads'

async function Page({ params }: {
  params: {
  id:string
  }
}) {
  const user = await  currentUser()
  if (!user) return null;
  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onBoarded) return redirect('/onboarding')
    const post=await fetchThreadById(params.id)
  return (
    <section className="relative">
      <div>
  <ThreadCard  key={post?._id} isComment={false} author={post?.author} id={post?._id} currentUser={user?.id} content={post?.text} parentId={post?.parentId} community={post?.community} createdAt={post?.createdAt} comments={post?.children} />

      </div>
      <div className="mt-7">
        <Comment threadId={post.id} currentUserId={JSON.stringify(userInfo?.userId)} currentUserImg={userInfo?.image} />
      </div>
      <div className="mt-10">
        {post.children.map((post:any) => (
  <ThreadCard  key={post?._id} isComment={true} author={post?.author} id={post?._id} currentUser={user?.id} content={post?.text} parentId={post?.parentId} community={post?.community} createdAt={post?.createdAt} comments={post?.children} />
          
        ))}
      </div>

    </section>
  )
}

export default Page