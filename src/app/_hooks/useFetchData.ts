'use client';

import { useState, useEffect } from "react";

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

export default function useFetchData<T = DataProps | DataProps[]> (url:string, page:string = 'posts') {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
        }
      })
      if (!response.ok) {
        throw new Error('データを取得できません。')
      }
      const result = await response.json()

      setLoading(false)
      
      const resultData = page === 'posts' ? result.contents : result
      setData(resultData)

    }catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return {data, loading}

}