import { IoMdSearch } from 'react-icons/io'

const Header = (): JSX.Element => {
  return (
    <div className="mx-10 my-5 h-10 flex justify-between items-center ">
      <h1>Header Title</h1>
      <div className="flex space-x-4 text-xs">
        <button className="bg-pink-500 text-white py-2 px-4 flex justify-center items-center">BUTTON</button>
        <button className="py-2 px-4 flex justify-center items-center hover:bg-pink-400 hover:text-white transition-all">BUTTON</button>
        <button className="py-2 px-4 flex justify-center items-center hover:bg-pink-400 hover:text-white transition-all">BUTTON</button>
        <button className="py-2 px-4 flex justify-center items-center hover:bg-pink-400 hover:text-white transition-all">BUTTON</button>
        <button className="p-2 flex justify-center items-center hover:border-gray-300 hover:text-pink-600 border-2 border-transparent rounded-full">
          <IoMdSearch className="text-xl cursor-pointer" />
        </button>
      </div>
    </div>
  )
}

export default Header
