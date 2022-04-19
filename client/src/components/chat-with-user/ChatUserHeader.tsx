import { NextPage } from "next";
import Image from "next/image";
export interface UserProps {
  user: {
    name: string;
    online: boolean;
    pic: string;
    email: string;
    connectId: string;
  };
}
const ChatUserHeader: NextPage<UserProps> = ({ user }) => (
  <div className="flex justify-between items-center h-20 p-5">
    <div className="bg-white rounded-full p-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
    <div className="text-center">
      <h1 className="font-semibold">{user.name}</h1>
      <p
        className={`text-xs inline-block px-2 rounded-md py-[0.1rem] bg-white font-medium ${
          user.online ? "text-green-500" : "text-gray-400"
        }`}
      >
        {user.online ? "Online" : "last active 2 min. ago"}
      </p>
    </div>
    <div className="relative">
      <Image
        src={user.pic}
        alt={user.name}
        width={35}
        height={35}
        className="rounded-full"
      />
      {user.online ? (
        <span className="w-2 h-2 rounded-full bg-green-500 absolute bottom-1 right-0"></span>
      ) : null}
    </div>
  </div>
);

export default ChatUserHeader;
