'use client'

import styles from './page.module.scss'
import useFetchData from "@/app/_hooks/useFetchData";
import Image from 'next/image';
import { formatDate } from '@/app/_functions/handleDate';

type DataProps = {
  categories: { id: string; name: string }[],
  content: string,
  createdAt: string,
  id: string,
  publishedAt: string,
  revisedAt: string,
  thumbnail: {
    url: string,
    height: number,
    width: number,
  },
  title: string,
  updatedAt: string
}

export default function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const url = `https://1ly0plhsy2.microcms.io/api/v1/posts/${id}`
  const {data:post, loading}: {data:DataProps | null, loading: boolean} = useFetchData(url, 'post');

  if(loading) return <div>読み込み中</div>
  if(!post) return <div>データがありません</div>

  return (
    <div className={styles.container}>
      <div>
        <Image 
          src={post.thumbnail.url}
          alt=""
          width={post.thumbnail.width}
          height={post.thumbnail.height}
        />
      </div>
      <div className={styles.flex}>
        <time dateTime={post.createdAt.split('T')[0]}>{formatDate(post.createdAt)}</time>
        <p>
          {post.categories.map(category => (
            <span className="" key={category.name}>{category.name}</span>
          ))}
        </p>
      </div>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.content} dangerouslySetInnerHTML={{__html: post.content}} />
    </div>
  )
}