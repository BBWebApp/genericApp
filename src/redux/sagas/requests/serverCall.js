import axios from "axios";
import * as myConstClass from "../../../global";

var dispatch_types_urls = {
  GET_XML: `http://${myConstClass.LOCAL_IP_ADDRESS}:${myConstClass.EXPRESS_PORT}/appxml`,
  GET_REPORT_HTML: `http://${myConstClass.LOCAL_IP_ADDRESS}:${myConstClass.EXPRESS_PORT}/reportHtml`,
};

export function requestServerCall(action) {
  var dispatch_type = action["type"];
  switch (dispatch_type) {
    case "GET_XML":
      return axios.post(dispatch_types_urls["GET_XML"]);
    case "GET_REPORT_HTML":
      var reportId = action["reportId_html_flag"];
      var packageId = action["packageId"];
      return axios.post(dispatch_types_urls["GET_REPORT_HTML"], {
        reportId: reportId,
        packageId: packageId,
      });
    case "GET_GENERIC_APP":
      return axios.post(dispatch_types_urls["GET_GENERIC_APP"]);
    default:
      break;
  }
}
