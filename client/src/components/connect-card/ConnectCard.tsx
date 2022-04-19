import { NextPage } from "next";
import Logo from "../logo/Logo";

interface Props {
  className?: string;
  children: any;
}

const ConnectCard: NextPage<Props> = ({ className, children }) => {
  return (
    <div className="min-h-[100vh] flex justify-center items-center text-light-black">
      <div
        className={`relative p-4 pt-32 md:p-14 md:pt-24 lg:p-20 lg:pt-28 w-full max-w-[55rem] z-10 bg-white shadow-all h-[100vh] md:h-auto md:min-h-[60vh] ${className}`}
      >
        {/* Logo */}
        <div className="absolute flex items-center justify-between top-0 left-0 border-b px-5 md:px-10 py-4 text-white text-2xl w-full">
          <Logo />
          <div className="flex space-x-2">
            <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
            <div className="w-4 h-4 rounded-full bg-green-400"></div>
            <div className="w-4 h-4 rounded-full bg-red-400"></div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ConnectCard;
