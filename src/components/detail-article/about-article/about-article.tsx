'use client'

import React from 'react'
import styles from './about-article.module.css'
import { Article } from '@/interfaces/article'
import { BtnAboutArticle } from './btn-about-article'
import { FaComment, FaSave } from 'react-icons/fa'
import { BiTime } from 'react-icons/bi'
import SerializeToPlainText from '@/components/text-editor/text-interpretor'
import parse from 'html-react-parser'

export default function AboutArticle({ article }: { article: Article }) {
  const actionClick = () => {}
  const articleContent: any[] = JSON.parse(article.content)
  const content = SerializeToPlainText(articleContent as Node[] | any)
  return (
    <div className={`mt-3 p-6 mb-3.5 rounded-lg shadow card-bg`}>
      <h4 className={styles.title}>À propos de cet article</h4>

      <div className="py-4">{parse(`${content}`)}</div>

      <div className="md:flex gap-3">
        <BtnAboutArticle
          onClick={() => {}}
          label={`Écrire un commentaire`}
          icons={<FaComment />}
        />
        <BtnAboutArticle
          onClick={() => {}}
          label={`Expiré ?`}
          icons={<BiTime />}
        />
        <BtnAboutArticle
          onClick={() => {}}
          label={`Sauvegarder`}
          icons={<FaSave />}
        />
      </div>
    </div>
  )
}
