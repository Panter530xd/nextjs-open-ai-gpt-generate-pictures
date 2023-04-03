"use client";
import AuthPost from "@/components/AuthPost";
import LoaderSkeleton from "@/components/LoaderSkeleton";
import { AuthPosts } from "@/types";
import { Post } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const fetchAuthPosts = async () => {
  const response = await axios.get("/api/posts");
  return response.data.data;
};

export default function Dashboard() {
  const { status } = useSession();

  const { data, isLoading } = useQuery<AuthPosts>({
    queryFn: fetchAuthPosts,
    queryKey: ["authpost"],
  });

  if (status === "unauthenticated") {
    return toast.error("Please Sign in first");
  }
  if (isLoading) {
    return <LoaderSkeleton />;
  }

  return (
    <motion.article
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ ease: "easeOut" }}
      className="py-20  xl:w-8/12 w-full mx-auto"
    >
      {data?.name && (
        <h3 className="text-teal-300 text-2xl pb-8 xl:ml-0 ml-10">
          Hello {data.name}
        </h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {data?.Post?.map((post: Post) => (
          <AuthPost
            key={post.id}
            id={post.id}
            avatar={data.image}
            name={data?.name}
            title={post.title}
            post={[post]}
          />
        ))}
      </div>
    </motion.article>
  );
}
