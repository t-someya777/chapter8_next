import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient()
  const category = await prisma.category.findMany({})

  return NextResponse.json(category)
}