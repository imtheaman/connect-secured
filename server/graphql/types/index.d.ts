export interface Chat {
  _id: string;
  messages: Message[];
  people: [string];
}
export interface Message {
  content: string;
  sender: string;
  sentAt: string;
}
export interface User {
  _id: string;
  about: string;
  activeChats: [string];
  email: string;
  lastActive: string;
  name: string;
  online: boolean;
  profilePic: string;
}
