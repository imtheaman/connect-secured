import ChatUserHeader from './ChatUserHeader';
import MessagesContainer from './MessagesContainer';
import useAppSelector from '../../hooks/useAppSelector';

const Chat: React.FC = () => {
  const [secondaryContent] = useAppSelector(({ ui }) => [ui.secondaryContent]);

  return (
    <main className='w-full bg-gray-100 fullscreen'>
      <div
        className={`relative mx-3  ${
          secondaryContent === 'Chat' ? 'lg:mx-8' : 'lg:mx-5'
        }`}
      >
        <ChatUserHeader />
        <MessagesContainer />
      </div>
    </main>
  );
};

export default Chat;
