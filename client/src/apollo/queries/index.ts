import { gql } from "@apollo/client";

export const GET_USER = gql`
  query ($email: String!, password: String!) {
    getUser(email: $email, password: $password) {
      _id
      about
      state
      lastActive
      profilePic
      country
      activeChats
      name
      email
    }
  }
`;

export const CREATE_USER = gql`
  mutation (
    $state: String!
    $country: String!
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      state: $state
      country: $country
      name: $name
      email: $email
      password: $password
    )
  }
`;

export const GET_CHAT = gql`
  query ($chatId: String!) {
    getChat(chatId: $chatId) {
      messages
      people
    }
  }
`;
