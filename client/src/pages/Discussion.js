import React, { useState, useEffect } from 'react';
import { useRouteMatch } from "react-router-dom"

const Discussion = () => {
    // const [hotVotes, setHotVotes] = useState(0);
    // const [coldVotes, setColdVotes] = useState(0);
    const [disableHot, setDisableHot] = useState(false);
    const [disableCold, setDisableCold] = useState(false);
    const [discussionMedia, setDiscussionMedia] = useState({})

    let match = useRouteMatch("/discussion/:imbdID").params.imbdID;

    useEffect(() => {
      const url = "https://www.omdbapi.com/?i="+match+"&apikey=a3efed3d";
  
      fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data){
        if (data.Response === "True"){
          setDiscussionMedia(data);
          return
        }
      })
    });
    
    return (
        <section>
            <div>
                <h1>Title: {discussionMedia.Title}</h1>
                <h2>Year: {discussionMedia.Year}</h2>
            </div>
            <div>
                <img></img>
                <p>
                Plot: {discussionMedia.Plot} 
                </p>
            </div>
            <div>
                <button disabled={disableHot} onClick={() => (setDisableHot(true), setDisableCold(false))}>HOT</button>
                <button disabled={disableCold} onClick={() => (setDisableCold(true), setDisableHot(false))}>NOT</button>
            </div>
            <div>
                <h3>
                    User Reviews
                </h3>
                <p>
                    "Lorem ipsum bo diddley protego wingarium haberdashery cauliflower."
                </p>
                <p>
                    Reviewed by username on 01/01/2022
                </p>
            </div>
        </section>
    )
}

export default Discussion;