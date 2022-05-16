import { secondaryContent } from "../../local-states/slices/uiSlice";
import useAppDispatch from "../../hooks/useAppDispatch";
import GoBackBtn from "./GoBackBtn";

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
      <GoBackBtn
        onClick={() => {
          dispatch(secondaryContent(false));
        }}
      />
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
          width={36}
          height={36}
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
