import Image from "next/image";
import logo from "../public/assets/samo logo.png";
import Link from "next/link";
export default function Header() {
  return (
    <header className="w-full bg-openAI_Primary p-8 text-teal-300">
      <div className="flex items-center justify-between">
        <Link href="/">
          <div>
            <Image
              src={logo}
              alt={"Logo"}
              width={70}
              className="object-contain"
            />
          </div>
        </Link>
        <p className=" text-md hidden xl:block mt-2">
          &quot; I tried drawing a perfect circle, but it ended up looking like
          a potato, so I decided to let the AI do the artwork instead. &quot;
        </p>
        <Link className=" uppercase font-semibold text-lg" href={"/share"}>
          Gallery
        </Link>
      </div>
    </header>
  );
}
