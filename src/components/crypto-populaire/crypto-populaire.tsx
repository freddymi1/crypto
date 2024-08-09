import React from 'react'
import styles from './crypto-populaire.module.css'
import { Cryptos } from './data'
import Pagination from '../paginations/pagination'
import Image from 'next/image'

export default function CryptoPopulaire() {
  const data = Cryptos
  return (
    <div className={`p-6 mb-3.5 bg-white-100 rounded-lg shadow card-bg`}>
      <div>
        <h2 className={styles.title}>Les crypto populaires</h2>
      </div>
      {data.map((item: any) => (
        <div
          key={item.id}
          className="mt-6 flex flex-row items-center justify-between "
        >
          <div className="flex align-center">
            <div className={styles.icons}>
              <Image
                width={50}
                height={50}
                className="img-icons"
                src={item.image}
                alt=""
              />
            </div>
            <div className={styles.bull_content}>
              <h4 className={styles.bulls_title}>{item.label}</h4>
            </div>
          </div>
          <div className="charts">
            <h3 className={styles.bull_tarif}>{item.price}</h3>
          </div>
        </div>
      ))}
      <div className="pagination flex justify-center align-center mt-6 w-full">
        <Pagination />
      </div>
    </div>
  )
}
