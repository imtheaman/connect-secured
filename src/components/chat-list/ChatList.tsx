import ChatListItem from './ChatListItem';

const ChatList: React.FC = () => {
  const activeChats: string[] = JSON.parse(
    localStorage.getItem('activeChats')!
  );
  return (
    <div
      className='rounded-t-3xl w-full -mt-4 bg-white  drop-shadow-top px-4 pt-4 overflow-y-scroll scroll-smooth pb-20'
      id='chat-list'
    >
      <h2 className='font-bold text-2xl text-light-black px-2 pt-4 mb-8'>
        Chats
      </h2>
      {activeChats?.length ? (
        activeChats.map((id) => <ChatListItem key={id} id={id} />)
      ) : (
        <p className='text-center'>No Chat available.</p>
      )}
    </div>
  );
};

export default ChatList;
