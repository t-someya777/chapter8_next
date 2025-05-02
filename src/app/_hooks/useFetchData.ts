'use client';

import { useState, useEffect } from "react";

type DataProps = {
  id:number
  title:string
  createdAt:string
  thumbnailUrl:string
  categories:string[]
  content:string
}

export default function useFetchData<T = DataProps | DataProps[]> (url:string,page:string = 'posts') {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('データを取得できません。')
      }
      const result = await response.json()

      setLoading(false)
      
      const resultData = page === 'posts' ? result.posts : result.post
      setData(resultData)

    }catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return {data, loading}

}