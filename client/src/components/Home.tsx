import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Header from "./header/Header";
import ChatList from "./chat-list/ChatList";
import CreateNewChatButton from "./footer/CreateNewChatButton";
import UserSettings from "./user-settings/UserSettings";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../apollo/queries";
import { useNavigate } from "react-router-dom";
import useTypedSelector from "../hooks/useTypedSelector";
import ThemesSettings from "./user-settings/ThemesSettings";
import ChatSettings from "./user-settings/ChatSettings";
import PrivacySettings from "./user-settings/PrivacySettings";

const Home: React.FC = () => {
  const { data: session, status } = useSession();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { email: session?.user?.email },
  });
  const home = useTypedSelector(({ ui }) => ui.homeContent);
  // useEffect(() => {
  //   if (status === "unauthenticated") navigate("/signin", { replace: true });
  // });
  return (
    <main className="relative w-full md:max-w-[22rem]">
      {home === "PrivacySettings" ? (
        <PrivacySettings />
      ) : home === "UserSettings" ? (
        <UserSettings />
      ) : home === "ThemesSettings" ? (
        <ThemesSettings />
      ) : home === "ChatSettings" ? (
        <ChatSettings />
      ) : home === "Home" ? (
        <>
          <Header />
          <ChatList />
          <CreateNewChatButton />
        </>
      ) : null}
    </main>
  );
};

export default Home;
