import { call, put } from "redux-saga/effects";
import { requestUpload } from "../requests/uploadImage";

export function* handleUploadImage(action) {
  try {
    yield call(requestUpload, action);
  } catch (error) {
    console.log(error);
  }
}
