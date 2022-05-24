import { lazy, Suspense } from 'react';
import ProfileContent from './profile/ProfileContent';
import ProfileHeader from './profile/ProfileHeader';
import useAppSelector from '../hooks/useAppSelector';
import Loader from './loader/Loader';
import { useCookies } from 'react-cookie';
import { readJwt } from '../read-token';
const ProfileEdit = lazy(() => import('./profile/ProfileEdit'));

const Profile: React.FC = () => {
  const secondaryContent = useAppSelector(({ ui }) => ui.secondaryContent);
  return (
    <main className='px-4 bg-gray-100 pt-6 lg:border-l overflow-hidden lg:border-gray-300 w-full fullscreen lg:max-w-[22rem]'>
      <ProfileHeader />
      {secondaryContent === 'ProfileEdit' ? (
        <Suspense fallback={<Loader />}>
          <ProfileEdit />
        </Suspense>
      ) : (
        <ProfileContent />
      )}
    </main>
  );
};

export default Profile;
