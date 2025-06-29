'use client'

import Button from "@/app/_components/Button"
import { useForm } from "react-hook-form"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import styles from './page.module.scss'
import { AdminPostsSchema, TAdminPostsSchema  } from "@/app/_schema/formSchema"
import { PostWithCategory } from "@/app/_types"
import { Category } from "@prisma/client"
import { zodResolver } from "@hookform/resolvers/zod"
import useFetchData from "@/app/_hooks/useFetchData"

type DataProps = {
  post: PostWithCategory
  category:Category[]
}

export default function UpdatePost() {
  const params = useParams()
  const { id } = params
  const router = useRouter()

  const url = `/api/admin/posts/${id}/`
  const {data, loading} = useFetchData<DataProps>(url)
  const {post , category} = data || {post: undefined, category: undefined}

    // バリデーション、データ制御
    const {
      register,
      handleSubmit,
      reset,
      formState:{ errors }
    } = useForm<TAdminPostsSchema>({
      resolver:zodResolver(AdminPostsSchema),
      defaultValues: {
        title: '',
        content: '',
        thumbnailUrl: '',
        category: []
      }
    })

  useEffect(() => {
    if(!data?.post) return

    reset({
      title:data.post.title,
      content: data.post.content,
      thumbnailUrl: data.post.thumbnailUrl,
      category: data.post.postCategories.map(pc => pc.category.id.toString())
    })
  },[data,reset])

  
  // 記事データ更新
  const onSubmit = async(data:TAdminPostsSchema) => {

    try {
      await fetch(`/api/admin/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      alert('記事を更新しました。\n一覧へ戻ります。')

    }catch (error) {
      console.error(error)
      alert('更新に失敗しました。')
    }finally {
      router.push('/admin/posts/')
    }
  }

  // 記事データ削除
  const handleDelete = async() => {
    try {
      const response = await fetch(`/api/admin/posts/${id}`, {
        method: 'DELETE',
      })

      if(!response.ok) {
        throw new Error('データを削除できませんでした。')
      }

      alert('記事を削除しました。\n一覧へ戻ります。')
      
    }catch (error) {
      console.error(error)
      alert('削除に失敗しました。')
    }finally {
      router.push('/admin/posts/')
    }
  }

  if(loading) return <div>データ読み込み中</div>
  if(!post) return <div>データがありません。</div>
  if(!category) return <div>カテゴリーがありません。</div>

  return (
    <div>
      <h1>記事編集</h1>
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
              {category.map(cate => (
                <label key={cate.id}>
                  <input
                    type="checkbox"
                    value={cate.id}
                    {...register('category')}
                  />
                  {cate.name}
                </label>
              ))}
            </div>
            {errors.category && <div className={styles.error}>{errors.category.message}</div>}
          </div>
          <div className={styles.formItem}>
            <Button 
              name='update'
              text='更新'
            />
            <Button
              name='delete'
              text='削除'
              type='button'
              onClick={handleDelete}
            />
          </div>
      </form>
    </div> 
  )
}