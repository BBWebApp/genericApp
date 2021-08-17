//ACTIONS
export const SET_DOWNLOADIMAGES = "SET_DOWNLOADIMAGES";
export const SET_FAVS_DOWNLOADIMAGES = "SET_FAVS_DOWNLOADIMAGES";
export const GET_DOWNLOADIMAGES = "GET_DOWNLOADIMAGES";

//REDUCERS
export const getDownloadedImages = (favourites) => ({
  type: GET_DOWNLOADIMAGES,
  favourites: favourites,
});
export const setDownloadedImages = (images) => ({
  type: SET_DOWNLOADIMAGES,
  images: images,
});
export const setFavsDownloadedImages = (favs) => ({
  type: SET_FAVS_DOWNLOADIMAGES,
  favs: favs,
});

// STATE
const initialState = {
  images: undefined,
  favs: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DOWNLOADIMAGES:
      const { images } = action;
      return { ...state, images: images };
    case SET_FAVS_DOWNLOADIMAGES:
      const { favs } = action;
      return { ...state, favs: favs };

    default:
      return state;
  }
};
