import React, { useContext, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from '../../components/ui/card'
import axios from 'axios'
import { AppContext } from '../../context/AppContex'
import { useNavigate, useParams } from 'react-router-dom'

const HotelAddPage = () => {
  const { id } = useParams()
  const { backEndUrl  ,currentEdited ,setCurrentEdited} = useContext(AppContext)

  console.log(currentEdited , "currentEdited")

  const [hotel, setHotel] = useState(null)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [pricePerNight, setPricePerNight] = useState('')
  const [image, setImage] = useState(null)
  const [amenities, setAmenities] = useState('')
  const [rating, setRating] = useState('')
  const [availability, setAvailability] = useState('')

  const navigate = useNavigate()


    // Function to fetch the hotel data by ID
    const fetchHotel = async () => {
      try {
        const { data } = await axios.get(`${backEndUrl}/api/hotels/getOneHotel/${id}`)
        if (data.success) {
          console.log('Hotel data:', data.hotel)
          const hotelData = data.hotel
          setHotel(hotelData)
          setName(hotelData.name || '')
          setAddress(hotelData.address || '')
          setPricePerNight(hotelData.pricePerNight || '')
          setAmenities(hotelData.amenities || '')
          setRating(hotelData.rating || '')
          setAvailability(hotelData.availability || '')
          // setImage(hotelData.image || "")
        }
      } catch (error) {
        console.error('Error fetching hotel:', error)
      }
    }

    useEffect(() => {

      if(currentEdited) fetchHotel()

    }, [id])

    useEffect(() => {

      if(id) setCurrentEdited(id)
    
     },[id])






  const handleSubmit = async (e) => {
    e.preventDefault();
  // Daabac xogta loo dirayo backend-ka
  
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('address', address);
      formData.append('pricePerNight', pricePerNight);
      formData.append('image', image);
      formData.append('amenities', amenities);
      formData.append('rating', rating);
      if (!image && !id) return alert('Please select an image')

        try {
          const formData = new FormData()
          formData.append('name', name)
          formData.append('address', address)
          formData.append('pricePerNight', pricePerNight)
          formData.append('image', image)
          formData.append('amenities', amenities)
          formData.append('rating', rating)

          const {data} = await currentEdited == null ? await   axios.post(`${backEndUrl}/api/hotels/addHotel`, formData,  { headers: {
            'Content-Type': 'multipart/form-data',
          },}):  await axios.put(`${backEndUrl}/api/hotels/updateHotel/${currentEdited}`, formData,  { headers: {
            'Content-Type': 'multipart/form-data',
          },})

          console.log(data , "data waaaye")
        
        
          
        } catch (error) {
          console.error('Error submitting form:', error)
          alert('An error occurred while processing your request.')
        }
        
     // Daabac jawaabta backend-ka
  
  
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <Card>
      <CardHeader className="text-center text-2xl font-semibold">
        {id ? 'Edit Hotel' : 'Add Hotel'}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="mt-1">
          <div className="flex flex-col space-y-2 px-2">
            <div className="flex flex-col">
              <label className="text-sm block mb-1">Hotel Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="border w-full p-3"
                placeholder="Enter Hotel Name"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm block mb-1">Hotel Address</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                className="border w-full p-3"
                placeholder="Enter Hotel Address"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm block mb-1">Price Per Night</label>
              <input
                value={pricePerNight}
                onChange={(e) => setPricePerNight(e.target.value)}
                type="number"
                className="border w-full p-3"
                placeholder="Enter Price Per Night"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm block mb-1">Amenities</label>
              <input
                value={amenities}
                onChange={(e) => setAmenities(e.target.value)}
                type="text"
                className="border w-full p-3"
                placeholder="Enter Amenities"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm block mb-1">Rating</label>
              <input
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                type="number"
                className="border w-full p-3"
                placeholder="Enter Hotel Rating"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm block mb-1">Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="border"
              />
            </div>


            <div className='flex flex-col'>
  {image ? (
    <img
      src={URL.createObjectURL(image)} // Show the new image
      alt='hotel'
      className='w-32 h-32 object-cover'
    />
  ) : (
    hotel?.image && (
      <img
        src={hotel?.image} // Show the existing image from the database
        alt='hotel'
        className='w-32 h-32 object-cover'
      />
    )
  )}
</div>

           
          </div>

          <button className="bg-blue-500 text-white p-3 rounded-md w-full mt-4">
            {id ? 'Edit Hotel' : 'Add Hotel'}
          </button>
        </form>
      </CardContent>
    </Card>
  )
}

export default HotelAddPage
