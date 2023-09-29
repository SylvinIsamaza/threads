"use server"
import ThreadCard from "@/components/card/ThreadCard";
import { fetchPost } from "@/lib/actions/thread.action";
import user from "@/lib/models/user.model";
import { UserButton, currentUser } from "@clerk/nextjs";
 
export default async function Home() {
  const user=await currentUser()
  const result = await fetchPost(1, 30)
  console.log(result)
  return (
    <div>
      <h1 className="head-text text-left"> Home</h1>
      <section className="mt-9 flex flex-col gap-10">
      {result.posts.length < 1 ? (
        <p className="no-result">
          No threads found
        </p>
        ) : (
            
            <>
              {
                result.posts.map((post) => (
                  <ThreadCard  key={post._id} isComment={true} author={post.author} id={post._id} currentUser={user?.id} content={post.text} parentId={post.parentId} community={post.community} createdAt={post.createdAt} comments={post.children} />
                ))
              }
            
          </>
      )}
      </section>

    </div>
  )
 } 