'use client'

import { Article } from '@/interfaces/article'
import styles from './article-detail.module.css'
import { BiLinkExternal } from 'react-icons/bi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArticleVotesButton } from '@/components/article-common/article-votes-button'
import { ArticleCommentButton } from '@/components/article-common/article-comment-button'
import { ArticlePostedTimes } from '@/components/article-common/article-posted-times'
import { PostedArticleProfileBox } from '@/components/article-common/posted-article-profile-box'
import SerializeToPlainText from '@/components/text-editor/text-interpretor'
import parse from 'html-react-parser'
import React, { useEffect, useState } from 'react'
import { Profile } from '@/interfaces/profile'
import { getMyProfile } from '@/lib/api/profile'
import { ArticleActionButton } from './article-action-button'

export default function ArticleDetail({ article }: { article: Article }) {
  const LinkToCommentSection = `/articles/${article.slug}/#comment`
  const router = useRouter()

  const articleContent: any[] = JSON.parse(article.content)
  const content = SerializeToPlainText(articleContent as Node[] | any)
  const [user, setUser] = useState<Profile | any>(null)

  useEffect(() => {
    getMyProfile()
      .then((data: any) => {
        if (data) {
          setUser(data)
        }
      })
      .catch((error) => {
        console.log('Erreur', error)
      })
  }, [])

  const GoToCommentSection = () => {
    router.push(LinkToCommentSection)
  }

  const EditArticle = (slug: string) => {
    router.push(`/post?edit=${slug}`)
  }

  return (
    <React.Fragment>
      {(article.authorId === user?.id ||
        user?.role === 'admin' ||
        user?.role === 'moderator') && (
        <ArticleActionButton article={article} EditArticle={EditArticle} />
      )}

      <div
        className={`xl:flex sm:block mt-3 p-6 mb-3.5 rounded-lg shadow card-bg`}
      >
        <div className={`xl:w-1/4 ${styles.img_slug_box}`}>
          <img
            width={200}
            height={200}
            src={`${article.images[0]}`}
            alt="Tether"
            className={`${styles.img_slug}`}
          />
        </div>
        <div className="w-full pt-3 xl:pt-0 xl:w-3/4 relative">
          <div className="flex justify-between">
            <ArticleVotesButton article={article} />
            <ArticleCommentButton
              article={article}
              GoToCommentSection={GoToCommentSection}
            />
          </div>
          <ArticlePostedTimes article={article} />
          <div className="mt-4">
            <h1 className={`${styles.art_title}`}>{article.title}</h1>

            {parse(`${content}`)}
          </div>
          <div className="w-full px-0 pt-4">
            <Link
              href={article.slug}
              target="_blank"
              className={`w-full xl:w-1/6  flex justify-between px-5 py-3 ${styles.link_deal}`}
            >
              <span className={`font-bold ${styles.txt_link}`}>
                Voir l'article
              </span>
              <button className="btn pl-3 btnPlus">
                <BiLinkExternal size="1.2em" />
              </button>
            </Link>
          </div>
          <div className={`flex justify-between pt-6`}>
            <PostedArticleProfileBox article={article} />
            <div className="flex"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
