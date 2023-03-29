import Image from "next/image";
import logo from "../public/assets/samo logo.png";
import Link from "next/link";
import Login from "./Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import SignOut from "./SignOut";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="w-full bg-openAI_Primary p-8 text-teal-300">
      <div className="flex items-center justify-between ">
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
        <p className=" text-md hidden xl:block mt-2 ml-12">
          &quot; I tried drawing a perfect circle, but it ended up looking like
          a potato, so I decided to let the AI do the artwork instead. &quot;
        </p>
        <div className=" flex items-center">
          <Link
            className=" uppercase font-semibold text-lg xl:mr-10 mr-7"
            href={"/share"}
          >
            Gallery
          </Link>
          <div>
            {session ? (
              <SignOut image={session.user?.image || ""} />
            ) : (
              <Login />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
