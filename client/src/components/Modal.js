import React, { useState } from "react";

function Modal({ currentMedia, onClose }) {
  const { Title, Poster, Plot, Year } = currentMedia

  return (
    <div className="modalBackdrop">
      <div className="modalContainer">
        <h3 className="modalTitle">{Title}</h3>
        <h2 className="modalTitle">{Year}</h2>
        <img alt="current category"  src={Poster}/>
        <p>{Plot}</p>
        <button onClick={onClose} type="button">Add to my collection</button>
        <button onClick={onClose} type="button">Close</button>
      </div>
    </div>
  )
};

export default Modal;