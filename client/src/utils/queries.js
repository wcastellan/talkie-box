import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      savedMedias {
        Title
        Plot
        imdbID
        Poster
        link
      }
    }
  }
`;