
import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import {redirect} from "next/navigation"
async function Page() {
  const user = await currentUser()
  
  if (!user) return null;
  console.log('user',user.id)
  const userInfo = await fetchUser(user.id)
  if (!userInfo.onBoarded)return redirect('/onBoarding')
  console.log(userInfo)

  return (<>
    
    
    <h1 className="head-text text-center py-1">Create thread</h1>
    <PostThread userId={userInfo.id} />
  </>)
}
export default Page