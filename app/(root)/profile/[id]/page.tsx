
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import Image from "next/image";
import {redirect} from "next/navigation"
async function Page({ params }: {params:{ id: string }}) {
  const user = await currentUser()

  if (!user) return null;

  
  const userInfo = await fetchUser(params.id)
  const currentUserId = await fetchUser(user.id)
  console.log('currentUser'+currentUserId.userId)
  console.log(userInfo)
  if (!userInfo?.onBoarded)return redirect('/onboarding')
  console.log(userInfo)

  return (
    <section>
      <ProfileHeader accountId={params.id} authUserId={userInfo.id} name={userInfo.name} username={userInfo.username} image={userInfo.image} bio={userInfo.bio}  />
      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {
              profileTabs.map((tab) => <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image src={tab.icon} width={24} height={24} alt={tab.label} className="object-contain" />
                <p>{tab.label}</p>
                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                   {userInfo?.threads.length}
                  </p>
                )}
              </TabsTrigger>)
             }
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent  key={`content-${tab.label}`} value={tab.value} className="w-full text-light-1" >
              <ThreadsTab currentUserId={currentUserId.userId} accountId={params.id} accountType="User" />
      </TabsContent>
    ))}
        </Tabs>
   </div>
    </section>
  )
}

export default Page