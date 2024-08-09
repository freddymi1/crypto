'use client'

import { ArticleSummary } from '@/interfaces/article'
import React from 'react'
import { ArticleListView } from './article-list-view'
import Widgets from '../widgets/widgets'

interface ArticlesListAndWidgetsProps {
  articles: ArticleSummary[]
}

export const ArticlesListAndWidgets: React.FC<ArticlesListAndWidgetsProps> = ({
  articles
}) => {
  return (
    <div className="w-full xl:flex gap-3">
      <div className="min-h-screen w-full xl:w-3/4 sm:w-full z-0">
        <ArticleListView articles={articles} />
      </div>
      <Widgets />
    </div>
  )
}
