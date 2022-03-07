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
    // route to login
    // deconstructing the args to specifically get the email and password from the user model
    login: async (parent, { email, password }) => {
      // first get the user's email
      const loginUser = await User.findOne({ email });
      // if user doesn't exist throw err
      if (!loginUser) {
        throw new AuthenticationError(
          "No users found or user does not exist: wrong credentials(?)"
        );
      }
      // if the user is found then check the password
      const checkPass = await loginUser.isCorrectPassword(password);
      // if password is wrong then throw an error
      if (!checkPass) {
        throw new AuthenticationError(
          "password does not match, please try again"
        );
      }
      // if all is good then create a token for the user that way they can log in
      const token = signToken(loginUser);
      return { token, loginUser };
    },
    // route to save the books to a favorite list
    saveBook: async (parent, args, context) => {
      // check if the user is logged in
      if (context.user) {
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: args } },
          { new: true, runValidators: true }
        );
        return updateUser;
      }
      throw new AuthenticationError(
        "not logged in, please log in to use this feature"
      );
    },
    removeBook: async (parent, args, context) => {
      if (context.user) {
        const updateUser = await User.findOneAndDelete({});
      }
    },
  },
};

// export resolvers
module.exports = resolvers;
