'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AdminCategoriesSchema, TAdminCategoriesSchema } from "@/app/_schema/formSchema"
import styles from "./page.module.scss"
import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Button from "@/app/_components/Button"

export default function UpdateCategory() {
  const params = useParams()
  const { id } = params
  const router = useRouter()

  useEffect(() => {
    fetchCategory()
  },[])

  // データ取得
  const fetchCategory = async () => {
    try {
      const response = await fetch(`/api/admin/categories/${id}/`)
      if(!response.ok) {
        throw new Error('データを取得できませんでした。')
      }
      const data = await response.json()

      reset({
        category: data.name
      })

    }catch (error) {
      console.error(error)
    }
  }
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TAdminCategoriesSchema>({
    resolver: zodResolver(AdminCategoriesSchema)
  })


  // データ送信
  const onSubmit = async (data:TAdminCategoriesSchema) => {

    try {
      const response = await fetch(`/api/admin/categories/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if(!response.ok) {
        throw new Error('データを更新できませんでした。')
      }

      alert('カテゴリーを更新しました。\n一覧ページに戻ります。')
      
    }catch (error) {
      console.error(error)
      alert('更新に失敗しました。')
    }finally {
      router.push('/admin/categories')
    }
  }

  // データ削除
  const handleDelete = async ()=> {
    try {
      const response = await fetch(`/api/admin/categories/${id}/`, {
        method: 'DELETE',
      })

      if(!response.ok) {
        throw new Error('データを削除できませんでした。')
      }

      alert('カテゴリーを削除しました。\n一覧へ戻ります。')
      
    }catch (error) {
      console.error(error)
      alert('削除に失敗しました。')
    }finally {
      router.push('/admin/categories/')
    }
  }



  return(
    <div>
      <h1>カテゴリ編集</h1>
      <form className={styles.form} action="" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formItem}>
          <label htmlFor="category">カテゴリ名</label>
          <input
            type="text"
            id="category"
            {...register('category')}
          />
          {errors.category && <div className={styles.error}>{errors.category.message}</div>}
        </div>
        <div className={styles.formItem}>
        </div>
      </form>
      <div className={styles.buttonWrapper}>
        <Button 
          name="update"
          text="更新"
          onClick={handleSubmit(onSubmit)}
        />
        <Button
          name="delete"
          text="削除"
          onClick={handleDelete}
        />
      </div>
    </div>
  )
}