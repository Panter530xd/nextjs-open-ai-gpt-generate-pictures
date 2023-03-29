import { Gallery } from "@/components/Gallery";
import prisma from "../../prisma/client";

export const revalidate = 0;

async function getPosts() {
  const posts = await prisma.post.findMany();

  return posts;
}

const Share = async () => {
  const posts = await getPosts();

  return (
    <main className="max-w-5xl mx-auto">
      <Gallery posts={posts} />
    </main>
  );
};

export default Share;
