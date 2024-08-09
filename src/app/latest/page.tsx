import React from 'react'
import { ArticlesListAndWidgets } from '@/components/article-list-view/articles-list-and-widgets'
import { getArticlesSummary } from '@/lib/api/article'
import HeaderCategoriesAndNavigationLink from '@/components/navbar/header-categories-and-navigation-link'

export async function generateMetadata() {
  return {
    title: 'Nouveaux',
    description: 'Nouveaux articles'
  }
}

async function Latest() {
  let sortBy: string = ''
  const Articles = await getArticlesSummary((sortBy = 'latest'))
  return (
    <React.Fragment>
      <HeaderCategoriesAndNavigationLink />
      <div className="max-w-[2520px] w-full 2xl:px-60 xl:px-32 md:24 py-3 px-6 z-1">
        <ArticlesListAndWidgets articles={Articles} />
      </div>
    </React.Fragment>
  )
}

export default Latest
