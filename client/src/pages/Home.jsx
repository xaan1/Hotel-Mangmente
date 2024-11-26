
import ListHotels from '../components/ListHotels'
import Header from '../components/Header'
import React from 'react'
import Categories from '../components/Categories'

const Home = () => {


  return (
    <div>
        <Header />
        <Categories  />
        <ListHotels />

      <section className='py-8 px-4 lg:px-4 mt-10'>
        <footer className='text-center text-gray-500'>
          <p className='text-2xl font-semibold'>&copy; 2025 Hotel Booking. All rights reserved.</p>
        </footer>
      </section>
    </div>
  )
}

export default Home