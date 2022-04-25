import useAppDispatch from "../../hooks/useAppDispatch";
import { setHomeContent, setSearch } from "../../local-states/slices/uiSlice";
import StoriesContainer from "../stories/StoriesContainer";

const Header: React.FC = () => {
  const currentHours = new Date().getHours();
  const greeting =
    currentHours < 12
      ? "Morning"
      : currentHours >= 12 && currentHours <= 15
      ? "Afternoon"
      : currentHours >= 16 && currentHours < 19
      ? "Evening"
      : "Night";
  const fullName = "Khushi Singh";
  const imageSrc = "/girl1.jpg";
  const dispatch = useAppDispatch();
  return (
    <div className="bg-gradient-br md:drop-shadow-top w-full h-60">
      {/* Greeting */}
      <div className="flex justify-between p-6">
        <div>
          <p className="text-sm text-gray-500">Good {greeting}</p>
          <h1 className="font-semibold text-light-black -mt-1 text-xl">
            {fullName}
          </h1>
        </div>

        <div className="flex space-x-4 items-center">
          <button
            className="bg-white cursor-pointer p-2  rounded-full"
            onClick={() => dispatch(setSearch(true))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button
            className="relative w-9 h-9 rounded-full"
            onClick={() => dispatch(setHomeContent("UserSettings"))}
          >
            <img src={imageSrc} className="rounded-full" alt={fullName} />
          </button>
        </div>
      </div>

      {/* Stories */}
      <StoriesContainer />
    </div>
  );
};

export default Header;
