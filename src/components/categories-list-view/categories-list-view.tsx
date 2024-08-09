import { Category } from '@/interfaces/categorie'
import React from 'react'
import { CategoryCard } from './category-card'

export default function CategoriesListView({
  categories
}: {
  categories: Category[]
}) {
  return (
    <div className="w-full py-6 relative flex flex-col gap-4 xl:mb-2 xl:inline-grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 xl:gap-2 grid-rows-1 h-auto w-full">
      {categories.map((category: Category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  )
}
