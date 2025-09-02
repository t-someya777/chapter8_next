import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/utils/supabase";

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization') ?? ''
  const { error } = await supabase.auth.getUser(token)

  if(error) {
    return NextResponse.json({status: error.message}, {status: 400})
  }

  const getCategory = await prisma.category.findMany({})

  return NextResponse.json(getCategory)
}

export async function POST(request: NextRequest) {
  const token = request.headers.get('Authorization') ?? ''
  const { error } = await supabase.auth.getUser(token)

  if(error) {
    return NextResponse.json({status: error.message}, {status: 400})
  }

  const body = await request.json()
  const { category } = body

  const newCategory = await prisma.category.create({
    data: {
      name: category
    }
  })
  return NextResponse.json(newCategory)

}