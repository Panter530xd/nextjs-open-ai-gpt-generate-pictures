import { FC } from "react";
import { ImagePreviewProps } from "@/types";
import Image from "next/image";
import placeholder from "../public/assets/placeholder.png";
import { Loader } from "./Loader";
export const ImagePreview: FC<ImagePreviewProps> = ({
  imageUrl,
  isLoading,
}) => {
  return (
    <div className=" mt-4 bg-black/30">
      <div className=" relative w-full flex items-center justify-center">
        {imageUrl === "" ? (
          <div className="relative h-[512px] w-[512px]">
            <Image src={placeholder} alt="" fill className=" object-contain" />
          </div>
        ) : (
          <div className="relative h-[512px] w-[512px]">
            <Image src={imageUrl} alt="" fill className=" object-contain " />
          </div>
        )}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            {<Loader />}
          </div>
        )}
      </div>
    </div>
  );
};
