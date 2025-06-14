import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function GET(request:NextRequest,{ params }: { params: { id: string } }) {
  const { id } = params

  const post = await prisma.post.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      postCategories: {
        include: {
          category: true
        }
      }
    }
  })

  return NextResponse.json(post)
}

export async function  DELETE(request:NextRequest,{ params }: { params: { id: string } }) {
  const { id } = params
  const postDelete = await prisma.post.delete({
    where: {
      id: Number(id)
    }
  })
  return NextResponse.json(postDelete)
}


export async function PUT(request:NextRequest,{ params }: { params: { id: string } }) {
  const { id } = params
  const response = await request.json()
  const { title, content, thumbnailUrl, category} = response

  await prisma.post.update({
    where: {
      id: Number(id)
    },
    data: {
      title,
      content,
      thumbnailUrl,
      postCategories: {
        deleteMany: {}
      }
    }
  })

  const postPut = await prisma.post.update({
    where: {
      id: Number(id)
    },
    data: {
      postCategories: {
        create: category.map((c:string) => ({
          category: {
            connect: {id:Number(c)}
          }
        }))
      }
    }
  })

  return NextResponse.json(postPut)
}