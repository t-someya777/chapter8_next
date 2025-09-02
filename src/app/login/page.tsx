'use client'

import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginSigninForm from "../_components/LoginSigninForm";

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=> {
    event.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(error) {
      alert('ログインに失敗しました')
    } else {
      router.replace('/admin/posts')
    }
  }


  return (
    <LoginSigninForm 
      handleSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      button='ログイン'
    />
  )
}