// import everything I need for the graphql routes
const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

// resovlers basically holds all of the api routes
const resolvers = {
  // queries are basically just get requests
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
  // mutations are basically routes that do something other than a get request
  Mutation: {
    // route to add a user
    addUser: async (parent, args, context) => {
      // creating a user args represent all of the typeDefs in the user model
      const addUser = await User.create(args);
      // once a user is created then giving that user a token
      const token = signToken(addUser);
      // using deconstruction returning the token and user that way it can be properly authenticated
      return { token, addUser };
    },
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
