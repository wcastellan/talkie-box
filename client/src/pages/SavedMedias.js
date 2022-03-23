import React from "react";
import { Link } from 'react-router-dom';
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";

import Auth from "../utils/auth";
import { removeMediaId, saveMediaIds, saveMedias } from "../utils/localStorage";
import { GET_ME } from "../utils/queries";
import { REMOVE_Media } from "../utils/mutations";






const SavedMedias = ({ watching, setWatching }) => {
  const { loading, data } = useQuery(GET_ME);
  let userData = data?.me || {};

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
  // const savedMediaIds = userData.savedMedias.map((media) => media.imdbID);
  // saveMediaIds(savedMediaIds);

  if (!userData.savedMedias) {
    userData.savedMedias = JSON.parse(localStorage.getItem('medias'))
  } else {
    saveMedias(userData.savedMedias)
  }

  setWatching(userData.savedMedias);
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container class="viewsaved">
          <div class="viewsaved">
            <h1>Viewing saved movies!</h1>
          </div>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {watching.length
            ? `Viewing ${watching.length} saved ${
                watching.length === 1 ? "media" : "medias"
              }:`
            : "You have no saved movies!"}
        </h2>
        <CardColumns>
          {watching.map((media) => {
            return (
              <Card key={media.imdbID} border="dark" >
                {media.poster ? (
                    <Link to={`/discussion/${media.imdbID}`}>
                      <Card.Img 
                      src={media.poster}
                      alt={`The cover for ${media.title}`}
                      variant="top"
                      />
                    </Link>
                ) : null}
                <Card.Body>
                  <Card.Title>{media.title}</Card.Title>
                  {/* <p className="small">Authors: {book.authors}</p> */}
                  <Card.Text>{media.plot}</Card.Text>
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