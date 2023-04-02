import prisma from "../../../../prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

interface Params {
  id: string;
  userId: string;
}

export async function DELETE(req: NextApiRequest, { params }: { params: Params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Please sign in to create a post." });
  }

  const userId = params.userId as string



  const result = await prisma.post.delete({
  where: { id: params.id },
});

 

  return NextResponse.json({ result }, { status: 200 });
}
