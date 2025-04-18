"use client";
import { ParallaxScroll } from "../extui/components/ui/parallax-scroll";
import {dummydata} from '../data/books-data'


export function BookDisplay() {
  return <ParallaxScroll dummyData={dummydata}/>;
}
