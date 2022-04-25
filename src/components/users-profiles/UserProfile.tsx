import useAppDispatch from "../../hooks/useAppDispatch";
import { secondaryContent } from "../../local-states/slices/uiSlice";
const UserProfile: React.FC<{
  profile: {
    name: string;
    profilePic: string;
    country: string;
    state: string;
  };
}> = ({ profile: { name, profilePic, country, state } }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex space-x-3 my-3">
      <div
        onClick={() => dispatch(secondaryContent("Profile"))}
        className="w-12 h-12 cursor-pointer"
      >
        <img src={profilePic} className="rounded-full" alt={name} />
      </div>
      <div
        className="flex flex-col border-b flex-grow border-gray-300 pb-3 cursor-pointer"
        onClick={() => dispatch(secondaryContent("Chat"))}
      >
        <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
        <p className="text-gray-400 text-xs">
          From {state.toLowerCase()}, {country}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
