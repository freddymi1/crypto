'use client'

import { ArticleSummary } from '@/interfaces/article'
import styles from './article-card.module.css'
import { BiLinkExternal } from 'react-icons/bi'
import { LiaCommentsSolid } from 'react-icons/lia'
import Link from 'next/link'
import { PostedArticleProfileBox } from '../article-common/posted-article-profile-box'
import { ArticleVotesButton } from '../article-common/article-votes-button'
import { ArticlePostedTimes } from '../article-common/article-posted-times'
import { Profile } from '@/interfaces/profile'

interface ArticleMobileProps {
  article: ArticleSummary
  GoToCommentSection: () => void
  articleLink: string
}
export const ArticleCardMobile: React.FC<ArticleMobileProps> = ({
  article,
  GoToCommentSection,
  articleLink
}) => {
  return (
    <div className="block xl:hidden p-6 mb-3.5 w-full">
      <div className="w-full relative">
        <div className={`flex justify-between w-full`}>
          <ArticleVotesButton article={article} />
          <ArticlePostedTimes article={article} />
        </div>
      </div>
      <div className="py-3 flex gap-2 align-center items-center">
        <div className="w-[70px] sm:w-[80px] md:w-[100px] xl:flex justify-between items-center">
          <img className="w-full" src={article.images[0]} alt="Tether" />
        </div>
        <div>
          <h3
            className={`pb-2 font-bold text-xl ${styles.title_articleMobile}`}
          >
            {article.title}
          </h3>
        </div>
      </div>
      <div className={`flex justify-between pt-3`}>
        <PostedArticleProfileBox article={article} />
        <div
          onClick={GoToCommentSection}
          className={`flex justify-between px-3 py-0 ${styles.btn_comment}`}
        >
          <button className={`btn ${styles.comment}`}>
            <LiaCommentsSolid size="1.2em" />
          </button>
          <span className={`font-bold ${styles.nbr_comment}`}>
            {article.commentsCount}
          </span>
        </div>
      </div>
      <div className="w-full pt-3">
        <Link
          href={articleLink}
          target="_blank"
          className={`w-full flex justify-center px-3 py-2 lg:ml-2 ${styles.link_deal}`}
        >
          <span className={`font-bold ${styles.txt_link}`}>Voir l'article</span>
          <button className="btn pl-3 btnPlus">
            <BiLinkExternal size="1.2em" />
          </button>
        </Link>
      </div>
    </div>
  )
}
