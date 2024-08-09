import CategoriesListView from '@/components/categories-list-view/categories-list-view'
import { getAllCategory } from '@/lib/api/category'
import React from 'react'

export async function generateMetadata() {
  return {
    title: 'Categories',
    description: 'Page de categories'
  }
}

async function Categories() {
  const data = await getAllCategory()

  return (
    <div className="max-w-[2520px] w-full 2xl:px-60 xl:px-32 md:24 py-3 px-6 gap-3 xl:mt-[68px]">
      <div className="xl:min-h-[55vh] w-full z-0 relative">
        <CategoriesListView categories={data} />
      </div>
    </div>
  )
}

export default Categories
