//jshint esversion : 6
const graphQL = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphQL;
const _ = require("lodash");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return _.find(users, { id: args.id });
      },
    },
  },
});

const users = [
  { id: "1", firstName: "Bill", age: 20 },
  { id: "2", firstName: "Sam", age: 30 },
];

module.exports = new GraphQLSchema({
  query: RootQuery,
});
