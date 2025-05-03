'use client';

import styles from './page.module.scss'
import useFetchData   from "@/app/_hooks/useFetchData";
import Link from "next/link";
import { formatDate } from "@/app/_functions/handleDate";

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

export default function Home() {
  const url = "https://1ly0plhsy2.microcms.io/api/v1/posts";
  const {data:posts, loading}:{data:DataProps[] | null, loading:boolean}= useFetchData(url);


  if(loading) return <div>読み込み中</div>
  if(!posts || posts.length === 0) return <div>データがありません</div>


  return (
    <div className={styles.container}>
        {posts.map(post => (
          <Link key={post.id} href={`/posts/${post.id}`}  className={styles.link}>
            <div className={styles.flex}>
              <time dateTime={post.createdAt.split('T')[0]} className="">
                {formatDate(post.createdAt)}
              </time>
              <p>
                {post.categories.map(category => <span key={category.name} className="">{category.name}</span>)}
              </p>
            </div>
            <h2 className={styles.title}>{post.title}</h2>
            <p className={styles.content} dangerouslySetInnerHTML={{ __html: post.content}} />
          </Link>
        ))}
    </div>
  );
}
