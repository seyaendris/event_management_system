import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t border-orange-300">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
         <Link href="/">
                <Image
                  src="/Nuevents.png" 
                  width={100} 
                  height={38} 
                  alt="logo"
                  >

                  </Image>
            </Link>
            <p>2024 Nuevents. All rights reserved.</p>
            </div>
    </footer>
  )
}

export default Footer