import { NextPage } from "next";
import Link from "next/link";
import Message from "./Message";
import MessageInput from "./MessageInput";

const MessagesContainer: NextPage = () => {
  return (
    <div
      className="rounded-t-3xl md:mx-3 lg:mx-5 p-4 lg:p-6 bg-white drop-shadow-top flex flex-col space-y-4 overflow-y-scroll"
      id="chat"
    >
      <h2 className="text-xs text-center text-gray-500 my-3">
        Messages are end to end encrypted.{" "}
        <Link href="/about/encryption" passHref>
          <span className="font-semibold hover:underline">learn more</span>
        </Link>
      </h2>
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
          content: "I miss you so much my abcd, my baby. love you ummmahh😘😘",
          sentAt: "11:20",
          sender: "urtheaman",
        }}
      />
      <Message
        message={{
          content: "I miss you so much my abcd, my baby. love you ummmahh😘😘",
          sentAt: "11:20",
          sender: "urtheaman",
        }}
      />
      <MessageInput />
    </div>
  );
};

export default MessagesContainer;
