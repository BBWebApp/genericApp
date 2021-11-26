//ACTIONS
export const UPLOAD_IMAGE = "UPLOAD_IMAGE";
export const REMOVE_IMAGE = "REMOVE_IMAGE";

//REDUCERS
export const uploadImage = (image, reportId, date, reportUrl, favourite) => {
  return {
    type: UPLOAD_IMAGE,
    image,
    reportId,
    date,
    reportUrl,
    favourite,
  };
};
export const removeCard = (position) => {
  return {
    type: REMOVE_IMAGE,
    position,
  };
};

// STATE
const initialState = {
  image: undefined,
  reportId: undefined,
  date: undefined,
  reportUrl: undefined,
  favourite: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE:
      const { image, reportId, date, reportUrl, favourite } = action;
      return {
        ...state,
        image: image,
        reportId: reportId,
        date: date,
        reportUrl: reportUrl,
        favourite: favourite,
      };

    default:
      return state;
  }
};
