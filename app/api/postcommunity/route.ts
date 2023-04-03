import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { err: "Error has occured while making a post" },
      { status: 403 }
    );
  }
}
