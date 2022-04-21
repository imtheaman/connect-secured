import ChatUserHeader from "./ChatUserHeader";
import MessagesContainer from "./MessagesContainer";
import { useSession } from "next-auth/react";
import useTypedSelector from "../../hooks/useTypedSelector";

const Chat: React.FC = () => {
  const { data: session } = useSession();
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
            name: session?.user?.name! || "The Aman",
            profilePic: session?.user?.image! || "./girl1.jpg",
            email: session?.user?.email!,
            lastActive: new Date(),
            online: true,
            uid: session?.user?.email?.split("@")[0]! || "urtheaman",
          }}
        />
        <MessagesContainer />
      </div>
    </main>
  );
};

export default Chat;
