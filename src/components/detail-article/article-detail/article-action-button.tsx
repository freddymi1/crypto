import { Article } from '@/interfaces/article'
import React from 'react'
import styles from './article-detail.module.css'
import { MdModeEditOutline } from 'react-icons/md'
import { HiOutlineTrash } from 'react-icons/hi2'

interface ArticleActionButtonProps {
  article: Article
  EditArticle: (articleSlug: string) => void
}

export const ArticleActionButton: React.FC<ArticleActionButtonProps> = ({
  article,
  EditArticle
}) => {
  return (
    <div className="card-bg mt-3 px-6 py-6 rounded-lg flex justify-end gap-5">
      <button
        onClick={() => EditArticle(article.slug)}
        className={`flex items-center gap-2 ${styles.article_detail_btn}`}
      >
        <span>
          <MdModeEditOutline size="1em" />
        </span>
        <span> Éditer </span>
      </button>

      <button
        className={`flex items-center gap-2 ${styles.article_detail_btn}`}
      >
        <span>
          <HiOutlineTrash size="1em" />
        </span>
        <span> Supprimer </span>
      </button>
    </div>
  )
}
