import SettingsBtn from './SettingsBtn';
import { Link, useNavigate } from 'react-router-dom';
import useAppDispatch from '../../hooks/useAppDispatch';
import { setHomeContent } from '../../local-states/slices/uiSlice';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOG_OUT } from '../../apollo/queries';

const UserSettings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [cookies, , removeCookie] = useCookies(['token'])
  const [logOut, {data: loggedOut}] = useMutation(LOG_OUT)
  useEffect(() => {
    if (loggedOut?.logOut) {
      removeCookie('token')
      localStorage.removeItem('user')
    }
    !cookies.token && navigate('signin', {replace: true})
  }, [loggedOut])
  return (
    <div className='bg-gray-100 fullscreen md:border-r md:border-gray-300 p-4'>
      <div className='bg-white p-6 rounded-2xl h-full relative'>
        <button
          className='bg-gray-100 absolute top-6 right-6 p-2 rounded-full'
          onClick={() => dispatch(setHomeContent('Home'))}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4'
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
        <h1 className='text-2xl font-semibold mb-10 text-gray-900'>Settings</h1>
        <ul className='text-lg text-gray-800 space-y-6'>
          <SettingsBtn
            btnName='Themes Settings'
            btnAction={() => dispatch(setHomeContent('ThemesSettings'))}
          />
          <SettingsBtn
            btnName='Chat Settings'
            btnAction={() => dispatch(setHomeContent('ChatSettings'))}
          />
          <SettingsBtn
            btnName='Privacy Settings'
            btnAction={() => dispatch(setHomeContent('PrivacySettings'))}
          />
          <SettingsBtn
            btnName='Terms & Conditions'
            btnAction={() => console.log('first')}
          />
        </ul>
        <div className='text-xs absolute bottom-8 left-1/2 text-center -translate-x-1/2 text-gray-400'>
          <button
            className='border border-gray-300 mb-6 rounded-lg px-5 text-sm py-2'
            onClick={() => logOut({variables: {token: cookies.token}})}
          >
            Logout
          </button>
          <div>
            Connect V.1.2, made with ❤ by{' '}
            <Link to='https://github.com/urtheaman'>
              <i className='cursor-pointer'>urtheaman</i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
