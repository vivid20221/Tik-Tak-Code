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

export const UPDATE_USER = gql`
  mutation addUser($userId: ID!) {
    updateUser($userId: ID!) {
      _id
      username
      email
      password
    }
  }
`;
