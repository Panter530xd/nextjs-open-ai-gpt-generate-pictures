"use client";

import { useState } from "react";
import { UserInputs } from "./UserInputs";
import { ImagePreview } from "./ImagePreview";
import FileSaver from "file-saver";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Post } from "@prisma/client";
import { useSession } from "next-auth/react";

interface PostData {
  title: string;
  imageUrl: string;
  tag: string;
}

export const InputPanel = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { status } = useSession();
  let toastPostID: string;
  const [userInputs, setUserInputs] = useState({
    title: "",
    tag: "",
    description: "",
  });

  const [userInputCache, setuserInputCache] = useState({
    title: "",
    tag: "",
    description: "",
  });

  const [imageUrl, setimageUrl] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "unauthenticated") {
      return toast.error("Please Sign in first");
    }
    if (
      userInputs.title === "" ||
      userInputs.tag === "" ||
      userInputs.description === ""
    )
      return toast.error("Enter all Inputs");

    setisLoading(true);

    try {
      const { data } = await axios.post(
        "/api/openai",
        {
          description: userInputs.description,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setimageUrl(data.imageUrl);
    } catch (error) {
      let message = "Unknown error";
      if (error instanceof Error) message = error.message;
      alert(message);
    } finally {
      setisLoading(false);
      queryClient.invalidateQueries(["openai"]);
      toast.success("Image has been made 🔥", { id: toastPostID });
    }
    setuserInputCache({ ...userInputs });
    setUserInputs({
      title: "",
      tag: "",
      description: "",
    });
  };

  const { mutate } = useMutation(
    async (postData: PostData): Promise<Post> => {
      const { data } = await axios.post("/api/posts", postData);
      return data;
    },
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID });
        }
        setisLoading(false);
      },
      onSuccess: () => {
        toast.success("Congratulations, your picture is now public 🚀", {
          id: toastPostID,
        });
        queryClient.invalidateQueries(["posts"]);
        router.push("/share");

        setisLoading(false);
      },
    }
  );

  const handleShareImage = () => {
    setisLoading(true);
    const postData = {
      title: userInputCache.title,
      imageUrl: imageUrl,
      tag: userInputCache.tag,
    };
    mutate(postData);
  };

  const handleDownloadImage = () => {
    FileSaver.saveAs(imageUrl, imageUrl);
  };
  return (
    <div className=" pt-10 pb-40">
      <UserInputs
        handleSubmit={handleSubmit}
        userInputs={userInputs}
        setUserInputs={setUserInputs}
        isLoading={isLoading}
      />
      <ImagePreview imageUrl={imageUrl} isLoading={isLoading} />
      {imageUrl !== "" && (
        <div className="flex gap-2 mt-2 xl:w-full w-10/12 mx-auto">
          <button
            disabled={imageUrl === ""}
            className="btn flex-1 disabled:cursor-not-allowed "
            onClick={handleShareImage}
          >
            {isLoading ? "Shareing..." : "Share"}
          </button>
          <button
            disabled={imageUrl === ""}
            className="btn flex-1 disabled:cursor-not-allowed "
            onClick={handleDownloadImage}
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
};
