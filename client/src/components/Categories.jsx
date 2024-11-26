
import { HotelCategories } from '../config/index';
import React from 'react';
import { Button } from './ui/button';

const Categories = () => {
  return (
    <section className='py-8 px-4 lg:px-4 bg-gray-200'>
    <h2
      className='text-2xl font-bold text-gray-800 text-center mb-4'>Hotels Categories</h2>
   
  
  
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
  
  
  
  {HotelCategories.map((categoryItem) => (
              <Button
                className="justify-start text-1xl"
                variant="outline"
                key={categoryItem.id}
                // onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
              >
                {categoryItem.label}
              </Button>
            ))}
  
    </div>
  </section>
  
  );
}

export default Categories;
