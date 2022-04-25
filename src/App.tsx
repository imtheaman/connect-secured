import { SessionProvider } from "next-auth/react";
import { useMediaQuery } from "react-responsive";
import Home from "./components/Home";
import "./app.css";
import Chat from "./components/chat-with-user/Chat";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/profile";
import Signin from "./components/signin";
import useTypedSelector from "./hooks/useTypedSelector";
import StartIntro from "./components/start-intro/StartIntro";

interface AppProps {
  session?: {
    expires: string;
    user: {
      name: string;
      email: string;
      image: string;
    };
  };
}

const App: React.FC<AppProps> = ({ session }) => {
  const desktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const tablet = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const { secondaryContent } = useTypedSelector(({ ui }) => ui);
  return (
    <Routes>
      <Route
        path="/*"
        element={
          desktop ? (
            <div className="flex">
              <Home />
              {secondaryContent ? (
                <>
                  <Chat />
                  {secondaryContent !== "Chat" && <Profile />}
                </>
              ) : (
                <StartIntro />
              )}
            </div>
          ) : tablet ? (
            <div className="flex">
              <Home />
              {secondaryContent ? (
                secondaryContent === "Chat" ? (
                  <Chat />
                ) : (
                  <Profile />
                )
              ) : (
                <StartIntro />
              )}
            </div>
          ) : (
            <>
              {secondaryContent ? (
                secondaryContent === "Chat" ? (
                  <Chat />
                ) : (
                  <Profile />
                )
              ) : (
                <Home />
              )}
            </>
          )
        }
      />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
};

export default App;
