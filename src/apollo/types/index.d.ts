export interface Chat {
  _id: string;
  messages: string;
  lastMessage: Message;
  people: People[];
}
export interface People {
  uid: string;
  lastOpened: number;
}
export interface Message {
  content: string;
  sender: string;
  sentAt: number;
}
export interface User {
  _id: string;
  about: string;
  activeChats: [string];
  email: string;
  lastActive: number;
  publicKey: string;
  name: string;
  state: string;
  country: string;
  profilePic: string;
}
