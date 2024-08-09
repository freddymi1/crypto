import { Article } from '@/interfaces/article'
import styles from './article-common.module.css'
import React from 'react'
import { BiTime } from 'react-icons/bi'
import { FormatDateMobile, FormatDateWeb } from '@/utils/moment'

interface ArticlePostedTimesProps {
  article: Article | any
}

export const ArticlePostedTimes: React.FC<ArticlePostedTimesProps> = ({
  article
}) => {
  const creationDate = new Date(article.creationDatetime)

  return (
    <div className={`flex justify-end items-center ${styles.timer}`}>
      <BiTime size="1.3em" />
      <div className="block lg:flex">
        <span className="hidden lg:flex">{FormatDateWeb(creationDate)}</span>
        <span className="flex lg:hidden">{FormatDateMobile(creationDate)}</span>
      </div>
    </div>
  )
}
