"use client"

import { AiOutlineHome } from 'react-icons/ai';
import { MdEvent } from 'react-icons/md';
import { FaTicketAlt } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { MdCreate } from 'react-icons/md';

import Link from 'next/link';

const links = [
    {
        name: 'Home',
        href: '/events/home',
        icon: AiOutlineHome
    },
    {
        name: 'Create',
        href: '/events/create',
        icon: MdCreate
    },
    {
        name: 'Events Organized',
        href: '/events/organized',
        icon: MdEvent
    },
    {
        name: 'Tickets Purchased',
        href: '/events/mytickets',
        icon: FaTicketAlt
    },

]

const DashNavLinks = () => {
    const pathname = usePathname()
  return (
    <>
        {links.map((link) => {
            const LinkIcon = link.icon;
            return (
                <Link
                    key={link.name}
                    href={link.href}
                    className={`flex h-[480] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-orange-100 hover:text-orange-600 md:flex-none md:justify-start md-p-2 md:px-3 ${pathname === link.href ? 'bg-orange-100 text-orange-600' : 'bg-white'}`}
                    >
                        <LinkIcon className='w-6 text-3xl' />
                        <p className='hidden md:block font-medium text-base'>{link.name}</p>

                </Link>
            )
        })}
    
    </>
  )
}

export default DashNavLinks
