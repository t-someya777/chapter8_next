import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET() {
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
  const post = await request.json()

  const postPost = await prisma.post.create({
    data: {
      title:post.title,
      content:post.content,
      thumbnailUrl:post.thumbnailUrl,
      postCategories: {
        create: post.category.map((categoryId:number) => ({
          category: {
            connect: {id: categoryId}
          }
        }))
      }
    }
  })

  return NextResponse.json(postPost)
}