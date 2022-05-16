import Header from './header/Header';
import ChatList from './chat-list/ChatList';
import CreateNewChatButton from './footer/CreateNewChatButton';
import UserSettings from './user-settings/UserSettings';
import useTypedSelector from '../hooks/useAppSelector';
import ThemesSettings from './user-settings/ThemesSettings';
import ChatSettings from './user-settings/ChatSettings';
import PrivacySettings from './user-settings/PrivacySettings';
import NewChat from './new-chat/NewChat';
import Search from './header/Search';
import { useState } from 'react';

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
      ) : home === 'Home' ? (
        <>
          <Header setSearch={setSearch} />
          <ChatList />
          <CreateNewChatButton />
        </>
      ) : null}
    </main>
  );
};

export default Home;
