'use client'

import { useForm } from "react-hook-form"
import Button from "@/app/_components/Button"
import { zodResolver } from "@hookform/resolvers/zod"
import { AdminCategoriesSchema, TAdminCategoriesSchema } from "@/app/_schema/formSchema"
import styles from "./page.module.scss"
import { useRouter } from "next/navigation"
import CategoryForm from "../_components/CategoryForm"

export default function NewCategory() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitting}
  } = useForm<TAdminCategoriesSchema>({
    resolver: zodResolver(AdminCategoriesSchema)
  })

  const onSubmit = async (data: TAdminCategoriesSchema) => {
    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if(!response.ok) {
        throw new Error('データを送信できませんでした。')
      }

      alert('作成しました。\n一覧ページに戻ります。')
      console.log(data)
      
    }catch (error) {
      console.error(error)
      alert('送信に失敗しました。')
    }finally {
      router.push('/admin/categories')
    }
  }
  
  return(
    <div>
      <h1>カテゴリ作成</h1>
      <CategoryForm
        handleSubmit={handleSubmit}
        register={register}
        onSubmit={onSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
      />
      <div className={styles.buttonWrapper}>
        <Button 
          name='create'
          text='作成'
          type="submit"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  )
}