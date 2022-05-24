import { lazy, Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
const Home = lazy(() => import('./components/Home'));
const Chat = lazy(() => import('./components/chat-with-user/Chat'));
import { Route, Routes } from 'react-router-dom';
const Profile = lazy(() => import('./components/profile'));
const Signin = lazy(() => import('./components/authentication/signin'));
import useTypedSelector from './hooks/useAppSelector';
const StartIntro = lazy(() => import('./components/start-intro/StartIntro'));
import SecuredRoute from './components/SecuredRoute';
import Loader from './components/loader/Loader';
const NotFound = lazy(() => import('./components/404'));

const App: React.FC = () => {
  const desktop = useMediaQuery({
    query: '(min-width: 1024px)'
  });
  const tablet = useMediaQuery({
    query: '(min-width: 768px)'
  });

  const { secondaryContent } = useTypedSelector(({ ui }) => ui);
  return (
    <Routes>
      <Route path='/' element={<SecuredRoute />}>
        <Route
          index
          element={
            <Suspense
              fallback={
                <div className='absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2'>
                  <Loader height='h-10' />
                </div>
              }
            >
              {desktop ? (
                <div className='flex'>
                  <Home />
                  {secondaryContent ? (
                    <>
                      <Chat />
                      {secondaryContent !== 'Chat' && <Profile />}
                    </>
                  ) : (
                    <StartIntro />
                  )}
                </div>
              ) : tablet ? (
                <div className='flex'>
                  <Home />
                  {secondaryContent ? (
                    secondaryContent === 'Chat' ? (
                      <Chat />
                    ) : (
                      <Profile />
                    )
                  ) : (
                    <StartIntro />
                  )}
                </div>
              ) : (
                <>
                  {secondaryContent ? (
                    secondaryContent === 'Chat' ? (
                      <Chat />
                    ) : (
                      <Profile />
                    )
                  ) : (
                    <Home />
                  )}
                </>
              )}
            </Suspense>
          }
        />
      </Route>
      <Route path='/signin' element={<Signin />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
};

export default App;
