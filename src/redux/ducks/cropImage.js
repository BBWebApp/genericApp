//ACTIONS
export const GET_SLICEDIMAGE = "GET_SLICEDIMAGE";
export const SET_SLICEDIMAGE = "SET_SLICEDIMAGE";

//REDUCERS
export const getSlicedImage = (image, reportId, reportElement) => ({
  type: GET_SLICEDIMAGE,
  image: image,
  reportId: reportId,
  reportElement: reportElement,
});

export const setSlicedImage = (slicedImage, reportId) => ({
  type: SET_SLICEDIMAGE,
  slicedImage: slicedImage,
  reportId: reportId,
});

const initialState = {
  slicedImage: undefined,
  reportId: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SLICEDIMAGE:
      var { slicedImage } = action;
      var { reportId } = action;
      return { ...state, slicedImage: slicedImage, reportId: reportId };
    default:
      return state;
  }
};
