import React from 'react'
import TypewriterEffectSmoothDemo from '../components/TypewriterEffectSmoothDemo'
import step1 from "../assets/step1.png"
import step3 from "../assets/step3.png"
import step2 from "../assets/step2.png"
import book1 from '../assets/book1.png'
import { BookQuotesSlider } from '../components/BookQuotesSlider'
import Footer from '../components/Footer'
const HomePage = () => {
  return (
    <div className='w-11/12 mx-auto'>
      <TypewriterEffectSmoothDemo />

      {/* How it works */}

      <div className='bg-indigo-300 rounded-md mt-4 flex flex-col gap-5 min-h-[65vh] '>
        <p className='font-bold text-center text-2xl mt-10'>How it works</p>
        <div className='flex max-w-6xl p-2 mx-auto space-y-10 space-x-9 min-h-[40vh] '>
          <div className='group flex flex-col items-center justify-between   gap-3 p-4 mt-7 ml-5 max-w-[30%] '>
            <div className='h-[180px]'>
              <img className='h-full max-w-maxContent' src={step1} />
            </div>
            <p className='w-48 text-grey-400 text-md font-semibold text-center'>
              Exchange or borrow your favourite books from the people around without any hassle
            </p>
          </div>
          <div className='group flex flex-col items-center justify-between   gap-3 p-4 mt-7 ml-5 max-w-[30%]'>
            <div className='h-[180px]'>
              <img className='h-full w-full' src={step2} />
            </div>
            <p className='w-48 text-grey-400 text-md font-semibold text-center'>
              Exchange or borrow your favourite books from the people around without any hassle
            </p>
          </div>
          <div className='group flex flex-col items-center justify-between gap-3 p-4 mt-7 ml-5 max-w-[30%]'>
            <div className='h-[180px]'>
              <img className='h-full max-w-maxContent' src={step3} />
            </div>
            <p className='w-48 text-grey-400 text-md font-semibold text-center'>
              Exchange or borrow your favourite books from the people around without any hassle
            </p>
          </div>

        </div>



      </div>

      {/* Quote Section */}
      <div className='flex p-5 justify-between mt-[18vh] w-11/12 mx-auto'>
        <div className='flex flex-col h-[]'>
        <p className='p-5 mt-10 ml-10 text-3xl w-full font-semibold opacity-50 italic'>"A place where stories find new homes,<br />
          Exchanging tales, weaving dreams."</p>
         
          <p className='text-xl font-semibold opacity-50 italic text-right' >~ Book Wallah</p>
        </div>
        <img src={book1} />
      </div>

      <BookQuotesSlider/>

      {/* Footer */}
      <Footer/>

    </div>
  )
}

export default HomePage