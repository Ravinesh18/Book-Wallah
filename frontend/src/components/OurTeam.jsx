"use client";
import React from "react";
import { StickyScroll } from "../extui/components/ui/sticky-scroll-reveal";
// import Image from "next/image";
import dev1 from "../assets/dev1.png"
import dev2 from "../assets/dev2.png"
const content = [
  {
    title: "Ayush Tyagi",
    description:
    "Ayush is passionate about becoming a MERN stack developer, diving into the world of modern web tech. Starting with JavaScript basics, Ayush is excited to explore MongoDB, Express.js, React.js, and Node.js to craft dynamic websites. Ayush loves problem-solving and aims to write clean code. With a hunger to learn, Ayush is eager to make a mark in web development.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <img
          src={dev1}
          width={400}
          height={400}
          className="h-full w-full object-cover bg-indigo-500 "
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Ravinesh Mishra",
    description:
    "Ravinesh is passionate about programming and software development, with a focus on web technologies. He enjoys diving into backend logic, frontend design, and exploring how systems integrate seamlessly. Currently, Ravinesh is engaged in projects and learning experiences centered around building web applications using Node.js, Express, and MongoDB.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <img
          src={dev2}
          width={400}
          height={400}
          className="h-full w-full object-cover bg-blue-700"
          alt="linear board demo"
        />
      </div>
    ),
  },
];
export function OurTeam() {
  return (
    <div className="p-10">
      <StickyScroll content={content} />
    </div>
  );
}
