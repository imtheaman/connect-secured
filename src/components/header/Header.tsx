import { Dispatch, SetStateAction } from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import { setHomeContent } from '../../local-states/slices/uiSlice';
import StoriesContainer from '../stories/StoriesContainer';

const Header: React.FC<{ setSearch: Dispatch<SetStateAction<boolean>> }> = ({
  setSearch
}) => {
  const user: { name: string; profilePic: string } = JSON.parse(
    localStorage.getItem('user')!
  );
  const currentHours = new Date().getHours();
  const greeting =
    currentHours < 12
      ? 'Morning'
      : currentHours >= 12 && currentHours <= 15
      ? 'Afternoon'
      : currentHours >= 16 && currentHours < 19
      ? 'Evening'
      : 'Night';
  const dispatch = useAppDispatch();
  return (
    <div className='bg-gradient-br md:drop-shadow-top w-full h-60'>
      {/* Greeting */}
      <div className='flex justify-between p-6'>
        <div>
          <p className='text-sm text-gray-500'>Good {greeting}</p>
          <h1 className='font-semibold text-light-black capitalize -mt-1 text-xl'>
            {user?.name.slice(0, 7)}
            {user?.name.length > 8 && '...'}
          </h1>
        </div>

        <div className='flex space-x-4 items-center'>
          <button
            className='bg-white cursor-pointer p-2  rounded-full'
            onClick={() => setSearch(true)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='1.2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </button>
          <button
            className='relative w-9 h-9 rounded-full'
            onClick={() => dispatch(setHomeContent('UserSettings'))}
          >
            {user?.profilePic.startsWith('blob') ? (
              <div className='flex items-center justify-center bg-white rounded-full w-9 h-9'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-4 h-4 mb-[.2rem]'
                  fill='#5a5b5c'
                  viewBox='0 0 512 512'
                >
                  <path d='M256 288c79.53 0 144-64.47 144-144s-64.47-144-144-144c-79.52 0-144 64.47-144 144S176.5 288 256 288zM351.1 320H160c-88.36 0-160 71.63-160 160c0 17.67 14.33 32 31.1 32H480c17.67 0 31.1-14.33 31.1-32C512 391.6 440.4 320 351.1 320z' />
                </svg>
              </div>
            ) : (
              <img
                src={user?.profilePic}
                className='rounded-full object-contain'
              />
            )}
          </button>
        </div>
      </div>

      {/* Stories */}
      <StoriesContainer />
    </div>
  );
};

export default Header;
