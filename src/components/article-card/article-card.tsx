'use client'

import { ArticleSummary } from '@/interfaces/article'
import { useRouter } from 'next/navigation'
import { ArticleCardMobile } from './article-card-mobile'
import { ArticleCardDesktop } from './article-card-desktop'
import React, { useState } from 'react'
import { Profile } from '@/interfaces/profile'

interface ArticleCardProps {
  article: ArticleSummary
}
export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const articleLink = `/articles/${article.slug}`

  const router = useRouter()

  const GoToCommentSection = () => {
    router.push(`${articleLink}#comment`)
  }

  return (
    <React.Fragment>
      <div className={` rounded-lg shadow z-10 article-card-bg`}>
        <ArticleCardMobile
          articleLink={articleLink}
          GoToCommentSection={GoToCommentSection}
          article={article}
        />
      </div>

      <ArticleCardDesktop
        articleLink={articleLink}
        GoToCommentSection={GoToCommentSection}
        article={article}
      />
    </React.Fragment>
  )
}
