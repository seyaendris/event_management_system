import { FaUsers, FaDollarSign } from 'react-icons/fa';
import { MdAttachMoney, MdEvent } from 'react-icons/md';


const iconMap = {
    Attendants: FaUsers,
    Events: MdEvent,
    Sells: FaDollarSign,
    Earnings: MdAttachMoney
}


export function Cards ({
    title,
    value,
    type
}: {
    title: string
    value:string | number
    type: 'Attendants' | 'Events' | 'Sells' | 'Earnings'
}) {
    const Icon = iconMap[type]

    return (
        <div className='rounded-xl bg-orange-100 p-2 shadow-sm'>
            <div className='flex p-4'>
                {Icon ? <Icon className='h-5 w-5 text-gray-700' /> : null}
                <h3 className='ml-2 text-sm font-medium'>{title}</h3>
            </div>

            <p
                className='truncate rounded-xl bg-orange-50 px-4 py-8 text-center text-2xl'
                >
                    {value}
            </p>

        </div>
    )

}


const DashCards = () => {
    const Attendants = 50
    const Events = 10
    const Sells = 100
    const Earnings = 45000

  return (
    <>
        <Cards title='Attendants' value={Attendants} type='Attendants' />
        <Cards title='Events' value={Events} type='Events' />
        <Cards title='Sells' value={Sells} type='Sells' />
        <Cards title='Earnings' value={Attendants} type='Earnings' />
    </>
  )
}

export default DashCards
