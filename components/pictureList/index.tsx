import { useState } from 'react'
import { IoScanOutline, IoList } from 'react-icons/io5'

interface Category {
  type: string
  label: string
}

const categories: Category[] = [
  {
    type: 'all',
    label: 'all'
  },
  {
    type: 'branding',
    label: 'branding'
  },
  {
    type: 'web',
    label: 'web'
  },
  {
    type: 'photography',
    label: 'photography'
  },
  {
    type: 'app',
    label: 'app'
  }
]

const PictureList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].type
  )
  return (
    <div>
      <div className='flex items-center flex-col'>
        <div className='space-x-4 text-pink-600 my-5'>
          <button className='text-2xl'>
            <IoScanOutline />
          </button>
          <button className='text-2xl'>
            <IoList />
          </button>
        </div>

        <div className='flex text-xs mb-5'>
          {categories.map((ctg: Category) => (
            <button
              onClick={() => {
                setSelectedCategory(ctg.type)
              }}
              key={ctg.type}
              className={`py-2 px-4 flex justify-center items-center capitalize hover:bg-pink-400 hover:text-white ${
                selectedCategory === ctg.type ? 'bg-pink-500 text-white' : ''
              }`}
            >
              {ctg.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 w-full">
          <div className="col-span-2 bg-pink-400 p-10 rounded">1</div>
          <div className="bg-pink-400 p-10 rounded">2</div>
          <div className="row-span-3 bg-pink-400 p-10 rounded">3</div>
          <div className="bg-pink-400 p-10 rounded">4</div>
          <div className="bg-pink-400 p-10 rounded">5</div>
          <div className="bg-pink-400 p-10 rounded col-span-2">6</div>
          <div className="col-span-2 bg-pink-400 p-10 rounded">7</div>
          <div className="bg-pink-400 p-10 rounded">8</div>
          <div className="col-span-2 bg-pink-400 p-10 rounded">9</div>
        </div>
      </div>
    </div>
  )
}

export default PictureList
