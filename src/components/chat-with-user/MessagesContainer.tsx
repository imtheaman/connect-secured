import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { GET_MESSAGES, NEW_MESSAGE } from '../../apollo/queries';
import { Message as MsgType } from '../../apollo/types';
import useAppSelector from '../../hooks/useAppSelector';
import { pushMessage } from '../../local-states/slices/messagesSlice';
import { readJwt } from '../../read-token';
import GrayBg from './GrayBg';
import Message from './Message';
import MessageInput from './MessageInput';

const MessagesContainer: React.FC = () => {
  const dispatch = useDispatch();
  const chatRef = useRef<HTMLDivElement>(null);
  //
  // ─── TODO ───────────────────────────────────────────────────────────────────────
  //
  // ─── PAGIANATION ────────────────────────────────────────────────────────────────
  //
  const [from, setFrom] = useState(0);
  const [{ token }] = useCookies(['token']);
  const [chatId, reduxMessages] = useAppSelector(({ chat, messages }) => [
    chat.chat!.chatId,
    chat.chat!.chatId && messages[chat.chat!.chatId]
  ]);
  const [newMessage, {data, error}] = useMutation(NEW_MESSAGE);
  //
  // ─── TODO ───────────────────────────────────────────────────────────────────────
  //
  // ─── ADDING MESSAGES TO THE CACHED LIST ─────────────────────────────────────────
  //
  useEffect(() => {

  })
  const { data: messages } = useQuery(GET_MESSAGES, {
    variables: { chatId: chatId, from: from }
  });

  useLayoutEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, []);

  const HandleMessageInput = (msg: string) => {
    const senderId = readJwt(token);
    newMessage({
      variables: {
        senderId,
        chatId,
        message: {
          content: msg,
          sender: senderId,
          sentAt: new Date().getTime()
        }
      }
    }).then((res) => dispatch(pushMessage(res.data)));
  };
  return (
    <div>
      <div
        className='relative rounded-t-3xl pb-20 p-4 lg:p-6 lg:pb-20 bg-lightwhite drop-shadow-top flex flex-col space-y-4 overflow-y-scroll'
        id='chat'
        ref={chatRef}
      >
        <GrayBg>
          <div className='flex'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-[0.85rem] w-[0.8rem] mr-1'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                clipRule='evenodd'
              />
            </svg>
            Messages are end to end encrypted.
          </div>
          <Link to='/about/encryption'>
            <span className='ml-1 font-semibold hover:underline'>
              learn more
            </span>
          </Link>
        </GrayBg>
        {!chatId && (
          <h3 className='text-center text-xl absolute text-gray-400 top-1/2 -translate-y-[120%] left-1/2 -translate-x-1/2'>
            Send a message to start chat
          </h3>
        )}
        {/* received messages */}
        {messages && messages.map((msg: MsgType) => <Message {...msg} />)}
        {/* sent messages */}
        {reduxMessages && reduxMessages?.map((msg) => <Message {...msg} />)}
      </div>
      <MessageInput handleMessageInput={HandleMessageInput} />
    </div>
  );
};

export default MessagesContainer;
