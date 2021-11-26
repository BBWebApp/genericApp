import axios from "axios";
import * as myConstClass from "../../../global";

var dispatch_types_urls = {
  UPLOAD_IMAGE: `http://${myConstClass.LOCAL_IP_ADDRESS}:${myConstClass.EXPRESS_PORT}/uploadImage`,
  REMOVE_IMAGE: `http://${myConstClass.LOCAL_IP_ADDRESS}:${myConstClass.EXPRESS_PORT}/removeImage`,
};
export function requestUpload(actions) {
  switch (actions.type) {
    case "UPLOAD_IMAGE":
      var reportId = actions["reportId"];
      var item = actions["image"];
      var date = actions["date"];
      var reportUrl = actions["reportUrl"];
      var favouriteClicked = actions["favourite"];
      axios.post(dispatch_types_urls["UPLOAD_IMAGE"], {
        favouriteClicked: favouriteClicked,
        item: item,
        date: date,
        reportUrl: reportUrl,
        reportId: reportId,
      });

      break;
    case "REMOVE_IMAGE":
      var position = actions["position"];
      axios.post(dispatch_types_urls["REMOVE_IMAGE"], {
        position: position,
      });

      break;
    default:
      break;
  }
}
