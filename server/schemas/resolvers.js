const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {},
  },
  Mutation: {
    addUser: async (parent, args, context) => {},
    login: async (parent, { email, password }) => {},
    saveBook: async (parent, args, context)=>{
        if (context.user){
            const updateUser= await
        }
    }
  },
};

module.exports = resolvers;
