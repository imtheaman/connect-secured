import ProfileContent from "./profile/ProfileContent";
import ProfileHeader from "./profile/ProfileHeader";
import useTypedSelector from "../hooks/useTypedSelector";
import ProfileEdit from "./profile/ProfileEdit";

const Profile: React.FC = () => {
  const user = {
    name: "The Aman",
    email: "urtheaman@gmail.com",
    uid: "urtheaman",
    online: true,
    lastActive: new Date(),
    profilePic: "/girl1.jpg",
  };
  const secondaryContent = useTypedSelector(({ ui }) => ui.secondaryContent);
  return (
    <main className="px-4 bg-gray-100 pt-6 lg:border-l overflow-hidden lg:border-gray-300 w-full fullscreen lg:max-w-[22rem]">
      <ProfileHeader />
      {secondaryContent && secondaryContent === "ProfileEdit" ? (
        <ProfileEdit />
      ) : (
        <ProfileContent user={user} />
      )}
    </main>
  );
};

export default Profile;
