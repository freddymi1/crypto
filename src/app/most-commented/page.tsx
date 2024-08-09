import React from 'react'
import { ArticlesListAndWidgets } from '@/components/article-list-view/articles-list-and-widgets'
import { getArticlesSummary } from '@/lib/api/article'
import HeaderCategoriesAndNavigationLink from '@/components/navbar/header-categories-and-navigation-link'

export async function generateMetadata() {
  return {
    title: 'Plus commentés',
    description: 'Articles le plus commentés'
  }
}

async function MostCommented() {
  let sortBy: string = ''
  const Articles = await getArticlesSummary((sortBy = 'most_commented'))
  return (
    <React.Fragment>
      <HeaderCategoriesAndNavigationLink />
      <div className="max-w-[2520px] w-full 2xl:px-60 xl:px-32 md:24 py-3 px-6 z-1">
        <ArticlesListAndWidgets articles={Articles} />
      </div>
    </React.Fragment>
  )
}

export default MostCommented
