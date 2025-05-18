'use client';

import styles from './page.module.scss'
import useFetchData   from "@/app/_hooks/useFetchData";
import Link from "next/link";
import { formatDate, time } from "@/app/_functions/handleDate";
import { PostWithCategory } from './_types';

export default function Home() {
  const url = "/api/posts/";
  const {data:posts, loading}:{data:PostWithCategory[] | null, loading:boolean}= useFetchData(url);


  if(loading) return <div>読み込み中</div>
  if(!posts || posts.length === 0) return <div>データがありません</div>


  return (
    <div className={styles.container}>
        {posts.map(post => (
          <Link key={post.id} href={`/posts/${post.id}`}  className={styles.link}>
            <div className={styles.flex}>
              <time dateTime={time(post.createdAt)} >
                {formatDate(post.createdAt)}
              </time>
              <p>
                {post.postCategories.map((category,index) => <span key={index} className="">{category.category.name}</span>)}
              </p>
            </div>
            <h2 className={styles.title}>{post.title}</h2>
            <p className={styles.content} dangerouslySetInnerHTML={{ __html: post.content}} />
          </Link>
        ))}
    </div>
  );
}
