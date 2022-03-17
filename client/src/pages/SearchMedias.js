import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

import Auth from "../utils/auth";
// import { searchomdb } from "../components/Search";
import { saveMediaIds, getSavedMediaIds } from "../utils/localStorage";
import { SAVE_MEDIA } from "../utils/mutations";
import { useMutation } from "@apollo/react-hooks";

const SearchMedias = () => {
  // create state for holding returned google api data
  const [searchedMedias, setSearchedMedias] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create state to hold saved bookId values
  const [savedMediaIds, setSavedMediaIds] = useState(getSavedMediaIds());

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    // let isMounted = true; // note this flag denote mount status
    return () => {
      saveMediaIds(savedMediaIds);
      // isMounted = false;
    };
  });

  const [saveMedia, { error }] = useMutation(SAVE_MEDIA);

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    // try {
    //   const response = await searchomdb(searchInput);

    //   if (!response.ok) {
    //     throw new Error("something went wrong!");
    //   }

    //   const { items } = await response.json();

    //   const bookData = items.map((book) => ({
    //     bookId: book.id,
    //     authors: book.volumeInfo.authors || ["No author to display"],
    //     title: book.volumeInfo.title,
    //     description: book.volumeInfo.description,
    //     image: book.volumeInfo.imageLinks?.thumbnail || "",
    //   }));

    //   setSearchedMedias(mediaData);
    //   setSearchInput("");
    // } catch (err) {
    //   console.error(err);
    // }
  };

  // create function to handle saving a book to our database
  const handleSaveMedia = async (imdbID) => {
    // find the book in `searchedBooks` state by the matching id
    const mediaToSave = searchedMedias.find((media) => media.imdbID === imdbID);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveMedia({
        variables: {
          input: mediaToSave,
        },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }

      // if movie successfully saves to user's account, save movie id to state
      setSavedMediaIds([...savedMediaIds, mediaToSave.imdbID]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Movies and Television Shows!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search here"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedMedias.length
            ? `Viewing ${searchedMedias.length} results:`
            : "Search to begin"}
        </h2>
        <CardColumns>
          {searchedMedias.map((media) => {
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
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedMediaIds?.some(
                        (savedMediaId) => savedMediaId === media.imdbID
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveMedia(media.imdbID)}
                    >
                      {savedMediaIds?.some(
                        (savedMediaId) => savedMediaId === media.imdbID
                      )
                        ? "This movie has already been saved!"
                        : "Save this Movie!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchMedias;