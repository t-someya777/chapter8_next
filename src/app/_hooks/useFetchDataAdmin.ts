'use client';

import { useState, useEffect } from "react";
import { useSupabaseSession } from "./useSupabaseSession";
import { supabase } from "@/utils/supabase";


export default function useFetchDataAdmin<T> (url:string) {
  const [data, setData] = useState<T | null>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { token, isLoading } = useSupabaseSession()

  useEffect(() => {

    if (isLoading) return

    const fetchData = async () => {
      
      if(!token) return

      try {
        const response = await fetch(url, {
          headers: {
            'Content-type': 'application/json',
            Authorization: token as string,
          }
        })
        if (!response.ok) {
          throw new Error('データを取得できません。')
        }
        const result = await response.json()
        
        setLoading(false)
        setData(result)

        if(!result.post?.thumbnailImageKey) return

          const thumbnail = supabase.storage
          .from('post_thumbnail')
          .getPublicUrl(result.post.thumbnailImageKey)

        setThumbnailUrl(thumbnail.data.publicUrl)

      }catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [url, token])

  return {data, loading, thumbnailUrl}

}