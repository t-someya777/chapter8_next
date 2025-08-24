import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { supabase } from '@/utils/supabase';

const prisma = new PrismaClient()

export async function GET(request:NextRequest,{ params }: { params: { id: string } }) {
  const token = request.headers.get('Authorization') ?? ''
  const { error } = await supabase.auth.getUser(token)

  if(error) {
    return NextResponse.json({status: error.message}, {status: 400})
  }
  
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

  const category = await prisma.category.findMany()

  return NextResponse.json({post, category})
}

export async function  DELETE(request:NextRequest,{ params }: { params: { id: string } }) {
  const token = request.headers.get('Authorization') ?? ''
  const { error } = await supabase.auth.getUser(token)

  if(error) {
    return NextResponse.json({status: error.message}, {status: 400})
  }
  
  const { id } = params
  const postDelete = await prisma.post.delete({
    where: {
      id: Number(id)
    }
  })
  return NextResponse.json(postDelete)
}

export async function PUT(request:NextRequest,{ params }: { params: { id: string } }) {
  const token = request.headers.get('Authorization') ?? ''
  const { error } = await supabase.auth.getUser(token)


  if(error) {
    return NextResponse.json({status: error.message}, {status: 400})
  }

  const { id } = params
  const response = await request.json()
  const { title, content, thumbnailImageKey, category} = response

  await prisma.post.update({
    where: {
      id: Number(id)
    },
    data: {
      title,
      content,
      thumbnailImageKey,
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