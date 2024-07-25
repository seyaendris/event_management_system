import React from 'react'
import DashCards from '../../../../components/shared/DashCards'

const Home = () => {
  return (
    <main>
    <h1 className='mb-4 text-xl md:text-3xl font-semibold'>DashBoard</h1>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <DashCards />
    </div>
  </main>
  )
}

export default Home
