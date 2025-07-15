'use client'

import Link from "next/link"
import styles from "./page.module.scss"
import useFetchData from "@/app/_hooks/useFetchData"
import { Category } from "@prisma/client"

export default function AdminCategories() {

  const url = '/api/admin/categories/'
  const { data: categories, loading } = useFetchData<Category[]>(url)

  if(loading) return <div>読み込み中</div>
  if(categories === null || categories.length === 0) return (
    <>
      <div className={styles.header}>
        <h1>カテゴリー一覧</h1>
        <Link href="/admin/categories/new">新規作成</Link>
      </div>
      <div>データがありません</div>
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <h1>カテゴリー一覧</h1>
        <Link href="/admin/categories/new">新規作成</Link>
      </div>
      <div className={styles.contentsWrapper}>
        {categories.map(category => (
          <Link 
            key={category.id}
            href={`/admin/categories/${category.id}`}
            className={styles.contents}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </>
  )
}