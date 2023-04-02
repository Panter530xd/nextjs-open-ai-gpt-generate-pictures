"use client";

import Image from "next/image";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { motion } from "framer-motion";
import Toggle from "./Toogle";
import { CommunityPost } from "./Gallery";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  post: {
    id: string;
    title: string;
    imageUrl: string;
    tag: string;
    createdAt: Date;
    userId: string;
  }[];
};

export default function DeletePost({ avatar, name, post, id }: EditProps) {
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();
  let deleteToastID: string;

  const { mutate } = useMutation(
    async (id: string) => {
      const res = await axios.delete(`/api/postsauth/${id}`);
    },
    {
      onError: () => {
        toast.error("Some error", { id: deleteToastID });
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["authpost"]);
        toast.success("Post has been deleted.", { id: deleteToastID });
      },
    }
  );

  const deletePost = () => {
    mutate(id);
  };

  return (
    <>
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.8 }}
        transition={{ ease: "easeOut" }}
        className="bg-white my-8 p-8 rounded-lg "
      >
        <div className="flex items-center gap-2 my-3">
          <Image
            width={32}
            height={32}
            priority={true}
            src={avatar}
            alt="avatar"
            className=" rounded-full"
          />
          <h3 className="font-bold text-gray-700 whitespace-nowrap">{name}</h3>
        </div>

        <CommunityPost
          id={post[0]?.id}
          title={post[0]?.title}
          imageUrl={post[0]?.imageUrl}
          tag={post[0]?.tag}
          createdAt={post[0]?.createdAt}
          userId={post[0]?.userId}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setToggle(true);
          }}
          className=" px-2 py-1 text-lg hover:text-white hover:bg-openAI_Hover rounded-lg  border-[0.5px] border-red-700 transition-colors duration-300 text-red-700 w-full mt-3"
        >
          Delete
        </button>
      </motion.div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
}
