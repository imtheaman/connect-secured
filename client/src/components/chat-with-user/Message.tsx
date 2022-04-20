interface Props {
  message: {
    content: string;
    sentAt: string;
    sender: string;
  };
}

const Message: React.FC<Props> = ({ message: { content, sentAt, sender } }) => {
  const username = "urtheaman";
  const hasRecieved = true;
  const read = true;
  return (
    <div
      className={`${
        sender === username
          ? "bg-[#daffec] rounded-br-none self-end pr-16"
          : "bg-[#ddf5fa] rounded-tl-none pr-12 self-start"
      } py-2 px-4 relative max-w-[14rem] mid-md:max-w-[16rem] mid-lg:max-w-[20rem] md:max-w-[16rem] lg:max-w-[22rem] rounded-2xl`}
    >
      <p>{content}</p>
      <div className="absolute bottom-[0.4rem] right-3 text-[0.65rem]">
        <div className="flex">
          {sender === username && hasRecieved ? (
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 122.88 74.46"
              className="w-4 h-4"
              fill={`${read ? "green" : "gray"}`}
            >
              <defs></defs>
              <path d="M1.87,47.2a6.33,6.33,0,1,1,8.92-9c8.88,8.85,17.53,17.66,26.53,26.45l-3.76,4.45-.35.37a6.33,6.33,0,0,1-8.95,0L1.87,47.2ZM30,43.55a6.33,6.33,0,1,1,8.82-9.07l25,24.38L111.64,2.29c5.37-6.35,15,1.84,9.66,8.18L69.07,72.22l-.3.33a6.33,6.33,0,0,1-8.95.12L30,43.55Zm28.76-4.21-.31.33-9.07-8.85L71.67,4.42c5.37-6.35,15,1.83,9.67,8.18L58.74,39.34Z" />
            </svg>
          ) : sender === username && !hasRecieved ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              focusable="false"
              viewBox="0 0 12 12"
              className="mt-1"
            >
              <path
                fill="none"
                stroke="gray"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 7l3 3 7-7"
              />
            </svg>
          ) : null}
          {sentAt}
        </div>
      </div>
    </div>
  );
};

export default Message;
