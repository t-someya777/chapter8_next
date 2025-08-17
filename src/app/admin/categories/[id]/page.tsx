'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AdminCategoriesSchema, TAdminCategoriesSchema } from "@/app/_schema/formSchema"
import styles from "./page.module.scss"
import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Button from "@/app/_components/Button"
import useFetchDataAdmin from "@/app/_hooks/useFetchDataAdmin"
import { Category } from "@prisma/client"
import CategoryForm from "../_components/CategoryForm"
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession"

export default function UpdateCategory() {
  const params = useParams()
  const { id } = params
  const router = useRouter()

  const url = `/api/admin/categories/${id}/`
  const {data, loading } = useFetchDataAdmin<Category>(url)
  const {token} = useSupabaseSession()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TAdminCategoriesSchema>({
    resolver: zodResolver(AdminCategoriesSchema)
  })


  useEffect(() => {
    if(!data) return

    reset ({
      category: data.name
    })
  },[data, reset])

  // データ送信
  const onSubmit = async (data:TAdminCategoriesSchema) => {

    try {
      const response = await fetch(`/api/admin/categories/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token as string,
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
        headers: {
          Authorization: token as string,
        }
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


  if(loading) return <div>読み込み中</div>
  if(!data) return <div>データがありません</div>

  return(
    <div>
      <h1>カテゴリ編集</h1>
      <CategoryForm 
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
      />
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