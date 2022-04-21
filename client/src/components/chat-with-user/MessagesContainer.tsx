import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import GrayBg from "./GrayBg";
import Message from "./Message";
import MessageInput from "./MessageInput";

const MessagesContainer: React.FC = () => {
  //@ts-ignore
  const chatRef: { current: HTMLDivElement } = useRef();
  useLayoutEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  });
  return (
    <div>
      <div
        className="rounded-t-3xl pb-20 p-4 lg:p-6 lg:pb-20 bg-white drop-shadow-top flex flex-col space-y-4 overflow-y-scroll"
        id="chat"
        ref={chatRef}
      >
        <GrayBg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[0.85rem] w-[0.8rem] mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          Messages are end to end encrypted.
          <Link to="/about/encryption">
            <span className="ml-1 font-semibold hover:underline">
              learn more
            </span>
          </Link>
        </GrayBg>
        <Message
          message={{
            content: "Hellow How're you",
            sentAt: "11:20",
            sender: "urtheaman",
          }}
        />
        <Message
          message={{
            content: "Hellow I'm doin good. how about you, 1?",
            sentAt: "11:20",
            sender: "khushi",
          }}
        />
        <Message
          message={{
            content: "i love u 😘❤",
            sentAt: "11:20",
            sender: "urtheaman",
          }}
        />
        <Message
          message={{
            content: "Hellow",
            sentAt: "11:20",
            sender: "khuhsi",
          }}
        />
        <Message
          message={{
            content: "I love you too. 😘",
            sentAt: "11:20",
            sender: "khuhsi",
          }}
        />
        <Message
          message={{
            content: "we'll always be together with each other.",
            sentAt: "11:20",
            sender: "khuhsi",
          }}
        />
        <Message
          message={{
            content: "sure",
            sentAt: "11:20",
            sender: "urtheaman",
          }}
        />
        <Message
          message={{
            content:
              "I miss you so much my abcd, my baby. love you ummmahh😘😘",
            sentAt: "11:20",
            sender: "urtheaman",
          }}
        />
        <Message
          message={{
            content:
              "I miss you so much my abcd, my baby. love you ummmahh😘😘",
            sentAt: "11:20",
            sender: "urtheaman",
          }}
        />
        <Message
          message={{
            content: "we'll always be together with each other.",
            sentAt: "11:20",
            sender: "khuhsi",
          }}
        />
        <Message
          message={{
            content: "sure",
            sentAt: "11:20",
            sender: "urtheaman",
          }}
        />
        <Message
          message={{
            content:
              "I miss you so much my abcd, my baby. love you ummmahh😘😘",
            sentAt: "11:20",
            sender: "urtheaman",
          }}
        />
        <Message
          message={{
            content:
              "I miss you so much my abcd, my baby. love you ummmahh😘😘",
            sentAt: "11:20",
            sender: "urtheaman",
          }}
        />
      </div>
      <MessageInput />
    </div>
  );
};

export default MessagesContainer;
