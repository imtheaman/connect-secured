import ChatListItem from "./ChatListItem";

const ChatList: React.FC = () => {
  return (
    <div
      className="rounded-t-3xl w-full -mt-4 bg-white  drop-shadow-top px-4 pt-4 overflow-y-scroll scroll-smooth pb-20"
      id="chat-list"
    >
      <h2 className="font-bold text-2xl text-light-black px-2 pt-4 mb-8">
        Chats
      </h2>
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
    </div>
  );
};

export default ChatList;
