import { Category } from '@/interfaces/categorie'
import React from 'react'
import { BsTag } from 'react-icons/bs'

export default function CategoryBanner({ category }: { category: Category }) {
  return (
    <div className="w-full flex">
      <div className="flex">
        <img
          src={category.image}
          width={50}
          height={50}
          className="rounded-lg"
          alt=""
        />
      </div>
      <div className="ml-3">
        <h3>{category.title}</h3>
        <div className="flex items-center">
          <span>
            <BsTag size="1.2em" />
          </span>
          <span className="ml-2">{category.articlesCount} articles actifs</span>
        </div>
      </div>
    </div>
  )
}
