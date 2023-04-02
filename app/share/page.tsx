import { Gallery } from "@/components/Gallery";
import prisma from "../../prisma/client";
export const revalidate = 0;

const Share = async () => {
  const posts = await prisma.post.findMany();

  return (
    <main className="mx-auto xl:w-8/12 w-full">
      <Gallery posts={posts} />
    </main>
  );
};

export default Share;
