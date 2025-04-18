import React from 'react'
import { BookDisplay } from '../components/BookDisplay'
import { Link } from 'react-router-dom'
import { IoFilter } from "react-icons/io5";
const DisplayBooks = () => {
  
  return (
    <div className='h-[100vh]'>
     
      <BookDisplay />
    </div>
  )
}

export default DisplayBooks