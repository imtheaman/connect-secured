import { UserProps } from "../chat-with-user/ChatUserHeader";

const ProfileContent: React.FC<UserProps> = ({
  user: { profilePic, name, lastActive, email, uid, online },
}) => {
  return (
    <div
      className="relative flex flex-col bg-white rounded-t-3xl pt-16 mt-8"
      id="profile"
    >
      <div className="absolute -top-16 left-1/2 -translate-x-1/2">
        <img
          src={profilePic}
          alt={name}
          width="120px"
          height="120px"
          className="rounded-full"
        />
      </div>
      <div className="text-center">
        <h1 className="font-semibold text-lg">{name}</h1>
        <p
          className={`text-xs inline-block px-2 rounded-md py-[0.1rem] bg-gray-100 font-medium ${
            online ? "text-green-500" : "text-gray-400"
          }`}
        >
          {online ? "Online" : "last active 2 min. ago"}
        </p>
      </div>
      <div className="p-6 pt-0 mt-6 space-y-4 overflow-y-scroll" id="about">
        <div className="space-y-2">
          <h2 className="text-lg font-bold">About</h2>
          <p>
            Infuriatingly humble travel expert. Social media fanatic.
            Explorer.✈👋
          </p>
        </div>

        <div className="flex items-center">
          <div className="bg-gray-100 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </div>
          <div className="ml-2">
            <p className="text-xs">Email</p>
            <p className="font-semibold -mt-1">{email}</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-gray-100 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="ml-2">
            <p className="text-xs">Connect Id</p>
            <p className="font-semibold -mt-1">@{uid}</p>
          </div>
        </div>
        {/* Settings */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Settings</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-grow">
              <div className="bg-gray-100 p-2 rounded-full mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <p>Notification</p>
            </div>
            {/* <Switch
              checked={true}
              onChange={() => console.log("clicked")}
              onColor="#202020"
              offColor="#e2e2e2"
              width={38}
              handleDiameter={15}
              height={20}
              uncheckedIcon={false}
              checkedIcon={false}
              aria-label="Switch Notification on or off"
            /> */}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center flex-grow">
              <div className="bg-gray-100 p-2 rounded-full mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <p>Starred Messages</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Media */}
        <div className="space-y-4 ">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent media</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/3 rounded-lg bg-gray-300 aspect-square"></div>
            <div className="w-1/3 rounded-lg bg-gray-300 aspect-square"></div>
            <div className="w-1/3 rounded-lg bg-gray-300 aspect-square"></div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/3 rounded-lg bg-gray-300 aspect-square"></div>
            <div className="w-1/3 rounded-lg bg-gray-300 aspect-square"></div>
            <div className="w-1/3 rounded-lg bg-gray-300 aspect-square"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
