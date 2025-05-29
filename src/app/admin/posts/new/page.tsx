'use client'

import styles from "./page.module.scss"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AdminPostsSchema, TAdminPostsSchema } from "@/app/_schema/formSchema"

export default function NewPost() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TAdminPostsSchema>({
    resolver: zodResolver(AdminPostsSchema)
  })

  const onSubmit = async (data: TAdminPostsSchema) => {
    try {
      const response = await fetch('/api/posts/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if(!response.ok) {
        throw new Error('データを送信できませんでした。')
      }
      
    } catch (error) {
      console.error("Error creating post:", error)
    }
  }

  return (
    <>
      <div className={styles.header}>
        <h1>記事作成</h1>
      </div>
      <form className={styles.form} action="" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formItem}>
          <label htmlFor="title">タイトル</label>
          <input 
            type="text" 
            id="title" 
            {...register('title')}
            />
          {errors.title && <div className={styles.error}>{errors.title.message}</div>}
        </div>
        <div className={styles.formItem}>
          <label htmlFor="content">内容</label>
          <input 
            type="text" 
            id="content" 
            {...register('content')}
            />
            {errors.content && <div className={styles.error}>{errors.content.message}</div>}
        </div>
        <div className={styles.formItem}>
          <label htmlFor="thumbnailUrl">サムネイルURL</label>
          <input 
            type="url" 
            id="thumbnailUrl" 
            {...register('thumbnailUrl')}
            />
            {errors.thumbnailUrl && <div className={styles.error}>{errors.thumbnailUrl.message}</div>}
        </div>
        <div className={styles.formItem}>
          <label htmlFor="category">カテゴリ</label>
          <select
            id="category"
            {...register('category')}>
              <option value="">バリューなし</option>
              <option value="hokkaido">北海道</option>
          </select>
          {errors.category && <div className={styles.error}>{errors.category.message}</div>}
        </div>
        <div className={styles.formItem}>
          <button>作成</button>
        </div>
      </form>
    </>
  )
}