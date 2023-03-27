"use client";

import { useState } from "react";
import { UserInputs } from "./UserInputs";
import { ImagePreview } from "./ImagePreview";
import FileSaver from "file-saver";
import axios from "axios";
import { useRouter } from "next/navigation";

export const InputPanel = () => {
  const router = useRouter();

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
    if (
      userInputs.title === "" ||
      userInputs.tag === "" ||
      userInputs.description === ""
    )
      return alert("Enter all Inputs");

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
    }
    setuserInputCache({ ...userInputs });
    setUserInputs({
      title: "",
      tag: "",
      description: "",
    });
  };

  const handleShareImage = async () => {
    setisLoading(true);
    try {
      const { data } = await axios.post(`/api/posts`, {
        title: userInputCache.title,
        imageUrl: imageUrl,
        tag: userInputCache.tag,
      });
    } catch (error) {
      let message = "Unkown error";
      if (error instanceof Error) message = error.message;
      alert(message);
    } finally {
      setisLoading(false);
    }
    router.push("/share");
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
        <div className="flex gap-2 mt-2">
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
