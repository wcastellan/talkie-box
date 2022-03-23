import React, { useState, useEffect } from 'react';
import { useRouteMatch } from "react-router-dom"
import Placeholder from '../assets/gonewiththewind.jpg'

const Discussion = () => {
    // const [hotVotes, setHotVotes] = useState(0);
    // const [coldVotes, setColdVotes] = useState(0);
    const [disableHot, setDisableHot] = useState(false);
    const [disableCold, setDisableCold] = useState(false);
    const [discussionMedia, setDiscussionMedia] = useState({})

    let match = useRouteMatch("/discussion/:imbdID").params.imbdID;

    useEffect(() => {
      const url = "http://www.omdbapi.com/?i="+match+"&apikey=a3efed3d";
  
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
            <div className="card m-4 p-4 border border-dark">
                <div className="moviediscussion card-title mb-0">
                    <h1>Title: {discussionMedia.Title}</h1>
                    <h3>Year: {discussionMedia.Year}</h3>
                </div>
                <div>
                    <img className="movieposters mb-2" src={discussionMedia.Poster} />
                    <p>
                    Plot: {discussionMedia.Plot} 
                    </p>
                </div>
                <div>
                    <button className="btn btn-danger mr-2" disabled={disableHot} onClick={() => (setDisableHot(true), setDisableCold(false))}>HOT</button>
                    <button className="btn btn-secondary" disabled={disableCold} onClick={() => (setDisableCold(true), setDisableHot(false))}>NOT</button>
                </div>
            </div>
            <div className="m-4 reviews card border-dark">
                <div className="card-body">
                    <h3 className="card-title border-bottom border-danger">
                        User Reviews
                    </h3>
                    <p className="card-text">
                        "Lorem ipsum bo diddley protego wingarium haberdashery cauliflower."
                    </p>
                    <p className="card-text">
                        Reviewed by username on 01/01/2022
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Discussion;