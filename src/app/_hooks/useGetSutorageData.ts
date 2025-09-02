import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

export const useGetStorageData = (thumbnailKey: string ) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!thumbnailKey) return;
    
    const fetchThumbnail = async () => {

      const thumbnail = await supabase.storage
        .from('post_thumbnail')
        .getPublicUrl(thumbnailKey);

      setThumbnailUrl(thumbnail.data.publicUrl);
    }

    fetchThumbnail();
  }, [thumbnailKey])

  return thumbnailUrl ;
}