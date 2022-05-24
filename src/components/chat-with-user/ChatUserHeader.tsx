import { secondaryContent } from '../../local-states/slices/uiSlice';
import useAppDispatch from '../../hooks/useAppDispatch';
import GoBackBtn from './GoBackBtn';
import { useQuery } from '@apollo/client';
import { GET_PROFILE } from '../../apollo/queries';
import useAppSelector from '../../hooks/useAppSelector';
import Loader from '../loader/Loader';
import { calculateTimeAgo } from '../../time-ago/time-ago';
import ProfilePic from '../profile-picture/ProfilePic';

const ChatUserHeader: React.FC = () => {
  const userId = useAppSelector(({ chat }) => chat.chat!.userId);
  //
  // ─── TODO OFFLINE ERROR ─────────────────────────────────────────────────────────
  //
  const { data, error, loading } = useQuery(GET_PROFILE, {
    variables: { userId: userId }
  });
  const dispatch = useAppDispatch();
  if (loading) return <Loader />;
  return (
    <div className='flex justify-between items-center h-20 py-5'>
      <GoBackBtn
        onClick={() => {
          dispatch(secondaryContent(false));
        }}
      />
      <div className='text-center'>
        <h1 className='font-semibold'>{data.getProfile.name}</h1>
        <p
          className={`text-xs inline-block px-2 rounded-md py-[0.1rem] bg-white font-medium ${
            data.getProfile?.online ? 'text-green-500' : 'text-gray-400'
          }`}
        >
          {data.getProfile?.online
            ? 'Online'
            : `last active ${calculateTimeAgo(data.getProfile.lastActive)}`}
        </p>
      </div>
      <button
        className='relative'
        onClick={() => dispatch(secondaryContent('Profile'))}
      >
        <ProfilePic
          profilePic={data.getProfile.profilePic}
          width={45}
          height={45}
          border={false}
        />
        {data.getProfile?.online ? (
          <span className='w-2 h-2 rounded-full bg-green-500 absolute bottom-1 right-0'></span>
        ) : null}
      </button>
    </div>
  );
};

export default ChatUserHeader;
