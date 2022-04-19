import type { NextPage } from "next";
import Head from "next/head";
import Chat from "../components/chat-with-user/Chat";
import Profile from "./profile";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/header/Header";
import ChatList from "../components/chat-list/ChatList";
import CreateNewChatButton from "../components/footer/CreateNewChatButton";
import UserSettings from "../components/user-settings/UserSettings";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { email: session?.user?.email },
  });
  useEffect(() => {
    if (status === "unauthenticated") router.push("/signin");
  });
  if (status === "authenticated") {
    return (
      <div>
        <Head>
          <title>Connect: An open source chat app for private people</title>
        </Head>

        <div className="flex">
          <main className="relative w-full md:max-w-[22rem]">
            {!true ? (
              <>
                <Header />
                <ChatList />
                <CreateNewChatButton />
              </>
            ) : (
              <UserSettings />
            )}
          </main>
          {!false ? (
            <>
              <Chat />
              <Profile />
            </>
          ) : !false ? (
            <Chat />
          ) : (
            <div className="bg-gray-100 w-full text-xl hidden md:flex text-gray-500 items-center justify-center">
              Click on a chat to start messaging
            </div>
          )}
        </div>
      </div>
    );
  } else return <div></div>;
};

export default Home;
