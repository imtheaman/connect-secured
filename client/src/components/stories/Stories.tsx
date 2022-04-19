import Image from "next/image";

const Stories = () => {
  const fullName = "Alyssia Octavia";
  const imageSrc = "/girl1.jpg";
  return (
    <div className="flex items-center space-x-3 px-6  overflow-x-scroll no-scrollbar mt-8">
      {/* User's Own */}
      <div className="flex flex-col justify-center items-center">
        <div className="relative min-w-[3.2rem] min-h-[3.2rem] rounded-full">
          <Image
            layout="fill"
            src={imageSrc}
            priority
            className="rounded-full"
            alt={fullName}
          />
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
        </div>
        <p className="text-sm">Me</p>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="bg-gradient-to-br from-cyan-400 to-green-500 flex justify-center items-center p-[0.1rem] rounded-full">
          <div className="relative min-w-[3.2rem] min-h-[3.2rem] border-2 border-white rounded-full">
            <Image
              layout="fill"
              src={imageSrc}
              priority
              className="rounded-full"
              alt={fullName}
            />
          </div>
        </div>
        <p className="text-sm">Estelle</p>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="bg-gradient-to-br from-cyan-400 to-green-500 flex justify-center items-center p-[0.1rem] rounded-full">
          <div className="relative min-w-[3.2rem] min-h-[3.2rem] border-2 border-white rounded-full">
            <Image
              layout="fill"
              src={imageSrc}
              priority
              className="rounded-full"
              alt={fullName}
            />
          </div>
        </div>
        <p className="text-sm">Colton</p>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="relative min-w-[3.2rem] min-h-[3.2rem] rounded-full">
          <Image
            layout="fill"
            src={imageSrc}
            priority
            className="rounded-full"
            alt={fullName}
          />
        </div>
        <p className="text-sm">Cameron</p>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="relative min-w-[3.2rem] min-h-[3.2rem] rounded-full">
          <Image
            layout="fill"
            src={imageSrc}
            priority
            className="rounded-full"
            alt={fullName}
          />
        </div>
        <p className="text-sm">Darell</p>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="relative min-w-[3.2rem] min-h-[3.2rem] rounded-full">
          <Image
            layout="fill"
            src={imageSrc}
            priority
            className="rounded-full"
            alt={fullName}
          />
        </div>
        <p className="text-sm">Layla</p>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="relative min-w-[3.2rem] min-h-[3.2rem] rounded-full">
          <Image
            layout="fill"
            src={imageSrc}
            priority
            className="rounded-full"
            alt={fullName}
          />
        </div>
        <p className="text-sm">Dianne</p>
      </div>
    </div>
  );
};

export default Stories;
