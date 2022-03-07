// import everything I need for the graphql routes
const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

// resovlers basically holds all of the api routes
const resolvers = {
  // route to get the user
  Query: {
    me: async (parent, args, context) => {
      // using context to get the user information
      // basically if user exists then grab the user by its id while adding their saved books
      if (context.user) {
        // populate has to be in lowercase and is not case insensitive
        const userData = await User.findOne({ _id: context.user._id }).populate(
          "savedbooks"
        );
        return userData;
      }
      //if not then throw an error
      throw new AuthenticationError(
        "You are not logged in, can't find anything!"
      );
    },
  },
  Mutation: {
    addUser: async (parent, args, context) => {},
    login: async (parent, { email, password }) => {},
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const updateUser = await User;
      }
    },
  },
};

// export resolvers
module.exports = resolvers;
