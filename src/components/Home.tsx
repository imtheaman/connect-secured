import { lazy, useState } from 'react';
import Header from './header/Header';
import ChatList from './chat-list/ChatList';
import CreateNewChatButton from './footer/CreateNewChatButton';
const UserSettings = lazy(() => import('./user-settings/UserSettings'));
import useTypedSelector from '../hooks/useAppSelector';
const ThemesSettings = lazy(() => import('./user-settings/ThemesSettings'));
const ChatSettings = lazy(() => import('./user-settings/ChatSettings'));
const PrivacySettings = lazy(() => import('./user-settings/PrivacySettings'));
const NewChat = lazy(() => import('./new-chat/NewChat'));
const Search = lazy(() => import('./header/Search'));

const Home: React.FC = () => {
  const home = useTypedSelector(({ ui }) => ui.homeContent);
  const [search, setSearch] = useState(false);
  return (
    <main className='relative w-full fullscreen md:max-w-[22rem]'>
      {search && <Search setSearch={setSearch} />}
      {home === 'PrivacySettings' ? (
        <PrivacySettings />
      ) : home === 'UserSettings' ? (
        <UserSettings />
      ) : home === 'ThemesSettings' ? (
        <ThemesSettings />
      ) : home === 'ChatSettings' ? (
        <ChatSettings />
      ) : home === 'NewChat' ? (
        <NewChat />
      ) : (
        <>
          <Header setSearch={setSearch} />
          <ChatList />
          <CreateNewChatButton />
        </>
      )}
    </main>
  );
};

export default Home;
