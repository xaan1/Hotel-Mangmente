
import { AppContext } from "../context/AppContex"
import React, { useContext, useState } from 'react'

import  { NavLink, useNavigate} from  "react-router-dom"
import { IoMdMenu } from "react-icons/io";

import { IoCloseOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDropupCircle } from "react-icons/io";

const Navbar = () => {

    const {token, setToken} = useContext(AppContext)

    const navigate = useNavigate()


    const [showMenu  , setShowMenu] = useState(false)


    const logout = () => {
        setToken(null)

        token && localStorage.removeItem('token')
    }
  return (
    <div className='flex items-center justify-between   px-10 py-5 border-b text-sm mb-5 '>

       
        <div className='flex items-center space-x-4'>
            <h2 className='text-2xl font-semibold text-gray-800'>Logo</h2>
        </div>


        <ul className='hidden md:flex items-center justify-center space-x-10'>
        <NavLink to="/" >
                    
                    <li
                    className='py-2  text-2xl font-semibold text-gray-800'
                    
                    >
    
                    
Home
                    <hr className='border-none outline-none h-0.5 bg-primary hidden' />
    
                    </li>
            </NavLink>


            <NavLink to="/Hotels" >
                    
                    <li
                    className='py-2  text-2xl font-semibold text-gray-800 '
                    
                    >
    
                    Hotels
                    <hr className='border-none outline-none h-0.5 bg-primary hidden' />
    
                    </li>
            </NavLink>


            <NavLink to="/About" >
                    
                    <li
                    className='py-2  text-2xl font-semibold text-gray-800' 
                    
                    >
    
                    About
                    <hr className='border-none outline-none h-0.5 bg-primary hidden' />
    
                    </li>
            </NavLink>


            <NavLink to="/Contact" >
                    
                    <li
                    className='py-2  text-2xl font-semibold text-gray-800'
                    
                    >
    
                    Contact
                    <hr className='border-none outline-none h-0.5 bg-primary hidden' />
    
                    </li>
            </NavLink>

           

        </ul>


 {
        token ? (

          <div className='flex items-center cursor-pointer group relative gap-x-2'>
                           
                                <CgProfile className='w-10 h-10 rounded-full cursor-pointer' />
                        
                                <IoIosArrowDropupCircle  className='w-5 h-5 cursor-pointer' />

                                <div className='absolute top-0  right-0  pt-20 z-20 font-medium hidden group-hover:block'>
                                        

                                        <div className='bg-stone-100 p-10 flex flex-col space-y-2 rounded-md shadow-md min-w-49'>
                                        <p onClick={() => navigate("/profile")} className='hover:text-primary cursor-pointer'>Profile</p>
                                        <p onClick={() => navigate("/my-appointments")} className='hover:text-primary cursor-pointer'> Appointments</p>
                                        <p onClick={logout} className='hover:text-primary cursor-pointer'>Logout</p>
                                                </div>                                         
                                      
                                        </div>
                        </div>
          
        ) : (
            <button   onClick={() => navigate('/login')}   className='hidden md:flex  bg-gray-800 items-center space-x-2 px-4 py-2 text-white rounded-lg'>
            Create Account
        </button>
        )
 }



    
<IoMdMenu  className="w-h h-4 sm:hidden"    onClick={() => setShowMenu(true)}/>



  {/* mopil MENU */}

  <div className={`${showMenu ? "fixed w-full" : "h-0 w-0"}  md:hidden right-0 top-0 bottom-0 z-20  overflow-hidden bg-white transition`}>



  <div className='flex items-center justify-between px-3 py-4'>
                      <h2 className="text-2xl font-semibold">logo</h2>
                      
                      <IoCloseOutline   className="w-10 h-10"   onClick={() => setShowMenu(false)}/>
                </div>


                <ul className='flex flex-col items-center gap-4 px-4 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)}  to="/" > <p  className="px-4 py-3 rounded inline-block">Home</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to="/doctor" > <p className="px-4 py-3 rounded inline-block" >  Hotels</p></NavLink>
                        <NavLink   onClick={() => setShowMenu(false)} to="/about" > <p className="px-4 py-3 rounded inline-block">About</p></NavLink>
                        <NavLink   onClick={() => setShowMenu(false)} to="/contact" > <p className="px-4 py-3 rounded inline-block">Contact</p></NavLink>
                </ul>

</div>



    </div>
  )
}

export default Navbar