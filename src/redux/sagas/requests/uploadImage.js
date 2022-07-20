import axios from "axios";
import * as myConstClass from "../../../global";

var dispatch_types_urls = {
  UPLOAD_IMAGE: `http://${myConstClass.LOCAL_IP_ADDRESS}:${myConstClass.EXPRESS_PORT}/uploadImage`,
  REMOVE_IMAGE: `http://${myConstClass.LOCAL_IP_ADDRESS}:${myConstClass.EXPRESS_PORT}/removeImage`,
  REMOVE_DASHBOARD_ITEM: `http://${myConstClass.LOCAL_IP_ADDRESS}:${myConstClass.EXPRESS_PORT}/removeDashboardItem`,
};
export function requestUpload(actions) {
  switch (actions.type) {
    case "UPLOAD_IMAGE":
      var reportId = actions["reportId"];
      var item = actions["image"];
      var date = actions["date"];
      var reportUrl = actions["reportUrl"];
      var favouriteClicked = actions["favourite"];
      var reportElement = actions["reportElement"];
      axios.post(dispatch_types_urls["UPLOAD_IMAGE"], {
        favouriteClicked: favouriteClicked,
        item: item,
        date: date,
        reportUrl: reportUrl,
        reportId: reportId,
        reportElement: reportElement,
      });

      break;
    case "REMOVE_IMAGE":
      var position = actions["position"];
      axios.post(dispatch_types_urls["REMOVE_IMAGE"], {
        position: position,
      });

      break;
    case "REMOVE_DASHBOARD_ITEM":
      var reportUrl = actions["reportUrl"];
      var reportElement = actions["reportElement"];
      axios.post(dispatch_types_urls["REMOVE_DASHBOARD_ITEM"], {
        reportUrl: reportUrl,
        reportElement: reportElement,
      });

      break;

    default:
      break;
  }
}
