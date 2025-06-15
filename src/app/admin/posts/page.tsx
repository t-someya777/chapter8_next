'use client'

import Link from "next/link"
import styles from "./page.module.scss"
import useFetchData from "@/app/_hooks/useFetchData"
import { formatDate, time } from "@/app/_functions/handleDate"

type AdminPostsProps = {
  id:number
  title: string
  createdAt: Date
}

export default function AdminPosts() {

  const url = '/api/admin/posts/'
  const { data: posts, loading}: {data:AdminPostsProps[] | null, loading:boolean} = useFetchData(url)

  if(loading) return <div>読み込み中</div>
  if(posts === null || posts.length === 0) return (
    <>
      <div className={styles.header}>
        <h1>記事一覧</h1>
        <Link href="/admin/posts/new">新規作成</Link>
      </div>
      <div>データがありません</div>
    </>
  )
  return (
    <>
      <div className={styles.header}>
        <h1>記事一覧</h1>
        <Link href="/admin/posts/new">新規作成</Link>
      </div>
      <div className={styles.contentsWrapper}>
        {posts.map(post => (
          <Link 
            key={post.id}
            href={`/admin/posts/${post.id}`}
            className={styles.contents}
          >
            {post.title}
            <time dateTime={time(post.createdAt)}>
              {formatDate(post.createdAt)}
            </time>
          </Link>
        ))}
      </div>

    </>
  )
}