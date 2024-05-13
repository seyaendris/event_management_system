import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import NavItems from "./NavItems"


  
const MobileNav = () => {
  return (
    <nav className="md:hidden">
        <Sheet>
            <SheetTrigger className="align-middle">
               <Image 
                   src="/assets/icons/menu.svg"
                   alt="menu" 
                   width={24}
                   height={24}
                   className="cursor-pointer"
                   >
                </Image>

            </SheetTrigger>

            <SheetContent className="flex flex-col gap-6 md:hidden bg-white">
            <Image 
                   src="/Nuevents.png"
                   alt="logo" 
                   width={100}
                   height={38}
                   >
                </Image>
                <Separator className="border border-gray-100" />
                <NavItems />

            </SheetContent>
        </Sheet>

    </nav>
  )
}

export default MobileNav