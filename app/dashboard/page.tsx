"use client";
import { CommunityPost } from "@/components/Gallery";
import { AuthPosts } from "@/types";
import { Post } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";

const fetchAuthPosts = async () => {
  const response = await axios.get("/api/authpost");
  return response.data.data;
};

export default function Dashboard() {
  const { data, isLoading } = useQuery<AuthPosts>({
    queryFn: fetchAuthPosts,
    queryKey: ["authpost"],
  });
  console.log("AUTH DATA", data);

  if (isLoading) {
    return <h1 className="text-teal-300">Posts are Loading....</h1>;
  }

  return (
    <motion.article
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ ease: "easeOut" }}
      className="py-20 max-w-5xl mx-auto"
    >
      <h3 className="text-teal-300 text-2xl pb-8">
        Hello how can we help you today {data?.name}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
        {data?.Post?.map((post: Post) => (
          <CommunityPost key={post.id} {...post} />
        ))}
      </div>
    </motion.article>
  );
}
