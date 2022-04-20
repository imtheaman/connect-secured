import ProfileContent from "./profile/ProfileContent";
import ProfileHeader from "./profile/ProfileHeader";
import { useSession } from "next-auth/react";

const Profile: React.FC = () => {
  const { data: session } = useSession();
  return (
    <main className="px-4 bg-gray-100 pt-6 lg:border-l overflow-hidden lg:border-gray-300 w-full fullscreen lg:max-w-[22rem]">
      <ProfileHeader />
      <ProfileContent
        user={{
          name: session?.user?.name || "",
          email: session?.user?.email || "",
          uid: "urtheaman",
          online: true,
          lastActive: new Date(),
          profilePic: session?.user?.image || "/girl1.jpg",
        }}
      />
    </main>
  );
};

export default Profile;
