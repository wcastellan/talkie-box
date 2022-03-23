import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      savedMedias {
        title
        plot
        imdbID
        poster
        link
      }
    }
  }
`;

export const QUERY_REVIEWS = gql`
  query review($imdbID: String) {
    review(imdbID: $imdbID) {
      username
      reviewBody
      imdbID
      createdAt
    }
  }
`;