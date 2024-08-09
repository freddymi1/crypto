'use client'

import React from 'react'
import { ArticleSummary } from '@/interfaces/article'
import { ArticleCard } from '../article-card/article-card'

export const ArticleListView = ({
  articles
}: {
  articles: ArticleSummary[]
}) => {
  return (
    <React.Fragment>
      {articles.map((article: ArticleSummary) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </React.Fragment>
  )
}
