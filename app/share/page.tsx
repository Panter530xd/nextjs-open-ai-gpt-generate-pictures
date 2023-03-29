import { Gallery } from "@/components/Gallery";
import prisma from "../../prisma/client";
import axios from "axios";
import { Post } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
export const revalidate = 0;

async function getPosts() {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/openai`);
  // if (!res.ok) {
  // 	throw new Error("Failed to fetch data");
  // }
  // const posts = await res.json();

  // const allPosts = async () => {
  //   const response = await axios.get("/api/openai");
  //   return response.data;
  // };
  const posts = await prisma.post.findMany();

  return posts;
}

const Share = async () => {
  const posts = await prisma.post.findMany();
  // const { data, error, isLoading } = useQuery<Post[]>({
  //   queryFn: allPosts,
  //   queryKey: ["posts"],
  // });
  // if (error) return error;
  // if (isLoading) return "Loading...";

  return (
    <main className="max-w-5xl mx-auto">
      <Gallery posts={posts} />
    </main>
  );
};

export default Share;
