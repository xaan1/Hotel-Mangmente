
import React from 'react'

import image from "../assets/pexels-energepic-com-27411-313691.jpg"
const Header = () => {
  return (
    <div className='flex flex-col md:flex-row gap-x-5   px-10 py-12 rounded-lg mb-10'>

<div className='md:w-1/2 flex flex-col items-start justify-center space-y-5 md:space-y-8'>
        <h1 className='text-4xl md:text-5xl font-bold leading-tight'>
          Book Appointment <br /> With The Hotels In The World 
        </h1>
        <p className='text-sm md:text-base'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum
        </p>
        {/* Batoon */}
        <a
          href='#'
          className='bg-black text-white px-6 sm:mb-10 py-3 rounded-full flex items-center gap-2 hover:bg-gray-100 hover:text-red-800 mt-5 md:mt-7'
        >
          Book Appointment
          {/* <img src={assets.arrow_icon} alt='arrow' className='w-4' /> */}
        </a>
      </div>

        <div className='md:w-1/2 flex flex-col mt-10'>
        <img src={image} alt='header' className='rounded-lg' />
        </div>

    </div>
  )
}

export default Header