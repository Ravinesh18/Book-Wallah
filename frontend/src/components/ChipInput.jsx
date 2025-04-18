import React, { useEffect, useState } from 'react'
import {MdClose} from 'react-icons/md'
const ChipInput = ({name,placeholder,setValue, errors, register}) => {
    const [genre,setGenre]=useState("")
    const [favouriteGenre, setFavouriteGenre] = useState([])
    function changeHandler(e){
        e.preventDefault()
        if(genre && !favouriteGenre.includes(genre)){
            setFavouriteGenre([...favouriteGenre,genre])
            setGenre("")
            
        }        
    }
    function deleteHandler(idx){
            // Filter the chips array to remove the chip with the given index
    const newChips = favouriteGenre.filter((_, index) => index !== idx)
    setTags(newChips)
    }
   

    useEffect(()=>{
        setValue(name,favouriteGenre)
        console.log(favouriteGenre)
    },[favouriteGenre])
  return (

    <div>
        <label>
            <span>Cover Image<sup className='text-pink-200'>*</sup></span>
            {
                 favouriteGenre?.length > 0 && (
                       <ul className='flex w-full flex-wrap gap-y-2'>
                        
                                {
                                    favouriteGenre.map((t,index)=>(
                                  <li className='m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5'>
                                      <span className=''>{t}</span>
                                      <button className='ml-2 focus:outline-none' onClick={()=>deleteHandler(index)}><MdClose className='text-sm'/></button>
                                  </li>
                                ))
                                }
                        </ul>
                )   
            }
            <input
            className='form-style mt-3 w-full'
            placeholder={placeholder}
            type='text'
            name={name}
            value={genre}
            onChange={(e)=>{
                setGenre("")
                setGenre(e.target.value)}}
            onKeyDown={(e) => {
                if (e.keyCode === 13 ) {

                  changeHandler(e);
                }
              }}
            
            />{
                errors[name] && (
                    <span className='ml-2 text-xs tracking-wide text-pink-400'>Please enter favouriteGenre to proceed</span>
                )
            }
        </label>
    </div>
  )
}

export default ChipInput