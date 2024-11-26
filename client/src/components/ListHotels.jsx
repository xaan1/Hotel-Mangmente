
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContex';
import React, { useContext } from 'react';

const ListHotels = () => {

    const {hotels} = useContext(AppContext)

    const navigate = useNavigate()
  return (
    <div className='mt-10'>


      <h1 className='text-2xl font-semibold text-center mt-10 mb-6'>The Best RealState Available</h1>
      
    

    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {
            hotels.map((hotel) => (
            <div onClick={() => navigate(`hotel-details/${hotel._id}`)} key={hotel._id} className='bg-white shadow-md rounded-md p-4'>
                <img src={hotel.image} alt='hotel' className='w-full h-48 object-cover' />
                <h1 className='text-xl font-semibold mt-2'>{hotel.name}</h1>
                <p className='text-gray-500'>{hotel.address}</p>
                <p className='text-gray-500'>${hotel.pricePerNight}</p>
                <p className='text-gray-500'>Rating : {hotel.rating}</p>
            </div>
            ))
        }
    </div>
    </div>
  );
}

export default ListHotels;
