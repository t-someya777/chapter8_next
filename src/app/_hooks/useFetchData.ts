'use client';

import { useState, useEffect } from "react";
import { PostWithCategory } from "../_types";

export default function useFetchData<T = PostWithCategory | PostWithCategory[]> (url:string) {
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
      setData(result)
      console.log(result)

    }catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return {data, loading}

}