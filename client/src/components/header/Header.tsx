import { NextPage } from "next";
import Image from "next/image";
import Stories from "../stories/Stories";
import { signOut, useSession } from "next-auth/react";

const Header: NextPage = () => {
  const currentHours = new Date().getHours();
  const greeting =
    currentHours < 12
      ? "Morning"
      : currentHours >= 12 && currentHours <= 15
      ? "Afternoon"
      : currentHours >= 16 && currentHours < 19
      ? "Evening"
      : "Night";
  const { data: session } = useSession();
  const fullName = session?.user?.name || "";
  const imageSrc = session?.user?.image || "/girl1.jpg";
  return (
    <div className="bg-gradient-br md:drop-shadow-top w-full h-60">
      {/* Greeting */}
      <div className="flex justify-between p-6">
        <div>
          <p className="text-sm text-gray-500">Good {greeting}</p>
          <h1 className="font-semibold text-light-black -mt-1 text-xl">
            {fullName}
          </h1>
        </div>

        <div className="flex space-x-4 items-center">
          <button className="w-8 h-8 bg-white flex items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button
            className="relative w-9 h-9 rounded-full"
            onClick={() => signOut()}
          >
            <Image
              layout="fill"
              src={imageSrc}
              className="rounded-full"
              alt={fullName}
              priority
            />
          </button>
        </div>
      </div>

      {/* Stories */}
      <Stories />
    </div>
  );
};

export default Header;
