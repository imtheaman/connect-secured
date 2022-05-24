import GoBackBtn from '../chat-with-user/GoBackBtn';
import SearchInput from '../header/SearchInput';
import useAppDispatch from '../../hooks/useAppDispatch';
import { setHomeContent } from '../../local-states/slices/uiSlice';
import UserProfile from '../users-profiles/UserProfile';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_PROFILES } from '../../apollo/queries';
import { useEffect, useState } from 'react';
const NewChat: React.FC = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [getProfiles, { data, error }] = useLazyQuery(GET_PROFILES);
  useEffect(() => {
    getProfiles({ variables: { search, skip: 0 } });
  }, [search]);
  return (
    <div className='border bg-lightwhite border-r-0 fullscreen overflow-y-scroll'>
      <div className='sticky top-0 bg-white  px-5 pt-5'>
        <div className='flex justify-between items-center mb-4'>
          <GoBackBtn
            className='bg-gray-200'
            onClick={() => dispatch(setHomeContent('Home'))}
          />
          <div
            className='h-9 w-9 flex items-center justify-center rounded-full bg-gray-200 text-light-black cursor-pointer'
            onClick={() => console.log('Contacts')}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z' />
            </svg>
          </div>
        </div>
        <SearchInput setSearch={setSearch} />
      </div>
      <div className='p-5'>
        {data?.getProfiles.map((el: any) => (
          <UserProfile
            key={el._id}
            profile={{
              id: el._id,
              country: el.country,
              state: el.state,
              name: el.name,
              profilePic: el.profilePic
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NewChat;
