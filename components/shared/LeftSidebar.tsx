"use client"
import { sidebarLinks } from "@/constants"
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs"
import { clients } from "@clerk/nextjs/api"
import Image from "next/image"
import Link from "next/link"
import { usePathname,useRouter } from "next/navigation"



const LeftSidebar = () => {
  const { userId } = useAuth()

  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className=" custom-scrollbar leftsidebar">
      <div className="flex flex-col flex-1 w-full gap-6 px-6">
        {sidebarLinks.map((link) => {
          
          const isActive = (pathname.includes(link.route) && link.route.length > 1 || pathname == link.route)
          if (link.route=="/profile") link.route=`${link.route}/${userId}`
          return(
          <Link href={link.route} key={link.label} className={`leftsidebar_link ${isActive&&'bg-primary-500'}`}>
            <Image src={link.imgURL} alt={link.label} width={24} height={24} />
            <p className="text-light-1 max-lg:hidden">
              {link.label}
            </p>
  </Link>
          )
        })}
                <div className="mt-10 px-6">
          <SignedIn>
            <SignOutButton signOutCallback={()=>router.push('/sign-in ')} >
              <div className="flex gap-">
              <Image src="/assets/logout.svg" alt="Logout" width={24} height={24} />
              <p className="text-light-1 max-lg:hidden">
             Logout
            </p>
              </div>

            </SignOutButton>
          </SignedIn>
  

        </div>
      </div>
    </section>
  )
}

export default LeftSidebar