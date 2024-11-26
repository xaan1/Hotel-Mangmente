
import React, { useContext } from 'react'
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label"
import { filterOption} from '../../config/index';
import { AppContext } from '../../context/AppContex';
import { Card, CardContent, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Delete, Edit } from 'lucide-react';

import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const HotelListPage = () => {


  const navigate = useNavigate()
  
  const {hotels ,backEndUrl , fetchHotels ,    currentEdited , setCurrentEdited}  = useContext(AppContext)

  const DeleHotel = async(id) => {
    console.log('delete hotel', id)

    try {

    const {data} =  await axios.delete(`${backEndUrl}/api/hotels/RemoveHotel/${id}`,)

    console.log(data)

    if(data.success) {
      alert('hotel deleted successfully')
      fetchHotels()

    }aa

    }
    catch (error) {
      console.log(error)
    }
  }

 
  return (
    <div className='container mx-auto p-4'>
  


    <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Name</TableHead>
      <TableHead>address</TableHead>
      <TableHead>rating</TableHead>
      <TableHead className="text-right">Price</TableHead>
      <TableHead className="text-right">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
   

    {hotels.map((hotel) => (
      <TableRow key={hotel.id}>
        <TableCell>{hotel.name}</TableCell>
        <TableCell>{hotel.address}</TableCell>
        <TableCell>{hotel.rating}</TableCell>
        <TableCell className="text-right">{hotel.
pricePerNight}</TableCell>

<TableCell className="text-right">
            <Button

onClick={() => {
      setCurrentEdited(hotel?._id)
      navigate('/admin/edithotel/'+hotel?._id)
}}
        
    

  
            
            variant= "ghost">
              <Edit size={20} />
            </Button>


            <Button variant= "ghost"           onClick={() => DeleHotel(hotel._id)} >
              <Delete size={20} 
     
              
              />
            </Button>
  
            </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>



  </div>
  )
}

export default HotelListPage