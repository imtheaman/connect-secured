import { secondaryContent } from "../../local-states/slices/uiSlice";
import useAppDispatch from "../../hooks/useAppDispatch";

export interface UserProps {
  user: {
    name: string;
    profilePic: string;
    email: string;
    uid: string;
    online: boolean;
    lastActive: Date;
  };
}
const ChatUserHeader: React.FC<UserProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-between items-center h-20 py-5">
      <button
        className="bg-white rounded-full p-1"
        onClick={() => {
          dispatch(secondaryContent(false));
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
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
      <button
        className="relative"
        onClick={() => dispatch(secondaryContent("Profile"))}
      >
        <img
          src={user.profilePic}
          alt={user.name}
          width={35}
          height={35}
          className="rounded-full"
        />
        {user.online ? (
          <span className="w-2 h-2 rounded-full bg-green-500 absolute bottom-1 right-0"></span>
        ) : null}
      </button>
    </div>
  );
};

export default ChatUserHeader;
