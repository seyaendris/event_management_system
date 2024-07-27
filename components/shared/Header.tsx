import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"

const Header = () => {
  return (
    <header className="w-full border-b border-orange-700">
        <div className="wrapper items-center justify-between flex">
            <Link href="/" className="w-36">
                <Image
                  src="/Nuevents.png" 
                  width={100} 
                  height={38} 
                  alt="logo"
                  >

                  </Image>
            </Link>

            <SignedIn>
              <nav className="md:flex-between hidden w-full max-w-xs">
              <NavItems />
              </nav>
            </SignedIn>

            <div className="flex w-32 justify-end gap-3">
                <SignedIn>
                  <UserButton afterSignOutUrl="/"></UserButton>
                  <MobileNav />
                </SignedIn>

              
                <SignedOut>
                <div className="flex justify-between">
                <Link className="pr-96 pt-3 font-semibold hover:text-orange-600" href="#events">
                  Events
                </Link>
                  <Button asChild className="bg-orange-600 rounded-3xl hover:bg-orange-500" size="lg">
                    <Link href="/sign-in">Login</Link>
                  </Button>
                  </div>
                </SignedOut>
              


            </div>
        </div>
    </header>
  )
}

export default Header