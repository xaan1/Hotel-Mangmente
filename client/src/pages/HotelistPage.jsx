
import { AppContext } from "../context/AppContex";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label"
import { filterOption} from'../config/index';
import React, { useContext } from 'react';

const HotelistPage = () => {
  console.log(filterOption ,"filterOption");
  console.log(filterOption)
  const {hotels ,backEndUrl , fetchHotels}  = useContext(AppContext)

  console.log(hotels)
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold text-center'>Hotel List</h1>

      <div className='flex flex-col md:flex-row md:flex-wrap gap-4'>
      <aside className='w-full md:w-64 space-y-4'>
        <div className='bg-white p-4 rounded-lg shadow-md'>
     

        {
        Object.keys(filterOption).map((key) => (

            <div key={key} className='space-y-4 p-4'>
                     

                <h3 className=' font-semibold text-1xl  text-gray-800'>{key.toUpperCase()}</h3>

                     <div className='space-y-3 mt-2'>

                        {
                            filterOption[key].map((option) => (

                                <Label className="flex font-medium items-center gap-3">

                           
                                <Checkbox  

                                
                                
                                />

                                {
                                    option.label
                                }
                               
                               </Label>
                              
                            ))
                        }
                
              
                </div>
                </div>
        ))
        
       }
         



      
      
        </div>
      </aside>


<main className='flex-1'>


<div className="space-y-4">




{

hotels.map((hotel) => (
  <div key={hotel.id} className='bg-white p-4 rounded-lg shadow-md flex items-center '>
    <div>
      <h2 className='text-xl font-semibold'>{hotel.name}</h2>
      <img src={hotel.image} alt={hotel.name} className='w-64 h-40 object-cover' />
      <p>{hotel.address}</p>
      <p>{hotel.rating}</p>
      <p className=''>{hotel.pricePerNight}</p>
    </div>
    <div>
    
      <div className='space-x-4'>
    
      </div>
    </div>
  </div>
))
}
            


     </div>

   </main>
      </div>
    </div>
  );
}

export default HotelistPage;
