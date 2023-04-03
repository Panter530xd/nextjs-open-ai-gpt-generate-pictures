"use client";

import { Gallery } from "@/components/Gallery";
import { useQuery } from "@tanstack/react-query";
import LoaderSkeleton from "@/components/LoaderSkeleton";
import { Post } from "@prisma/client";

const fetchAllPosts = async (): Promise<Post[]> => {
  const response = await fetch("/api/postcommunity");
  const data = await response.json();
  return data.posts;
};

const Share = () => {
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryFn: fetchAllPosts,
    queryKey: ["authpost"],
  });
  if (isLoading) {
    return <LoaderSkeleton />;
  }

  if (!posts || posts.length === 0) {
    return (
      <main className="mx-auto xl:w-8/12 w-full" id="div-share">
        <p className="text-teal-300 text-4xl text-center pt-10">
          No posts found. Please Sign In to Make a Post.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto xl:w-8/12 w-full" id="div-share">
      {posts && <Gallery Post={posts} />}
    </main>
  );
};

export default Share;
