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
            <Image
              src={placeholder}
              alt="placeholoder"
              className=" object-contain"
              priority={true}
              width={512}
              height={512}
            />
          </div>
        ) : (
          <div className="relative h-[512px] w-[512px]">
            <Image
              src={imageUrl}
              alt="Images"
              priority={true}
              className=" object-contain "
              width={512}
              height={512}
            />
          </div>
        )}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            {<Loader />}
          </div>
        )}
      </div>
      <div className=" w-10/12 mx-auto text-left py-5">
        <h3 className="text-teal-300 text-lg">
          Introducing the ultimate picture generator powered by OpenAI! With our
          cutting-edge technology, you can create stunning images in just a few
          clicks. Whether you need high-quality graphics for your website,
          social media, or marketing campaigns, our picture generator has got
          you covered. Our software leverages the power of OpenAI to create
          unique and captivating images that are sure to grab attention. With
          our easy-to-use interface, you can create custom images that perfectly
          match your brand or project. Our picture generator is perfect for
          businesses and individuals looking to create stunning visuals quickly
          and easily. With a vast array of features and tools at your disposal,
          you will be amazed at what you can create with our software. So why
          wait? Sign up for our picture generator today and experience the power
          of OpenAI for yourself!
        </h3>
      </div>
    </div>
  );
};
