const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Media {
    title: String!
    plot: String!
    imdbID: String!
    poster: String
    link: String
    discussion: [Discussion] 
  }

  type Review {
    _id: ID
    reviewBody: String
    createdAt: String
    username: String
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
    plot: String
    imdbID: String
    poster: String
    link: String
  }

  input SavedDiscussionInput {
    username: String
    imdbID: String
    discussionBody: String
  }

  type Query {
    me: User
    reviews(username: String): [Review]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMedia(input: SavedMediaInput): User
    removeMedia(imdbID: String!): User
    addReview(reviewText: String!): Review
  }
`;

module.exports = typeDefs;