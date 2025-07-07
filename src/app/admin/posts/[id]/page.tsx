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
import PostForm from "../_components/PostForm"

type UpdatePostProps = {
  post: PostWithCategory
  category:Category[]
}

export default function UpdatePost() {
  const params = useParams()
  const { id } = params
  const router = useRouter()

  const url = `/api/admin/posts/${id}/`
  const {data, loading} = useFetchData<UpdatePostProps>(url)
  const {post , category} = data || {post: undefined, category: undefined}

    // バリデーション、データ制御
    const {
      register,
      handleSubmit,
      reset,
      formState:{ errors, isSubmitting }
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
      <PostForm 
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        category={category}
        isSubmitting={isSubmitting}
      />
      <div className={styles.buttonWrapper}>
        <Button 
          name='update'
          text='更新'
          onClick={handleSubmit(onSubmit)}
        />
        <Button
          name='delete'
          text='削除'
          type='button'
          onClick={handleDelete}
        />
      </div>
    </div> 
  )
}