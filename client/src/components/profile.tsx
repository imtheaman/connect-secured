import { NextPage } from "next";
import ProfileContent from "../components/profile/ProfileContent";
import ProfileHeader from "../components/profile/ProfileHeader";
import { useSession } from "next-auth/react";

const Profile: NextPage = () => {
  const { data: session } = useSession();
  return (
    <main className="px-4 bg-gray-100 pt-6 lg:border-l overflow-hidden lg:border-gray-300 w-full fullscreen lg:max-w-[22rem]">
      <ProfileHeader />
      <ProfileContent
        user={{
          name: session?.user?.name || "",
          email: session?.user?.email || "",
          connectId: "urtheaman",
          online: true,
          pic: session?.user?.image || "/girl1.jpg",
        }}
      />
    </main>
  );
};

export default Profile;
