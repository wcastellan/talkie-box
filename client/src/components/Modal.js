import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { SAVE_MEDIA } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import { Redirect } from 'react-router-dom';

function Modal({ currentMedia, setCurrentMedia, onClose, isModalOpen, setIsModalOpen }) {
  const { Title, Poster, Plot, Year, imdbID } = currentMedia
  const [saveMedia, { error }] = useMutation(SAVE_MEDIA, {
    update(cache, { data: { saveMedia } }) {
      try {
        const { me } = cache.readQuery({ query: GET_ME });
        cache.writeQuery({
          query: GET_ME,
          data: { me: { ...me, savedMedias: [...me.savedMedias, saveMedia] } }
        });
      } catch (e) {
        console.error(e);
      }
    }
  });
  const handleAddCollectClick = async (event) => {
    event.preventDefault();
    try {
      const input = {'title': Title, 'plot': Plot, 'poster': Poster, 'imdbID': imdbID, 'link':'prueba'}
      await saveMedia({
        variables: { input }
      });
      setIsModalOpen(!isModalOpen);
      
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="modalBackdrop">
      <div className="modalContainer">
        <h3 className="modalTitle">{Title}</h3>
        <h2 className="modalTitle">{Year}</h2>
        <img alt="current category"  src={Poster}/>
        <p>{Plot}</p>
        <button onClick={handleAddCollectClick} type="button">Add to my collection</button>
        <button onClick={onClose} type="button">Close</button>
      </div>
    </div>
  )
};

export default Modal;