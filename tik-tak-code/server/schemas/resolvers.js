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
    // Takes in the three arguments so that we can create a user for the login
    addUser: async (_, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });//user
        const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET);//console.log(token
        return { user, token };
      } catch (err) {
        throw new Error(err);
      }
    },

    //takes in email and password so that users can save their scores
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

    //Allows the developer to delete user data
    removeUser: async (_, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },

    updateUser: async (_, { id, username }) => {
    // Find and update the matching user using the destructured args
    return await User.findOneAndUpdate(
      { _id: id }, 
      { username },
      // Return the newly updated object instead of the original
      { new: true }
    );
  }
}
};

module.exports = resolvers;
