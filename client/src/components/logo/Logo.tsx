import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" passHref>
      <h1 className="flex cursor-pointer items-center justify-center text-light-black select-none">
        <span className="text-light-black border w-10 h-10 mr-1 flex items-center justify-center rounded-md font-bold text-3xl">
          C
        </span>
        <span className="-mt-1">connect</span>
      </h1>
    </Link>
  );
};

export default Logo;
