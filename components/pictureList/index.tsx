import { useState, useEffect } from 'react'
import { store as storeNotifications } from 'react-notifications-component'
import axios from 'axios'
import Image from 'next/image'

import Pagination from 'components/pagination'

interface Category {
  type: string
  label: string
}

interface Pictures {
  isLoading: boolean
  error: any
  data: {
    total: number | null,
    total_pages: number | null,
    results: Array<any>
  }
  page: number
}

const API_BASE_URL: string = 'https://api.unsplash.com/'

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
  const defaultCategory: string =  categories[0].type
  const defaultPic: Pictures = {
    isLoading: false,
    error: null,
    data: {
      total: null,
      total_pages: null,
      results: []
    },
    page: 0
  }

  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory)
  const [pictures, setPictures] = useState<Pictures>(defaultPic)

  const getData = async () => {
    setPictures({
      ...pictures,
      isLoading: true
    })

    try {
      const isDefaultReq: boolean = selectedCategory === defaultCategory
      const newPage = pictures.page + 1
      const url: string = isDefaultReq
        ? `${API_BASE_URL}photos/?page=${newPage}&per_page=20&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID_UNPLASH}`
        : `${API_BASE_URL}search/photos?page=${newPage}&per_page=20&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID_UNPLASH}&query=${encodeURIComponent(selectedCategory)}`

      const { data } = await axios.get(url)
      const dataWithPics = isDefaultReq ? { ...pictures.data, results: [...pictures.data.results, ...data] } : { ...pictures.data, ...data, results: [...pictures.data.results, ...data.results] }

      setPictures({
        ...pictures,
        data: dataWithPics,
        isLoading: false,
        page: newPage
      })
      storeNotifications.addNotification({
        title: 'Images successfully loaded',
        message: `Page #${newPage} - Category ${selectedCategory}`,
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
  }, [selectedCategory])

  return (
    <div className='flex items-center flex-col'>
      <div className='sticky top-0 bg-white z-20 overflow-hidden rounded-b-lg flex text-xs mb-5 border-b-2 border-l-2 border-r-2 border-fuchsia-600'>
        {categories.map((ctg: Category) => (
          <button
            onClick={() => {
              setSelectedCategory(ctg.type)
              setPictures(defaultPic)
            }}
            disabled={ctg.type === selectedCategory}
            key={ctg.type}
            className={`py-2 px-2 md:px-4 flex justify-center items-center capitalize hover:bg-pink-400 hover:text-white ${
              selectedCategory === ctg.type ? 'bg-pink-500 text-white' : ''
            }`}
          >
            {ctg.label}
          </button>
        ))}
      </div>

      <Pagination
        currentPage={pictures.page}
        totalItems={pictures.data.total}
        totalPages={pictures.data.total_pages}
      />

      <div className='grid-container w-full'>
        {pictures.data.results.map((img, i) => (
          <div key={`${img.id}--${i}`} className={`${i % 2 === 0 ? 'tall' : ''} grid-item relative`}>
            <Image
              src={img.urls.small}
              alt={img.alt_description}
              layout='fill'
              objectFit="cover"
              className="transition-transform"
            />
          </div>
        ))}
      </div>

      {
        pictures.isLoading && <h2 className="text-pink-700 text-xl my-12">Loading...</h2>
      }

      <button
        onClick={() => getData()}
        disabled={pictures.data.total_pages === pictures.page || pictures.isLoading}
        className="my-12 py-3 px-5 bg-pink-500 text-white hover:bg-pink-400 disabled:opacity-50"
      >
        Show More
      </button>
    </div>
  )
}

export default PictureList
