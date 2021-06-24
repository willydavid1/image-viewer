import { useState, useEffect } from 'react'
import { IoScanOutline, IoList } from 'react-icons/io5'
import axios from 'axios'
import { store as storeNotifications } from 'react-notifications-component'
import Image from 'next/image'

interface Category {
  type: string
  label: string
}

interface Pictures {
  isLoading: boolean
  error: any
  data: Array<any>
  page: number
}

const API_BASE_URL = 'https://api.unsplash.com/photos/'

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
  const [pictures, setPictures] = useState<Pictures>({
    isLoading: false,
    error: null,
    data: [],
    page: 0
  })

  const getData = async () => {
    setPictures({
      ...pictures,
      isLoading: true
    })

    try {
      const newPage = pictures.page + 1
      const { data } = await axios.get(
        `${API_BASE_URL}?page=${newPage}&per_page=20&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID_UNPLASH}`
      )
      console.log(data)
      setPictures({
        ...pictures,
        data: [...pictures.data, ...data],
        isLoading: false,
        page: newPage
      })
      storeNotifications.addNotification({
        title: 'Images Uploaded',
        message: `Page #${newPage}`,
        type: 'success',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
      })
    } catch (error) {
      storeNotifications.addNotification({
        title: 'Error Loading Images',
        message: '=(',
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      })
      setPictures({
        ...pictures,
        isLoading: false,
        error
      })
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
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

      <div className='grid-container w-full'>
        {pictures.data.map((img, i) => (
          <div key={img.id} className={`${i % 2 === 0 ? 'tall' : ''} grid-item relative`}>
            <Image
              src={img.urls.small}
              alt={img.alt_description}
              layout='fill'
              objectFit="contain"
              className="transition-transform"
            />
          </div>
        ))}
      </div>

      {
        pictures.isLoading && <h2 className="text-pink-700 text-xl my-12">Loading...</h2>
      }

      <button onClick={getData} className="my-12 py-3 px-5 bg-pink-500 text-white hover:bg-pink-400">
        Show More
      </button>
    </div>
  )
}

export default PictureList
