import Link from "next/link"
import styles from "./page.module.scss"

export default function AdminPosts() {
  return (
    <>
      <div className={styles.header}>
        <h1>記事一覧</h1>
        <Link href="/admin/posts/new">新規作成</Link>
      </div>
    </>
  )
}