"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import React from "react";
import { PlaceholdersAndVanishInput } from "./placeholders-and-vanish-input";
import toast from "react-hot-toast";
import { IoFilter } from "react-icons/io5";

// Define the type for the book data
interface BookData {
  coverImage: string;
  bookName: string;
  authorName: string;
  genre: string;
}

export const ParallaxScroll = ({
  className,
  dummyData = [],
}: {
  dummyData: BookData[];
  className?: string;
}) => {
  const subLinks = [
    'Comedy',
    'Horror',
    'Suspense',
    'Chemistry'
  ];

  const [searchedBook, setSearchedBook] = useState<string>("");
  const [displayData, setDisplayData] = useState<BookData[]>(dummyData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedBook(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filteredBooks = dummyData.filter(book =>
      book.bookName.toLowerCase().includes(searchedBook.toLowerCase())
    );
    console.log(filteredBooks);
    if (filteredBooks.length === 0) {
      toast.error('No books found');
      setDisplayData(dummyData);
      return;
    }
    setDisplayData(filteredBooks);
  };

  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef, // remove this if your container is not fixed height
    offset: ["start start", "end start"], // remove this if your container is not fixed height
  });

  const genreHandler = (e: any) => {
    const filteredBooks = dummyData.filter(book =>
      book.genre.toLowerCase().includes(e.target.innerHTML.toLowerCase())
    );
    console.log(filteredBooks);
    if (filteredBooks.length === 0) {
      toast.error('No books found');
      setDisplayData(dummyData);
      return;
    }
    setDisplayData(filteredBooks);
  };

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(displayData.length / 3);
  const firstPart = displayData.slice(0, third);
  const secondPart = displayData.slice(third, 2 * third);
  const thirdPart = displayData.slice(2 * third);

  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  return (
    <div
      className={cn("h-[100vh] items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div className='group relative flex items-center gap-2 '>
        <div className='absolute right-20 top-4 flex rounded-sm px-4 py-2 hover:bg-indigo-200 font-semibold cursor-pointer items-center gap-3 text-lg'>
          <p className=''>Filter</p>
          <IoFilter />
        </div>
        <div className='invisible absolute z-[100] right-12 top-12 flex w-[110px] flex-col rounded-lg bg-white p-4 text-black font-semibold opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[200px]'>
          {subLinks.length > 0 ?
            subLinks.map((subLink, index) => (
              <button
                key={index}
                className='rounded-lg bg-transparent py-4 hover:bg-slate-100'
                onClick={genreHandler}
              >
                {subLink}
              </button>
            ))
            : (<div></div>)
          }
          <div className='absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded-md bg-richblack-5 '></div>
        </div>
      </div>
      <div className='h-[4rem] mt-10 items-center justify-center p-5'>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-6xl mx-auto gap-10 py-20 px-10"
        ref={gridRef}
      >
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst }}
              key={"grid-1" + idx}
            >
              <img
                src={el.coverImage}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
              <p className="font-semibold text-lg text-center leading-10">{el.bookName}</p>
              <div className="h-[0.6px] bg-black w-1/3 mx-auto"></div>
              <p className="font-serif text-sm text-center mt-2">{el.authorName}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
              <img
                src={el.coverImage}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
              <p className="font-semibold text-lg text-center leading-10">{el.bookName}</p>
              <div className="h-[0.6px] bg-black w-1/3 mx-auto"></div>
              <p className="font-serif text-sm text-center mt-2">{el.authorName}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
              <img
                src={el.coverImage}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
              <p className="font-semibold text-lg text-center leading-10">{el.bookName}</p>
              <div className="h-[0.6px] bg-black w-1/3 mx-auto"></div>
              <p className="font-serif text-sm text-center mt-2">{el.authorName}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
