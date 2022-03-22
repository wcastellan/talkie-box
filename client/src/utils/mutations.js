import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
      user {
        username
        _id
        email
      }
    }
  }
`;

export const SAVE_MEDIA = gql`
  mutation saveMedia($input: SavedMediaInput) {
    saveMedia(input: $input) {
      username
      _id
      mediaCount
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

export const REMOVE_Media = gql`
  mutation removeMedia($imdbID: String!) {
    removeMedia(imdbID: $imdbID) {
      _id
      username
      mediaCount
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