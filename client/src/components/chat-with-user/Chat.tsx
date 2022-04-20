import ChatUserHeader from "./ChatUserHeader";
import MessagesContainer from "./MessagesContainer";
import { useSession } from "next-auth/react";

const Chat: React.FC = () => {
  const { data: session } = useSession();
  return (
    <main className="relative w-full bg-gray-100 fullscreen">
      <ChatUserHeader
        user={{
          name: session?.user?.name!,
          profilePic: session?.user?.image!,
          email: session?.user?.email!,
          lastActive: new Date(),
          online: true,
          uid: session?.user?.email?.split("@")[0]!,
        }}
      />
      <MessagesContainer />
    </main>
  );
};

export default Chat;
