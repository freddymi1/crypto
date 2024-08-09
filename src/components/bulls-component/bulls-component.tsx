import React from 'react'
import styles from './bulls.module.css'
import { Bulls } from './data'
import Pagination from '../paginations/pagination'
import Image from 'next/image'

export default function BullsComponent() {
  const data = Bulls

  return (
    <div className={`p-6 mb-3.5 bg-white-100 rounded-lg shadow card-bg`}>
      <div>
        <h2 className={styles.title}>Les bulls</h2>
      </div>
      {data.map((item: any) => (
        <div
          key={item.id}
          className="mt-6 flex flex-row items-center justify-between "
        >
          <div className="flex">
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
              <h3 className={styles.bull_tarif}>{item.price}</h3>
            </div>
          </div>
          <div className="charts">
            <Image width={100} height={50} src={item.chart} alt="" />
          </div>
        </div>
      ))}
      <div className="pagination flex justify-center align-center mt-6 w-full">
        <Pagination />
      </div>
    </div>
  )
}
