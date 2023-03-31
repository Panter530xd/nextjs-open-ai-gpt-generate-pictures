import  prisma  from "../../../prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

export async function GET(request: Request) {
  const session = await getServerSession( authOptions);

    if (!session) {
      return  NextResponse.json({ message: "Please signin to create a post." })
    }

     try {
      const data = await prisma.user.findUnique({
        where: {
          email: session.user?.email!,
        },
        include: {
          Post: {
            orderBy: {
              createdAt: "desc",
            },
            
          },
        },
      });

      console.log(data);
     return NextResponse.json({data},{status:200});
    } catch (err) {
    return NextResponse.json({ err: "Error has occured while making a post" },{status:403});
    }
  }
