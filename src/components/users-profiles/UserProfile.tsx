import useAppDispatch from '../../hooks/useAppDispatch';
import { setChatWith } from '../../local-states/slices/chatSlice';
import { secondaryContent } from '../../local-states/slices/uiSlice';
import ProfilePic from '../profile-picture/ProfilePic';
const UserProfile: React.FC<{
  profile: {
    id: string;
    name: string;
    profilePic: string;
    country: string;
    state: string;
  };
}> = ({ profile: { name, profilePic, country, state, id } }) => {
  const dispatch = useAppDispatch();

  return (
    <div className='flex space-x-3 my-3'>
      <div
        onClick={() => {
          console.log(id)
          const temp = [
            setChatWith({ userId: id, chatId: null }),
            // secondaryContent('Profile')
          ];
          temp.map((action) => dispatch(action));
        }}
        className='w-12 h-12 cursor-pointer'
      >
        <ProfilePic profilePic={profilePic} />
      </div>
      <div
        className='flex flex-col border-b flex-grow border-gray-300 pb-3 cursor-pointer'
        onClick={() => {
          dispatch(setChatWith({ userId: id, chatId: null }));
          dispatch(secondaryContent('Chat'));
        }}
      >
        <h4 className='text-lg font-semibold text-gray-800'>{name}</h4>
        <p className='text-gray-400 text-xs'>
          From {state.toLowerCase()}, {country}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
