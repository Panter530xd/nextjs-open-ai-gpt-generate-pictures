"use client";

import { Post } from "@prisma/client";
import Image from "next/image";
import { FC, useRef } from "react";
import { GalleryProps } from "@/types";
import { motion } from "framer-motion";
import Button from "./Button";
export const CommunityPost: FC<Post> = ({ title, imageUrl, tag }) => {
  return (
    <article className="bg-openAI_Primary flex flex-col p-5 rounded-lg text-white">
      <div className="relative h-[512px] w-auto rounded-lg">
        <Image
          src={imageUrl}
          alt={title}
          priority={true}
          fill
          className="object-contain h-[512px] w-auto"
        />
      </div>
      <h1 className="text-2xl text-white uppercase font-bold tracking-widest sm:mt-2">
        {title}
      </h1>
      {/* user profile/name */}

      <p className="text-yellow-500 mt-2">{tag}</p>
      <Button imageUrl={imageUrl} />
    </article>
  );
};

export const Gallery: FC<GalleryProps> = ({ posts }) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <motion.section
      ref={ref}
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ ease: "easeOut" }}
      className="py-20"
    >
      <h1 className="text-white xl:text-5xl text-3xl text-center my-4 underline">
        Community Showcase
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {posts.map((post) => (
          <CommunityPost key={post.id} {...post} />
        ))}
      </div>
    </motion.section>
  );
};
