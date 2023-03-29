import  prisma  from "../../../prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

export async function POST(request: Request) {
 const {title, imageUrl, tag}= await request.json()
  const session = await getServerSession( authOptions);

 
    if (!session) {
      return  NextResponse.json({ message: "Please signin to create a post." })
    }

     const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    });


const data = await prisma.post.create({
   data:{
    title,
    imageUrl,
    tag,
     userId: prismaUser?.id!,
   } 
})
 
 return NextResponse.json({data},{status:200});
}