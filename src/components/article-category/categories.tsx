'use client'

import { Category } from '@/interfaces/categorie'
import React, { useEffect, useState } from 'react'
import styles from './category-article.module.css'
import { CategoryDescription } from './category-description'
import { Container } from '../container/container'
import BullsComponent from '../bulls-component/bulls-component'
import CryptoPopulaire from '../crypto-populaire/crypto-populaire'
import { getArticlesSummaryWithParams } from '@/lib/api/article'
import { ArticleSummary } from '@/interfaces/article'
import ReactLoading from 'react-loading'
import { ArticleListView } from '../article-list-view/article-list-view'

export default function Categories({ category }: { category: Category }) {
  const [url, setUrl] = useState<any>('')
  const [articles, setArticles] = useState<ArticleSummary[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (typeof window !== 'undefined') {
      const urls = new URL(String(window.location))
      urls.searchParams.set('sort', 'bullish')
      window.history.pushState(null, '', urls.toString())

      if (urls.search !== '') {
        setUrl(urls.search)
      }
    }

    SortArticleButton('bullish')
  }, [])

  const SortArticleButton = (type: string) => {
    setLoading(true)
    if (typeof window !== 'undefined') {
      const urls = new URL(String(window.location))
      urls.searchParams.set('sort', type)
      window.history.pushState(null, '', urls.toString())

      if (urls.search !== '') {
        setUrl(urls.search)
      }

      getArticlesSummaryWithParams(category.slug, type).then(
        (ress: ArticleSummary | any) => {
          setArticles(ress)
          setLoading(false)
        }
      )
    }
  }

  return (
    <React.Fragment>
      <div className={`py-3 px-3 ${styles.category_description_bg}`}>
        <Container>
          <CategoryDescription
            SortArticleButton={SortArticleButton}
            url={url}
            category={category}
          />
        </Container>
      </div>
      <div className="max-w-[2520px] mx-auto 2xl:px-60 xl:px-32 md:24 sm:px-2 px-4">
        <div className="py-6 w-full xl:flex px-6 gap-3">
          <div className="min-h-screen w-full xl:w-3/4 sm:w-full z-0">
            {loading ? (
              <div className={`flex justify-center items-center h-[50vh]`}>
                <ReactLoading
                  type="spin"
                  color="#e26400"
                  height={'5%'}
                  width={'5%'}
                  className="loading"
                  delay={0}
                />
              </div>
            ) : (
              <>{url && <ArticleListView articles={articles} />}</>
            )}
          </div>

          <div className="hidden xl:block w-full xl:w-1/4 sm:w-full">
            <BullsComponent />
            <CryptoPopulaire />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
