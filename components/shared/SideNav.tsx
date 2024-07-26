import Link from "next/link";
import DashNavLinks from "./DashNavLinks";
import Image from "next/image";

export default function SideNav () {
  return (
    <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
      {/* <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md p-4 md:h-40"
        href="/"
      >
        <div className="object-cover">
        <Image
                  src="/Nuevents.png" 
                  width={100} 
                  height={38} 
                  alt="logo"
                  >

                  </Image>
        </div>
      </Link> */}
      <DashNavLinks />
    </div>
  )
}

