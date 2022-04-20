const Story: React.FC<{ me?: boolean; name: string; profilePic: string }> = ({
  me,
  name,
  profilePic,
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative min-w-[3.2rem] min-h-[3.2rem] rounded-full">
        <img
          src={profilePic}
          className="rounded-full absolute"
          alt={name}
        />
        {me && (
          <div className="z-10 absolute bottom-0 text-white bg-black rounded-full -right-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      <p className="text-sm">{me ? "Me" : name}</p>
    </div>
  );
};

export default Story;
