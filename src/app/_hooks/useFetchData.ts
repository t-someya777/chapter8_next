'use client';

import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";

export default function useFetchData<T> (url:string) {
  const [data, setData] = useState<T | null>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('データを取得できません。')
        }
        const result = await response.json()
  
        const thumbnail = await supabase.storage
          .from('post_thumbnail')
          .getPublicUrl(result.thumbnailImageKey)

        setLoading(false)
        setData(result)
        setThumbnailUrl(thumbnail.data.publicUrl)

  
      }catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return {data, loading, thumbnailUrl}

}