import { useState } from 'react'
import { IoMdSearch, IoIosMenu } from "react-icons/io";
import { Transition } from "@headlessui/react";

const Header = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const renderButtons = (
    <>
      <button className="bg-pink-500 text-white py-2 px-4 flex justify-center items-center">
        BUTTON
      </button>
      <button className="py-2 px-4 flex justify-center items-center hover:bg-pink-400 hover:text-white transition-all">
        BUTTON
      </button>
      <button className="py-2 px-4 flex justify-center items-center hover:bg-pink-400 hover:text-white transition-all">
        BUTTON
      </button>
      <button className="py-2 px-4 flex justify-center items-center hover:bg-pink-400 hover:text-white transition-all">
        BUTTON
      </button>
      <button className="p-2 flex justify-center items-center border-gray-300 md:border-transparent md:hover:border-gray-300 text-pink-600 border-2 border-transparent rounded-full">
        <IoMdSearch className="text-xl cursor-pointer" />
      </button>
    </>
  )

  return (
    <nav className="mx-5 my-5 block bg-white md:mx-10 md:h-10 z-10">
      <div className="flex justify-between items-center">
        <h1>Header Title</h1>
        <div className="space-x-4 text-xs hidden md:flex">
          {renderButtons}
        </div>

        <div className="flex md:hidden">
          <button
            type="button"
            className="bg-pink-500 text-2xl inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pink-700 focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>

            <IoIosMenu />
          </button>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="border-t-2 pt-2 mt-2 pb-3 space-y-1 sm:px-3 flex flex-col md:hidden">
          {renderButtons}
        </div>
      </Transition>
    </nav>
  );
};

export default Header;
