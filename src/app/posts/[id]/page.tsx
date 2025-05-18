'use client'

import styles from './page.module.scss'
import useFetchData from "@/app/_hooks/useFetchData";
import Image from 'next/image';
import { formatDate, time } from '@/app/_functions/handleDate';
import { PostWithCategory } from '@/app/_types';


export default function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const url = `/api/posts/${id}`
  const {data:post, loading}: {data:PostWithCategory | null, loading: boolean} = useFetchData(url);

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
        <time dateTime={time(post.createdAt)}>{formatDate(post.createdAt)}</time>
        <p>
          {post.postCategories.map(category => (
            <span className="" key={category.category.name}>{category.category.name}</span>
          ))}
        </p>
      </div>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.content} dangerouslySetInnerHTML={{__html: post.content}} />
    </div>
  )
}