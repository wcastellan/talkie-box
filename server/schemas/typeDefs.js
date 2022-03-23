const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Media {
    title: String!
    plot: String!
    imdbID: String!
    poster: String
    link: String
    
  }
  type User {
    _id: ID
    username: String!
    email: String!
    mediaCount: Int
    savedMedias: [Media]
  }

  type Review {
    _id: ID
    imdbID: String
    reviewBody: String
    username: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input SavedMediaInput {
    title: String
    plot: String
    imdbID: String
    poster: String
    link: String
  }

  type Query {
    me: User
    review(imdbID: String):[Review]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMedia(input: SavedMediaInput): User
    removeMedia(imdbID: String!): User
    addReview(imdbID: String!, reviewBody: String!): Review
  }
`;

module.exports = typeDefs;