
import "../../globals.css"
import AccountProfile from "@/components/forms/AccountProfile";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";

 
export default async function Page() {
  const user = await currentUser()
  const userInfo={}
  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    usename: userInfo?.username || user.username,
    name: userInfo?.name || user.name || "",
    bio: userInfo?.bio || "",
    image:userInfo?.image||user?.image
    
  }
  return (
    <main className="mx-auto flex flex-col max-w-3xl  justify-start px-10 py-12">
      <h1 className="head-text">On boarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now to use Threads
      </p>
      <section className="bg-dark-2 rounded-xl mt-9 p-10">
        <AccountProfile user={ userData}  btnTitle="Continue"/>
      </section>
    </main>
  )
 } 