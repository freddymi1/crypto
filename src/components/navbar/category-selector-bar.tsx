'use client'

import styles from './navbar.module.css'
import React, { useEffect, useState } from 'react'
import { Navigation, A11y } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { getAllCategory } from '@/lib/api/category'
import { Category } from '@/interfaces/categorie'
import { useRouter } from 'next/navigation'

export const CategorySelectorBar = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [category, setCategory] = useState<Category[]>([])

  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    getAllCategory().then((res) => {
      if (res) {
        setLoading(false)
        setCategory(res)
      }
    })
  }, [])

  const GoToArticleCategory = (slug: string) => {
    router.push(`/categories/${slug}`)
  }

  return (
    <div className="w-full">
      {loading ? (
        <>Chargement...</>
      ) : (
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={10}
          slidesPerView={8}
          navigation
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },

            480: {
              slidesPerView: 2,
              spaceBetween: 10
            },

            640: {
              slidesPerView: 3,
              spaceBetween: 10
            },

            1024: {
              slidesPerView: 4,
              spaceBetween: 10
            },

            1400: {
              slidesPerView: 5,
              spaceBetween: 10
            },

            1600: {
              slidesPerView: 6,
              spaceBetween: 10
            },

            1700: {
              slidesPerView: 8,
              spaceBetween: 10
            }
          }}
        >
          {category &&
            category.map((item: any) => (
              <SwiperSlide
                key={item.id}
                onClick={() => GoToArticleCategory(item.slug)}
                className={`px-3 py-2 w-auto rounded-full text-center ${styles.menu_btn}`}
              >
                {item.title}
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  )
}
