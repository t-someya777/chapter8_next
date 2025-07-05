'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AdminPostsSchema, TAdminPostsSchema } from "@/app/_schema/formSchema"
import Button from "@/app/_components/Button"
import { Category } from "@prisma/client"
import { useRouter } from "next/navigation"
import useFetchData from "@/app/_hooks/useFetchData"
import PostForm from "../_components/PostForm"

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
    console.log(data)
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
      
    } catch (error) {
      console.error("Error creating post:", error)
      alert('送信に失敗しました。')
    } finally {
      router.push('/admin/posts')
    }
  }

  if(loading) return <div>読み込み中</div>

  return (
    <>
      <div>
        <h1>記事作成</h1>
      </div>
      <PostForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        category={categories}
      />
      <div>
        <Button 
          name='create'
          text='作成'
          onClick={handleSubmit(onSubmit)}
        />          
      </div>
    </>
  )
}