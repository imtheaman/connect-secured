import { useCookies } from 'react-cookie';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { secondaryContent } from '../../local-states/slices/uiSlice';
import { readJwt } from '../../read-token';

const ProfileHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(({ chat }) => chat.chat?.userId);
  const [{ token }] = useCookies(['token']);
  return (
    <div className='flex justify-between'>
      {readJwt(token) === userId ? (
        <button
          className='bg-white p-2 rounded-full'
          onClick={() => dispatch(secondaryContent('ProfileEdit'))}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='1.5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
            />
          </svg>
        </button>
      ) : (
        <div></div>
      )}
      <button
        className='bg-white p-2 rounded-full'
        onClick={() => dispatch(secondaryContent('Chat'))}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth='1.5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>
    </div>
  );
};

export default ProfileHeader;
