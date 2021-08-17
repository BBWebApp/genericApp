import { call, put } from "redux-saga/effects";
import { setSlicedImage } from "../../ducks/cropImage";
import { requestCropImage } from "../requests/cropImage";

export function* handleCropImage(action) {
  var dispatch_type = action["type"];
  try {
    switch (dispatch_type) {
      case "GET_SLICEDIMAGE":
        var image = action["image"];
        var reportId = action["reportId"];
        if (image) {
          var response = yield call(requestCropImage, action);
          var slicedImage = "data:image/png;base64," + response.data;
          yield put(setSlicedImage(slicedImage, reportId));
        }
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
}
