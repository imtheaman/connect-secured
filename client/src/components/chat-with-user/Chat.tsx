import ChatUserHeader from "./ChatUserHeader";
import MessagesContainer from "./MessagesContainer";
import useTypedSelector from "../../hooks/useTypedSelector";

const Chat: React.FC = () => {
  const secondaryContent = useTypedSelector(({ ui }) => ui.secondaryContent);
  return (
    <main className="w-full bg-gray-100 fullscreen">
      <div
        className={`relative mx-3  ${
          secondaryContent && secondaryContent === "Chat"
            ? "lg:mx-8"
            : "lg:mx-5"
        }`}
      >
        <ChatUserHeader
          user={{
            name: "The Aman",
            profilePic: "./girl1.jpg",
            email: "email@gmail.com",
            lastActive: new Date(),
            online: true,
            uid: "urtheaman",
          }}
        />
        <MessagesContainer />
      </div>
    </main>
  );
};

export default Chat;
