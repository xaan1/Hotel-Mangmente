import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContex';

const HotelDetails = () => {
  const { backEndUrl  , token} = useContext(AppContext);
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const navigate = useNavigate()

  const fetchHotel = async () => {
    try {
      const { data } = await axios.get(`${backEndUrl}/api/hotels/getOneHotel/${id}`);
      console.log(data);
      setHotel(data.hotel);
    } catch (error) {
      console.error('Error fetching hotel:', error);
    }
  };


  const daysOfWeak = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


  const getAvailableSlots = () => {
    setDocSlot([]);
  
    let today = new Date();
    console.log(today, "today");
  
    // calculate 7 days
    for (let i = 0; i < 7; i++) {
      // Clone the current date and add `i` days
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
  
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0); // dhamaadka waqtiga maalinta
  
    
  
      // Haddii ay tahay maanta (maalinta 0aad)
      if (today.getDate() === currentDate.getDate()) {
        // Haddii waqtiga hadda jira uu ka weyn yahay 10:30 subaxnimo
        if (currentDate.getHours() >= 10 && currentDate.getMinutes() > 30) {
          currentDate.setHours(currentDate.getHours() + 1); // saacad ku dar
          currentDate.setMinutes(0);
        } else {
          currentDate.setHours(10);
          currentDate.setMinutes(30);
        }
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      
      let timeSlot = [];
  
      // Samee boosaska 30 daqiiqo ah ilaa 9PM
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
        timeSlot.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
  
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
  
      setDocSlot((prev) => [...prev, timeSlot]);
    }
  };


  useEffect(() => {
    getAvailableSlots()

  },[hotel])

  useEffect(() => {
    if (id) fetchHotel();
  }, [id]);


  console.log(docSlot, "docSlot");

  if (!hotel) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  const { name, address, amenities, pricePerNight, rating, image, availability } = hotel;



  // booking






  
  async function BookAppointment() {


    if(!token){
    alert('Please login to book appointment')
       return navigate('/login')
    }


    try {

  
const date = docSlot[slotIndex][0].datetime;
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const slotDate = `${day}-${month}-${year}`; // Correct format

      console.log(slotDate, "slotDate");
   
      const { data } = await axios.post(`${backEndUrl}/api/users/hotelBooking`, {
        hotelId : hotel._id,
        slotDate,
        slotTime : slotTime,
      }, {
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      })

      console.log(data, "data in book appointment");

      if(data.success){
        // toast.success(data.message)
        navigate('/my-appointments')
        alert(data.message)
      }
    }
   catch (error) {
    console.log(error);
   }

   









  }






  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={image} alt={name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
          <p className="text-gray-600 mt-2">{address}</p>
          <p className={`mt-4 text-sm ${availability ? 'text-green-600' : 'text-red-600'}`}>
            {availability ? 'Available' : 'Not Available'}
          </p>
          <p className="mt-4 text-lg font-semibold text-gray-800">Price: ${pricePerNight}/night</p>
          <p className="mt-4 text-yellow-500">Rating: {'⭐'.repeat(rating)}</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">Amenities:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {amenities?.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>


      {/* BOOKING  */}

      
<div className='mt-10 sm:ml-72 sm:pl-4  font-medium text-gray-700'>



<p className='text-2xl font-semibold'>Book an appointment</p>



<div className='flex gap-x-3 items-baseline w-ful mt-4 overflow-hidden'>
  {
    docSlot.length && docSlot.map((item, index) => (
      <div onClick={() => setSlotIndex(index)} className={
        `text-center py-6 min-w-16 rounded-full cursor-pointer  ,
        ${slotIndex === index  ? 'bg-blue-500 text-white' : 'bg-gray-200'}`
      } key={index}>
        

        <p>
          {item[0]   && daysOfWeak[item[0].datetime.getDay()]} 

        </p>

        <p>
          {item[0]   && item[0].datetime.getDate()}

        </p>
      </div>
    ))
  }
</div>


<div className='mt-4 flex gap-x-2 items-center w-full overflow-x-scroll'>

  {
    docSlot.length && docSlot[slotIndex].map((item, index) => (
      <div onClick={() => setSlotTime(item.time)} className={
        `text-center py-6 min-w-16 rounded-full cursor-pointer  ,
        ${slotTime === item.time  ? 'bg-blue-600 text-black' : 'bg-gray-300 '}`
      } key={index}>
        

        <p>
          {item.time} 

        </p>

      </div>
    ))
  }


</div>



<button   className=' w-full max-w-3xl flex items-center mx-auto justify-center mt-5 bg-blue-700 text-white px-5 py-3 rounded-md'  onClick={BookAppointment}>Book Appointments </button>


</div>
    </div>
  );
};

export default HotelDetails;


