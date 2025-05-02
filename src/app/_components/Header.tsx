import Link from "next/link"
import styles from "./Header.module.scss"

export default function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.headerItem} href='/'>Blog</Link>
      <Link className={styles.headerItem} href='/contact'>お問い合わせ</Link>
    </header>
  )
}