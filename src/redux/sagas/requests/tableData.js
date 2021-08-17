import axios from "axios";
import * as myConstClass from "../../../global";

var dispatch_types_urls = {
  GET_TABLE_DATA: `http://${myConstClass.LOCAL_IP_ADDRESS}:${myConstClass.EXPRESS_PORT}/getTableData`,
};

export function requestTableData(action) {
  var dispatch_type = action["type"];

  switch (dispatch_type) {
    case "GET_TABLE_DATA":
      var tableUrl = action["tableUrl"];

      return axios.post(dispatch_types_urls["GET_TABLE_DATA"], {
        tableUrl: tableUrl,
      });
    default:
      break;
  }
}
