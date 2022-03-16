import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";

import Auth from "../utils/auth";
import { removeMediaId, saveMediaIds } from "../utils/localStorage";
import { GET_ME } from "../utils/queries";
import { REMOVE_Media } from "../utils/mutations";

const SavedMedias = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || [];

  const [removeMedia, { error }] = useMutation(REMOVE_Media);

  const handleDeleteMedia = async (imdbID) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await removeMedia({
        variables: { imdbID: imdbID },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }
      removeMediaId(imdbID);
    } catch (err) {
      console.error(error);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // sync localStorage with what was returned from the userData query
  const savedMediaIds = userData.savedMedias.map((media) => media.imdbID);
  saveMediaIds(savedMediaIds);

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved movies!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedMedias.length
            ? `Viewing ${userData.savedMedias.length} saved ${
                userData.savedMedias.length === 1 ? "media" : "medias"
              }:`
            : "You have no saved movies!"}
        </h2>
        <CardColumns>
          {userData.savedMedias.map((media) => {
            return (
              <Card key={media.imdbID} border="dark">
                {media.Poster ? (
                  <Card.Img
                    src={media.Poster}
                    alt={`The cover for ${media.Title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{media.Title}</Card.Title>
                  {/* <p className="small">Authors: {book.authors}</p> */}
                  <Card.Text>{media.Plot}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteMedia(media.imdbID)}
                  >
                    Delete this Movie!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedMedias;