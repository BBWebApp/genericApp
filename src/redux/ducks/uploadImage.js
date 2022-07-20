//ACTIONS
export const UPLOAD_IMAGE = "UPLOAD_IMAGE";
export const REMOVE_IMAGE = "REMOVE_IMAGE";
export const REMOVE_DASHBOARD_ITEM = "REMOVE_DASHBOARD_ITEM";

//REDUCERS
export const uploadImage = (
  image,
  reportId,
  date,
  reportUrl,
  favourite,
  reportElement
) => {
  return {
    type: UPLOAD_IMAGE,
    image,
    reportId,
    date,
    reportElement,
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
export const removeDashboardItem = (reportUrl, reportElement) => {
  return {
    type: REMOVE_DASHBOARD_ITEM,
    reportUrl,
    reportElement,
  };
};
// STATE
const initialState = {
  image: undefined,
  reportId: undefined,
  date: undefined,
  reportUrl: undefined,
  favourite: false,
  reportElement: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE:
      const { image, reportId, date, reportUrl, favourite, reportElement } =
        action;
      return {
        ...state,
        image: image,
        reportId: reportId,
        date: date,
        reportUrl: reportUrl,
        favourite: favourite,
        reportElement: reportElement,
      };

    default:
      return state;
  }
};
