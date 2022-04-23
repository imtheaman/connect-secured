import useAppDispatch from "../../hooks/useAppDispatch";
import { secondaryContent, userUid } from "../../local-states/slices/uiSlice";
import { Message } from "../../apollo/types";

function calculateTimeAgo(arg: Date) {
  const date = new Date();
  const daysDiff = date.getUTCDate() - arg.getUTCDate();
  if (daysDiff >= 14) return "weeks ago";
  if (daysDiff >= 7) return "1 week ago";
  if (daysDiff >= 1) return `${daysDiff} days ago`;
  if (daysDiff === 1) return "yesterday";
  const hoursDiff = date.getUTCHours() - arg.getUTCHours();
  if (hoursDiff >= 1) return `${hoursDiff} hrs. ago`;
  const minutesDiff = date.getUTCMinutes() - arg.getUTCMinutes();
  if (minutesDiff >= 1) return `${minutesDiff} min. ago`;
  else return "now";
}

interface Props {
  chat: {
    uid: string;
    chatId: string;
    name: string;
    lastMessage: Message;
    profilePic: string;
    unreadCount: number;
  };
}
const ChatListItem: React.FC<Props> = ({
  chat: { uid, name, lastMessage, chatId, profilePic, unreadCount },
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex  w-full px-2">
      <div
        onClick={() => {
          dispatch(secondaryContent("Profile"));
          dispatch(userUid(uid));
        }}
      >
        <img
          src={profilePic}
          alt={name}
          width={48}
          height={48}
          className="rounded-full"
        />
      </div>
      <div
        className="ml-3 border-b border-gray-300 pb-4 mb-4 flex-grow"
        onClick={() => {
          dispatch(secondaryContent("Chat"));
          dispatch(userUid(uid));
        }}
      >
        <div className="flex flex-col w-full mr-1 cursor-pointer">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-light-black">{name}</h4>
            <span className="text-[0.65rem] whitespace-nowrap">
              {calculateTimeAgo(new Date(lastMessage.sentAt))}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm overflow-hidden h-6">
              {lastMessage.content}
            </p>
            <span className="bg-green-400 text-black rounded-2xl ml-1 px-3 flex items-center justify-center text-xs font-semibold">
              {unreadCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
