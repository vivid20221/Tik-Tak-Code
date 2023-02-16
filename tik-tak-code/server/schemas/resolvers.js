const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find();
      } catch (err) {
        throw new Error(err);
      }
    },
    user: async (_, { username }) => {
      try {
        return await User.findOne({ username });
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET);
        return { user, token };
      } catch (err) {
        throw new Error(err);
      }
    },
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('User not found');
        }
        const match = await user.matchPassword(password);
        if (!match) {
          throw new AuthenticationError('Incorrect password');
        }
        const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET);
        return { user, token };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = resolvers;
