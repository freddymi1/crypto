import { Category } from '@/interfaces/categorie'
import React from 'react'
import styles from './category-article.module.css'
import { SortButton } from './sort-button'

interface CategoryDescriptionProps {
  category: Category
  SortArticleButton: (type: string) => void
  url: string
}

export const CategoryDescription: React.FC<CategoryDescriptionProps> = ({
  category,
  SortArticleButton,
  url
}) => {
  return (
    <div>
      <p className="text-sm">{category.description}</p>
      <div className="pt-6">
        <div className="flex items-center gap-4">
          <SortButton
            action={() => SortArticleButton('bullish')}
            label="Bull"
            classN={`font-bold ${url === '?sort=bullish' ? styles.active : ''}`}
          />
          <SortButton
            action={() => SortArticleButton('bearish')}
            label="Bear"
            classN={`font-bold ${url === '?sort=bearish' ? styles.active : ''}`}
          />
          <SortButton
            action={() => SortArticleButton('latest')}
            label="Nouveaux"
            classN={`font-bold ${url === '?sort=latest' ? styles.active : ''}`}
          />
          <SortButton
            action={() => SortArticleButton('most_commented')}
            label="Plus de commentaires"
            classN={`font-bold ${
              url === '?sort=most_commented' ? styles.active : ''
            }`}
          />
          <SortButton
            action={() => SortArticleButton('oldest')}
            label="Le plus enciens"
            classN={`font-bold ${url === '?sort=oldest' ? styles.active : ''}`}
          />
        </div>
      </div>
    </div>
  )
}
