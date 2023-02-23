import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!) {
    addUser(username: $username) {
      username
      email
      password
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $username: String, $email: String, $password: String) {
    updateUser(id: $id, username: $username, email: $email, password: $password) {
      id
      username
      email
      password
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($id: ID!) {
    removeUser(id: $id) {
      id
      username
      email
      password
    }
  }
`;
