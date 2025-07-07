'use client'

import Link from "next/link";
import styles from './Nav.module.scss'
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className={styles.nav}>
      <Link 
        aria-current={ pathname.includes('posts') ? true : false}
        href="/admin/posts">記事一覧
      </Link>
      <Link 
        href="/admin/categories"
        aria-current={ pathname.includes('categories') ? true : false}
        >カテゴリー一覧
      </Link>
  </nav>
  )
}