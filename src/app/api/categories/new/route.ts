import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { category } = body

  const prisma = new PrismaClient()
  const newCategory = await prisma.category.create({
    data: {
      name: category
    }
  })
  return NextResponse.json(newCategory)

}