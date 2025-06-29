'use client'

import styles from "./page.module.scss"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AdminPostsSchema, TAdminPostsSchema } from "@/app/_schema/formSchema"
import Button from "@/app/_components/Button"
import { Category } from "@prisma/client"
import { useRouter } from "next/navigation"
import useFetchData from "@/app/_hooks/useFetchData"


export default function NewPost() {
  const router = useRouter()

  const url = `/api/admin/categories`
  const {data: categories, loading}: {data: Category[] | null, loading:boolean} = useFetchData(url)


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TAdminPostsSchema>({
    resolver: zodResolver(AdminPostsSchema),
    defaultValues: {
      title:'',
      content:'',
      thumbnailUrl:'https://placehold.jp/800x400.png',
      category:[]
    }
  })

  const onSubmit = async (data: TAdminPostsSchema) => {

    try {
      const response = await fetch('/api/admin/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if(!response.ok) {
        throw new Error('データを送信できませんでした。')
      }

      alert('記事を作成しました。\n一覧ページに戻ります。')
      router.push('/admin/posts')
      
    } catch (error) {
      console.error("Error creating post:", error)
      alert('送信に失敗しました。')
    }
  }

  if(loading) return <div>読み込み中</div>

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
          <p>カテゴリ</p>
          <div className={styles.checkboxContainer}>    
            {categories?.map(category => (
              <label key={category.id}>
                <input
                  value={category.id}
                  id={category.id.toString()}
                  type="checkbox"
                  {...register('category')}
                  />
                {category.name}
              </label>
            ))}
          </div>
          {errors.category && <div className={styles.error}>{errors.category.message}</div>}
        </div>
        <div className={styles.formItem}>
          <Button 
            name='create'
            text='作成'
          />          
        </div>
      </form>

      
    </>
  )
}