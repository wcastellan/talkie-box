import SavedMedias from "../pages/SavedMedias";

export const getSavedMediaIds = () => {
    const savedMediaIds = localStorage.getItem('saved_medias')
      ? JSON.parse(localStorage.getItem('saved_medias'))
      : [];
  
    return savedMediaIds;
  };
  
  export const saveMediaIds = (imdbIDArr) => {
    if (imdbIDArr.length) {
      localStorage.setItem('saved_medias', JSON.stringify(imdbIDArr));
    } else {
      localStorage.removeItem('saved_medias');
    }
  };

  export const saveMedias = (info) => {
    localStorage.setItem('medias', JSON.stringify(info))
  }
  
  export const removeMediaId = (imdbID) => {
    const savedMediaIds = localStorage.getItem('saved_medias')
      ? JSON.parse(localStorage.getItem('saved_medias'))
      : null;
  
    if (!savedMediaIds) {
      return false;
    }
  
    const updatedSavedMediaIds = savedMediaIds?.filter((savedMediaId) => savedMediaId !== imdbID);
    localStorage.setItem('saved_medias', JSON.stringify(updatedSavedMediaIds));
  
    return true;
  };