'use client'

import { Category } from '@/interfaces/categorie'
import styles from './categories-list-view.module.css'
import React from 'react'
import { BiBitcoin } from 'react-icons/bi'
import { useRouter } from 'next/navigation'

interface CategoryCardProps {
  category: Category
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const router = useRouter()

  const CategoryLink = `/categories/${category.slug}`
  const NavigateToCategorySlug = () => {
    router.push(CategoryLink)
  }
  return (
    <div
      onClick={NavigateToCategorySlug}
      className="rounded-lg flex shadow z-10 p-6 article-card-bg"
    >
      <img
        src={category.image}
        width={50}
        height={50}
        className="rounded-lg"
        alt=""
      />
      <div className="ml-2">
        <h4 className="font-bold">{category.title}</h4>
        <label htmlFor="">{category.articlesCount} articles</label>
      </div>
    </div>
  )
}
