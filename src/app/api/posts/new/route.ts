import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

export async function GET() {
  const getCategory = await prisma.category.findMany()

  return NextResponse.json(getCategory)
}

export async function POST(request:NextRequest) {
  const post = await request.json()
  console.log(post)

  const updatePosts = await prisma.post.create({
    data: {
      title:post.title,
      content:post.content,
      thumbnailUrl: post.thumbnailUrl,
      postCategories: {
        create: post.category.map((categoryId:number) => ({
          category: {
            connect: {id:Number(categoryId)}
          }
        }))
      }
    }
  })

  return NextResponse.json(updatePosts)
}