import React from "react";
import { SessionProvider } from "next-auth/react";
import { useMediaQuery } from "react-responsive";
import Home from "./components/Home";
import "./app.css";
import Profile from "./components/profile";
import Chat from "./components/chat-with-user/Chat";
import { Route, Routes } from "react-router-dom";
import Signin from "./components/signin";

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
  console.log();
  return (
    <SessionProvider session={session}>
      <Routes>
        <Route
          path="/*"
          element={
            desktop ? (
              <div className="flex">
                <Home />
                <Chat />
                <Profile />
              </div>
            ) : tablet ? (
              <div className="flex">
                <Home />
                <Chat />
              </div>
            ) : (
              <Routes>
                <Route path="/*" element={<Home />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            )
          }
        />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </SessionProvider>
  );
};

export default App;
