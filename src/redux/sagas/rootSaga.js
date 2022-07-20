import { takeEvery } from "redux-saga/effects";
import { GET_SLICEDIMAGE } from "../ducks/cropImage";
import { GET_DOWNLOADIMAGES } from "../ducks/downloadImage";
import { GET_REPORT_HTML, GET_XML, GET_GENERIC_APP } from "../ducks/serverCall";
import { GET_TABLE_DATA } from "../ducks/tableData";
import {
  UPLOAD_IMAGE,
  REMOVE_IMAGE,
  REMOVE_DASHBOARD_ITEM,
} from "../ducks/uploadImage";
import { handleCropImage } from "./handlers/cropImage";
import { handleGetUser } from "./handlers/downloadImage";
import { handleServerCall } from "./handlers/serverCall";
import { handleUploadImage } from "./handlers/uploadImage";
import { handleTableData } from "./handlers/tableData";
//check out any action that was dispatched and map it to the function
export function* watchSaga() {
  /* take the latest action that got dispatched and execute it,
    helpful by multiple same dispatched actions */
  yield takeEvery(
    [GET_REPORT_HTML, GET_XML, GET_GENERIC_APP],
    handleServerCall
  );
  yield takeEvery(GET_TABLE_DATA, handleTableData);
  yield takeEvery(GET_SLICEDIMAGE, handleCropImage);
  yield takeEvery(
    [UPLOAD_IMAGE, REMOVE_IMAGE, REMOVE_DASHBOARD_ITEM],
    handleUploadImage
  );
  yield takeEvery(GET_DOWNLOADIMAGES, handleGetUser);
}
