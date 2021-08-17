import { call, put } from "redux-saga/effects";
import { setTableData } from "../../ducks/tableData";
import { requestTableData } from "../requests/tableData";

export function* handleTableData(action) {
  var dispatch_type = action["type"];
  try {
    switch (dispatch_type) {
      case "GET_TABLE_DATA":
        var tableUrl = action["tableUrl"];
        if (tableUrl) {
          var response = yield call(requestTableData, action);
          var tableData = response.data;
          yield put(setTableData(tableData));
        }
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
}
