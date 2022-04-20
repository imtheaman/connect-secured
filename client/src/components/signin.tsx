import { useEffect, useState } from "react";
import ConnectCard from "./connect-card/ConnectCard";
import { useSession, signIn } from "next-auth/react";
import { useNavigate } from "react-router-dom";

const Signin: React.FC = () => {
  const [authAction, setAuthAction] = useState<
    "Sign in" | "Sign up" | "Send OTP" | "Reset"
  >("Sign in");
  const navigate = useNavigate();
  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") navigate("/", { replace: true });
  }, [status, navigate]);
  return (
    <ConnectCard className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col space-y-6 border-b pb-8 md:pb-0 md:border-b-0 md:border-r border-gray-300 md:pr-16">
        <div className="flex items-center justify-between mb-3">
          <button
            className={
              authAction === "Sign up"
                ? "text-lg font-thin"
                : "text-2xl font-semibold"
            }
            onClick={() => setAuthAction("Sign in")}
          >
            Email signin
          </button>
          <div className="border-r w-1 h-8 border-gray-300"></div>
          <button
            className={
              authAction === "Sign up"
                ? "text-2xl font-semibold"
                : "text-lg font-thin"
            }
            onClick={() => setAuthAction("Sign up")}
          >
            Create account
          </button>
        </div>
        <input
          type="email"
          className="bg-transparent border border-gray-300 px-4 py-[0.6rem] rounded-full outline-none"
          placeholder="Email"
        />
        {(authAction === "Sign in" || authAction === "Sign up") && (
          <input
            type="password"
            className="bg-transparent border border-gray-300 px-4 py-[0.6rem] rounded-full outline-none"
            placeholder="Password"
          />
        )}
        {authAction === "Sign up" && (
          <input
            type="password"
            className="bg-transparent border border-gray-300 px-4 py-[0.6rem] rounded-full outline-none"
            placeholder="Confirm Password"
          />
        )}

        <button type="submit" className="auth-btn">
          {authAction}
        </button>
        <div className="flex justify-between font-thin text-sm">
          <button
            className="hover:underline"
            onClick={() => setAuthAction("Send OTP")}
          >
            Sign in with OTP
          </button>
          <button
            className="hover:underline"
            onClick={() => setAuthAction("Reset")}
          >
            Reset password
          </button>
        </div>
      </div>

      {/* Social signin */}
      <div className="pt-8 md:pl-16 md:pt-0 space-y-6 flex flex-col">
        <h1 className="text-2xl font-semibold mb-3">Social signin</h1>

        <button className="auth-btn">
          <svg
            version="1.1"
            id="Livello_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            fill="rgb(255, 255, 255)"
            width="28px"
            height="22.79px"
            viewBox="0 0 814 1000"
            enableBackground="new 0 0 814 1000"
            xmlSpace="preserve"
          >
            <path
              d="M788.1,340.9c-5.8,4.5-108.2,62.2-108.2,190.5c0,148.4,130.3,200.9,134.2,202.2c-0.6,3.2-20.7,71.9-68.7,141.9
	c-42.8,61.6-87.5,123.1-155.5,123.1s-85.5-39.5-164-39.5c-76.5,0-103.7,40.8-165.9,40.8s-105.6-57-155.5-127
	C46.7,790.7,0,663,0,541.8c0-194.4,126.4-297.5,250.8-297.5c66.1,0,121.2,43.4,162.7,43.4c39.5,0,101.1-46,176.3-46
	C618.3,241.7,720.7,244.3,788.1,340.9z M554.1,159.4c31.1-36.9,53.1-88.1,53.1-139.3c0-7.1-0.6-14.3-1.9-20.1
	c-50.6,1.9-110.8,33.7-147.1,75.8c-28.5,32.4-55.1,83.6-55.1,135.5c0,7.8,1.3,15.6,1.9,18.1c3.2,0.6,8.4,1.3,13.6,1.3
	C464,230.7,521.1,200.3,554.1,159.4z"
            />
          </svg>
          <p className="ml-2">Apple Sign in</p>
        </button>
        <button className="auth-btn" onClick={() => signIn("github")}>
          <img
            src="/github.png"
            alt="sign in with github"
            width={20}
            height={20}
          />
          <p className="ml-2">Github Sign in</p>
        </button>
        <button className="auth-btn" onClick={() => signIn("linkedin")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#fff"
          >
            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
          </svg>
          <p className="ml-2">LinkedIn Sign in</p>
        </button>
      </div>
    </ConnectCard>
  );
};
export default Signin;
