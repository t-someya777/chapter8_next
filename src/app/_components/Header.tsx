'use client'

import Link from "next/link"
import styles from "./Header.module.scss"
import { useSupabaseSession } from "../_hooks/useSupabaseSession"
import { supabase } from "@/utils/supabase"

export const Header = () => {
  const handleLogout = async() => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const {session, isLoading} = useSupabaseSession()

  return (
    <header className={styles.header}>
      <Link className={styles.headerItem} href='/'>Blog</Link>
    {!isLoading && (
      <div>
        {session ? (
          <>
            <Link href="/admin" className={styles.headerItem}>
              管理画面
            </Link>
            <button onClick={handleLogout} className={styles.headerItem}>ログアウト</button>
          </>
        ) : (
          <>
            <Link className={styles.headerItem} href='/contact'>
              お問い合わせ
            </Link>
            <Link href="/login" className={styles.headerItem}>
              ログイン
            </Link>
          </>
        )}
        </div>
      )}
      </header>
  )
}