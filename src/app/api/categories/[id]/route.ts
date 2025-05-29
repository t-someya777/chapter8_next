import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function PUT(request:NextRequest, {params}:{params: {id:string}} ){
  const { id } = params
  const body = await request.json()
  const { category } = body

  const prisma = new PrismaClient()
  const updateCategory = await prisma.category.update({
    where: {
      id: Number(id)
    },
    data: {
      name: category
    }
  })

  return NextResponse.json(updateCategory)
}


export async function GET(request:NextRequest,{params}: {params: {id:string}}) {
  const { id } = params
  const prisma = new PrismaClient()
  const getCategory = await prisma.category.findUnique({
    where: {
      id: Number(id)
    }
  })
  return NextResponse.json(getCategory)
}

export async function DELETE(request:NextRequest,{params}: {params: {id:string}}) {
  const { id } = params
  const prisma = new PrismaClient()
  const deleteCategory = await prisma.category. delete({
    where: {
      id: Number(id)
    }
  })
  return NextResponse.json(deleteCategory)
}