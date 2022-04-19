import { gql } from "@apollo/client";

export const GET_USER = gql`
  query ($email: String!) {
    getUser(email: $email) {
      _id
      name
      email
      profilePic
      about
      lastActive
      online
      activeChats
    }
  }
`;

export const GET_CHAT = gql`
  query ($chatId: String!) {
    getChat(chatId: $chatId) {
      messages
      people
    }
  }
`
