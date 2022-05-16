const MessageInput = () => {
  const submitHandler = (e: any) => {
    e.preventDefault();
    
  }
  return (
    <div className="absolute p-4 lg:p-6 bg-gradient-to-t from-[rgba(255,255,255,0.9)] to-[rgba(255,255,255,0.1)] flex justify-between items-center bottom-0 left-0 w-full h-20">
      <div className="flex items-center drop-shadow-md justify-between flex-grow bg-gray-200 rounded-full px-2">
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
        <form className="flex-grow flex">
          <input
            type="text"
            className="bg-transparent whitespace-pre-line outline-none w-full p-2"
            placeholder="Type a message"
          />
          <button type="submit" className="rotate-90 text-gray-700" onClick={submitHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </div>
      <div className="bg-gray-200 p-[0.6rem] drop-shadow-md ml-2 rounded-full">
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
