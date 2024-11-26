import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import AdminHome from './pages/adminPage/AdminHome'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import HotelListPage from './pages/adminPage/HotelListPage'
import HotelAddPage from './pages/adminPage/HotelAddPage'
import HotelistPage from './pages/HotelistPage'
import HotelDetails from './pages/HotelDetails'
import AppoinMentHotel from './pages/AppoinMentHotel'

function App() {
 

  return (
  <div className='mx-4 sm:mx-[10%]'>

   <Navbar />
   <Routes>


{/* Route Admin */}

<Route
        path="/admin"
        element={
        
            <AdminHome />
        
        }
      />

<Route path='/admin/edithotel/:id' element={<HotelAddPage />} />

'/admin/edithotel/:id'




{/* user Routers */}



      <Route path='/login' element={<Login />} />
      
      <Route path='/About' element={<AboutPage />} />
      <Route path='/Contact' element={<ContactPage />} />
      <Route path='/Hotels' element={<HotelistPage />} />
      <Route path='/hotel-details/:id' element={<HotelDetails />} />
      <Route path='/my-appointments' element={<AppoinMentHotel />} />
      
      
      <Route path='/profile' element={
    
          <Profile />
  
      } />
      <Route path='/' element={
    
          <Home />

      } />
   </Routes>
  </div>
  )
}

export default App
