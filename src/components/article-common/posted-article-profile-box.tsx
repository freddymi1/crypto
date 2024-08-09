import { Article } from '@/interfaces/article'
import styles from './article-common.module.css'
import React from 'react'
import Image from 'next/image'

interface PostedArticleProfileBoxProps {
  article: Article | any
}

export const PostedArticleProfileBox: React.FC<
  PostedArticleProfileBoxProps
> = ({ article }) => {
  return (
    <div className={`${styles.profile} flex justify-between items-center`}>
      <Image width={50} height={50} src="/images/profile.png" alt="profile" />
      <div className="pl-2">
        <span className="capitalize">{article.authorUsername}</span>
      </div>
    </div>
  )
}
