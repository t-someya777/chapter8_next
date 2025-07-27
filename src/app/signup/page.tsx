'use client'

import { supabase } from "@/utils/supabase"
import { useState } from "react"
// import style from "./Page.module.scss"
import LoginSigninForm from "../_components/LoginSigninForm"

export default function Page() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async(event:React.FormEvent) => {
    event.preventDefault()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `http://localhost:3000/login`,
      }
    })

    if(error) {
      alert('登録に失敗しました。')
    } else {
      setEmail('')
      setPassword('')
      alert('確認メールを送信しました。')
    }
  }

  return (
    <LoginSigninForm
      handleSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      button="登録"
    />
  )
}