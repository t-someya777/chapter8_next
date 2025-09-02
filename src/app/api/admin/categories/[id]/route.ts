import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { supabase } from '@/utils/supabase';

const prisma = new PrismaClient()

export async function PUT(request:NextRequest, {params}:{params: {id:string}} ){
  const token = request.headers.get('Authorization') ?? ''
  const { error } = await supabase.auth.getUser(token)

  if(error) {
    return NextResponse.json({status: error.message}, {status: 400})
  }
  
  const { id } = params
  const {category} = await request.json()

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
  const token = request.headers.get('Authorization') ?? ''
  const { error } = await supabase.auth.getUser(token)

  if(error) {
    return NextResponse.json({status: error.message}, {status: 400})
  }

  const { id } = params
  const getCategory = await prisma.category.findUnique({
    where: {
      id: Number(id)
    }
  })
  return NextResponse.json(getCategory)
}

export async function DELETE(request:NextRequest,{params}: {params: {id:string}}) {
  const token = request.headers.get('Authorization') ?? ''
  const { error } = await supabase.auth.getUser(token)

  if(error) {
    return NextResponse.json({status: error.message}, {status: 400})
  }

  const { id } = params
  const deleteCategory = await prisma.category. delete({
    where: {
      id: Number(id)
    }
  })
  return NextResponse.json(deleteCategory)
}