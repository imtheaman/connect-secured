import { NextPage } from "next";
import ChatUserHeader from "./ChatUserHeader";
import MessagesContainer from "./MessagesContainer";
import { useSession } from "next-auth/react";

const Chat: NextPage = () => {
  const { data: session } = useSession();
  return (
    <main className="relative w-full bg-gray-100 fullscreen">
      <ChatUserHeader
        user={{
          name: session?.user?.name!,
          pic: session?.user?.image!,
          email: session?.user?.email!,
          lastActive: new Date(),
          online: true,
        }}
      />
      <MessagesContainer />
    </main>
  );
};

export default Chat;
