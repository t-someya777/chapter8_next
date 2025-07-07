import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient()

export async function GET() {
  const getCategory = await prisma.category.findMany({})

  return NextResponse.json(getCategory)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { category } = body

  const newCategory = await prisma.category.create({
    data: {
      name: category
    }
  })
  return NextResponse.json(newCategory)

}