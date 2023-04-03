import prisma from "../../../../prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";
import { NextApiRequest } from "next";

interface Params {
  id: string;
}

export async function DELETE(
  req: NextApiRequest,
  { params }: { params: Params }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Please sign in to create a post." });
  }
  try {
    const result = await prisma.post.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { err: "Error has occured while making a post" },
      { status: 403 }
    );
  }
}
