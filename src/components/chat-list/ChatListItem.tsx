import useAppDispatch from '../../hooks/useAppDispatch';
import { secondaryContent } from '../../local-states/slices/uiSlice';
import { useQuery } from '@apollo/client';
import { GET_CHAT } from '../../apollo/queries';
import { setChatWith } from '../../local-states/slices/chatSlice';
import { readJwt } from '../../read-token';
import { useCookies } from 'react-cookie';
import { calculateTimeAgo } from '../../time-ago/time-ago';

interface Props {
  id: string;
}
const ChatListItem: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const {
    data: { getChat },
    error,
    loading
  } = useQuery(GET_CHAT, { variables: { chatId: id } });
  const [cookies] = useCookies(['token'])
  const userId = getChat.people.filter((id: string) => id !== readJwt(cookies.token))[0]

  if (!getChat) return null;
  return (
    <div className='flex w-full px-2'>
      <div
        className='cursor-pointer'
        onClick={() => {
          dispatch(secondaryContent('Profile'));
        }}
      >
        <img
          src={getChat.profilePic.length === 1? getChat.profilePic[0]: getChat.profilePic[userId]}
          width={48}
          height={48}
          className='rounded-full'
        />
      </div>
      <div
        className='ml-3 border-b border-gray-300 pb-4 mb-4 flex-grow'
        onClick={() => {
          dispatch(secondaryContent('Chat'));
          dispatch(setChatWith({ chatId: id, userId: getChat._id }));
        }}
      >
        <div className='flex flex-col w-full mr-1 cursor-pointer'>
          <div className='flex justify-between items-center'>
            <h4 className='font-semibold text-light-black'>{getChat.name.length === 1? getChat.name : getChat.name[userId]}</h4>
            <span className='text-[0.65rem] whitespace-nowrap'>
              {calculateTimeAgo(getChat.lastMessage.sentAt)}
            </span>
          </div>
          <div className='flex justify-between items-center'>
            <p className='text-gray-500 text-sm overflow-hidden h-6'>
              {getChat.lastMessage.content}
            </p>
            <span className='bg-green-400 text-black rounded-2xl ml-1 px-3 flex items-center justify-center text-xs font-semibold'>
              {/* {unreadCount} */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
