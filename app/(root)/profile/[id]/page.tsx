
import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import {redirect} from "next/navigation"
async function Page({ params }: {params:{ id: string }}) {
  const user = await currentUser()
  console.log(params.id)
  if (!user) return null;
  console.log('user',user.id)
  const userInfo = await fetchUser(params.id)
  console.log(userInfo)
  if (!userInfo?.onBoarded)return redirect('/onboarding')
  console.log(userInfo)

  return (
    <section>
      <ProfileHeader accountId={params.id} authUserId={userInfo.id} name={userInfo.name} username={userInfo.username} image={userInfo.image} bio={userInfo.bio}  />
    </section>
  )
}

export default Page