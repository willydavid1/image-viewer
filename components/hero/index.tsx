import React from 'react'
import { IoMdArrowDown } from 'react-icons/io'

const Hero = (): JSX.Element => {
  return (
    <div className="h-60 flex flex-col items-center justify-center bg-pink-400">
      <h1 className="text-3xl text-white">
        Here you can see the images you want
      </h1>
      <IoMdArrowDown className="text-white text-lg mt-5 animate-bounce" />
    </div>
  )
}

export default Hero
