"use client";
import React from "react";
import { TypewriterEffectSmooth } from "../extui/components/ui/typewriter-effect";
import { useNavigate } from "react-router-dom";
function TypewriterEffectSmoothDemo() {
  const navigate = useNavigate()
  const words = [
    {
      text: "Welcome",
    },
    {
      text: "to",
    },
    {
      text: "our",
    },
    {
      text: "own",
    },
    {
      text: "Book Wallah !!",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[30rem]  ">

      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base font-semibold font-serif ">
        Looking for a book? We got you!
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row w-[20rem] space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button onClick={()=>navigate('/signup')} className="px-8 py-2 w-[70%] rounded-md bg-indigo-400 text-white font-bold transition duration-200 hover:bg-indigo-100 hover:text-black border-2 border-transparent hover:border-indigo-500">
          Join Now
        </button>
        <button onClick={()=>navigate('/login')} className="px-4 py-2 w-[70%] rounded-md border border-black bg-white font-semibold text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
          Sign In
        </button>
      </div>
    </div>
  );
}

export default TypewriterEffectSmoothDemo