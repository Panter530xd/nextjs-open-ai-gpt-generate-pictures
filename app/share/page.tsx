import { Gallery } from "@/components/Gallery";
import prisma from "../../prisma/client";

const Share = async () => {
  const posts = await prisma.post.findMany();

  return (
    <main className="max-w-5xl mx-auto">
      <Gallery posts={posts} />
    </main>
  );
};

export default Share;
