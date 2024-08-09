'use client'

import { ArticleSummary } from '@/interfaces/article'
import styles from './article-card.module.css'
import { BiLinkExternal } from 'react-icons/bi'
import Link from 'next/link'
import { PostedArticleProfileBox } from '../article-common/posted-article-profile-box'
import { ArticlePostedTimes } from '../article-common/article-posted-times'
import { ArticleVotesButton } from '../article-common/article-votes-button'
import { ArticleCommentButton } from '../article-common/article-comment-button'
import { Profile } from '@/interfaces/profile'

interface ArticleDesktopProps {
  article: ArticleSummary
  GoToCommentSection: () => void
  articleLink: string
}

export const ArticleCardDesktop: React.FC<ArticleDesktopProps> = ({
  article,
  GoToCommentSection,
  articleLink
}) => {
  return (
    <div className={`bg-white-100 rounded-lg shadow z-10 article-card-bg`}>
      <div className="hidden xl:flex p-6 mb-3.5 ">
        <div className="w-1/4 xl:flex justify-between items-center">
          <img src={article.images[0]} alt="Tether" />
        </div>
        <div className="w-3/4 ml-2 relative">
          <div className={`flex justify-between`}>
            <ArticleVotesButton article={article} />
            <ArticlePostedTimes article={article} />
          </div>

          <div className="content py-3">
            <Link href={articleLink} className={`pb-2 ${styles.title_article}`}>
              {article.title}
            </Link>
            <p className={styles.article_description}>{article.shortContent}</p>
          </div>

          <div className={`flex justify-between pt-3`}>
            <PostedArticleProfileBox article={article} />
            <div className="flex">
              <ArticleCommentButton
                article={article}
                GoToCommentSection={GoToCommentSection}
              />

              <Link
                href={articleLink}
                target="_blank"
                className={`flex justify-between items-center px-3 py-0 ml-2 ${styles.link_deal}`}
              >
                <span className={`font-bold ${styles.txt_link}`}>
                  Voir l'article
                </span>
                <button className="btn pl-3 btnPlus">
                  <BiLinkExternal size="1.2em" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
