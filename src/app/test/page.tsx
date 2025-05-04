'use client'

import { useEffect, useState } from "react"

export default function Test() {

  const [data, setData] = useState<string>('')

  // useEffect(() => {
  //     fetch('/api/hello')
  //       .then((res) => {
  //         if(!res.ok) throw new Error('Network response was not ok')
  //         return res.json()
  //       })
  //       .then((data:string) => {setData(data)})
  //   }, [])

    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch('/api/hello')
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await res.json()
        setData(data)
      }
      fetchData()
    }, [])
  
  return (
    <div>
      <h1>Test</h1>
      <p>Check the console for the API response.</p>
      <p>{data}</p>
    </div>
  )
}