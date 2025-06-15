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