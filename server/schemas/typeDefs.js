const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Media {
    Title: String!
    Plot: String!
    imdbID: String!
    Poster: String
    link: String
    
  }
  type User {
    _id: ID
    username: String!
    email: String!
    mediaCount: Int
    savedMedias: [Media]
  }

  type Auth {
    token: ID!
    user: User
  }

  input SavedMediaInput {
    title: String
    Plot: String
    imdbID: String
    Poster: String
    link: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMedia(input: SavedMediaInput): User
    removeMedia(imdbID: String!): User
  }
`;

module.exports = typeDefs;