import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import Image from "next/image"
import Link from "next/link"

const Topbar = () => {
  return (
    <nav className="topbar">
      <Link href='/' className="flex items-center gap-4 ">
        <Image src="/assets/logo.svg" width={28} height={28} alt="logo" />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">
Threads 
        </p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <Image src="/assets/logout.svg" alt="Logout" width={24} height={24}/>
            </SignOutButton>
          </SignedIn>

        </div>
        <OrganizationSwitcher appearance={
          {
              baseTheme:dark,
              elements: {
                organizationSwitcherTrigger:"py-2 px-4"
              }
            }
          }/>
      </div>
   </nav>
  )
}

export default Topbar