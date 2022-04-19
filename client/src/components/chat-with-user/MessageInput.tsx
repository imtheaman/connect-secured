const MessageInput = () => {
  return (
    <div className="fixed p-4 lg:p-6 bg-white flex justify-between items-center bottom-0 left-0 w-full h-16">
      <div className="flex items-center justify-between flex-grow bg-gray-100 rounded-full px-2">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 -rotate-[45deg] ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </button>
        <input
          type="text"
          className="bg-transparent whitespace-pre-line outline-none flex-grow p-2"
          placeholder="Type a message"
        />
      </div>
      <div className="bg-gray-100 p-[0.6rem] ml-2 rounded-full">
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
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </div>
    </div>
  );
};

export default MessageInput;
