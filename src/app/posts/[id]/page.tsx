'use client'

import styles from './page.module.scss'
import useFetchData from "@/app/_hooks/useFetchData";
import Image from 'next/image';
import { formatDate } from '@/app/_functions/handleDate';

type DataProps = {
  id:number
  title:string
  createdAt:string
  thumbnailUrl:string
  categories:string[]
  content:string
}

export default function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const url = `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
  const {data:post, loading}: {data:DataProps | null, loading: boolean} = useFetchData(url,'post');

  if(loading) return <div>読み込み中</div>
  if(!post) return <div>データがありません</div>

  return (
    <div className={styles.container}>
      <div>
        <Image 
          src={post.thumbnailUrl}
          alt=""
          width={800}
          height={400}
        />
      </div>
      <div className={styles.flex}>
        <time dateTime={post.createdAt.split('T')[0]}>{formatDate(post.createdAt)}</time>
        <p>
          {post.categories.map(category => (
            <span className="" key={category}>{category}</span>
          ))}
        </p>
      </div>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.content} dangerouslySetInnerHTML={{__html: post.content}} />
    </div>
  )
}