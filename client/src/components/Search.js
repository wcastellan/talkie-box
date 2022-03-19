import React, { useState } from "react";

function Search() {
  
  const [formState, setFormState] = useState({ title: ""});
  const [searchResults, setSearchResults] = useState();
  

  function handleChange(e) {
    setFormState({title:e.target.value})
    const url = "https://www.omdbapi.com/?s="+formState.title+"&apikey=a3efed3d"
    
    if (formState.title.length < 5) {
      setSearchResults()
      return
    } else {
      fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(data){
          if (data.Response === "True"){
            setSearchResults(data.Search);
            console.log(searchResults)
            return
          }
        })
    }
  }

  return (
    <div className="search" class="search d-flex justify-content-center pt-5">
      <form>
        <label htmlFor="title">Search for Movies, TV Shows, and Video Games</label>
        <input type="title" name="title" placeholder='Title' onChange={handleChange}></input>
      </form>
      {searchResults && (
        <div className="suggestions">
          {searchResults.map((film, i) => (
            <div className="suggestion" class="suggestion d-flex justify-content-center">
              <img
                src={film.Poster === "N/A" ? "https://www.warnersstellian.com/Content/images/product_image_not_available.png" : film.Poster}
                alt={film.Title}
                className="img-thumbnail mx-1"
                key={film.Title + i}
              />
              <div className="media-info">
                <p class="media-title">{film.Title}</p>
                <p class="media-type">type: {film.Type}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
