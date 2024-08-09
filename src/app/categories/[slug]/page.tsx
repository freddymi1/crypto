import { getCategoryBySlug } from '@/lib/api/category'
import React from 'react'
import Breadcrum from '@/components/navbar/breadcrum'
import { Container } from '@/components/container/container'
import CategoryBanner from '@/components/article-category/category-banner'
import styles from '../page.module.css'
import Categories from '@/components/article-category/categories'

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}) {
  const category = await getCategoryBySlug(params.slug)
  return {
    title: category.title,
    content: category.description
  }
}

async function CategoriesPage({ params }: { params: { slug: string } }) {
  const category = await getCategoryBySlug(params.slug)

  return (
    <>
      <Breadcrum
        crumList={[
          { text: 'Acceuil', href: '/' },
          { text: category.title, href: `/articles/${params.slug}` }
        ]}
      />
      <div className={`py-6 px-3 ${styles.category_banner_bg}`}>
        <Container>
          <CategoryBanner category={category} />
        </Container>
      </div>

      <Categories category={category} />
    </>
  )
}

export default CategoriesPage
