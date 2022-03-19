import React, { useState } from "react";
import Modal from "./Modal";

function Search() {
  
  const [formState, setFormState] = useState();
  const [searchResults, setSearchResults] = useState();
  const [currentMedia, setCurrentMedia] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  function handleChange(e) {
    setFormState(e.target.value)
    const url = "https://www.omdbapi.com/?s="+formState+"&apikey=a3efed3d"
    // const url = "https://api.themoviedb.org/3/search/multi?api_key=5819b58cf0897290007e0637e78333fb&language=en-US&page=1&include_adult=false&query="+formState.title;

    if (formState.length < 3) {
      setSearchResults()
      return
    } else {
      fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(data){
          if (data.Response === "True"){
            const filteredData = data.Search.filter(media => media.Type !== "game")
            setSearchResults(filteredData);
            return
          }
        })
    }
  }

  const toggleModal = (media) => {

    const url2 = "http://www.omdbapi.com/?t="+media.Title+"&apikey=a3efed3d";
  
    fetch(url2)
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
      if (data.Response === "True"){
        setCurrentMedia(data);
        setIsModalOpen(!isModalOpen);
        return
      }
    })
  }

  return (
    <div className="search" class="search d-flex justify-content-center pt-4">
      {isModalOpen && <Modal currentMedia={currentMedia} onClose={toggleModal}/>}
      <form>
        <label htmlFor="title">Title:</label>
        <input type="title" name="title" onChange={handleChange}></input>
      </form>
      {searchResults && (
        <div className="suggestions">
          {searchResults.map((media, i) => (
            <div className="suggestion">
              <img
                src={media.Poster === "N/A" ? "https://www.warnersstellian.com/Content/images/product_image_not_available.png" : media.Poster}
                alt={media.Title}
                className="img-thumbnail mx-1"
                key={i}
              />
              <div className="media-info">
                <p className="media-title" onClick={() => toggleModal(media, i)} >{media.Title}</p>
                <p className="media-type">type: {media.Type}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
