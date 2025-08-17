import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { supabase } from "@/utils/supabase";

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization') ?? ''
  const { error } = await supabase.auth.getUser(token)

  if(error) {
    return NextResponse.json({status: error.message}, {status: 400})
  }

  const postsGet = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
    }
  })
  return NextResponse.json(postsGet)
}

export async function POST(request:NextRequest) {
  const token = request.headers.get('Authorization') ?? ''
  const { error } = await supabase.auth.getUser(token)

  console.log('token', token, 'error', error)

  if(error) {
    return NextResponse.json({status: error.message}, {status: 400})
  }

  const post = await request.json()

  const postPost = await prisma.post.create({
    data: {
      title:post.title,
      content:post.content,
      thumbnailUrl:post.thumbnailUrl,
      postCategories: {
        create: post.category.map((categoryId:string) => ({
          category: {
            connect: {id: Number(categoryId)}
          }
        }))
      }
    }
  })

  return NextResponse.json(postPost)
}