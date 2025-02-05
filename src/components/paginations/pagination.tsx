import React from 'react'

export default function Pagination() {
  return (
    <nav aria-label="Page navigation example w-full">
      <ul className="list-style-none flex justify-between">
        <li>
          <a
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            href="#"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li>
          <a
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-green-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            href="#"
          >
            1
          </a>
        </li>
        <li aria-current="page">
          <a
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-blue-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            href="#"
          >
            2
          </a>
        </li>
        <li>
          <a
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-blue-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            href="#"
          >
            3
          </a>
        </li>
        <li>
          <a
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            href="#"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}
