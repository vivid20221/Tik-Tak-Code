const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    totalWins: Int
    totalLosses: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    removeUser(userId: ID!): User
    updatesUser(userId: ID!, username: String!): User;
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
