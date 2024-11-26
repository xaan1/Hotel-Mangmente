
import { Tabs, TabsContent } from '../../components/ui/tabs'
import { Button } from '../../components/ui/button'
import { BarChart, Book, Hotel, List, LogOutIcon, Settings } from 'lucide-react'

import React from 'react'
import HotelAddPage from './HotelAddPage'
import HotelListPage from './HotelListPage'
import DashpourdPage from './DashpourdPage'

const AdminHome = () => {

  const [activeTap, setActiveTap] = React.useState('dashboard')

  const menuItem = [


    {
      label : 'Dashboard',
      value : 'dashboard',
      icon : BarChart,
      component :     <DashpourdPage />
    },
    

    {
      label : 'ADD Hotels',
      icon :  Hotel,
      value : 'AddHotel',
      component :    <HotelAddPage />
    },
    
    {
      label : 'Hotel List',
      icon : List,
      component :   <HotelListPage />,
    },
    {
      label : 'Log out',
      value : 'log out',
      icon : LogOutIcon,
     
    },


  ]
  return (
    <div className='flex h-full min-h-screen'>


    <aside className='w-64 bg-white shadow-md hidden md:block'>
       
       <div className='p-4 '>
        
            <h1 className='text-2xl font-semibold'>Instructor View  </h1>

            <nav className='mt-6'>

  {
    menuItem.map((item,index) => (

      <Button

      value={item.value}
      onClick={() => item.value === 'log out' ? handlelogout(): setActiveTap(item.value)}
      
      key={index} className=' w-full  mb-3 flex items-center justify-start p-4 cursor-pointer hover:bg-gray-600'>
        <item.icon className='w-6 h-6' />
        <span className='ml-4'>{item.label}</span>
      </Button>
    ))
  }
            </nav>
       </div>
    </aside>



<main className='flex-1 p-4 overflow-y-auto'>


<div className='max-w-7xl mx-auto'>
  

    

    <Tabs value={activeTap}
    onValueChange={(value) => setActiveTap(value)}>

     
     {
        menuItem.map((item,index) => (
          <TabsContent key={index} value={item.value}>
            {item.component !== null ? item.component : null}
          </TabsContent>
        ))
     }


    </Tabs>
</div>

</main>

    </div>
  )
}

export default AdminHome