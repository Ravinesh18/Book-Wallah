import React from 'react'
import { OurTeam } from '../components/OurTeam'
import { BsStars } from "react-icons/bs";
import Footer from '../components/Footer';
const AboutPage = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <div className='flex justify-center items-center mt-10 gap-x-6'>
                <BsStars className='text-3xl text-blue-500' />
                <p className='text-3xl font-bold text-center text-gray-500'>Our dedicated team</p>
                <BsStars className='text-3xl text-blue-500' />
            </div>
            <OurTeam />
            {/* Story Section */}
            <div className='m-8 flex p-4 mb-10'>
                <div className='w-1/2 p-6'>
                    <p className='text-3xl italic text-gray-400 font-bold'>Our Story</p>
                    <p className='w-full font-semibold text-gray-600 mt-8 text-xl'>In the heart of campus, where budgets are tight and textbooks are expensive, there's "Book Wallah" - a simple website where students trade textbooks they no longer need for ones they do. Mark, a freshman feeling overwhelmed, found a biology book and a study buddy named Emily. Together, they tackled classes and formed a friendship, showing that "Book Wallah" isn't just about saving money - it's about making connections in college.</p>
                </div>

                <div className='w-1/2 p-6 flex flex-col items-center justify-center'>
                    <p className='p-5 m-5 text-3xl text-slate-700 font-bold'>Want to explore more of this?</p>
                    <div className="flex flex-col md:flex-row w-[20rem] space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                        <button className="px-8 py-2 w-[70%] rounded-md bg-indigo-400 text-white font-bold transition duration-200 hover:bg-indigo-100 hover:text-black border-2 border-transparent hover:border-indigo-500">
                            Join Now
                        </button>
                        <button className="px-4 py-2 w-[70%] rounded-md border border-black bg-white font-semibold text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
                            Sign In
                        </button>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default AboutPage